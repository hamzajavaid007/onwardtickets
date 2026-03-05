'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface AffiliateUser {
  name: string;
  email: string;
  referralCode: string;
  commissionRate: number;
  joinedAt: string;
}

export default function AffiliateLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [affiliate, setAffiliate] = useState<AffiliateUser | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isPublicPage = pathname === '/affiliate/login' || pathname === '/affiliate/register';

  useEffect(() => {
    if (isPublicPage) {
      setAuthChecked(true);
      return;
    }
    fetch('/api/affiliates/check')
      .then(res => res.json())
      .then(data => {
        if (data.authenticated) {
          setAffiliate(data.affiliate);
        } else {
          router.replace('/affiliate/login');
        }
      })
      .catch(() => router.replace('/affiliate/login'))
      .finally(() => setAuthChecked(true));
  }, [pathname, router]);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await fetch('/api/affiliates/logout', { method: 'POST' });
    router.replace('/affiliate/login');
  };

  // Public pages — no layout
  if (isPublicPage) {
    return <>{children}</>;
  }

  if (!authChecked || !affiliate) {
    return (
      <div className="min-h-screen bg-[#0B1437] flex items-center justify-center">
        <div className="flex items-center gap-3">
          <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="text-white text-[14px]">Loading...</span>
        </div>
      </div>
    );
  }

  const navItems = [
    {
      label: 'Dashboard',
      href: '/affiliate/dashboard',
      icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" />
        </svg>
      ),
    },
    {
      label: 'My Referral Link',
      href: '/affiliate/referral',
      icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
    },
    {
      label: 'Profile',
      href: '/affiliate/profile',
      icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
  ];

  const initials = affiliate.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }} className="flex min-h-screen bg-[#F0F4F8]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 w-[260px] transition-transform duration-300 bg-[#0B1437] text-white flex flex-col fixed top-0 left-0 h-screen z-50`}>
        {/* Logo */}
        <div className="flex items-center justify-between px-5 h-[70px] border-b border-white/10">
          <span className="text-[16px] font-bold tracking-wide text-white whitespace-nowrap">
            Affiliate Portal
          </span>
          <button onClick={() => setSidebarOpen(false)} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0 md:hidden">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Profile Card */}
        <div className="px-4 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2979FF] to-[#5ec5dc] flex items-center justify-center text-white text-[13px] font-bold flex-shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-white truncate">{affiliate.name}</p>
              <p className="text-[11px] text-gray-400 truncate">{affiliate.email}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-[14px] font-medium ${
                  isActive
                    ? 'bg-gradient-to-r from-[#2979FF] to-[#0052CC] text-white shadow-lg shadow-blue-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-white/10 px-3 py-3 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all text-[13px]"
            title="Back to Website"
          >
            <svg className="flex-shrink-0" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Website</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all text-[13px] w-full"
            title="Logout"
          >
            <svg className="flex-shrink-0" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="min-w-0 flex-1 md:ml-[260px] transition-all duration-300 overflow-x-hidden">
        <header className="h-[60px] md:h-[70px] bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 sticky top-0 z-40">
          {/* Mobile hamburger */}
          <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors md:hidden">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-[16px] md:text-[18px] font-semibold text-[#0B1437]">
            {pathname === '/affiliate/dashboard' && 'Dashboard'}
            {pathname === '/affiliate/referral' && 'My Referral Link'}
            {pathname === '/affiliate/profile' && 'Profile'}
          </h1>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-br from-[#2979FF] to-[#5ec5dc] flex items-center justify-center text-white text-[12px] md:text-[13px] font-semibold">
              {initials}
            </div>
          </div>
        </header>
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
