import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import AdminUser from '@/lib/models/AdminUser';
import { getSession, generateResetToken } from '@/lib/auth';
import { sendAdminInvitationEmail } from '@/lib/email';

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function randomPassword() {
  // Password is never shown; invite flow forces user to set a new one via reset link.
  return `tmp-${Math.random().toString(36).slice(2)}-${Date.now()}`;
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const emailRaw = String(body?.email || '').trim();
    const name = String(body?.name || '').trim();
    const role = String(body?.role || '').trim();

    if (!emailRaw) {
      return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 });
    }
    if (!isValidEmail(emailRaw)) {
      return NextResponse.json({ success: false, error: 'Invalid email address' }, { status: 400 });
    }

    const email = emailRaw.toLowerCase();

    await dbConnect();

    const token = generateResetToken();
    const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Create or re-invite: ensure a valid reset token exists, then email it.
    const admin =
      (await AdminUser.findOneAndUpdate(
        { email },
        { $set: { resetToken: token, resetTokenExpiry: expiry } },
        // Mongoose 7+: prefer returnDocument over deprecated `new`.
        { returnDocument: 'after' }
      )) ||
      (await AdminUser.create({
        email,
        password: randomPassword(),
        resetToken: token,
        resetTokenExpiry: expiry,
      }));

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:4000';
    const resetLink = `${siteUrl}/admin/reset-password?token=${token}`;

    try {
      const info = await sendAdminInvitationEmail({
        email: admin.email,
        resetLink,
        name,
        role,
      });

      return NextResponse.json({
        success: true,
        message: 'Invitation email sent.',
        // Helpful for debugging deliverability (SMTP accept != inbox deliver).
        accepted: info.accepted,
        rejected: info.rejected,
      });
    } catch (err) {
      console.error('[Email] Failed to send admin invitation email:', err);
      const msg = err instanceof Error ? err.message : 'Failed to send invitation email';
      return NextResponse.json({ success: false, error: msg }, { status: 502 });
    }
  } catch (error) {
    console.error('Admin invite error:', error);
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
  }
}
