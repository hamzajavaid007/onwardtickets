import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Affiliate from '@/lib/models/Affiliate';
import { verifyResetToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { token, email } = await req.json();

    if (!token || !email) {
      return NextResponse.json({ success: false, error: 'Invalid recovery link' }, { status: 400 });
    }

    if (!verifyResetToken(token)) {
      return NextResponse.json({ success: false, error: 'Recovery link has expired. Please request a new one.' }, { status: 400 });
    }

    await dbConnect();
    const affiliate = await Affiliate.findOne({ email }).select('name email referralCode status');
    if (!affiliate) {
      return NextResponse.json({ success: false, error: 'Account not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: {
        name: affiliate.name,
        email: affiliate.email,
        referralCode: affiliate.referralCode,
        status: affiliate.status,
      },
    });
  } catch {
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
  }
}
