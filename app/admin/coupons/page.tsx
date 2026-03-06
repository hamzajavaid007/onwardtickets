'use client';

import { useState, useEffect } from 'react';

interface Coupon {
  _id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  maxUses: number;
  usedCount: number;
  expiresAt: string | null;
  isActive: boolean;
  services: string[];
  createdAt: string;
}

const serviceOptions = [
  { key: 'flight-itinerary', label: 'Flight Itinerary' },
  { key: 'hotel-reservation', label: 'Hotel Reservation' },
  { key: 'travel-plan', label: 'Travel Plan' },
  { key: 'cover-letter', label: 'Cover Letter' },
  // { key: 'visa-essentials-package', label: 'Visa Essentials Package' },
  // { key: 'visa-supporting-documents', label: 'Visa Supporting Documents' },
  // { key: 'visa-form-filling', label: 'Visa Form Filling' },
  { key: 'ph-buy-dummy-ticket', label: 'PH Dummy Ticket' },
  { key: 'expert-consultant', label: 'Expert Consultant' },
];

const defaultForm = {
  code: '',
  discountType: 'percentage' as 'percentage' | 'fixed',
  discountValue: 10,
  maxUses: 0,
  expiresAt: '',
  isActive: true,
  services: [] as string[],
};

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(defaultForm);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchCoupons = async () => {
    try {
      const res = await fetch('/api/coupons');
      const data = await res.json();
      if (data.success) setCoupons(data.data);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCoupons(); }, []);

  const handleSave = async () => {
    if (!form.code.trim()) { setError('Coupon code is required'); return; }
    if (form.discountValue <= 0) { setError('Discount value must be greater than 0'); return; }
    if (form.discountType === 'percentage' && form.discountValue > 100) { setError('Percentage cannot exceed 100'); return; }

    setSaving(true);
    setError('');

    try {
      const url = editingId ? `/api/coupons/${editingId}` : '/api/coupons';
      const method = editingId ? 'PATCH' : 'POST';

      const body = {
        ...form,
        expiresAt: form.expiresAt || null,
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (!data.success) throw new Error(data.error);

      setShowModal(false);
      setEditingId(null);
      setForm(defaultForm);
      fetchCoupons();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save coupon');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (coupon: Coupon) => {
    setEditingId(coupon._id);
    setForm({
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      maxUses: coupon.maxUses,
      expiresAt: coupon.expiresAt ? coupon.expiresAt.split('T')[0] : '',
      isActive: coupon.isActive,
      services: coupon.services,
    });
    setError('');
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this coupon?')) return;
    try {
      await fetch(`/api/coupons/${id}`, { method: 'DELETE' });
      fetchCoupons();
    } catch {
      // ignore
    }
  };

  const handleToggle = async (coupon: Coupon) => {
    try {
      await fetch(`/api/coupons/${coupon._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !coupon.isActive }),
      });
      fetchCoupons();
    } catch {
      // ignore
    }
  };

  const toggleService = (key: string) => {
    setForm(prev => ({
      ...prev,
      services: prev.services.includes(key)
        ? prev.services.filter(s => s !== key)
        : [...prev.services, key],
    }));
  };

  const activeCoupons = coupons.filter(c => c.isActive);
  const expiredCoupons = coupons.filter(c => c.expiresAt && new Date(c.expiresAt) < new Date());
  const totalUses = coupons.reduce((sum, c) => sum + c.usedCount, 0);

  const inputClass = 'w-full px-4 py-2.5 bg-[#F8FAFC] rounded-xl text-[14px] border border-gray-200 focus:border-[#005CFF] focus:outline-none transition-colors';

  return (
    <div className="btn-hover-lift space-y-6">
      {/* Header */}
      <div className="btn-hover-lift flex items-center justify-between">
        <div>
          <h1 className="btn-hover-lift text-[22px] font-bold text-[#0B1437]">Coupons</h1>
          <p className="btn-hover-lift text-[14px] text-gray-500 mt-1">Manage discount codes for your services</p>
        </div>
        <button
          onClick={() => { setEditingId(null); setForm(defaultForm); setError(''); setShowModal(true); }}
          className="btn-hover-lift flex items-center gap-2 bg-[#005CFF] hover:bg-[#0047CC] text-white px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-colors"
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Create Coupon
        </button>
      </div>

      {/* Stats */}
      <div className="btn-hover-lift grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Coupons', value: coupons.length, color: '#005CFF' },
          { label: 'Active', value: activeCoupons.length, color: '#059669' },
          { label: 'Expired', value: expiredCoupons.length, color: '#DC2626' },
          { label: 'Total Uses', value: totalUses, color: '#7C3AED' },
        ].map((stat) => (
          <div key={stat.label} className="btn-hover-lift bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <p className="btn-hover-lift text-[12px] text-gray-500 font-medium uppercase tracking-wider">{stat.label}</p>
            <p className="btn-hover-lift text-[28px] font-bold mt-1" style={{ color: stat.color }}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="btn-hover-lift bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="btn-hover-lift overflow-x-auto">
          <table className="btn-hover-lift w-full">
            <thead>
              <tr className="btn-hover-lift bg-[#F8FAFC]">
                <th className="btn-hover-lift text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3.5">Code</th>
                <th className="btn-hover-lift text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3.5">Discount</th>
                <th className="btn-hover-lift text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3.5">Uses</th>
                <th className="btn-hover-lift text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3.5">Expires</th>
                <th className="btn-hover-lift text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3.5">Services</th>
                <th className="btn-hover-lift text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3.5">Status</th>
                <th className="btn-hover-lift text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3.5">Actions</th>
              </tr>
            </thead>
            <tbody className="btn-hover-lift divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={7} className="btn-hover-lift px-6 py-12 text-center text-[14px] text-gray-400">Loading coupons...</td></tr>
              ) : coupons.length === 0 ? (
                <tr><td colSpan={7} className="btn-hover-lift px-6 py-12 text-center text-[14px] text-gray-400">No coupons yet. Create your first coupon.</td></tr>
              ) : coupons.map((coupon) => {
                const isExpired = coupon.expiresAt && new Date(coupon.expiresAt) < new Date();
                const isMaxed = coupon.maxUses > 0 && coupon.usedCount >= coupon.maxUses;
                return (
                  <tr key={coupon._id} className="btn-hover-lift hover:bg-[#F8FAFC] transition-colors">
                    <td className="btn-hover-lift px-6 py-4">
                      <code className="btn-hover-lift text-[14px] font-mono font-bold text-[#005CFF] bg-[#EFF6FF] px-2.5 py-1 rounded-lg">{coupon.code}</code>
                    </td>
                    <td className="btn-hover-lift px-6 py-4 text-[14px] font-semibold text-[#0B1437]">
                      {coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : `£${coupon.discountValue.toFixed(2)}`}
                    </td>
                    <td className="btn-hover-lift px-6 py-4 text-[13px] text-gray-600">
                      {coupon.usedCount}{coupon.maxUses > 0 ? ` / ${coupon.maxUses}` : ' / unlimited'}
                    </td>
                    <td className="btn-hover-lift px-6 py-4 text-[13px] text-gray-600">
                      {coupon.expiresAt
                        ? new Date(coupon.expiresAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                        : 'Never'
                      }
                    </td>
                    <td className="btn-hover-lift px-6 py-4 text-[12px] text-gray-500">
                      {coupon.services.length === 0 ? 'All services' : `${coupon.services.length} service(s)`}
                    </td>
                    <td className="btn-hover-lift px-6 py-4">
                      <button
                        onClick={() => handleToggle(coupon)}
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                          !coupon.isActive ? 'bg-gray-100 text-gray-500' :
                          isExpired ? 'bg-red-50 text-red-600' :
                          isMaxed ? 'bg-amber-50 text-amber-600' :
                          'bg-emerald-50 text-emerald-600'
                        }`}
                      >
                        {!coupon.isActive ? 'Inactive' : isExpired ? 'Expired' : isMaxed ? 'Maxed Out' : 'Active'}
                      </button>
                    </td>
                    <td className="btn-hover-lift px-6 py-4">
                      <div className="btn-hover-lift flex items-center gap-2">
                        <button onClick={() => handleEdit(coupon)} className="btn-hover-lift p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-[#005CFF]" title="Edit">
                          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button onClick={() => handleDelete(coupon._id)} className="btn-hover-lift p-1.5 rounded-lg hover:bg-red-50 transition-colors text-gray-400 hover:text-red-500" title="Delete">
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
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="btn-hover-lift fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4">
          <div className="btn-hover-lift bg-white rounded-2xl shadow-2xl w-full max-w-[560px] overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="btn-hover-lift flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h3 className="btn-hover-lift text-[16px] font-semibold text-[#0B1437]">{editingId ? 'Edit Coupon' : 'Create Coupon'}</h3>
              <button onClick={() => setShowModal(false)} className="btn-hover-lift p-1 rounded-lg hover:bg-gray-100 text-gray-400">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="btn-hover-lift p-6 space-y-5">
              {error && (
                <div className="btn-hover-lift bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-[13px]">{error}</div>
              )}

              {/* Code */}
              <div>
                <label className="btn-hover-lift block text-[13px] font-medium text-gray-600 mb-1.5">Coupon Code</label>
                <input
                  type="text"
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                  placeholder="e.g. SAVE20"
                  className={inputClass + ' font-mono uppercase'}
                />
              </div>

              {/* Discount Type + Value */}
              <div className="btn-hover-lift grid grid-cols-2 gap-4">
                <div>
                  <label className="btn-hover-lift block text-[13px] font-medium text-gray-600 mb-1.5">Discount Type</label>
                  <select
                    value={form.discountType}
                    onChange={(e) => setForm({ ...form, discountType: e.target.value as 'percentage' | 'fixed' })}
                    className={inputClass + ' appearance-none'}
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (£)</option>
                  </select>
                </div>
                <div>
                  <label className="btn-hover-lift block text-[13px] font-medium text-gray-600 mb-1.5">
                    {form.discountType === 'percentage' ? 'Percentage Off' : 'Amount Off (£)'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    max={form.discountType === 'percentage' ? 100 : undefined}
                    step={form.discountType === 'percentage' ? 1 : 0.01}
                    value={form.discountValue}
                    onChange={(e) => setForm({ ...form, discountValue: parseFloat(e.target.value) || 0 })}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Max Uses + Expiry */}
              <div className="btn-hover-lift grid grid-cols-2 gap-4">
                <div>
                  <label className="btn-hover-lift block text-[13px] font-medium text-gray-600 mb-1.5">Max Uses (0 = unlimited)</label>
                  <input
                    type="number"
                    min="0"
                    value={form.maxUses}
                    onChange={(e) => setForm({ ...form, maxUses: parseInt(e.target.value) || 0 })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="btn-hover-lift block text-[13px] font-medium text-gray-600 mb-1.5">Expiry Date (optional)</label>
                  <input
                    type="date"
                    value={form.expiresAt}
                    onChange={(e) => setForm({ ...form, expiresAt: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Services */}
              <div>
                <label className="btn-hover-lift block text-[13px] font-medium text-gray-600 mb-2">Applicable Services</label>
                <p className="btn-hover-lift text-[11px] text-gray-400 mb-3">Leave all unchecked to apply to all services</p>
                <div className="btn-hover-lift grid grid-cols-2 gap-2">
                  {serviceOptions.map((svc) => (
                    <label key={svc.key} className="btn-hover-lift flex items-center gap-2 text-[13px] text-gray-700 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg">
                      <input
                        type="checkbox"
                        checked={form.services.includes(svc.key)}
                        onChange={() => toggleService(svc.key)}
                        className="btn-hover-lift w-4 h-4 rounded border-gray-300 text-[#005CFF] focus:ring-[#005CFF]"
                      />
                      {svc.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Active Toggle */}
              <div className="btn-hover-lift flex items-center justify-between py-2">
                <div>
                  <div className="btn-hover-lift text-[13px] font-medium text-[#0B1437]">Active</div>
                  <div className="btn-hover-lift text-[12px] text-gray-400">Enable or disable this coupon</div>
                </div>
                <button
                  onClick={() => setForm({ ...form, isActive: !form.isActive })}
                  className={`relative w-11 h-6 rounded-full transition-colors ${form.isActive ? 'bg-[#005CFF]' : 'bg-gray-200'}`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.isActive ? 'left-[22px]' : 'left-0.5'}`} />
                </button>
              </div>
            </div>

            <div className="btn-hover-lift flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-[#F8FAFC]">
              <button
                onClick={() => setShowModal(false)}
                className="btn-hover-lift px-5 py-2 rounded-xl text-[13px] font-medium text-gray-500 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="btn-hover-lift bg-[#005CFF] hover:bg-[#0047CC] text-white px-5 py-2 rounded-xl text-[13px] font-semibold transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : editingId ? 'Update Coupon' : 'Create Coupon'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
