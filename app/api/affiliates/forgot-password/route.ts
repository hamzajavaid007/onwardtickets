import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Affiliate from '@/lib/models/Affiliate';
import { generateResetToken } from '@/lib/auth';
import { sendAffiliatePasswordResetEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ success: true, message: 'If this email is registered, you will receive a recovery link.' });
    }

    await dbConnect();
    const affiliate = await Affiliate.findOne({ email });

    // Always return success to prevent email enumeration
    if (!affiliate) {
      return NextResponse.json({ success: true, message: 'If this email is registered, you will receive a recovery link.' });
    }

    const token = generateResetToken();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:5000';
    const resetLink = `${siteUrl}/affiliate/recover?token=${token}&email=${encodeURIComponent(email)}`;

    sendAffiliatePasswordResetEmail({ name: affiliate.name, email, resetLink }).catch(() => {});

    return NextResponse.json({ success: true, message: 'If this email is registered, you will receive a recovery link.' });
  } catch {
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
  }
}
