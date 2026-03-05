import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Affiliate from '@/lib/models/Affiliate';
import { sendAffiliateStatusEmail } from '@/lib/email';
import { getSession } from '@/lib/auth';

// PATCH - Update affiliate (approve/reject/edit) - admin only
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { id } = await params;
    const body = await req.json();

    // Get current status before update
    const existing = await Affiliate.findById(id);
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Affiliate not found' }, { status: 404 });
    }

    const previousStatus = existing.status;
    const affiliate = await Affiliate.findByIdAndUpdate(id, body, { new: true });

    // Send email if status changed to approved or rejected
    if (body.status && body.status !== previousStatus && (body.status === 'approved' || body.status === 'rejected')) {
      sendAffiliateStatusEmail({
        name: affiliate!.name,
        email: affiliate!.email,
        status: body.status,
        referralCode: affiliate!.referralCode,
      }).catch(() => {});
    }

    return NextResponse.json({ success: true, data: affiliate });
  } catch (error: unknown) {
    console.error('Affiliate update error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update affiliate' }, { status: 500 });
  }
}

// DELETE - Remove affiliate - admin only
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { id } = await params;

    const affiliate = await Affiliate.findByIdAndDelete(id);
    if (!affiliate) {
      return NextResponse.json({ success: false, error: 'Affiliate not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Affiliate delete error:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete affiliate' }, { status: 500 });
  }
}
