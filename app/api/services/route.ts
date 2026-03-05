import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ServiceConfig, { DEFAULT_SERVICES } from '@/lib/models/ServiceConfig';

export async function GET() {
  try {
    await dbConnect();
    const config = await ServiceConfig.findOne().sort({ updatedAt: -1 }).lean();

    if (!config) {
      return NextResponse.json({ services: DEFAULT_SERVICES });
    }

    const services =
      config.services instanceof Map
        ? Object.fromEntries(config.services)
        : config.services;

    // Merge with defaults to pick up any new services
    const merged = { ...DEFAULT_SERVICES, ...services };
    return NextResponse.json({ services: merged });
  } catch {
    return NextResponse.json({ services: DEFAULT_SERVICES });
  }
}

export async function PUT(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { services } = body;

    if (!services || typeof services !== 'object') {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const config = await ServiceConfig.findOneAndUpdate(
      {},
      { services },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    const resultServices =
      config.services instanceof Map
        ? Object.fromEntries(config.services)
        : config.services;

    return NextResponse.json({ message: 'Services updated', services: resultServices });
  } catch {
    return NextResponse.json({ error: 'Failed to update services' }, { status: 500 });
  }
}
