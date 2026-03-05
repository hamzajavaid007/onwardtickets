import { NextRequest, NextResponse } from 'next/server';
import { generateResetToken } from '@/lib/auth';
import { sendAdminPasswordResetEmail } from '@/lib/email';
import dbConnect from '@/lib/mongodb';
import AdminUser from '@/lib/models/AdminUser';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@onwardtickets.com';
const GENERIC_MESSAGE = 'If this email is associated with an admin account, a reset link has been sent.';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ success: true, message: GENERIC_MESSAGE });
    }

    await dbConnect();

    // Find admin in DB, or check env var
    let admin = await AdminUser.findOne({ email });

    if (!admin && email === ADMIN_EMAIL) {
      // Create admin record from env vars so we can store reset token
      admin = await AdminUser.create({
        email: ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD || 'admin123',
      });
    }

    if (!admin) {
      // Don't reveal whether email exists
      return NextResponse.json({ success: true, message: GENERIC_MESSAGE });
    }

    // Generate and save reset token
    const token = generateResetToken();
    admin.resetToken = token;
    admin.resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await admin.save();

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:5000';
    const resetLink = `${siteUrl}/admin/reset-password?token=${token}`;

    // Send email non-blocking (don't hold up the response)
    sendAdminPasswordResetEmail({ email, resetLink }).catch((err) => {
      console.error('[Email] Failed to send admin reset email:', err);
    });

    return NextResponse.json({ success: true, message: GENERIC_MESSAGE });
  } catch (error) {
    console.error('Admin forgot-password error:', error);
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
  }
}
