import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Pricing, { DEFAULT_PRICING } from '@/lib/models/Pricing';

// GET - Fetch current pricing (public, used by forms)
export async function GET() {
  try {
    await dbConnect();
    const pricing = await Pricing.findOne().sort({ updatedAt: -1 }).lean();

    if (!pricing) {
      return NextResponse.json({ services: DEFAULT_PRICING });
    }

    // Convert Map to plain object if needed
    const services =
      pricing.services instanceof Map
        ? Object.fromEntries(pricing.services)
        : pricing.services;

    return NextResponse.json({ services });
  } catch {
    // Fallback to defaults if DB fails
    return NextResponse.json({ services: DEFAULT_PRICING });
  }
}

// PUT - Update pricing (admin only)
export async function PUT(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { services } = body;

    if (!services || typeof services !== 'object') {
      return NextResponse.json(
        { error: 'Invalid pricing data' },
        { status: 400 }
      );
    }

    // Upsert: update existing or create new
    const pricing = await Pricing.findOneAndUpdate(
      {},
      { services, updatedBy: 'admin' },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    const resultServices =
      pricing.services instanceof Map
        ? Object.fromEntries(pricing.services)
        : pricing.services;

    return NextResponse.json({
      message: 'Pricing updated successfully',
      services: resultServices,
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to update pricing' },
      { status: 500 }
    );
  }
}
