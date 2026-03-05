'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function RecoverContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [credentials, setCredentials] = useState<{ name: string; email: string; referralCode: string; status: string } | null>(null);

  useEffect(() => {
    if (!token || !email) {
      setError('Invalid recovery link.');
      setLoading(false);
      return;
    }

    fetch('/api/affiliates/recover', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) throw new Error(data.error);
        setCredentials(data.data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token, email]);

  if (loading) {
    return <p className="text-gray-400 text-center text-[14px]">Verifying your recovery link...</p>;
  }

  if (error) {
    return (
      <div className="text-center">
        <p className="text-red-400 text-[14px] mb-4">{error}</p>
        <Link href="/affiliate/forgot-password" className="text-[#5ec5dc] text-[13px] hover:text-white transition-colors font-medium">
          Request a new recovery link
        </Link>
      </div>
    );
  }

  if (!credentials) return null;

  return (
    <div className="text-center">
      <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#22C55E" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <p className="text-white text-[16px] font-semibold mb-4">Your Affiliate Credentials</p>

      <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-left space-y-3 mb-6">
        <div>
          <span className="text-gray-400 text-[12px] block">Name</span>
          <span className="text-white text-[14px] font-medium">{credentials.name}</span>
        </div>
        <div>
          <span className="text-gray-400 text-[12px] block">Email</span>
          <span className="text-white text-[14px] font-medium">{credentials.email}</span>
        </div>
        <div>
          <span className="text-gray-400 text-[12px] block">Referral Code (your password)</span>
          <span className="text-[#5ec5dc] text-[16px] font-bold tracking-wider">{credentials.referralCode}</span>
        </div>
        <div>
          <span className="text-gray-400 text-[12px] block">Status</span>
          <span className={`text-[14px] font-medium ${credentials.status === 'approved' ? 'text-green-400' : credentials.status === 'pending' ? 'text-yellow-400' : 'text-red-400'}`}>
            {credentials.status.charAt(0).toUpperCase() + credentials.status.slice(1)}
          </span>
        </div>
      </div>

      <Link
        href="/affiliate/login"
        className="inline-block w-full py-3 bg-gradient-to-r from-[#2979FF] to-[#0052CC] text-white rounded-xl text-[14px] font-semibold hover:from-[#1565C0] hover:to-[#2979FF] transition-all text-center"
      >
        Go to Login
      </Link>
    </div>
  );
}

export default function AffiliateRecoverPage() {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#0B1437] via-[#0B1437] to-[#2979FF] flex items-center justify-center p-6"
      style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#2979FF]/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#5ec5dc]/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-[440px]">
        <div className="text-center mb-8">
          <Link href="/">
            <img src="/logo.png" alt="OnwardTickets" className="h-[45px] mx-auto mb-4 brightness-0 invert" />
          </Link>
          <h1 className="text-[24px] font-bold text-white">Credential Recovery</h1>
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
          <Suspense fallback={<p className="text-gray-400 text-center text-[14px]">Loading...</p>}>
            <RecoverContent />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
