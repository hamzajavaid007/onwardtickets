import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Submission from '@/lib/models/Submission';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const [
      totalSubmissions,
      pendingCount,
      completedToday,
      totalRevenue,
      serviceBreakdown,
      recentSubmissions,
    ] = await Promise.all([
      Submission.countDocuments(),
      Submission.countDocuments({ status: 'pending' }),
      Submission.countDocuments({
        status: 'completed',
        updatedAt: { $gte: todayStart },
      }),
      Submission.aggregate([
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
      Submission.aggregate([
        { $match: { createdAt: { $gte: monthStart } } },
        {
          $group: {
            _id: '$serviceKey',
            service: { $first: '$service' },
            count: { $sum: 1 },
            revenue: { $sum: '$amount' },
          },
        },
        { $sort: { count: -1 } },
      ]),
      Submission.find()
        .sort({ createdAt: -1 })
        .limit(8)
        .lean(),
    ]);

    const revenue = totalRevenue[0]?.total || 0;

    const serviceColors: Record<string, string> = {
      'flight-itinerary': '#3B82F6',
      'hotel-reservation': '#10B981',
      'travel-plan': '#8B5CF6',
      'cover-letter': '#F59E0B',
      'visa-assistant': '#EF4444',
      'visa-essentials': '#EC4899',
      'visa-documents': '#06B6D4',
      'visa-form-filling': '#7C3AED',
      'expert-consultant': '#F97316',
      'contact': '#64748B',
    };

    const breakdown = serviceBreakdown.map((item: { _id: string; service: string; count: number; revenue: number }) => ({
      service: item.service,
      serviceKey: item._id,
      count: item.count,
      revenue: item.revenue,
      color: serviceColors[item._id] || '#6B7280',
    }));

    const totalCount = breakdown.reduce((sum: number, b: { count: number }) => sum + b.count, 0) || 1;
    const breakdownWithPercent = breakdown.map((b: { count: number; service: string; serviceKey: string; revenue: number; color: string }) => ({
      ...b,
      percent: Math.round((b.count / totalCount) * 100),
    }));

    return NextResponse.json({
      success: true,
      data: {
        totalSubmissions,
        revenue,
        pendingCount,
        completedToday,
        serviceBreakdown: breakdownWithPercent,
        recentSubmissions,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Server error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
