'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

const navItems = [
  {
    label: 'Dashboard',
    href: '/admin',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" />
      </svg>
    ),
  },
  {
    label: 'All Submissions',
    href: '/admin/submissions',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    label: 'Affiliates',
    href: '/admin/affiliates',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    label: 'Coupons',
    href: '/admin/coupons',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
  },
  {
    label: 'Blog',
    href: '/admin/blog',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 4H4a2 2 0 00-2 2v10a2 2 0 002 2h10a1 1 0 001-1V7a4 4 0 00-4-4z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2 10h6m4 0h6m2-10H6m4 0h6" />
      </svg>
    ),
  },
  {
    label: 'Page Editor',
    href: '/admin/pages',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    label: 'Settings',
    href: '/admin/settings',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const serviceFilters = [
  { label: 'Flight Itinerary', key: 'flight', color: '#3B82F6' },
  { label: 'Hotel Reservation', key: 'hotel', color: '#10B981' },
  { label: 'Travel Plan', key: 'travel-plan', color: '#8B5CF6' },
  { label: 'Cover Letter', key: 'cover-letter', color: '#F59E0B' },
  // { label: 'Visa Assistant', key: 'visa-assistant', color: '#EF4444' },
  // { label: 'Visa Essentials', key: 'visa-essentials', color: '#EC4899' },
  // { label: 'Visa Documents', key: 'visa-documents', color: '#06B6D4' },
];

const PUBLIC_ADMIN_PATHS = ['/admin/login', '/admin/forgot-password', '/admin/reset-password'];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Flight Itinerary Order', desc: 'John Doe submitted a flight itinerary request', time: '2 min ago', read: false, color: '#3B82F6' },
    { id: 2, title: 'Payment Received', desc: '$49.99 received for Hotel Reservation #1042', time: '15 min ago', read: false, color: '#10B981' },
    { id: 3, title: 'Visa Assistant Completed', desc: 'Order #1038 has been marked as completed', time: '1 hour ago', read: false, color: '#EF4444' },
    { id: 4, title: 'New Cover Letter Order', desc: 'Sarah Wilson submitted a cover letter request', time: '3 hours ago', read: true, color: '#F59E0B' },
    { id: 5, title: 'Travel Plan Update', desc: 'Order #1035 moved to processing', time: '5 hours ago', read: true, color: '#8B5CF6' },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Auth check — skip for login page
  useEffect(() => {
    if (PUBLIC_ADMIN_PATHS.includes(pathname)) {
      setAuthChecked(true);
      return;
    }
    fetch('/api/admin/check')
      .then(res => {
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          router.replace('/admin/login');
        }
      })
      .catch(() => router.replace('/admin/login'))
      .finally(() => setAuthChecked(true));
  }, [pathname, router]);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.replace('/admin/login');
  };

  // Public admin pages — render without sidebar/auth redirect
  if (PUBLIC_ADMIN_PATHS.includes(pathname)) {
    return <>{children}</>;
  }

  // Still checking auth — show loading
  if (!authChecked || !isAuthenticated) {
    return (
      <div className="btn-hover-lift min-h-screen bg-[#0B1437] flex items-center justify-center">
        <div className="btn-hover-lift flex items-center gap-3">
          <svg className="btn-hover-lift animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
            <circle className="btn-hover-lift opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="btn-hover-lift opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="btn-hover-lift text-white text-[14px]">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
      className="btn-hover-lift flex min-h-screen bg-[#F0F4F8]"
    >
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="btn-hover-lift fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 w-[260px] transition-transform duration-300 bg-[#0B1437] text-white flex flex-col fixed top-0 left-0 h-screen z-50`}
      >
        {/* Logo Area */}
        <div className="btn-hover-lift flex items-center justify-between px-5 h-[70px] border-b border-white/10">
          <span className="btn-hover-lift text-[18px] font-bold tracking-wide text-white whitespace-nowrap">
            Admin Panel
          </span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="btn-hover-lift p-1.5 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0 md:hidden"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav Items */}
        <nav className="btn-hover-lift flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-[14px] font-medium ${
                  isActive
                    ? 'bg-gradient-to-r from-[#005CFF] to-[#0052CC] text-white shadow-lg shadow-blue-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="btn-hover-lift flex-shrink-0">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div className="btn-hover-lift pt-5 pb-2 px-3">
            <span className="btn-hover-lift text-[11px] font-semibold uppercase tracking-wider text-gray-500 whitespace-nowrap">
              Services
            </span>
          </div>

          {serviceFilters.map((service) => (
            <Link
              key={service.key}
              href={`/admin/submissions?service=${service.key}`}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all text-[13px] ${
                pathname === '/admin/submissions' && typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('service') === service.key
                  ? 'bg-white/10 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span
                className="btn-hover-lift w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: service.color }}
              />
              <span>{service.label}</span>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="btn-hover-lift border-t border-white/10 px-3 py-3 space-y-1">
          <Link
            href="/"
            className="btn-hover-lift flex items-center gap-3 px-3 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all text-[13px] whitespace-nowrap"
            title="Back to Website"
          >
            <svg className="btn-hover-lift flex-shrink-0" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Website</span>
          </Link>
          <button
            onClick={handleLogout}
            className="btn-hover-lift flex items-center gap-3 px-3 py-2 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all text-[13px] whitespace-nowrap w-full"
            title="Logout"
          >
            <svg className="btn-hover-lift flex-shrink-0" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="btn-hover-lift min-w-0 flex-1 md:ml-[260px] transition-all duration-300 overflow-x-hidden">
        {/* Top Bar */}
        <header className="btn-hover-lift h-[60px] md:h-[70px] bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 sticky top-0 z-40 min-w-0">
          <div className="btn-hover-lift flex items-center gap-3 min-w-0">
            {/* Mobile hamburger */}
            <button onClick={() => setSidebarOpen(true)} className="btn-hover-lift p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors md:hidden flex-shrink-0">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="btn-hover-lift text-[16px] md:text-[18px] font-semibold text-[#0B1437] truncate">
              {pathname === '/admin' && 'Dashboard Overview'}
              {pathname === '/admin/submissions' && 'Form Submissions'}
              {pathname === '/admin/settings' && 'Settings'}
              {pathname === '/admin/affiliates' && 'Affiliates'}
              {pathname === '/admin/notifications' && 'All Notifications'}
              {pathname === '/admin/pages' && 'Page Editor'}
            </h1>
          </div>
          <div className="btn-hover-lift flex items-center gap-2 md:gap-3 flex-shrink-0">
            {/* Search */}
            <div className="btn-hover-lift relative hidden md:block">
              <svg className="btn-hover-lift absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search..."
                className="btn-hover-lift pl-9 pr-4 py-2 bg-[#F0F4F8] rounded-xl text-[13px] w-[200px] border border-transparent focus:border-[#005CFF] focus:outline-none transition-colors"
              />
            </div>
            {/* Notification bell */}
            <div className="btn-hover-lift relative" ref={notifRef}>
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="btn-hover-lift relative p-2 rounded-xl hover:bg-[#F0F4F8] transition-colors"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                  <span className="btn-hover-lift absolute top-1 right-1 min-w-[18px] h-[18px] flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full px-1">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notifOpen && (
                <div className="btn-hover-lift absolute right-0 top-full mt-2 w-[calc(100vw-2rem)] sm:w-[380px] max-w-[380px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50" style={{ animation: 'dropdownFadeIn 0.2s ease-out' }}>
                  <div className="btn-hover-lift flex items-center justify-between px-4 sm:px-5 py-4 border-b border-gray-100">
                    <h3 className="btn-hover-lift text-[15px] font-semibold text-[#0B1437]">Notifications</h3>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllRead}
                        className="btn-hover-lift text-[12px] text-[#005CFF] hover:text-[#0052CC] font-medium transition-colors"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="btn-hover-lift max-h-[360px] overflow-y-auto">
                    {notifications.map((notif) => (
                      <button
                        key={notif.id}
                        onClick={() => {
                          setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n));
                        }}
                        className={`w-full text-left flex items-start gap-3 px-4 sm:px-5 py-3.5 hover:bg-[#F0F4F8] transition-colors border-b border-gray-50 ${!notif.read ? 'bg-blue-50/40' : ''}`}
                      >
                        <span
                          className="btn-hover-lift w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: `${notif.color}15` }}
                        >
                          <span className="btn-hover-lift w-2.5 h-2.5 rounded-full" style={{ background: notif.color }} />
                        </span>
                        <div className="btn-hover-lift flex-1 min-w-0">
                          <p className={`text-[13px] ${!notif.read ? 'font-semibold text-[#0B1437]' : 'font-medium text-gray-700'}`}>
                            {notif.title}
                          </p>
                          <p className="btn-hover-lift text-[12px] text-gray-500 mt-0.5 truncate">{notif.desc}</p>
                          <p className="btn-hover-lift text-[11px] text-gray-400 mt-1">{notif.time}</p>
                        </div>
                        {!notif.read && (
                          <span className="btn-hover-lift w-2 h-2 rounded-full bg-[#005CFF] flex-shrink-0 mt-2" />
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="btn-hover-lift px-4 sm:px-5 py-3 border-t border-gray-100 bg-[#FAFBFC]">
                    <Link
                      href="/admin/notifications"
                      onClick={() => setNotifOpen(false)}
                      className="btn-hover-lift block w-full text-center text-[13px] text-[#005CFF] hover:text-[#0052CC] font-medium transition-colors"
                    >
                      View All Notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>
            {/* Admin avatar with dropdown */}
            <div className="btn-hover-lift relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="btn-hover-lift flex items-center gap-2 p-1 rounded-xl hover:bg-[#F0F4F8] transition-colors"
              >
                <div className="btn-hover-lift w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-br from-[#005CFF] to-[#5ec5dc] flex items-center justify-center text-white text-[12px] md:text-[13px] font-semibold">
                  A
                </div>
                <svg className={`w-4 h-4 text-gray-400 transition-transform hidden md:block ${profileOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {profileOpen && (
                <div className="btn-hover-lift absolute right-0 top-full mt-2 w-[220px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50" style={{ animation: 'dropdownFadeIn 0.2s ease-out' }}>
                  <div className="btn-hover-lift px-4 py-3 border-b border-gray-100">
                    <p className="btn-hover-lift text-[13px] font-semibold text-[#0B1437]">Admin</p>
                    <p className="btn-hover-lift text-[12px] text-gray-400 truncate">admin@onwardtickets.com</p>
                  </div>
                  <div className="btn-hover-lift py-1">
                    <Link
                      href="/admin/settings"
                      onClick={() => setProfileOpen(false)}
                      className="btn-hover-lift flex items-center gap-3 px-4 py-2.5 text-[13px] text-gray-700 hover:bg-[#F0F4F8] transition-colors"
                    >
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Settings
                    </Link>
                    <Link
                      href="/"
                      onClick={() => setProfileOpen(false)}
                      className="btn-hover-lift flex items-center gap-3 px-4 py-2.5 text-[13px] text-gray-700 hover:bg-[#F0F4F8] transition-colors"
                    >
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      Back to Website
                    </Link>
                  </div>
                  <div className="btn-hover-lift border-t border-gray-100 py-1">
                    <button
                      onClick={() => { setProfileOpen(false); handleLogout(); }}
                      className="btn-hover-lift flex items-center gap-3 px-4 py-2.5 text-[13px] text-red-500 hover:bg-red-50 transition-colors w-full"
                    >
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="btn-hover-lift p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
