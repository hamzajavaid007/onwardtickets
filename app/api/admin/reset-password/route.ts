import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import AdminUser from '@/lib/models/AdminUser';

export async function POST(req: NextRequest) {
  try {
    const { token, newPassword } = await req.json();

    if (!token || !newPassword) {
      return NextResponse.json({ success: false, error: 'Token and new password are required' }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ success: false, error: 'Password must be at least 8 characters' }, { status: 400 });
    }

    await dbConnect();

    // Find admin by reset token and check expiry
    const admin = await AdminUser.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: new Date() },
    });

    if (!admin) {
      return NextResponse.json({ success: false, error: 'Reset link has expired or is invalid. Please request a new one.' }, { status: 400 });
    }

    // Update password (pre-save hook will hash it)
    admin.password = newPassword;
    admin.resetToken = undefined;
    admin.resetTokenExpiry = undefined;
    await admin.save();

    return NextResponse.json({
      success: true,
      message: 'Password has been reset successfully. You can now log in with your new password.',
    });
  } catch (error) {
    console.error('Admin reset-password error:', error);
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
  }
}
