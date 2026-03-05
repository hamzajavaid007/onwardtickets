'use client';

import { useState, useEffect, useCallback } from 'react';

interface Affiliate {
  _id: string;
  affiliateId: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  platform: string;
  audience: string;
  promotion: string;
  bankDetails: string;
  status: 'pending' | 'approved' | 'rejected';
  referralCode: string;
  commissionRate: number;
  createdAt: string;
}

export default function AdminAffiliatesPage() {
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [viewAffiliate, setViewAffiliate] = useState<Affiliate | null>(null);

  const fetchAffiliates = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter !== 'all') params.set('status', filter);
      if (search) params.set('search', search);
      const res = await fetch(`/api/affiliates?${params}`);
      const data = await res.json();
      if (data.success) setAffiliates(data.data);
    } catch {
      console.error('Failed to fetch affiliates');
    } finally {
      setLoading(false);
    }
  }, [filter, search]);

  useEffect(() => {
    fetchAffiliates();
  }, [fetchAffiliates]);

  const updateStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      const res = await fetch(`/api/affiliates/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        setAffiliates(prev => prev.map(a => a._id === id ? { ...a, status } : a));
        if (viewAffiliate?._id === id) setViewAffiliate({ ...viewAffiliate, status });
      }
    } catch {
      console.error('Failed to update affiliate');
    }
  };

  const deleteAffiliate = async (id: string) => {
    if (!confirm('Are you sure you want to delete this affiliate?')) return;
    try {
      const res = await fetch(`/api/affiliates/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setAffiliates(prev => prev.filter(a => a._id !== id));
        if (viewAffiliate?._id === id) setViewAffiliate(null);
      }
    } catch {
      console.error('Failed to delete affiliate');
    }
  };

  const counts = {
    all: affiliates.length,
    pending: affiliates.filter(a => a.status === 'pending').length,
    approved: affiliates.filter(a => a.status === 'approved').length,
    rejected: affiliates.filter(a => a.status === 'rejected').length,
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'pending': return { bg: '#FEF3C7', text: '#D97706' };
      case 'approved': return { bg: '#D1FAE5', text: '#059669' };
      case 'rejected': return { bg: '#FEE2E2', text: '#DC2626' };
      default: return { bg: '#F1F5F9', text: '#64748B' };
    }
  };

  const platformIcon = (platform: string) => {
    switch (platform) {
      case 'Blog': return '🌐';
      case 'YouTube': return '▶️';
      case 'Social Media': return '📱';
      case 'Forum': return '💬';
      case 'Email List': return '📧';
      case 'Visa Consultant': return '✈️';
      default: return '📌';
    }
  };

  return (
    <div className="btn-hover-lift space-y-6">
      {/* Header */}
      <div className="btn-hover-lift flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="btn-hover-lift text-[22px] font-bold text-[#0B1437]">Affiliates</h1>
          <p className="btn-hover-lift text-[14px] text-gray-500 mt-1">Manage affiliate program applications</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="btn-hover-lift grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Affiliates', value: counts.all, color: '#2979FF', icon: '👥' },
          { label: 'Pending Review', value: counts.pending, color: '#D97706', icon: '⏳' },
          { label: 'Approved', value: counts.approved, color: '#059669', icon: '✅' },
          { label: 'Rejected', value: counts.rejected, color: '#DC2626', icon: '❌' },
        ].map((stat) => (
          <div key={stat.label} className="btn-hover-lift bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="btn-hover-lift flex items-center justify-between mb-3">
              <span className="btn-hover-lift text-[24px]">{stat.icon}</span>
              <span className="btn-hover-lift text-[28px] font-bold" style={{ color: stat.color }}>{stat.value}</span>
            </div>
            <p className="btn-hover-lift text-[13px] text-gray-500 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="btn-hover-lift flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="btn-hover-lift flex items-center gap-1 bg-white rounded-2xl p-1.5 shadow-sm border border-gray-100 overflow-x-auto">
          {['all', 'pending', 'approved', 'rejected'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-[13px] font-medium transition-all capitalize ${
                filter === f
                  ? 'bg-[#2979FF] text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {f} {counts[f as keyof typeof counts] > 0 && `(${counts[f as keyof typeof counts]})`}
            </button>
          ))}
        </div>
        <div className="btn-hover-lift relative flex-1 w-full sm:max-w-[300px]">
          <svg className="btn-hover-lift absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search affiliates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="btn-hover-lift w-full pl-9 pr-4 py-2.5 bg-white rounded-xl text-[13px] border border-gray-200 focus:border-[#2979FF] focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Table */}
      <div className="btn-hover-lift bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="btn-hover-lift flex items-center justify-center py-20">
            <svg className="btn-hover-lift animate-spin w-6 h-6 text-[#2979FF]" fill="none" viewBox="0 0 24 24">
              <circle className="btn-hover-lift opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="btn-hover-lift opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
        ) : affiliates.length === 0 ? (
          <div className="btn-hover-lift text-center py-20">
            <p className="btn-hover-lift text-[40px] mb-3">📋</p>
            <p className="btn-hover-lift text-[15px] font-medium text-gray-500">No affiliate applications yet</p>
            <p className="btn-hover-lift text-[13px] text-gray-400 mt-1">Applications will appear here when people apply</p>
          </div>
        ) : (
          <div className="btn-hover-lift overflow-x-auto">
            <table className="btn-hover-lift w-full">
              <thead>
                <tr className="btn-hover-lift bg-[#F8FAFC]">
                  <th className="btn-hover-lift text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider px-3 sm:px-6 py-3.5 whitespace-nowrap">ID</th>
                  <th className="btn-hover-lift text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider px-3 sm:px-6 py-3.5 whitespace-nowrap">Applicant</th>
                  <th className="btn-hover-lift text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider px-3 sm:px-6 py-3.5 whitespace-nowrap">Platform</th>
                  <th className="btn-hover-lift text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider px-3 sm:px-6 py-3.5 whitespace-nowrap">Username</th>
                  <th className="btn-hover-lift text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider px-3 sm:px-6 py-3.5 whitespace-nowrap">Status</th>
                  <th className="btn-hover-lift text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider px-3 sm:px-6 py-3.5 whitespace-nowrap">Applied</th>
                  <th className="btn-hover-lift text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider px-3 sm:px-6 py-3.5 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="btn-hover-lift divide-y divide-gray-50">
                {affiliates.map((affiliate) => {
                  const sc = statusColor(affiliate.status);
                  return (
                    <tr key={affiliate._id} className="btn-hover-lift hover:bg-[#F8FAFC] transition-colors">
                      <td className="btn-hover-lift px-3 sm:px-6 py-4">
                        <span className="btn-hover-lift text-[13px] font-mono font-bold text-[#2979FF]">#{affiliate.affiliateId}</span>
                      </td>
                      <td className="btn-hover-lift px-3 sm:px-6 py-4">
                        <button onClick={() => setViewAffiliate(affiliate)} className="btn-hover-lift text-left">
                          <div className="btn-hover-lift flex items-center gap-3">
                            <div className="btn-hover-lift w-9 h-9 rounded-full bg-gradient-to-br from-[#2979FF] to-[#5ec5dc] flex items-center justify-center text-white text-[12px] font-bold flex-shrink-0">
                              {affiliate.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                            </div>
                            <div>
                              <div className="btn-hover-lift text-[13px] font-medium text-[#0B1437]">{affiliate.name}</div>
                              <div className="btn-hover-lift text-[12px] text-gray-400">{affiliate.email}</div>
                            </div>
                          </div>
                        </button>
                      </td>
                      <td className="btn-hover-lift px-3 sm:px-6 py-4">
                        <span className="btn-hover-lift text-[13px] text-gray-700">
                          {platformIcon(affiliate.platform)} {affiliate.platform}
                        </span>
                      </td>
                      <td className="btn-hover-lift px-3 sm:px-6 py-4">
                        <code className="btn-hover-lift text-[12px] bg-gray-100 px-2 py-1 rounded font-mono">{affiliate.referralCode}</code>
                      </td>
                      <td className="btn-hover-lift px-3 sm:px-6 py-4">
                        <span
                          className="btn-hover-lift text-[11px] font-semibold px-2.5 py-1 rounded-full capitalize"
                          style={{ background: sc.bg, color: sc.text }}
                        >
                          {affiliate.status}
                        </span>
                      </td>
                      <td className="btn-hover-lift px-3 sm:px-6 py-4 text-[13px] text-gray-500 whitespace-nowrap">
                        {new Date(affiliate.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="btn-hover-lift px-3 sm:px-6 py-4">
                        <div className="btn-hover-lift flex items-center gap-1">
                          <button
                            onClick={() => setViewAffiliate(affiliate)}
                            className="btn-hover-lift p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-[#2979FF]"
                            title="View Details"
                          >
                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          {affiliate.status === 'pending' && (
                            <>
                              <button
                                onClick={() => updateStatus(affiliate._id, 'approved')}
                                className="btn-hover-lift p-1.5 rounded-lg hover:bg-emerald-50 transition-colors text-gray-400 hover:text-emerald-600"
                                title="Approve"
                              >
                                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              </button>
                              <button
                                onClick={() => updateStatus(affiliate._id, 'rejected')}
                                className="btn-hover-lift p-1.5 rounded-lg hover:bg-red-50 transition-colors text-gray-400 hover:text-red-500"
                                title="Reject"
                              >
                                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => deleteAffiliate(affiliate._id)}
                            className="btn-hover-lift p-1.5 rounded-lg hover:bg-red-50 transition-colors text-gray-400 hover:text-red-500"
                            title="Delete"
                          >
                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* View Affiliate Modal */}
      {viewAffiliate && (
        <div className="btn-hover-lift fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4">
          <div className="btn-hover-lift bg-white rounded-2xl shadow-2xl w-full max-w-[600px] max-h-[90vh] overflow-y-auto mx-2 sm:mx-0">
            {/* Header */}
            <div className="btn-hover-lift flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-100 sticky top-0 bg-white z-10">
              <div className="btn-hover-lift flex items-center gap-3">
                <div className="btn-hover-lift w-11 h-11 rounded-full bg-gradient-to-br from-[#2979FF] to-[#5ec5dc] flex items-center justify-center text-white text-[14px] font-bold">
                  {viewAffiliate.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                </div>
                <div>
                  <h3 className="btn-hover-lift text-[16px] font-semibold text-[#0B1437]">{viewAffiliate.name}</h3>
                  <span
                    className="btn-hover-lift text-[11px] font-semibold px-2 py-0.5 rounded-full capitalize"
                    style={{ background: statusColor(viewAffiliate.status).bg, color: statusColor(viewAffiliate.status).text }}
                  >
                    {viewAffiliate.status}
                  </span>
                </div>
              </div>
              <button onClick={() => setViewAffiliate(null)} className="btn-hover-lift p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="btn-hover-lift p-4 sm:p-6 space-y-5">
              <div className="btn-hover-lift grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="btn-hover-lift text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Email</p>
                  <a href={`mailto:${viewAffiliate.email}`} className="btn-hover-lift text-[13px] text-[#2979FF] font-medium">{viewAffiliate.email}</a>
                </div>
                <div>
                  <p className="btn-hover-lift text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Phone</p>
                  <p className="btn-hover-lift text-[13px] text-[#0B1437] font-medium">{viewAffiliate.phone}</p>
                </div>
                <div>
                  <p className="btn-hover-lift text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Platform</p>
                  <p className="btn-hover-lift text-[13px] text-[#0B1437] font-medium">{platformIcon(viewAffiliate.platform)} {viewAffiliate.platform}</p>
                </div>
                <div>
                  <p className="btn-hover-lift text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Audience</p>
                  <p className="btn-hover-lift text-[13px] text-[#0B1437] font-medium">{viewAffiliate.audience || 'Not specified'}</p>
                </div>
                <div>
                  <p className="btn-hover-lift text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Affiliate ID</p>
                  <p className="btn-hover-lift text-[13px] text-[#2979FF] font-mono font-bold">#{viewAffiliate.affiliateId}</p>
                </div>
                <div>
                  <p className="btn-hover-lift text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Username</p>
                  <code className="btn-hover-lift text-[13px] bg-gray-100 px-2 py-1 rounded font-mono">{viewAffiliate.referralCode}</code>
                </div>
                <div>
                  <p className="btn-hover-lift text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Commission Rate</p>
                  <p className="btn-hover-lift text-[13px] text-[#0B1437] font-medium">{viewAffiliate.commissionRate}%</p>
                </div>
                <div>
                  <p className="btn-hover-lift text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Applied On</p>
                  <p className="btn-hover-lift text-[13px] text-[#0B1437] font-medium">
                    {new Date(viewAffiliate.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>

              {viewAffiliate.website && (
                <div>
                  <p className="btn-hover-lift text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Website</p>
                  <a href={viewAffiliate.website} target="_blank" rel="noopener noreferrer" className="btn-hover-lift text-[13px] text-[#2979FF] font-medium underline">{viewAffiliate.website}</a>
                </div>
              )}

              {viewAffiliate.promotion && (
                <div>
                  <p className="btn-hover-lift text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Promotion Strategy</p>
                  <p className="btn-hover-lift text-[13px] text-[#0B1437] leading-relaxed bg-[#F8FAFC] p-3 rounded-xl">{viewAffiliate.promotion}</p>
                </div>
              )}

              {viewAffiliate.bankDetails && (
                <div>
                  <p className="btn-hover-lift text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Bank Details</p>
                  <p className="btn-hover-lift text-[13px] text-[#0B1437] leading-relaxed bg-[#F8FAFC] p-3 rounded-xl whitespace-pre-wrap">{viewAffiliate.bankDetails}</p>
                </div>
              )}

              {/* Referral Link */}
              {viewAffiliate.status === 'approved' && (
                <div className="btn-hover-lift bg-[#F0F4F8] rounded-xl p-4">
                  <p className="btn-hover-lift text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Affiliate Referral Link</p>
                  <div className="btn-hover-lift flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <code className="btn-hover-lift flex-1 text-[11px] sm:text-[12px] bg-white px-3 py-2 rounded-lg font-mono text-[#2979FF] border border-gray-200 truncate">
                      https://onwardtickets.com/?ref={viewAffiliate.affiliateId}
                    </code>
                    <button
                      onClick={() => navigator.clipboard.writeText(`https://onwardtickets.com/?ref=${viewAffiliate.affiliateId}`)}
                      className="btn-hover-lift px-3 py-2 bg-[#2979FF] text-white text-[12px] font-medium rounded-lg hover:bg-[#1565C0] transition-colors flex-shrink-0"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="btn-hover-lift flex flex-wrap items-center justify-end gap-3 px-4 sm:px-6 py-4 border-t border-gray-100 bg-[#F8FAFC] sticky bottom-0">
              {viewAffiliate.status === 'pending' && (
                <>
                  <button
                    onClick={() => updateStatus(viewAffiliate._id, 'rejected')}
                    className="btn-hover-lift px-5 py-2 rounded-xl text-[13px] font-medium text-red-500 hover:bg-red-50 transition-colors border border-red-200"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => updateStatus(viewAffiliate._id, 'approved')}
                    className="btn-hover-lift px-5 py-2 rounded-xl text-[13px] font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
                  >
                    Approve Application
                  </button>
                </>
              )}
              {viewAffiliate.status === 'rejected' && (
                <button
                  onClick={() => updateStatus(viewAffiliate._id, 'approved')}
                  className="btn-hover-lift px-5 py-2 rounded-xl text-[13px] font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
                >
                  Approve
                </button>
              )}
              {viewAffiliate.status === 'approved' && (
                <button
                  onClick={() => updateStatus(viewAffiliate._id, 'rejected')}
                  className="btn-hover-lift px-5 py-2 rounded-xl text-[13px] font-medium text-red-500 hover:bg-red-50 transition-colors border border-red-200"
                >
                  Revoke Access
                </button>
              )}
              <button
                onClick={() => setViewAffiliate(null)}
                className="btn-hover-lift px-5 py-2 rounded-xl text-[13px] font-medium text-gray-500 hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
