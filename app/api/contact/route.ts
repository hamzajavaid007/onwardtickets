import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Contact from '@/lib/models/Contact';
import { sendContactNotification, sendContactConfirmation } from '@/lib/email';
import { getSession } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: 'Name, email, and message are required' }, { status: 400 });
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, error: 'Invalid email address' }, { status: 400 });
    }

    await dbConnect();
    const contact = await Contact.create({ name, email, phone: phone || '', message });

    // Send email notifications (non-blocking)
    sendContactNotification({ name, email, phone: phone || '', message }).catch(() => {});
    sendContactConfirmation({ name, email }).catch(() => {});

    return NextResponse.json(
      { success: true, data: contact },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Server error';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}

// GET - List contacts (admin only)
export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const contacts = await Contact.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: contacts });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Server error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
