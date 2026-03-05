import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Submission from '@/lib/models/Submission';
import Affiliate from '@/lib/models/Affiliate';
import Coupon from '@/lib/models/Coupon';
import { sendNewOrderNotification, sendOrderConfirmation, sendAffiliateReferralSaleEmail, sendEmailVerification } from '@/lib/email';
import { getSession } from '@/lib/auth';

import crypto from 'crypto';

// Generate verification token
function generateVerificationToken(): string {
  const timestamp = Date.now().toString();
  const random = crypto.randomBytes(16).toString('hex');
  const combined = `${timestamp}-${random}`;
  return Buffer.from(combined).toString('base64');
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    // Generate email verification token
    const verificationToken = generateVerificationToken();

    const submission = await Submission.create({
      ...body,
      emailVerificationToken: verificationToken,
      emailVerified: false,
    });

    // Send email notifications (non-blocking)
    const emailData = {
      service: body.service,
      name: body.name,
      email: body.email,
      phone: body.phone,
      travelers: body.travelers,
      amount: body.amount,
      urgency: body.urgency,
      details: body.details,
    };

    // Send email verification
    sendEmailVerification({
      name: body.name,
      email: body.email,
      token: verificationToken,
    }).catch(() => {});

    sendNewOrderNotification(emailData).catch(() => {});
    sendOrderConfirmation(emailData).catch(() => {});

    // If coupon code was used, increment its usage count
    if (body.formData?.couponCode) {
      Coupon.findOneAndUpdate(
        { code: body.formData.couponCode.toUpperCase() },
        { $inc: { usedCount: 1 } }
      ).catch(() => {});
    }

    // If referral code is present, notify the affiliate
    if (body.referralCode) {
      (async () => {
        try {
          // Look up affiliate by referralCode or affiliateId
          const affiliate = await Affiliate.findOne({
            $or: [
              { referralCode: body.referralCode },
              { affiliateId: Number(body.referralCode) || 0 },
            ],
            status: 'approved',
          });

          if (affiliate) {
            const commission = (body.amount * affiliate.commissionRate) / 100;
            sendAffiliateReferralSaleEmail({
              affiliateName: affiliate.name,
              affiliateEmail: affiliate.email,
              commissionRate: affiliate.commissionRate,
              service: body.service,
              amount: body.amount,
              commission,
              customerName: body.name,
            }).catch(() => {});
          }
        } catch (err) {
          console.error('[Referral] Failed to process referral:', err);
        }
      })();
    }

    return NextResponse.json(
      { success: true, data: submission },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Server error';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { searchParams } = new URL(req.url);

    const status = searchParams.get('status');
    const service = searchParams.get('service');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const filter: Record<string, unknown> = {};

    if (status && status !== 'all') {
      filter.status = status;
    }
    if (service && service !== 'all') {
      filter.serviceKey = service;
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { referralCode: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;

    const [submissions, total] = await Promise.all([
      Submission.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Submission.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,
      data: submissions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Server error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
