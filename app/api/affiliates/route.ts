import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Affiliate from '@/lib/models/Affiliate';
import { sendAffiliateNotification, sendAffiliateRegistrationEmail } from '@/lib/email';
import { getSession } from '@/lib/auth';

// POST - Register new affiliate
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    const { name, email, phone, website, platform, audience, promotion, bankDetails } = body;

    if (!name || !email || !phone || !platform) {
      return NextResponse.json({ success: false, error: 'Please fill in all required fields' }, { status: 400 });
    }

    // Check if email already exists
    const existing = await Affiliate.findOne({ email });
    if (existing) {
      return NextResponse.json({ success: false, error: 'An application with this email already exists' }, { status: 409 });
    }

    const affiliate = await Affiliate.create({
      name,
      email,
      phone,
      website: website || '',
      platform,
      audience: audience || '',
      promotion: promotion || '',
      bankDetails: bankDetails || '',
    });

    // Send email notification to admin (non-blocking)
    sendAffiliateNotification({
      name,
      email,
      phone,
      website: website || '',
      platform,
    }).catch(() => {});

    // Send registration confirmation to affiliate (non-blocking)
    sendAffiliateRegistrationEmail({ name, email }).catch(() => {});

    return NextResponse.json({ success: true, data: affiliate }, { status: 201 });
  } catch (error: unknown) {
    console.error('Affiliate registration error:', error);
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
  }
}

// GET - List affiliates (admin only)
export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const filter: Record<string, unknown> = {};
    if (status && status !== 'all') filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { referralCode: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await Affiliate.countDocuments(filter);
    const affiliates = await Affiliate.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      data: affiliates,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) },
    });
  } catch (error: unknown) {
    console.error('Affiliate list error:', error);
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
  }
}
