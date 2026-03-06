'use client';

import { useState, useMemo, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// ── Types ──────────────────────────────────────────────────────────────
interface Comment {
  text: string;
  createdAt: string;
}

interface Submission {
  _id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  serviceKey: string;
  amount: number;
  travelers: number;
  status: 'completed' | 'pending' | 'processing';
  urgency: string;
  details: string;
  comments: Comment[];
  createdAt: string;
}

const serviceOptions = [
  { label: 'All Services', key: 'all' },
  { label: 'Flight Itinerary', key: 'flight-itinerary', color: '#3B82F6' },
  { label: 'Hotel Reservation', key: 'hotel-reservation', color: '#10B981' },
  { label: 'Travel Plan', key: 'travel-plan', color: '#8B5CF6' },
  { label: 'Cover Letter', key: 'cover-letter', color: '#F59E0B' },
  // { label: 'Visa Assistant', key: 'visa-assistant', color: '#EF4444' },
  // { label: 'Visa Essentials', key: 'visa-essentials', color: '#EC4899' },
  // { label: 'Visa Documents', key: 'visa-documents', color: '#06B6D4' },
  // { label: 'Visa Form Filling', key: 'visa-form-filling', color: '#7C3AED' },
  { label: 'Expert Consultant', key: 'expert-consultant', color: '#F97316' },
];

const serviceColorMap: Record<string, string> = {};
serviceOptions.forEach((s) => { if (s.color) serviceColorMap[s.key] = s.color; });

const statusStyles = {
  completed: { bg: '#ECFDF5', text: '#059669', label: 'Completed' },
  pending: { bg: '#FFFBEB', text: '#D97706', label: 'Pending' },
  processing: { bg: '#EFF6FF', text: '#2563EB', label: 'Processing' },
};

export default function SubmissionsPageWrapper() {
  return (
    <Suspense fallback={<div className="btn-hover-lift text-center py-16"><p className="btn-hover-lift text-[13px] text-gray-400">Loading...</p></div>}>
      <SubmissionsPage />
    </Suspense>
  );
}

function SubmissionsPage() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get('service') || 'all';
  const initialStatus = searchParams.get('status') || 'all';

  const [allSubmissions, setAllSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [serviceFilter, setServiceFilter] = useState(initialService);
  const [statusFilter, setStatusFilter] = useState(initialStatus);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [commentText, setCommentText] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (serviceFilter !== 'all') params.set('service', serviceFilter);
      if (searchQuery) params.set('search', searchQuery);
      params.set('page', String(page));
      params.set('limit', '20');

      const res = await fetch(`/api/submissions?${params.toString()}`);
      const json = await res.json();
      if (json.success) {
        setAllSubmissions(json.data);
        setTotalPages(json.pagination.pages || 1);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [statusFilter, serviceFilter, searchQuery, page]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const counts = useMemo(() => ({
    all: allSubmissions.length,
    completed: allSubmissions.filter((s) => s.status === 'completed').length,
    processing: allSubmissions.filter((s) => s.status === 'processing').length,
    pending: allSubmissions.filter((s) => s.status === 'pending').length,
  }), [allSubmissions]);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/submissions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const json = await res.json();
      if (json.success) {
        setAllSubmissions((prev) =>
          prev.map((s) => s._id === id ? { ...s, status: newStatus as Submission['status'] } : s)
        );
      }
    } catch {
      // silently fail
    }
  };

  const addComment = async (id: string) => {
    if (!commentText.trim()) return;
    setCommentLoading(true);
    try {
      const res = await fetch(`/api/submissions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ addComment: commentText.trim() }),
      });
      const json = await res.json();
      if (json.success) {
        setAllSubmissions((prev) =>
          prev.map((s) => s._id === id ? { ...s, comments: json.data.comments } : s)
        );
        setCommentText('');
      }
    } catch {
      // silently fail
    } finally {
      setCommentLoading(false);
    }
  };

  const exportCSV = () => {
    const headers = ['Order ID', 'Name', 'Email', 'Phone', 'Service', 'Amount', 'Travelers', 'Urgency', 'Status', 'Details', 'Date'];
    const rows = allSubmissions.map((s) => [
      s._id.slice(-6),
      s.name,
      s.email,
      s.phone,
      s.service,
      `£${s.amount.toFixed(2)}`,
      s.travelers,
      s.urgency,
      s.status,
      s.details,
      new Date(s.createdAt).toLocaleDateString('en-GB'),
    ]);
    const csv = [headers.join(','), ...rows.map((r) => r.map((c) => `"${c}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `submissions-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="btn-hover-lift space-y-6">
      {/* Status tabs */}
      <div className="btn-hover-lift flex items-center gap-3">
        {[
          { key: 'all', label: 'All', count: counts.all, color: '#0B1437' },
          { key: 'completed', label: 'Completed', count: counts.completed, color: '#059669' },
          { key: 'processing', label: 'Processing', count: counts.processing, color: '#2563EB' },
          { key: 'pending', label: 'Pending', count: counts.pending, color: '#D97706' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => { setStatusFilter(tab.key); setPage(1); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-medium transition-all ${
              statusFilter === tab.key
                ? 'bg-white shadow-sm border border-gray-200 text-[#0B1437]'
                : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
            }`}
          >
            {tab.label}
            <span
              className="btn-hover-lift text-[11px] font-semibold px-1.5 py-0.5 rounded-md"
              style={{
                background: statusFilter === tab.key ? tab.color + '15' : '#F1F5F9',
                color: statusFilter === tab.key ? tab.color : '#94A3B8',
              }}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Filters Row */}
      <div className="btn-hover-lift bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-wrap items-center gap-4">
        <div className="btn-hover-lift relative flex-1 min-w-[200px]">
          <svg className="btn-hover-lift absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, email, phone or order ID..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
            className="btn-hover-lift w-full pl-9 pr-4 py-2.5 bg-[#F8FAFC] rounded-xl text-[13px] border border-transparent focus:border-[#005CFF] focus:outline-none transition-colors"
          />
        </div>
        <div className="btn-hover-lift relative">
          <select
            value={serviceFilter}
            onChange={(e) => { setServiceFilter(e.target.value); setPage(1); }}
            className="btn-hover-lift appearance-none bg-[#F8FAFC] rounded-xl text-[13px] pl-4 pr-10 py-2.5 border border-transparent focus:border-[#005CFF] focus:outline-none cursor-pointer font-medium text-gray-700"
          >
            {serviceOptions.map((opt) => (
              <option key={opt.key} value={opt.key}>{opt.label}</option>
            ))}
          </select>
          <svg className="btn-hover-lift absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <button
          onClick={exportCSV}
          className="btn-hover-lift flex items-center gap-2 bg-[#005CFF] hover:bg-[#0047CC] text-white px-4 py-2.5 rounded-xl text-[13px] font-medium transition-colors"
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export CSV
        </button>
      </div>

      {/* Results info */}
      <div className="btn-hover-lift flex items-center justify-between">
        <p className="btn-hover-lift text-[13px] text-gray-500">
          {loading ? 'Loading...' : (
            <>Showing <span className="btn-hover-lift font-semibold text-[#0B1437]">{allSubmissions.length}</span> submissions</>
          )}
        </p>
      </div>

      {/* Table */}
      <div className="btn-hover-lift bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="btn-hover-lift overflow-x-auto">
          <table className="btn-hover-lift w-full">
            <thead>
              <tr className="btn-hover-lift bg-[#F8FAFC]">
                <th className="btn-hover-lift text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3.5">Order</th>
                <th className="btn-hover-lift text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3.5">Customer</th>
                <th className="btn-hover-lift text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3.5">Service</th>
                <th className="btn-hover-lift text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3.5">Travelers</th>
                <th className="btn-hover-lift text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3.5">Amount</th>
                <th className="btn-hover-lift text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3.5">Urgency</th>
                <th className="btn-hover-lift text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3.5">Status</th>
                <th className="btn-hover-lift text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3.5">Date</th>
                <th className="btn-hover-lift text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3.5"></th>
              </tr>
            </thead>
            <tbody className="btn-hover-lift divide-y divide-gray-50">
              {allSubmissions.map((sub) => {
                const sColor = serviceColorMap[sub.serviceKey] || '#6B7280';
                const status = statusStyles[sub.status] || statusStyles.pending;
                const isExpanded = expandedRow === sub._id;
                const shortId = `#${sub._id.slice(-4).toUpperCase()}`;
                const date = new Date(sub.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
                return (
                  <tr
                    key={sub._id}
                    className={`hover:bg-[#F8FAFC] transition-colors cursor-pointer ${isExpanded ? 'bg-[#F8FAFC]' : ''}`}
                    onClick={() => setExpandedRow(isExpanded ? null : sub._id)}
                  >
                    <td className="btn-hover-lift px-6 py-3.5 text-[13px] font-semibold text-[#0B1437]">{shortId}</td>
                    <td className="btn-hover-lift px-6 py-3.5">
                      <div className="btn-hover-lift text-[13px] font-medium text-[#0B1437]">{sub.name}</div>
                      <div className="btn-hover-lift text-[12px] text-gray-400">{sub.email}</div>
                    </td>
                    <td className="btn-hover-lift px-6 py-3.5">
                      <span
                        className="btn-hover-lift inline-flex items-center gap-1.5 text-[12px] font-medium px-2.5 py-1 rounded-full"
                        style={{ background: sColor + '15', color: sColor }}
                      >
                        <span className="btn-hover-lift w-1.5 h-1.5 rounded-full" style={{ background: sColor }} />
                        {sub.service}
                      </span>
                    </td>
                    <td className="btn-hover-lift px-6 py-3.5 text-[13px] text-gray-700">{sub.travelers}</td>
                    <td className="btn-hover-lift px-6 py-3.5 text-[13px] font-semibold text-[#0B1437]">£{sub.amount.toFixed(2)}</td>
                    <td className="btn-hover-lift px-6 py-3.5">
                      <span className={`text-[12px] font-medium ${sub.urgency === 'Super Fast' ? 'text-red-500' : sub.urgency === 'Urgent' ? 'text-orange-500' : sub.urgency === 'Speedy' ? 'text-blue-500' : 'text-gray-500'}`}>
                        {sub.urgency}
                      </span>
                    </td>
                    <td className="btn-hover-lift px-6 py-3.5">
                      <span className="btn-hover-lift text-[12px] font-medium px-2.5 py-1 rounded-full" style={{ background: status.bg, color: status.text }}>
                        {status.label}
                      </span>
                    </td>
                    <td className="btn-hover-lift px-6 py-3.5 text-[13px] text-gray-500 whitespace-nowrap">{date}</td>
                    <td className="btn-hover-lift px-6 py-3.5">
                      <svg className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Expanded detail rows */}
          {allSubmissions.map((sub) => {
            if (expandedRow !== sub._id) return null;
            return (
              <div key={`detail-${sub._id}`} className="btn-hover-lift px-6 py-4 bg-[#F8FAFC] border-t border-gray-100">
                <div className="btn-hover-lift grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="btn-hover-lift text-[12px] font-semibold text-gray-500 uppercase tracking-wider mb-2">Contact Info</h4>
                    <div className="btn-hover-lift space-y-1.5">
                      <div className="btn-hover-lift flex items-center gap-2 text-[13px]">
                        <svg className="btn-hover-lift text-gray-400" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="btn-hover-lift text-gray-700">{sub.email}</span>
                      </div>
                      <div className="btn-hover-lift flex items-center gap-2 text-[13px]">
                        <svg className="btn-hover-lift text-gray-400" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="btn-hover-lift text-gray-700">{sub.phone || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="btn-hover-lift text-[12px] font-semibold text-gray-500 uppercase tracking-wider mb-2">Order Details</h4>
                    <p className="btn-hover-lift text-[13px] text-gray-700 leading-relaxed">{sub.details || 'No additional details'}</p>
                  </div>
                  <div>
                    <h4 className="btn-hover-lift text-[12px] font-semibold text-gray-500 uppercase tracking-wider mb-2">Actions</h4>
                    <div className="btn-hover-lift flex flex-wrap gap-2">
                      {sub.status !== 'completed' && (
                        <button
                          onClick={() => updateStatus(sub._id, 'completed')}
                          className="btn-hover-lift flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors"
                        >
                          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          Mark Complete
                        </button>
                      )}
                      {sub.status === 'pending' && (
                        <button
                          onClick={() => updateStatus(sub._id, 'processing')}
                          className="btn-hover-lift flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors"
                        >
                          Mark Processing
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Comments Section */}
                <div className="btn-hover-lift mt-5 pt-5 border-t border-gray-200">
                  <h4 className="btn-hover-lift text-[12px] font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Comments {sub.comments?.length > 0 && <span className="btn-hover-lift text-gray-400">({sub.comments.length})</span>}
                  </h4>

                  {sub.comments?.length > 0 && (
                    <div className="btn-hover-lift space-y-2.5 mb-3 max-h-[200px] overflow-y-auto">
                      {sub.comments.map((c, i) => (
                        <div key={i} className="btn-hover-lift bg-white rounded-lg px-3.5 py-2.5 border border-gray-100">
                          <p className="btn-hover-lift text-[13px] text-gray-700">{c.text}</p>
                          <p className="btn-hover-lift text-[11px] text-gray-400 mt-1">
                            {new Date(c.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="btn-hover-lift flex gap-2">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={expandedRow === sub._id ? commentText : ''}
                      onChange={(e) => setCommentText(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') addComment(sub._id); }}
                      onClick={(e) => e.stopPropagation()}
                      className="btn-hover-lift flex-1 bg-white border border-gray-200 rounded-lg px-3.5 py-2 text-[13px] focus:border-[#005CFF] focus:outline-none transition-colors"
                    />
                    <button
                      onClick={(e) => { e.stopPropagation(); addComment(sub._id); }}
                      disabled={commentLoading || !commentText.trim()}
                      className="btn-hover-lift flex items-center gap-1.5 bg-[#005CFF] hover:bg-[#0047CC] disabled:bg-gray-300 text-white px-4 py-2 rounded-lg text-[12px] font-medium transition-colors"
                    >
                      {commentLoading ? 'Adding...' : 'Add'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {allSubmissions.length === 0 && !loading && (
          <div className="btn-hover-lift text-center py-16">
            <svg className="btn-hover-lift mx-auto mb-4 text-gray-300" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="btn-hover-lift text-[15px] font-semibold text-gray-500 mb-1">No submissions found</h3>
            <p className="btn-hover-lift text-[13px] text-gray-400">Try adjusting your filters or search query</p>
          </div>
        )}

        {loading && (
          <div className="btn-hover-lift text-center py-16">
            <p className="btn-hover-lift text-[13px] text-gray-400">Loading submissions...</p>
          </div>
        )}

        {/* Pagination */}
        {allSubmissions.length > 0 && (
          <div className="btn-hover-lift flex items-center justify-between px-6 py-4 border-t border-gray-100">
            <p className="btn-hover-lift text-[13px] text-gray-500">
              Page <span className="btn-hover-lift font-semibold text-[#0B1437]">{page}</span> of <span className="btn-hover-lift font-semibold text-[#0B1437]">{totalPages}</span>
            </p>
            <div className="btn-hover-lift flex items-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className={`px-3 py-1.5 rounded-lg text-[13px] font-medium ${page <= 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-[#005CFF] text-white hover:bg-[#0047CC]'}`}
              >
                Previous
              </button>
              <button className="btn-hover-lift px-3 py-1.5 rounded-lg text-[13px] font-medium bg-[#005CFF] text-white">
                {page}
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
                className={`px-3 py-1.5 rounded-lg text-[13px] font-medium ${page >= totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-[#005CFF] text-white hover:bg-[#0047CC]'}`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
