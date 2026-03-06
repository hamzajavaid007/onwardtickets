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

export default function AffiliateDashboardPage() {
  const [affiliate, setAffiliate] = useState<AffiliateInfo | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch('/api/affiliates/check')
      .then(res => res.json())
      .then(data => {
        if (data.authenticated) setAffiliate(data.affiliate);
      });
  }, []);

  // AffiliateWP-style links: ?ref=ID or ?ref=username
  const refById = affiliate ? `https://onwardtickets.com/?ref=${affiliate.affiliateId}` : '';
  const refByName = affiliate ? `https://onwardtickets.com/?ref=${affiliate.referralCode}` : '';
  const [linkMode, setLinkMode] = useState<'id' | 'username'>('id');
  const referralLink = linkMode === 'id' ? refById : refByName;

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!affiliate) return null;

  return (
    <div className="btn-hover-lift space-y-6">
      {/* Welcome */}
      <div className="btn-hover-lift bg-gradient-to-r from-[#005CFF] to-[#0052CC] rounded-2xl p-6 lg:p-8 text-white">
        <h2 className="btn-hover-lift text-[22px] font-bold">Welcome back, {affiliate.name.split(' ')[0]}!</h2>
        <p className="btn-hover-lift text-[14px] text-white/70 mt-1">Here&apos;s your affiliate program overview</p>
      </div>

      {/* Stats */}
      <div className="btn-hover-lift grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Commission Rate', value: `${affiliate.commissionRate}%`, icon: '💰', color: '#059669' },
          { label: 'Cookie Duration', value: '30 Days', icon: '🍪', color: '#D97706' },
          { label: 'Payout Method', value: 'Bank Transfer', icon: '🏦', color: '#005CFF' },
          { label: 'Min. Payout', value: '£25', icon: '📊', color: '#7C3AED' },
        ].map((stat) => (
          <div key={stat.label} className="btn-hover-lift bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="btn-hover-lift flex items-center justify-between mb-3">
              <span className="btn-hover-lift text-[24px]">{stat.icon}</span>
            </div>
            <p className="btn-hover-lift text-[22px] font-bold" style={{ color: stat.color }}>{stat.value}</p>
            <p className="btn-hover-lift text-[13px] text-gray-500 font-medium mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Referral Link Card */}
      <div className="btn-hover-lift bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="btn-hover-lift flex items-center gap-3 mb-4">
          <div className="btn-hover-lift w-10 h-10 rounded-xl bg-[#005CFF]/10 flex items-center justify-center">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#005CFF" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <div>
            <h3 className="btn-hover-lift text-[16px] font-semibold text-[#0B1437]">Your Referral Link</h3>
            <p className="btn-hover-lift text-[12px] text-gray-400">Share this link to earn commissions</p>
          </div>
        </div>
        {/* Link format toggle */}
        <div className="btn-hover-lift flex flex-wrap items-center gap-2 mb-3">
          <span className="btn-hover-lift text-[12px] text-gray-500">Format:</span>
          <button
            onClick={() => setLinkMode('id')}
            className={`px-3 py-1 rounded-lg text-[12px] font-medium transition-all ${linkMode === 'id' ? 'bg-[#005CFF] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
          >
            By ID (?ref={affiliate.affiliateId})
          </button>
          <button
            onClick={() => setLinkMode('username')}
            className={`px-3 py-1 rounded-lg text-[12px] font-medium transition-all ${linkMode === 'username' ? 'bg-[#005CFF] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
          >
            By Username (?ref={affiliate.referralCode})
          </button>
        </div>
        <div className="btn-hover-lift flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="btn-hover-lift flex-1 bg-[#F0F4F8] rounded-xl px-4 py-3 border border-gray-200 min-w-0">
            <code className="btn-hover-lift text-[12px] sm:text-[13px] text-[#005CFF] font-mono break-all">{referralLink}</code>
          </div>
          <button
            onClick={copyLink}
            className={`px-5 py-3 rounded-xl text-[13px] font-semibold transition-all flex-shrink-0 ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-[#005CFF] text-white hover:bg-[#0047CC]'
            }`}
          >
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
        <div className="btn-hover-lift mt-4 flex flex-wrap items-center gap-4">
          <div className="btn-hover-lift flex items-center gap-2">
            <span className="btn-hover-lift text-[12px] text-gray-400">Affiliate ID:</span>
            <code className="btn-hover-lift text-[12px] bg-gray-100 px-2 py-0.5 rounded font-mono text-[#0B1437] font-semibold">{affiliate.affiliateId}</code>
          </div>
          <div className="btn-hover-lift flex items-center gap-2">
            <span className="btn-hover-lift text-[12px] text-gray-400">Username:</span>
            <code className="btn-hover-lift text-[12px] bg-gray-100 px-2 py-0.5 rounded font-mono text-[#0B1437] font-semibold">{affiliate.referralCode}</code>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="btn-hover-lift bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="btn-hover-lift text-[16px] font-semibold text-[#0B1437] mb-5">How It Works</h3>
        <div className="btn-hover-lift grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { step: '1', title: 'Share Your Link', desc: 'Post your referral link on your blog, social media, or email list', icon: '🔗' },
            { step: '2', title: 'Visitor Clicks', desc: 'When someone clicks your link, a 30-day cookie is stored', icon: '👆' },
            { step: '3', title: 'They Purchase', desc: 'If they buy any service within 30 days, you get credit', icon: '🛒' },
            { step: '4', title: 'Earn Commission', desc: `You earn ${affiliate.commissionRate}% commission on every sale`, icon: '💰' },
          ].map((item) => (
            <div key={item.step} className="btn-hover-lift text-center">
              <div className="btn-hover-lift w-14 h-14 rounded-2xl bg-[#F0F4F8] flex items-center justify-center mx-auto mb-3">
                <span className="btn-hover-lift text-[28px]">{item.icon}</span>
              </div>
              <div className="btn-hover-lift text-[11px] font-bold text-[#005CFF] uppercase tracking-wider mb-1">Step {item.step}</div>
              <h4 className="btn-hover-lift text-[14px] font-semibold text-[#0B1437] mb-1">{item.title}</h4>
              <p className="btn-hover-lift text-[12px] text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Promo Materials */}
      <div className="btn-hover-lift bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="btn-hover-lift text-[16px] font-semibold text-[#0B1437] mb-4">Promotional Materials</h3>
        <div className="btn-hover-lift grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="btn-hover-lift bg-[#F8FAFC] rounded-xl p-4 border border-gray-100">
            <p className="btn-hover-lift text-[13px] font-medium text-[#0B1437] mb-2">Sample Blog Post CTA</p>
            <div className="btn-hover-lift bg-white rounded-lg p-3 border border-gray-200">
              <p className="btn-hover-lift text-[12px] text-gray-600 italic">
                &quot;Need a flight itinerary for your visa application? I use OnwardTickets — they deliver verified documents starting at just £5. Use my link to get started: {referralLink}&quot;
              </p>
            </div>
            <button onClick={() => { navigator.clipboard.writeText(`Need a flight itinerary for your visa application? I use OnwardTickets — they deliver verified documents starting at just £5. Use my link to get started: ${referralLink}`); }} className="btn-hover-lift mt-2 text-[12px] text-[#005CFF] font-medium hover:text-[#0047CC]">
              Copy Text
            </button>
          </div>
          <div className="btn-hover-lift bg-[#F8FAFC] rounded-xl p-4 border border-gray-100">
            <p className="btn-hover-lift text-[13px] font-medium text-[#0B1437] mb-2">Sample Social Media Post</p>
            <div className="btn-hover-lift bg-white rounded-lg p-3 border border-gray-200">
              <p className="btn-hover-lift text-[12px] text-gray-600 italic">
                &quot;Applying for a visa? Don&apos;t buy actual flights yet! Get verified flight & hotel reservations from OnwardTickets — starts at £5 and delivered instantly. Check it out 👇 {referralLink}&quot;
              </p>
            </div>
            <button onClick={() => { navigator.clipboard.writeText(`Applying for a visa? Don't buy actual flights yet! Get verified flight & hotel reservations from OnwardTickets — starts at £5 and delivered instantly. Check it out 👇 ${referralLink}`); }} className="btn-hover-lift mt-2 text-[12px] text-[#005CFF] font-medium hover:text-[#0047CC]">
              Copy Text
            </button>
          </div>
        </div>
      </div>

      {/* Account Info */}
      <div className="btn-hover-lift bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="btn-hover-lift text-[16px] font-semibold text-[#0B1437] mb-4">Account Details</h3>
        <div className="btn-hover-lift grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <p className="btn-hover-lift text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Name</p>
            <p className="btn-hover-lift text-[14px] font-medium text-[#0B1437]">{affiliate.name}</p>
          </div>
          <div>
            <p className="btn-hover-lift text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Email</p>
            <p className="btn-hover-lift text-[14px] font-medium text-[#0B1437]">{affiliate.email}</p>
          </div>
          <div>
            <p className="btn-hover-lift text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Member Since</p>
            <p className="btn-hover-lift text-[14px] font-medium text-[#0B1437]">
              {new Date(affiliate.joinedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      {/* Support */}
      <div className="btn-hover-lift bg-[#F8FAFC] rounded-2xl p-6 border border-gray-100 text-center">
        <p className="btn-hover-lift text-[14px] text-gray-500">
          Need help? Contact us at{' '}
          <a href="mailto:contact@onwardtickets.com" className="btn-hover-lift text-[#005CFF] font-medium">contact@onwardtickets.com</a>
          {' '}or call{' '}
          <a href="tel:+4477561525115" className="btn-hover-lift text-[#005CFF] font-medium">+44 77561 525115</a>
        </p>
      </div>
    </div>
  );
}
