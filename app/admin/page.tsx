'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import Link from 'next/link';

// ── Chart Data ─────────────────────────────────────────────────────────
type Period = 'daily' | 'weekly' | 'monthly';

const serviceLines = [
  { key: 'all', label: 'All Services', color: '#3B82F6' },
  { key: 'flight', label: 'Flight Itinerary', color: '#3B82F6' },
  { key: 'hotel', label: 'Hotel Reservation', color: '#10B981' },
  { key: 'travel', label: 'Travel Plan', color: '#8B5CF6' },
  { key: 'cover', label: 'Cover Letter', color: '#F59E0B' },
  // { key: 'assistant', label: 'Visa Assistant', color: '#EF4444' },
  // { key: 'essentials', label: 'Visa Essentials', color: '#EC4899' },
  // { key: 'documents', label: 'Visa Documents', color: '#06B6D4' },
];

type ServiceKey = typeof serviceLines[number]['key'];

const chartData: Record<Period, Record<ServiceKey, number[]>> = {
  daily: {
    all:        [320, 480, 390, 620, 550, 280, 190],
    flight:     [120, 180, 140, 220, 200, 100, 70],
    hotel:      [80, 110, 95, 150, 130, 65, 45],
    travel:     [45, 70, 55, 90, 80, 40, 30],
    cover:      [35, 55, 45, 75, 65, 35, 20],
    // assistant:  [15, 25, 20, 35, 30, 15, 10],
    // essentials: [15, 25, 20, 30, 28, 15, 8],
    // documents:  [10, 15, 15, 20, 17, 10, 7],
  },
  weekly: {
    all:        [2100, 2650, 1980, 3200],
    flight:     [780, 980, 740, 1200],
    hotel:      [530, 670, 500, 810],
    travel:     [310, 390, 290, 470],
    cover:      [230, 290, 220, 350],
    // assistant:  [105, 130, 100, 160],
    // essentials: [90, 115, 85, 135],
    // documents:  [55, 75, 45, 75],
  },
  monthly: {
    all:        [5200, 6100, 5800, 7400, 6900, 8420],
    flight:     [1900, 2250, 2130, 2720, 2530, 3100],
    hotel:      [1300, 1520, 1450, 1850, 1720, 2100],
    travel:     [780, 920, 870, 1110, 1040, 1260],
    cover:      [580, 680, 650, 830, 770, 940],
    // assistant:  [260, 310, 290, 370, 350, 420],
    // essentials: [230, 260, 250, 320, 300, 370],
    // documents:  [150, 160, 160, 200, 190, 230],
  },
};

const periodLabels: Record<Period, string[]> = {
  daily: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  weekly: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  monthly: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
};

// ── SVG Chart Component ────────────────────────────────────────────────
function SalesChart({ period, activeServices }: { period: Period; activeServices: ServiceKey[] }) {
  const labels = periodLabels[period];
  const lines = activeServices.map((key) => {
    const meta = serviceLines.find((s) => s.key === key)!;
    return { key, color: meta.color, values: chartData[period][key] };
  });
  const maxVal = Math.max(...lines.flatMap((l) => l.values), 1);
  const chartW = 600, chartH = 240, padL = 55, padR = 20, padT = 20, padB = 40;
  const innerW = chartW - padL - padR, innerH = chartH - padT - padB;
  const xStep = innerW / (labels.length - 1 || 1);

  const toPoints = (values: number[]) =>
    values.map((v, i) => ({ x: padL + i * xStep, y: padT + innerH - (v / maxVal) * innerH }));
  const makeLine = (pts: { x: number; y: number }[]) =>
    pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const makeArea = (pts: { x: number; y: number }[]) =>
    makeLine(pts) + ` L${pts[pts.length - 1].x},${padT + innerH} L${pts[0].x},${padT + innerH} Z`;

  const gridCount = 4;
  const yTicks = Array.from({ length: gridCount + 1 }, (_, i) => {
    const val = Math.round((maxVal / gridCount) * i);
    const y = padT + innerH - (i / gridCount) * innerH;
    return { val, y };
  });

  return (
    <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full h-auto">
      {yTicks.map((tick) => (
        <g key={tick.val}>
          <line x1={padL} y1={tick.y} x2={chartW - padR} y2={tick.y} stroke="#F1F5F9" strokeWidth="1" />
          <text x={padL - 8} y={tick.y + 4} textAnchor="end" fill="#94A3B8" fontSize="11" fontFamily="var(--font-poppins)">
            £{tick.val >= 1000 ? `${(tick.val / 1000).toFixed(1)}k` : tick.val}
          </text>
        </g>
      ))}
      {lines.map((line) => {
        const pts = toPoints(line.values);
        const gradId = `grad-${line.key}`;
        return (
          <g key={line.key}>
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={line.color} stopOpacity="0.18" />
                <stop offset="100%" stopColor={line.color} stopOpacity="0.01" />
              </linearGradient>
            </defs>
            <path d={makeArea(pts)} fill={`url(#${gradId})`} />
            <path d={makeLine(pts)} fill="none" stroke={line.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            {pts.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="4" fill={line.color} stroke="white" strokeWidth="2" />
            ))}
          </g>
        );
      })}
      {labels.map((lbl, i) => (
        <text key={lbl} x={padL + i * xStep} y={chartH - 8} textAnchor="middle" fill="#94A3B8" fontSize="12" fontFamily="var(--font-poppins)">
          {lbl}
        </text>
      ))}
    </svg>
  );
}

// ── Types ──────────────────────────────────────────────────────────────
interface StatsData {
  totalSubmissions: number;
  revenue: number;
  pendingCount: number;
  completedToday: number;
  serviceBreakdown: { service: string; serviceKey: string; count: number; revenue: number; color: string; percent: number }[];
  recentSubmissions: { _id: string; name: string; email: string; service: string; serviceKey: string; amount: number; status: 'completed' | 'pending' | 'processing'; createdAt: string }[];
}

const serviceColorMap: Record<string, string> = {
  'flight-itinerary': '#3B82F6',
  'hotel-reservation': '#10B981',
  'travel-plan': '#8B5CF6',
  'cover-letter': '#F59E0B',
  // 'visa-assistant': '#EF4444',
  // 'visa-essentials': '#EC4899',
  // 'visa-documents': '#06B6D4',
  // 'visa-form-filling': '#7C3AED',
  'expert-consultant': '#F97316',
  'contact': '#64748B',
};

const statusStyles = {
  completed: { bg: '#ECFDF5', text: '#059669', label: 'Completed' },
  pending: { bg: '#FFFBEB', text: '#D97706', label: 'Pending' },
  processing: { bg: '#EFF6FF', text: '#2563EB', label: 'Processing' },
};

export default function AdminDashboard() {
  const [chartPeriod, setChartPeriod] = useState<Period>('daily');
  const [activeServices, setActiveServices] = useState<ServiceKey[]>(['all']);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch('/api/submissions/stats');
      const json = await res.json();
      if (json.success) setStats(json.data);
    } catch {
      // silently fail, will show zeros
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const toggleService = (key: ServiceKey) => {
    if (key === 'all') { setActiveServices(['all']); return; }
    setActiveServices((prev) => {
      const without = prev.filter((k) => k !== 'all');
      if (without.includes(key)) {
        const next = without.filter((k) => k !== key);
        return next.length === 0 ? ['all'] : next;
      }
      return [...without, key];
    });
  };

  const periodTotals = useMemo(() => {
    const values = activeServices.flatMap((key) => chartData[chartPeriod][key]);
    return { revenue: values.reduce((sum, v) => sum + v, 0) };
  }, [chartPeriod, activeServices]);

  const formatNum = (n: number) => n.toLocaleString('en-GB');
  const formatMoney = (n: number) => `£${n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n.toFixed(2)}`;

  const statCards = [
    {
      label: 'Total Submissions',
      value: loading ? '...' : formatNum(stats?.totalSubmissions || 0),
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: '#3B82F6', bg: '#EFF6FF',
    },
    {
      label: 'Revenue',
      value: loading ? '...' : formatMoney(stats?.revenue || 0),
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: '#10B981', bg: '#ECFDF5',
    },
    {
      label: 'Pending',
      value: loading ? '...' : formatNum(stats?.pendingCount || 0),
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: '#F59E0B', bg: '#FFFBEB',
    },
    {
      label: 'Completed Today',
      value: loading ? '...' : formatNum(stats?.completedToday || 0),
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: '#8B5CF6', bg: '#F5F3FF',
    },
  ];

  const serviceBreakdown = stats?.serviceBreakdown || [];
  const recentSubmissions = stats?.recentSubmissions || [];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: stat.bg, color: stat.color }}>
                {stat.icon}
              </div>
            </div>
            <div className="text-[28px] font-bold text-[#0B1437] leading-tight">{stat.value}</div>
            <div className="text-[13px] text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Sales Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-[16px] font-semibold text-[#0B1437]">Sales Overview</h2>
            <p className="text-[13px] text-gray-400 mt-0.5">
              Total:{' '}
              <span className="font-semibold text-[#0B1437]">
                £{periodTotals.revenue >= 1000 ? `${(periodTotals.revenue / 1000).toFixed(1)}k` : periodTotals.revenue}
              </span>
            </p>
          </div>
          <div className="flex items-center bg-[#F8FAFC] rounded-xl p-1 gap-1">
            {(['daily', 'weekly', 'monthly'] as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => setChartPeriod(p)}
                className={`px-4 py-1.5 rounded-lg text-[13px] font-medium transition-all ${chartPeriod === p ? 'bg-white text-[#0B1437] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 mb-5">
          {serviceLines.map((s) => {
            const isActive = activeServices.includes(s.key);
            return (
              <button
                key={s.key}
                onClick={() => toggleService(s.key as ServiceKey)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium transition-all border ${isActive ? 'border-transparent text-white shadow-sm' : 'border-gray-200 text-gray-500 bg-white hover:border-gray-300'}`}
                style={isActive ? { background: s.color } : {}}
              >
                <span className="w-2 h-2 rounded-full" style={{ background: isActive ? 'white' : s.color }} />
                {s.label}
              </button>
            );
          })}
        </div>
        <SalesChart period={chartPeriod} activeServices={activeServices} />
        <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-gray-100">
          {activeServices.map((key) => {
            const meta = serviceLines.find((s) => s.key === key)!;
            const total = chartData[chartPeriod][key].reduce((a, b) => a + b, 0);
            return (
              <div key={key} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: meta.color }} />
                <span className="text-[12px] text-gray-500">
                  {meta.label}{' '}
                  <span className="font-semibold text-[#0B1437]">
                    £{total >= 1000 ? `${(total / 1000).toFixed(1)}k` : total}
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Service Breakdown + Recent Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Service Breakdown */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[16px] font-semibold text-[#0B1437]">Service Breakdown</h2>
            <span className="text-[12px] text-gray-400">This Month</span>
          </div>
          <div className="space-y-4">
            {serviceBreakdown.length === 0 && !loading && (
              <p className="text-[13px] text-gray-400 text-center py-4">No submissions yet</p>
            )}
            {serviceBreakdown.map((item) => (
              <div key={item.serviceKey}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                    <span className="text-[13px] text-gray-700 font-medium">{item.service}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[13px] font-semibold text-[#0B1437]">{item.count}</span>
                    <span className="text-[11px] text-gray-400 ml-2">£{item.revenue.toFixed(2)}</span>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${item.percent}%`, background: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Submissions Table */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <h2 className="text-[16px] font-semibold text-[#0B1437]">Recent Submissions</h2>
            <Link href="/admin/submissions" className="text-[13px] text-[#2979FF] hover:text-[#0052CC] font-medium transition-colors">
              View All →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F8FAFC]">
                  <th className="text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Order</th>
                  <th className="text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Customer</th>
                  <th className="text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Service</th>
                  <th className="text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Amount</th>
                  <th className="text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Status</th>
                  <th className="text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentSubmissions.length === 0 && !loading && (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-[13px] text-gray-400">No submissions yet</td>
                  </tr>
                )}
                {recentSubmissions.map((sub) => {
                  const sColor = serviceColorMap[sub.serviceKey] || '#6B7280';
                  const status = statusStyles[sub.status] || statusStyles.pending;
                  const date = new Date(sub.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
                  const shortId = `#${sub._id.slice(-4).toUpperCase()}`;
                  return (
                    <tr key={sub._id} className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="px-6 py-3.5 text-[13px] font-semibold text-[#0B1437]">{shortId}</td>
                      <td className="px-6 py-3.5">
                        <div className="text-[13px] font-medium text-[#0B1437]">{sub.name}</div>
                        <div className="text-[12px] text-gray-400">{sub.email}</div>
                      </td>
                      <td className="px-6 py-3.5">
                        <span className="inline-flex items-center gap-1.5 text-[12px] font-medium px-2.5 py-1 rounded-full" style={{ background: sColor + '15', color: sColor }}>
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: sColor }} />
                          {sub.service}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-[13px] font-semibold text-[#0B1437]">£{sub.amount.toFixed(2)}</td>
                      <td className="px-6 py-3.5">
                        <span className="text-[12px] font-medium px-2.5 py-1 rounded-full" style={{ background: status.bg, color: status.text }}>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-[13px] text-gray-500">{date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Today's Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-[15px] font-semibold text-[#0B1437] mb-4">Today&apos;s Activity</h3>
          <div className="space-y-3">
            {recentSubmissions.slice(0, 5).map((sub, i) => {
              const sColor = serviceColorMap[sub.serviceKey] || '#6B7280';
              const time = new Date(sub.createdAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
              return (
                <div key={sub._id || i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full" style={{ background: sColor }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-gray-700 leading-snug">New {sub.service.toLowerCase()} order from {sub.name}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{time}</p>
                  </div>
                </div>
              );
            })}
            {recentSubmissions.length === 0 && !loading && (
              <p className="text-[13px] text-gray-400 text-center py-2">No activity yet</p>
            )}
          </div>
        </div>

        {/* Popular Services */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-[15px] font-semibold text-[#0B1437] mb-4">Top Services</h3>
          <div className="space-y-4">
            {serviceBreakdown.slice(0, 4).map((item, i) => (
              <div key={item.serviceKey} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-[14px] font-bold" style={{ background: item.color }}>
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="text-[13px] font-medium text-[#0B1437]">{item.service}</div>
                  <div className="text-[12px] text-gray-400">{item.count} orders</div>
                </div>
                <div className="text-[14px] font-semibold text-[#0B1437]">£{item.revenue.toFixed(2)}</div>
              </div>
            ))}
            {serviceBreakdown.length === 0 && !loading && (
              <p className="text-[13px] text-gray-400 text-center py-2">No data yet</p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-[#2979FF] to-[#0052CC] rounded-2xl p-6 shadow-sm text-white">
          <h3 className="text-[15px] font-semibold mb-2">Quick Actions</h3>
          <p className="text-[13px] text-white/70 mb-5">Manage your submissions efficiently</p>
          <div className="space-y-3">
            <Link href="/admin/submissions" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-xl px-4 py-3 transition-colors">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span className="text-[13px] font-medium">View All Submissions</span>
            </Link>
            <Link href="/admin/submissions?status=pending" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-xl px-4 py-3 transition-colors">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-[13px] font-medium">Pending Orders ({stats?.pendingCount || 0})</span>
            </Link>
            <Link href="/" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-xl px-4 py-3 transition-colors">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-[13px] font-medium">Go to Website</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
