import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Affiliate from '@/lib/models/Affiliate';

export async function GET(req: NextRequest) {
  try {
    const session = req.cookies.get('affiliate_session')?.value;
    if (!session) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    await dbConnect();
    const affiliate = await Affiliate.findById(session).lean();
    if (!affiliate || (affiliate as { status: string }).status !== 'approved') {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const a = affiliate as { affiliateId: number; name: string; email: string; referralCode: string; commissionRate: number; createdAt: Date };
    return NextResponse.json({
      authenticated: true,
      affiliate: {
        affiliateId: a.affiliateId,
        name: a.name,
        email: a.email,
        referralCode: a.referralCode,
        commissionRate: a.commissionRate,
        joinedAt: a.createdAt,
      },
    });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
