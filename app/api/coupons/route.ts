import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Coupon from '@/lib/models/Coupon';

export async function GET() {
  try {
    await dbConnect();
    const coupons = await Coupon.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: coupons });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Server error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    const coupon = await Coupon.create(body);

    return NextResponse.json(
      { success: true, data: coupon },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Server error';
    if (message.includes('duplicate key') || message.includes('E11000')) {
      return NextResponse.json({ success: false, error: 'Coupon code already exists' }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
