import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Affiliate from '@/lib/models/Affiliate';

export async function POST(req: NextRequest) {
  try {
    const { email, referralCode } = await req.json();

    if (!email || !referralCode) {
      return NextResponse.json({ success: false, error: 'Email and referral code are required' }, { status: 400 });
    }

    await dbConnect();
    const affiliate = await Affiliate.findOne({ email, referralCode });
    if (!affiliate) {
      return NextResponse.json({ success: false, error: 'Invalid email or referral code' }, { status: 401 });
    }

    if (affiliate.status !== 'approved') {
      return NextResponse.json({ success: false, error: 'Your application has not been approved yet' }, { status: 403 });
    }

    const response = NextResponse.json({ success: true, data: { name: affiliate.name, email: affiliate.email, referralCode: affiliate.referralCode } });
    response.cookies.set('affiliate_session', affiliate._id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error: unknown) {
    console.error('Affiliate login error:', error);
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
  }
}
