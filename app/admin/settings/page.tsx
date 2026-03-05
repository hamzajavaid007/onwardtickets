'use client';

import { useState, useEffect, useCallback } from 'react';

// ── Types ──────────────────────────────────────────────────────────────
interface Admin {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Admin' | 'Editor' | 'Viewer';
  avatar: string;
  status: 'active' | 'invited' | 'disabled';
  lastLogin: string;
}

interface ServicePricing {
  basePrice: number;
  urgentPrice: number;
  superfastPrice: number;
  multiCityPrice: number;
  extraTravelerPrice: number;
  extraRoomPrice: number;
  canadaVisaPrice: number;
  schengenVisaPrice: number;
  speedyServicePrice: number;
  currency: string;
}

// ── Service Config (display names + which fields are relevant) ─────────
const SERVICE_CONFIG: Record<string, { label: string; color: string; fields: (keyof ServicePricing)[] }> = {
  'flight-itinerary': {
    label: 'Flight Itinerary',
    color: '#3B82F6',
    fields: ['basePrice', 'urgentPrice', 'superfastPrice', 'multiCityPrice'],
  },
  'hotel-reservation': {
    label: 'Hotel Reservation',
    color: '#10B981',
    fields: ['basePrice', 'urgentPrice', 'superfastPrice', 'extraTravelerPrice', 'extraRoomPrice'],
  },
  'travel-plan': {
    label: 'Travel Plan',
    color: '#8B5CF6',
    fields: ['basePrice', 'urgentPrice', 'superfastPrice'],
  },
  'cover-letter': {
    label: 'Cover Letter',
    color: '#F59E0B',
    fields: ['basePrice', 'urgentPrice', 'superfastPrice'],
  },
  // 'visa-essentials-package': {
  //   label: 'Visa Essentials Package',
  //   color: '#EC4899',
  //   fields: ['basePrice', 'multiCityPrice', 'canadaVisaPrice', 'schengenVisaPrice', 'speedyServicePrice'],
  // },
  // 'visa-supporting-documents': {
  //   label: 'Visa Supporting Documents',
  //   color: '#14B8A6',
  //   fields: ['basePrice', 'multiCityPrice', 'speedyServicePrice'],
  // },
  // 'visa-application-form-filling': {
  //   label: 'Visa Application Form Filling',
  //   color: '#6366F1',
  //   fields: ['basePrice'],
  // },
  'hire-an-expert-visa-consultant': {
    label: 'Hire an Expert Visa Consultant',
    color: '#DC2626',
    fields: ['basePrice'],
  },
  'ph-buy-dummy-ticket': {
    label: 'PH Buy Dummy Ticket',
    color: '#EA580C',
    fields: ['basePrice', 'urgentPrice', 'superfastPrice', 'multiCityPrice'],
  },
};

const FIELD_LABELS: Record<string, string> = {
  basePrice: 'Base Price (per traveler)',
  urgentPrice: 'Urgent Service Add-on',
  superfastPrice: 'Super Fast Service Add-on',
  multiCityPrice: 'Multi-City Add-on',
  extraTravelerPrice: 'Extra Traveler Price',
  extraRoomPrice: 'Extra Room Price',
  canadaVisaPrice: 'Canada Visa Add-on',
  schengenVisaPrice: 'Schengen Visa Add-on',
  speedyServicePrice: 'Speedy Service Add-on',
};

// ── Mock Data ──────────────────────────────────────────────────────────
const initialProfile = {
  firstName: 'Hamza',
  lastName: 'Khan',
  email: 'admin@onwardtickets.com',
  phone: '+44 77561 525115',
  role: 'Super Admin' as const,
  timezone: 'Europe/London',
  language: 'English',
  avatar: 'HK',
  company: 'OnwardTickets',
  joined: 'January 2024',
};

const teamMembers: Admin[] = [
  { id: '1', name: 'Hamza Khan', email: 'admin@onwardtickets.com', role: 'Super Admin', avatar: 'HK', status: 'active', lastLogin: '19 Feb 2026, 3:45 PM' },
  { id: '2', name: 'Sarah Ahmed', email: 'sarah@onwardtickets.com', role: 'Admin', avatar: 'SA', status: 'active', lastLogin: '19 Feb 2026, 1:20 PM' },
  { id: '3', name: 'James Wilson', email: 'james@onwardtickets.com', role: 'Editor', avatar: 'JW', status: 'active', lastLogin: '18 Feb 2026, 5:10 PM' },
  { id: '4', name: 'Maria Lopez', email: 'maria@onwardtickets.com', role: 'Viewer', avatar: 'ML', status: 'invited', lastLogin: 'Never' },
];

const roleColors = {
  'Super Admin': { bg: '#FEF2F2', text: '#DC2626', border: '#FECACA' },
  Admin: { bg: '#EFF6FF', text: '#2563EB', border: '#BFDBFE' },
  Editor: { bg: '#F0FDF4', text: '#16A34A', border: '#BBF7D0' },
  Viewer: { bg: '#F5F3FF', text: '#7C3AED', border: '#DDD6FE' },
};

const statusColors = {
  active: { bg: '#ECFDF5', text: '#059669' },
  invited: { bg: '#FFFBEB', text: '#D97706' },
  disabled: { bg: '#F1F5F9', text: '#64748B' },
};

// ── Tabs ───────────────────────────────────────────────────────────────
type Tab = 'profile' | 'team' | 'security' | 'notifications' | 'pricing' | 'services';

interface ServiceEntry {
  label: string;
  href: string;
  isActive: boolean;
  color: string;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [profile, setProfile] = useState(initialProfile);
  const [showAddModal, setShowAddModal] = useState(false);
  const [team, setTeam] = useState(teamMembers);
  const [newMember, setNewMember] = useState({ name: '', email: '', role: 'Viewer' as Admin['role'] });
  const [inviteLoading, setInviteLoading] = useState(false);
  const [inviteError, setInviteError] = useState('');
  const [saved, setSaved] = useState(false);

  // Notifications state
  const [notifications, setNotifications] = useState({
    emailNewOrder: true,
    emailStatusChange: true,
    emailWeeklyReport: false,
    browserNewOrder: true,
    browserPayment: true,
    browserStatusChange: false,
  });

  // Pricing state
  const [pricing, setPricing] = useState<Record<string, ServicePricing>>({});
  const [pricingLoading, setPricingLoading] = useState(false);
  const [pricingSaving, setPricingSaving] = useState(false);
  const [pricingSaved, setPricingSaved] = useState(false);
  const [pricingError, setPricingError] = useState('');
  const [expandedService, setExpandedService] = useState<string | null>(null);

  // Services toggle state
  const [serviceConfig, setServiceConfig] = useState<Record<string, ServiceEntry>>({});
  const [servicesLoading, setServicesLoading] = useState(false);
  const [servicesSaving, setServicesSaving] = useState(false);
  const [servicesSaved, setServicesSaved] = useState(false);
  const [servicesError, setServicesError] = useState('');

  // Fetch pricing when pricing tab is activated
  const fetchPricing = useCallback(async () => {
    setPricingLoading(true);
    setPricingError('');
    try {
      const res = await fetch('/api/pricing');
      const data = await res.json();
      setPricing(data.services || {});
    } catch {
      setPricingError('Failed to load pricing data');
    } finally {
      setPricingLoading(false);
    }
  }, []);

  // Fetch services config
  const fetchServices = useCallback(async () => {
    setServicesLoading(true);
    setServicesError('');
    try {
      const res = await fetch('/api/services');
      const data = await res.json();
      setServiceConfig(data.services || {});
    } catch {
      setServicesError('Failed to load services');
    } finally {
      setServicesLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'pricing') {
      fetchPricing();
    }
    if (activeTab === 'services') {
      fetchServices();
    }
  }, [activeTab, fetchPricing, fetchServices]);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handlePricingSave = async () => {
    setPricingSaving(true);
    setPricingError('');
    try {
      const res = await fetch('/api/pricing', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ services: pricing }),
      });
      if (!res.ok) throw new Error('Failed to save');
      setPricingSaved(true);
      setTimeout(() => setPricingSaved(false), 2500);
    } catch {
      setPricingError('Failed to save pricing. Please try again.');
    } finally {
      setPricingSaving(false);
    }
  };

  const handleServicesSave = async () => {
    setServicesSaving(true);
    setServicesError('');
    try {
      const res = await fetch('/api/services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ services: serviceConfig }),
      });
      if (!res.ok) throw new Error('Failed to save');
      setServicesSaved(true);
      setTimeout(() => setServicesSaved(false), 2500);
    } catch {
      setServicesError('Failed to save services. Please try again.');
    } finally {
      setServicesSaving(false);
    }
  };

  const toggleServiceActive = (key: string) => {
    setServiceConfig((prev) => ({
      ...prev,
      [key]: { ...prev[key], isActive: !prev[key].isActive },
    }));
  };

  const updateServicePrice = (serviceKey: string, field: keyof ServicePricing, value: string) => {
    const numValue = parseFloat(value) || 0;
    setPricing((prev) => ({
      ...prev,
      [serviceKey]: {
        ...prev[serviceKey],
        [field]: numValue,
      },
    }));
  };

  const handleAddMember = async () => {
    if (!newMember.name || !newMember.email) return;

    setInviteLoading(true);
    setInviteError('');
    try {
      const res = await fetch('/api/admin/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMember),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Failed to send invite');

      const initials = newMember.name.split(' ').map((n) => n[0]).join('').toUpperCase();
      setTeam((prev) => ([
        ...prev,
        {
          id: String(Date.now()),
          name: newMember.name,
          email: newMember.email,
          role: newMember.role,
          avatar: initials,
          status: 'invited',
          lastLogin: 'Never',
        },
      ]));

      setNewMember({ name: '', email: '', role: 'Viewer' });
      setShowAddModal(false);
    } catch (err: unknown) {
      setInviteError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setInviteLoading(false);
    }
  };

  const handleRemoveMember = (id: string) => {
    setTeam(team.filter((m) => m.id !== id));
  };

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    {
      key: 'profile',
      label: 'Profile',
      icon: (
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      key: 'team',
      label: 'Team & Access',
      icon: (
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      key: 'security',
      label: 'Security',
      icon: (
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
    {
      key: 'notifications',
      label: 'Notifications',
      icon: (
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
    },
    {
      key: 'pricing',
      label: 'Pricing',
      icon: (
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      key: 'services',
      label: 'Services',
      icon: (
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      ),
    },
  ];

  return (
    <div className="btn-hover-lift space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="btn-hover-lift text-[22px] font-bold text-[#0B1437]">Settings</h1>
        <p className="btn-hover-lift text-[14px] text-gray-500 mt-1">Manage your profile, team access, and preferences</p>
      </div>

      {/* Tabs */}
      <div className="btn-hover-lift flex items-center gap-1 bg-white rounded-2xl p-1.5 shadow-sm border border-gray-100 w-fit max-w-full overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-medium transition-all whitespace-nowrap ${
              activeTab === tab.key
                ? 'bg-[#2979FF] text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* ═══════════ PROFILE TAB ═══════════ */}
      {activeTab === 'profile' && (
        <div className="btn-hover-lift grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="btn-hover-lift bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="btn-hover-lift h-24 bg-gradient-to-r from-[#2979FF] to-[#0052CC]" />
            <div className="btn-hover-lift px-6 pb-6 -mt-10">
              <div className="btn-hover-lift w-20 h-20 rounded-2xl bg-gradient-to-br from-[#2979FF] to-[#5ec5dc] flex items-center justify-center text-white text-[24px] font-bold border-4 border-white shadow-lg">
                {profile.avatar}
              </div>
              <h3 className="btn-hover-lift text-[18px] font-bold text-[#0B1437] mt-4">{profile.firstName} {profile.lastName}</h3>
              <p className="btn-hover-lift text-[13px] text-gray-500">{profile.email}</p>
              <span
                className="btn-hover-lift inline-block mt-2 text-[11px] font-semibold px-2.5 py-1 rounded-full"
                style={{ background: roleColors[profile.role].bg, color: roleColors[profile.role].text }}
              >
                {profile.role}
              </span>
              <div className="btn-hover-lift mt-5 pt-5 border-t border-gray-100 space-y-3">
                <div className="btn-hover-lift flex items-center gap-3 text-[13px]">
                  <svg className="btn-hover-lift text-gray-400" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="btn-hover-lift text-gray-700">{profile.phone}</span>
                </div>
                <div className="btn-hover-lift flex items-center gap-3 text-[13px]">
                  <svg className="btn-hover-lift text-gray-400" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className="btn-hover-lift text-gray-700">{profile.company}</span>
                </div>
                <div className="btn-hover-lift flex items-center gap-3 text-[13px]">
                  <svg className="btn-hover-lift text-gray-400" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="btn-hover-lift text-gray-700">Joined {profile.joined}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Profile Form */}
          <div className="btn-hover-lift xl:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="btn-hover-lift text-[16px] font-semibold text-[#0B1437] mb-6">Edit Profile</h3>
            <div className="btn-hover-lift grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="btn-hover-lift block text-[13px] font-medium text-gray-600 mb-1.5">First Name</label>
                <input
                  type="text"
                  value={profile.firstName}
                  onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                  className="btn-hover-lift w-full px-4 py-2.5 bg-[#F8FAFC] rounded-xl text-[14px] border border-gray-200 focus:border-[#2979FF] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="btn-hover-lift block text-[13px] font-medium text-gray-600 mb-1.5">Last Name</label>
                <input
                  type="text"
                  value={profile.lastName}
                  onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                  className="btn-hover-lift w-full px-4 py-2.5 bg-[#F8FAFC] rounded-xl text-[14px] border border-gray-200 focus:border-[#2979FF] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="btn-hover-lift block text-[13px] font-medium text-gray-600 mb-1.5">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="btn-hover-lift w-full px-4 py-2.5 bg-[#F8FAFC] rounded-xl text-[14px] border border-gray-200 focus:border-[#2979FF] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="btn-hover-lift block text-[13px] font-medium text-gray-600 mb-1.5">Phone</label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="btn-hover-lift w-full px-4 py-2.5 bg-[#F8FAFC] rounded-xl text-[14px] border border-gray-200 focus:border-[#2979FF] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="btn-hover-lift block text-[13px] font-medium text-gray-600 mb-1.5">Timezone</label>
                <select
                  value={profile.timezone}
                  onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
                  className="btn-hover-lift w-full px-4 py-2.5 bg-[#F8FAFC] rounded-xl text-[14px] border border-gray-200 focus:border-[#2979FF] focus:outline-none transition-colors appearance-none"
                >
                  <option value="Europe/London">Europe/London (GMT+0)</option>
                  <option value="America/New_York">America/New York (EST)</option>
                  <option value="Asia/Dubai">Asia/Dubai (GMT+4)</option>
                  <option value="Asia/Karachi">Asia/Karachi (GMT+5)</option>
                </select>
              </div>
              <div>
                <label className="btn-hover-lift block text-[13px] font-medium text-gray-600 mb-1.5">Language</label>
                <select
                  value={profile.language}
                  onChange={(e) => setProfile({ ...profile, language: e.target.value })}
                  className="btn-hover-lift w-full px-4 py-2.5 bg-[#F8FAFC] rounded-xl text-[14px] border border-gray-200 focus:border-[#2979FF] focus:outline-none transition-colors appearance-none"
                >
                  <option>English</option>
                  <option>Urdu</option>
                  <option>Arabic</option>
                  <option>Spanish</option>
                </select>
              </div>
            </div>
            <div className="btn-hover-lift flex items-center gap-3 mt-6 pt-5 border-t border-gray-100">
              <button
                onClick={handleSave}
                className="btn-hover-lift flex items-center gap-2 bg-[#2979FF] hover:bg-[#1565C0] text-white px-6 py-2.5 rounded-xl text-[13px] font-semibold transition-colors"
              >
                {saved ? (
                  <>
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Saved!
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
              <button className="btn-hover-lift px-6 py-2.5 rounded-xl text-[13px] font-medium text-gray-500 hover:bg-gray-50 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════ TEAM & ACCESS TAB ═══════════ */}
      {activeTab === 'team' && (
        <div className="btn-hover-lift space-y-6">
          {/* Header with Add button */}
          <div className="btn-hover-lift flex items-center justify-between">
            <div>
              <h3 className="btn-hover-lift text-[16px] font-semibold text-[#0B1437]">Team Members</h3>
              <p className="btn-hover-lift text-[13px] text-gray-500 mt-0.5">{team.length} members</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="btn-hover-lift flex items-center gap-2 bg-[#2979FF] hover:bg-[#1565C0] text-white px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-colors"
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add Admin
            </button>
          </div>

          {/* Role Permissions Info */}
          <div className="btn-hover-lift grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { role: 'Super Admin', desc: 'Full access. Can manage team, settings, and all data.', permissions: ['Everything'] },
              { role: 'Admin', desc: 'Can manage submissions and view reports.', permissions: ['Submissions', 'Reports', 'Export'] },
              { role: 'Editor', desc: 'Can view and update submission status.', permissions: ['View Submissions', 'Update Status'] },
              { role: 'Viewer', desc: 'Read-only access to dashboard and submissions.', permissions: ['View Dashboard', 'View Submissions'] },
            ].map((r) => {
              const colors = roleColors[r.role as keyof typeof roleColors];
              return (
                <div key={r.role} className="btn-hover-lift bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <span
                    className="btn-hover-lift inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full mb-3"
                    style={{ background: colors.bg, color: colors.text }}
                  >
                    {r.role}
                  </span>
                  <p className="btn-hover-lift text-[12px] text-gray-500 mb-3">{r.desc}</p>
                  <div className="btn-hover-lift space-y-1">
                    {r.permissions.map((p) => (
                      <div key={p} className="btn-hover-lift flex items-center gap-1.5 text-[11px] text-gray-600">
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke={colors.text} strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {p}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Team Table */}
          <div className="btn-hover-lift bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="btn-hover-lift overflow-x-auto">
              <table className="btn-hover-lift w-full">
                <thead>
                  <tr className="btn-hover-lift bg-[#F8FAFC]">
                    <th className="btn-hover-lift text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3.5">Member</th>
                    <th className="btn-hover-lift text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3.5">Role</th>
                    <th className="btn-hover-lift text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3.5">Status</th>
                    <th className="btn-hover-lift text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3.5">Last Login</th>
                    <th className="btn-hover-lift text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3.5">Actions</th>
                  </tr>
                </thead>
                <tbody className="btn-hover-lift divide-y divide-gray-50">
                  {team.map((member) => {
                    const rColor = roleColors[member.role];
                    const sColor = statusColors[member.status];
                    return (
                      <tr key={member.id} className="btn-hover-lift hover:bg-[#F8FAFC] transition-colors">
                        <td className="btn-hover-lift px-6 py-4">
                          <div className="btn-hover-lift flex items-center gap-3">
                            <div className="btn-hover-lift w-9 h-9 rounded-full bg-gradient-to-br from-[#2979FF] to-[#5ec5dc] flex items-center justify-center text-white text-[12px] font-bold flex-shrink-0">
                              {member.avatar}
                            </div>
                            <div>
                              <div className="btn-hover-lift text-[13px] font-medium text-[#0B1437]">{member.name}</div>
                              <div className="btn-hover-lift text-[12px] text-gray-400">{member.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="btn-hover-lift px-6 py-4">
                          <span
                            className="btn-hover-lift text-[11px] font-semibold px-2.5 py-1 rounded-full"
                            style={{ background: rColor.bg, color: rColor.text }}
                          >
                            {member.role}
                          </span>
                        </td>
                        <td className="btn-hover-lift px-6 py-4">
                          <span
                            className="btn-hover-lift text-[11px] font-medium px-2.5 py-1 rounded-full capitalize"
                            style={{ background: sColor.bg, color: sColor.text }}
                          >
                            {member.status}
                          </span>
                        </td>
                        <td className="btn-hover-lift px-6 py-4 text-[13px] text-gray-500">{member.lastLogin}</td>
                        <td className="btn-hover-lift px-6 py-4">
                          <div className="btn-hover-lift flex items-center gap-2">
                            <button className="btn-hover-lift p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-[#2979FF]" title="Edit">
                              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            {member.role !== 'Super Admin' && (
                              <button
                                onClick={() => handleRemoveMember(member.id)}
                                className="btn-hover-lift p-1.5 rounded-lg hover:bg-red-50 transition-colors text-gray-400 hover:text-red-500"
                                title="Remove"
                              >
                                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add Admin Modal */}
          {showAddModal && (
            <div className="btn-hover-lift fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4">
              <div className="btn-hover-lift bg-white rounded-2xl shadow-2xl w-full max-w-[480px] overflow-hidden">
                <div className="btn-hover-lift flex items-center justify-between px-6 py-5 border-b border-gray-100">
                  <h3 className="btn-hover-lift text-[16px] font-semibold text-[#0B1437]">Add New Admin</h3>
                  <button onClick={() => setShowAddModal(false)} className="btn-hover-lift p-1 rounded-lg hover:bg-gray-100 text-gray-400">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="btn-hover-lift p-6 space-y-4">
                  <div>
                    <label className="btn-hover-lift block text-[13px] font-medium text-gray-600 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      value={newMember.name}
                      onChange={(e) => { setNewMember({ ...newMember, name: e.target.value }); setInviteError(''); }}
                      placeholder="e.g. John Doe"
                      className="btn-hover-lift w-full px-4 py-2.5 bg-[#F8FAFC] rounded-xl text-[14px] border border-gray-200 focus:border-[#2979FF] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="btn-hover-lift block text-[13px] font-medium text-gray-600 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={newMember.email}
                      onChange={(e) => { setNewMember({ ...newMember, email: e.target.value }); setInviteError(''); }}
                      placeholder="e.g. john@onwardtickets.com"
                      className="btn-hover-lift w-full px-4 py-2.5 bg-[#F8FAFC] rounded-xl text-[14px] border border-gray-200 focus:border-[#2979FF] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="btn-hover-lift block text-[13px] font-medium text-gray-600 mb-1.5">Role</label>
                    <select
                      value={newMember.role}
                      onChange={(e) => { setNewMember({ ...newMember, role: e.target.value as Admin['role'] }); setInviteError(''); }}
                      className="btn-hover-lift w-full px-4 py-2.5 bg-[#F8FAFC] rounded-xl text-[14px] border border-gray-200 focus:border-[#2979FF] focus:outline-none appearance-none"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Editor">Editor</option>
                      <option value="Viewer">Viewer</option>
                    </select>
                    <p className="btn-hover-lift text-[11px] text-gray-400 mt-1.5">
                      {newMember.role === 'Admin' && 'Can manage submissions and view reports.'}
                      {newMember.role === 'Editor' && 'Can view and update submission status.'}
                      {newMember.role === 'Viewer' && 'Read-only access to dashboard and submissions.'}
                    </p>
                  </div>

                  {inviteError && (
                    <div className="btn-hover-lift bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-[13px]">
                      {inviteError}
                    </div>
                  )}
                </div>
                <div className="btn-hover-lift flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-[#F8FAFC]">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="btn-hover-lift px-5 py-2 rounded-xl text-[13px] font-medium text-gray-500 hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddMember}
                    disabled={inviteLoading || !newMember.name || !newMember.email}
                    className="btn-hover-lift flex items-center gap-2 bg-[#2979FF] hover:bg-[#1565C0] text-white px-5 py-2 rounded-xl text-[13px] font-semibold transition-colors"
                  >
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    {inviteLoading ? 'Sending...' : 'Send Invite'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══════════ SECURITY TAB ═══════════ */}
      {activeTab === 'security' && (
        <div className="btn-hover-lift grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Change Password */}
          <div className="btn-hover-lift bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="btn-hover-lift text-[16px] font-semibold text-[#0B1437] mb-5">Change Password</h3>
            <div className="btn-hover-lift space-y-4">
              <div>
                <label className="btn-hover-lift block text-[13px] font-medium text-gray-600 mb-1.5">Current Password</label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  className="btn-hover-lift w-full px-4 py-2.5 bg-[#F8FAFC] rounded-xl text-[14px] border border-gray-200 focus:border-[#2979FF] focus:outline-none"
                />
              </div>
              <div>
                <label className="btn-hover-lift block text-[13px] font-medium text-gray-600 mb-1.5">New Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="btn-hover-lift w-full px-4 py-2.5 bg-[#F8FAFC] rounded-xl text-[14px] border border-gray-200 focus:border-[#2979FF] focus:outline-none"
                />
              </div>
              <div>
                <label className="btn-hover-lift block text-[13px] font-medium text-gray-600 mb-1.5">Confirm New Password</label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="btn-hover-lift w-full px-4 py-2.5 bg-[#F8FAFC] rounded-xl text-[14px] border border-gray-200 focus:border-[#2979FF] focus:outline-none"
                />
              </div>
              <button className="btn-hover-lift bg-[#2979FF] hover:bg-[#1565C0] text-white px-6 py-2.5 rounded-xl text-[13px] font-semibold transition-colors mt-2">
                Update Password
              </button>
            </div>
          </div>

          {/* Login Sessions */}
          <div className="btn-hover-lift bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="btn-hover-lift text-[16px] font-semibold text-[#0B1437] mb-5">Active Sessions</h3>
            <div className="btn-hover-lift space-y-4">
              {[
                { device: 'Chrome on Windows', ip: '192.168.1.xxx', time: 'Current session', current: true },
                { device: 'Safari on iPhone', ip: '10.0.0.xxx', time: '2 hours ago', current: false },
                { device: 'Firefox on MacOS', ip: '172.16.0.xxx', time: '1 day ago', current: false },
              ].map((session, i) => (
                <div key={i} className="btn-hover-lift flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                  <div className="btn-hover-lift flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${session.current ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                    <div>
                      <div className="btn-hover-lift text-[13px] font-medium text-[#0B1437]">{session.device}</div>
                      <div className="btn-hover-lift text-[11px] text-gray-400">IP: {session.ip} &middot; {session.time}</div>
                    </div>
                  </div>
                  {!session.current && (
                    <button className="btn-hover-lift text-[12px] text-red-500 hover:text-red-600 font-medium">Revoke</button>
                  )}
                </div>
              ))}
            </div>
            <button className="btn-hover-lift mt-4 text-[13px] text-red-500 hover:text-red-600 font-medium">
              Revoke All Other Sessions
            </button>
          </div>

          {/* Two-Factor Auth */}
          <div className="btn-hover-lift xl:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="btn-hover-lift flex items-center justify-between">
              <div>
                <h3 className="btn-hover-lift text-[16px] font-semibold text-[#0B1437]">Two-Factor Authentication</h3>
                <p className="btn-hover-lift text-[13px] text-gray-500 mt-1">Add an extra layer of security to your account</p>
              </div>
              <button className="btn-hover-lift bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-colors">
                Enable 2FA
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════ NOTIFICATIONS TAB ═══════════ */}
      {activeTab === 'notifications' && (
        <div className="btn-hover-lift bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="btn-hover-lift text-[16px] font-semibold text-[#0B1437] mb-6">Notification Preferences</h3>

          <div className="btn-hover-lift space-y-8">
            {/* Email Notifications */}
            <div>
              <h4 className="btn-hover-lift text-[14px] font-semibold text-[#0B1437] mb-4 flex items-center gap-2">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Notifications
              </h4>
              <div className="btn-hover-lift space-y-4">
                {[
                  { key: 'emailNewOrder' as const, label: 'New order received', desc: 'Get notified when a customer places a new order' },
                  { key: 'emailStatusChange' as const, label: 'Order status changes', desc: 'When an order is completed or cancelled' },
                  { key: 'emailWeeklyReport' as const, label: 'Weekly sales report', desc: 'Summary of sales and submissions every Monday' },
                ].map((item) => (
                  <div key={item.key} className="btn-hover-lift flex items-center justify-between py-2">
                    <div>
                      <div className="btn-hover-lift text-[13px] font-medium text-[#0B1437]">{item.label}</div>
                      <div className="btn-hover-lift text-[12px] text-gray-400">{item.desc}</div>
                    </div>
                    <button
                      onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })}
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        notifications[item.key] ? 'bg-[#2979FF]' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                          notifications[item.key] ? 'left-[22px]' : 'left-0.5'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Browser Notifications */}
            <div className="btn-hover-lift pt-6 border-t border-gray-100">
              <h4 className="btn-hover-lift text-[14px] font-semibold text-[#0B1437] mb-4 flex items-center gap-2">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                Browser Notifications
              </h4>
              <div className="btn-hover-lift space-y-4">
                {[
                  { key: 'browserNewOrder' as const, label: 'New order alerts', desc: 'Real-time browser push for new orders' },
                  { key: 'browserPayment' as const, label: 'Payment confirmations', desc: 'When a payment is successfully processed' },
                  { key: 'browserStatusChange' as const, label: 'Status updates', desc: 'When submission status changes' },
                ].map((item) => (
                  <div key={item.key} className="btn-hover-lift flex items-center justify-between py-2">
                    <div>
                      <div className="btn-hover-lift text-[13px] font-medium text-[#0B1437]">{item.label}</div>
                      <div className="btn-hover-lift text-[12px] text-gray-400">{item.desc}</div>
                    </div>
                    <button
                      onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })}
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        notifications[item.key] ? 'bg-[#2979FF]' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                          notifications[item.key] ? 'left-[22px]' : 'left-0.5'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="btn-hover-lift mt-6 pt-5 border-t border-gray-100">
            <button
              onClick={handleSave}
              className="btn-hover-lift bg-[#2979FF] hover:bg-[#1565C0] text-white px-6 py-2.5 rounded-xl text-[13px] font-semibold transition-colors"
            >
              {saved ? 'Saved!' : 'Save Preferences'}
            </button>
          </div>
        </div>
      )}

      {/* ═══════════ PRICING TAB ═══════════ */}
      {activeTab === 'pricing' && (
        <div className="btn-hover-lift space-y-6">
          {/* Header */}
          <div className="btn-hover-lift flex items-center justify-between">
            <div>
              <h3 className="btn-hover-lift text-[16px] font-semibold text-[#0B1437]">Service Pricing</h3>
              <p className="btn-hover-lift text-[13px] text-gray-500 mt-0.5">Configure pricing for all booking services. Changes apply to future orders.</p>
            </div>
            <button
              onClick={handlePricingSave}
              disabled={pricingSaving}
              className="btn-hover-lift flex items-center gap-2 bg-[#2979FF] hover:bg-[#1565C0] disabled:opacity-60 text-white px-6 py-2.5 rounded-xl text-[13px] font-semibold transition-colors"
            >
              {pricingSaving ? (
                <>
                  <svg className="btn-hover-lift animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.42" strokeDashoffset="10" />
                  </svg>
                  Saving...
                </>
              ) : pricingSaved ? (
                <>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Saved!
                </>
              ) : (
                <>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  Save All Prices
                </>
              )}
            </button>
          </div>

          {/* Error Message */}
          {pricingError && (
            <div className="btn-hover-lift bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-[13px] flex items-center gap-2">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {pricingError}
            </div>
          )}

          {/* Loading State */}
          {pricingLoading ? (
            <div className="btn-hover-lift bg-white rounded-2xl p-12 shadow-sm border border-gray-100 flex flex-col items-center justify-center">
              <svg className="btn-hover-lift animate-spin text-[#2979FF] mb-3" width="32" height="32" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.42" strokeDashoffset="10" />
              </svg>
              <p className="btn-hover-lift text-[14px] text-gray-500">Loading pricing data...</p>
            </div>
          ) : (
            /* Service Cards */
            <div className="btn-hover-lift space-y-3">
              {Object.entries(SERVICE_CONFIG).map(([serviceKey, config]) => {
                const servicePricing = pricing[serviceKey];
                if (!servicePricing) return null;
                const isExpanded = expandedService === serviceKey;

                return (
                  <div key={serviceKey} className="btn-hover-lift bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Service Header - Clickable */}
                    <button
                      onClick={() => setExpandedService(isExpanded ? null : serviceKey)}
                      className="btn-hover-lift w-full flex items-center justify-between px-6 py-4 hover:bg-[#F8FAFC] transition-colors"
                    >
                      <div className="btn-hover-lift flex items-center gap-3">
                        <div className="btn-hover-lift w-3 h-3 rounded-full" style={{ background: config.color }} />
                        <span className="btn-hover-lift text-[14px] font-semibold text-[#0B1437]">{config.label}</span>
                        <span className="btn-hover-lift text-[12px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                          {servicePricing.currency}{servicePricing.basePrice.toFixed(2)} base
                        </span>
                      </div>
                      <svg
                        width="18"
                        height="18"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Expanded Fields */}
                    {isExpanded && (
                      <div className="btn-hover-lift px-6 pb-5 pt-1 border-t border-gray-100">
                        <div className="btn-hover-lift grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                          {config.fields.map((field) => (
                            <div key={field}>
                              <label className="btn-hover-lift block text-[12px] font-medium text-gray-500 mb-1.5">
                                {FIELD_LABELS[field]}
                              </label>
                              <div className="btn-hover-lift relative">
                                <span className="btn-hover-lift absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-gray-400 font-medium">
                                  {servicePricing.currency}
                                </span>
                                <input
                                  type="number"
                                  step="0.01"
                                  min="0"
                                  value={servicePricing[field] as number}
                                  onChange={(e) => updateServicePrice(serviceKey, field, e.target.value)}
                                  className="btn-hover-lift w-full pl-8 pr-4 py-2.5 bg-[#F8FAFC] rounded-xl text-[14px] border border-gray-200 focus:border-[#2979FF] focus:outline-none transition-colors"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                        {/* Currency selector for PH */}
                        {serviceKey === 'ph-buy-dummy-ticket' && (
                          <div className="btn-hover-lift mt-4 pt-4 border-t border-gray-50">
                            <div className="btn-hover-lift flex items-center gap-3">
                              <label className="btn-hover-lift text-[12px] font-medium text-gray-500">Currency:</label>
                              <select
                                value={servicePricing.currency}
                                onChange={(e) =>
                                  setPricing((prev) => ({
                                    ...prev,
                                    [serviceKey]: { ...prev[serviceKey], currency: e.target.value },
                                  }))
                                }
                                className="btn-hover-lift px-3 py-1.5 bg-[#F8FAFC] rounded-lg text-[13px] border border-gray-200 focus:border-[#2979FF] focus:outline-none appearance-none"
                              >
                                <option value="₱">₱ Philippine Peso</option>
                                <option value="£">£ British Pound</option>
                                <option value="$">$ US Dollar</option>
                              </select>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Info Note */}
          <div className="btn-hover-lift bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 flex items-start gap-3">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#3B82F6" strokeWidth={2} className="btn-hover-lift flex-shrink-0 mt-0.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="btn-hover-lift text-[13px] font-medium text-blue-800">How pricing works</p>
              <p className="btn-hover-lift text-[12px] text-blue-600 mt-1">
                Base price is multiplied by the number of travelers. Add-ons (urgent, multi-city, etc.) are added on top.
                Changes here will apply to all future orders. Existing orders retain their original pricing.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════ SERVICES TAB ═══════════ */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[16px] font-semibold text-[#0B1437]">Service Pages</h3>
              <p className="text-[13px] text-gray-500 mt-0.5">Toggle services on/off to show or hide them from the website navigation.</p>
            </div>
            <button
              onClick={handleServicesSave}
              disabled={servicesSaving}
              className="flex items-center gap-2 bg-[#2979FF] hover:bg-[#1565C0] disabled:opacity-60 text-white px-6 py-2.5 rounded-xl text-[13px] font-semibold transition-colors"
            >
              {servicesSaving ? (
                <>
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.42" strokeDashoffset="10" />
                  </svg>
                  Saving...
                </>
              ) : servicesSaved ? (
                <>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Saved!
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>

          {servicesError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-[13px] flex items-center gap-2">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {servicesError}
            </div>
          )}

          {servicesLoading ? (
            <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 flex flex-col items-center justify-center">
              <svg className="animate-spin text-[#2979FF] mb-3" width="32" height="32" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.42" strokeDashoffset="10" />
              </svg>
              <p className="text-[14px] text-gray-500">Loading services...</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="divide-y divide-gray-50">
                {Object.entries(serviceConfig).map(([key, service]) => (
                  <div key={key} className="flex items-center justify-between px-6 py-4 hover:bg-[#F8FAFC] transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ background: service.color }} />
                      <div>
                        <div className="text-[14px] font-medium text-[#0B1437]">{service.label}</div>
                        <div className="text-[12px] text-gray-400">{service.href}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-[12px] font-medium ${service.isActive ? 'text-emerald-600' : 'text-gray-400'}`}>
                        {service.isActive ? 'Active' : 'Inactive'}
                      </span>
                      <button
                        onClick={() => toggleServiceActive(key)}
                        className={`relative w-11 h-6 rounded-full transition-colors ${
                          service.isActive ? 'bg-emerald-500' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                            service.isActive ? 'left-[22px]' : 'left-0.5'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 flex items-start gap-3">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#3B82F6" strokeWidth={2} className="flex-shrink-0 mt-0.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-[13px] font-medium text-blue-800">How service toggling works</p>
              <p className="text-[12px] text-blue-600 mt-1">
                Toggling a service off hides it from the website navigation menu. The service page itself remains accessible via direct URL.
                Click &quot;Save Changes&quot; to apply your changes.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
