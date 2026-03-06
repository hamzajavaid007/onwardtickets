'use client';

import { useState, useEffect } from 'react';

interface AffiliateInfo {
  affiliateId: number;
  name: string;
  email: string;
  referralCode: string;
  commissionRate: number;
  joinedAt: string;
}

export default function AffiliateReferralPage() {
  const [affiliate, setAffiliate] = useState<AffiliateInfo | null>(null);
  const [copied, setCopied] = useState('');
  const [linkMode, setLinkMode] = useState<'id' | 'username'>('id');

  useEffect(() => {
    fetch('/api/affiliates/check')
      .then(res => res.json())
      .then(data => {
        if (data.authenticated) setAffiliate(data.affiliate);
      });
  }, []);

  if (!affiliate) return null;

  const baseUrl = 'https://onwardtickets.com';
  const ref = linkMode === 'id' ? String(affiliate.affiliateId) : affiliate.referralCode;

  const links = [
    { label: 'Homepage', url: `${baseUrl}/?ref=${ref}` },
    { label: 'Flight Itinerary', url: `${baseUrl}/flight-itinerary/?ref=${ref}` },
    { label: 'Hotel Reservation', url: `${baseUrl}/hotel-reservation/?ref=${ref}` },
    { label: 'Travel Plan', url: `${baseUrl}/travel-plan/?ref=${ref}` },
    // { label: 'Visa Assistant', url: `${baseUrl}/visa-assistant/?ref=${ref}` },
    { label: 'Cover Letter', url: `${baseUrl}/cover-letter/?ref=${ref}` },
    // { label: 'Visa Essentials Package', url: `${baseUrl}/visa-essentials-package/?ref=${ref}` },
    // { label: 'Visa Supporting Documents', url: `${baseUrl}/visa-supporting-documents/?ref=${ref}` },
  ];

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="btn-hover-lift space-y-6">
      {/* Header */}
      <div>
        <h2 className="btn-hover-lift text-[20px] font-bold text-[#0B1437]">Your Referral Links</h2>
        <p className="btn-hover-lift text-[14px] text-gray-500 mt-1">Use these links to promote specific services and earn commissions</p>
      </div>

      {/* Referral Info + Format Toggle */}
      <div className="btn-hover-lift bg-gradient-to-r from-[#005CFF] to-[#0052CC] rounded-2xl p-4 sm:p-6 text-white">
        <div className="btn-hover-lift flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div className="btn-hover-lift flex items-center gap-3">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
            <span className="btn-hover-lift text-[16px] font-semibold">Your Referral Info</span>
          </div>
          <div className="btn-hover-lift flex flex-wrap items-center gap-2">
            <span className="btn-hover-lift text-[12px] text-white/60">Link format:</span>
            <button
              onClick={() => setLinkMode('id')}
              className={`px-3 py-1 rounded-lg text-[12px] font-medium transition-all ${linkMode === 'id' ? 'bg-white text-[#005CFF]' : 'bg-white/10 text-white/80 hover:bg-white/20'}`}
            >
              ID ({affiliate.affiliateId})
            </button>
            <button
              onClick={() => setLinkMode('username')}
              className={`px-3 py-1 rounded-lg text-[12px] font-medium transition-all ${linkMode === 'username' ? 'bg-white text-[#005CFF]' : 'bg-white/10 text-white/80 hover:bg-white/20'}`}
            >
              Username ({affiliate.referralCode})
            </button>
          </div>
        </div>
        <div className="btn-hover-lift grid grid-cols-2 gap-4">
          <div className="btn-hover-lift bg-white/10 backdrop-blur rounded-xl px-4 py-3">
            <p className="btn-hover-lift text-[11px] text-white/60 uppercase tracking-wider mb-1">Affiliate ID</p>
            <p className="btn-hover-lift text-[20px] font-mono font-bold">{affiliate.affiliateId}</p>
          </div>
          <div className="btn-hover-lift bg-white/10 backdrop-blur rounded-xl px-4 py-3">
            <p className="btn-hover-lift text-[11px] text-white/60 uppercase tracking-wider mb-1">Username</p>
            <p className="btn-hover-lift text-[20px] font-mono font-bold">{affiliate.referralCode}</p>
          </div>
        </div>
      </div>

      {/* Service-specific links */}
      <div className="btn-hover-lift bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="btn-hover-lift px-6 py-4 border-b border-gray-100">
          <h3 className="btn-hover-lift text-[15px] font-semibold text-[#0B1437]">Service-Specific Links</h3>
          <p className="btn-hover-lift text-[12px] text-gray-400 mt-0.5">Link directly to specific services for better conversions</p>
        </div>
        <div className="btn-hover-lift divide-y divide-gray-50">
          {links.map((link) => (
            <div key={link.label} className="btn-hover-lift flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 py-3 sm:py-4 hover:bg-[#F8FAFC] transition-colors gap-2 sm:gap-4">
              <div className="btn-hover-lift min-w-0 flex-1">
                <p className="btn-hover-lift text-[13px] font-medium text-[#0B1437]">{link.label}</p>
                <p className="btn-hover-lift text-[11px] sm:text-[12px] text-gray-400 font-mono truncate">{link.url}</p>
              </div>
              <button
                onClick={() => copyToClipboard(link.url, link.label)}
                className={`px-4 py-2 rounded-lg text-[12px] font-medium transition-all flex-shrink-0 self-start sm:self-auto ${
                  copied === link.label
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-[#F0F4F8] text-[#005CFF] hover:bg-[#005CFF] hover:text-white'
                }`}
              >
                {copied === link.label ? 'Copied!' : 'Copy'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="btn-hover-lift bg-[#FEF3C7] rounded-2xl p-6 border border-[#FDE68A]">
        <h3 className="btn-hover-lift text-[14px] font-semibold text-[#92400E] mb-3 flex items-center gap-2">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Pro Tips for Higher Conversions
        </h3>
        <ul className="btn-hover-lift text-[13px] text-[#78350F] space-y-2">
          <li>• Link directly to the specific service your audience needs (e.g., Flight Itinerary for visa applicants)</li>
          <li>• Write a genuine review or tutorial about the visa application process</li>
          <li>• Mention the low price (starting at £5) — it converts well</li>
          <li>• Use the social media templates from your dashboard</li>
          <li>• Always disclose your affiliate relationship (FTC compliance)</li>
        </ul>
      </div>
    </div>
  );
}
