'use client';

import { useState, useEffect } from 'react';

interface AffiliateInfo {
  name: string;
  email: string;
  referralCode: string;
  commissionRate: number;
  joinedAt: string;
}

export default function AffiliateProfilePage() {
  const [affiliate, setAffiliate] = useState<AffiliateInfo | null>(null);

  useEffect(() => {
    fetch('/api/affiliates/check')
      .then(res => res.json())
      .then(data => {
        if (data.authenticated) setAffiliate(data.affiliate);
      });
  }, []);

  if (!affiliate) return null;

  const initials = affiliate.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="space-y-6 max-w-[800px]">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-[#005CFF] to-[#0052CC]" />
        <div className="px-6 pb-6 -mt-10">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#005CFF] to-[#5ec5dc] flex items-center justify-center text-white text-[24px] font-bold border-4 border-white shadow-lg">
            {initials}
          </div>
          <h3 className="text-[18px] font-bold text-[#0B1437] mt-4">{affiliate.name}</h3>
          <p className="text-[13px] text-gray-500">{affiliate.email}</p>
          <span className="inline-block mt-2 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#D1FAE5] text-[#059669]">
            Active Affiliate
          </span>
        </div>
      </div>

      {/* Account Details */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-[16px] font-semibold text-[#0B1437] mb-5">Account Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Full Name</label>
            <div className="px-4 py-2.5 bg-[#F8FAFC] rounded-xl text-[14px] text-[#0B1437] border border-gray-200">
              {affiliate.name}
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Email</label>
            <div className="px-4 py-2.5 bg-[#F8FAFC] rounded-xl text-[14px] text-[#0B1437] border border-gray-200">
              {affiliate.email}
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Referral Code</label>
            <div className="px-4 py-2.5 bg-[#F8FAFC] rounded-xl text-[14px] text-[#0B1437] border border-gray-200 font-mono">
              {affiliate.referralCode}
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Commission Rate</label>
            <div className="px-4 py-2.5 bg-[#F8FAFC] rounded-xl text-[14px] text-[#0B1437] border border-gray-200">
              {affiliate.commissionRate}%
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Member Since</label>
            <div className="px-4 py-2.5 bg-[#F8FAFC] rounded-xl text-[14px] text-[#0B1437] border border-gray-200">
              {new Date(affiliate.joinedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Payout Method</label>
            <div className="px-4 py-2.5 bg-[#F8FAFC] rounded-xl text-[14px] text-[#0B1437] border border-gray-200">
              Bank Transfer
            </div>
          </div>
        </div>
      </div>

      {/* Support */}
      <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-gray-100">
        <h3 className="text-[14px] font-semibold text-[#0B1437] mb-2">Need to update your details?</h3>
        <p className="text-[13px] text-gray-500">
          To update your profile or bank details, please contact us at{' '}
          <a href="mailto:contact@onwardtickets.com" className="text-[#005CFF] font-medium">contact@onwardtickets.com</a>
        </p>
      </div>
    </div>
  );
}
