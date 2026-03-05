'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

// Fallback while API loads
const defaultServices = [
  { label: 'Flight Itinerary', href: '/flight-itinerary' },
  { label: 'Hotel Reservation', href: '/hotel-reservation' },
  { label: 'Travel Plan', href: '/travel-plan' },
  { label: 'Cover Letter', href: '/cover-letter' },
  { label: 'Hire a Visa Consultant', href: '/hire-an-expert-visa-consultant' },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [services, setServices] = useState(defaultServices);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Fetch active services from API
  useEffect(() => {
    fetch('/api/services')
      .then((res) => res.json())
      .then((data) => {
        if (data.services) {
          const active = Object.values(data.services)
            .filter((s: any) => s.isActive)
            .map((s: any) => ({ label: s.label, href: s.href }));
          if (active.length > 0) setServices(active);
        }
      })
      .catch(() => {
        // Keep defaults on error
      });
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  }, [pathname]);

  const isServicePage = services.some((s) => pathname === s.href);

  const navLinks = [
    { label: 'HOME', href: '/' },
    { label: 'PRICING', href: '/#pricing' },
    { label: 'SERVICES', href: '#', isDropdown: true },
    { label: 'BLOGS', href: '/blog' },
    { label: 'CONTACT US', href: '/contact-us' },
  ];

  const isActive = (link: typeof navLinks[0]) => {
    if (link.label === 'SERVICES') return isServicePage;
    if (link.href === '/') return pathname === '/';
    return pathname.startsWith(link.href.split('#')[0]) && link.href.split('#')[0] !== '';
  };

  return (
    <header
      className={`relative z-[50] w-full bg-white transition-all duration-300 ${
        scrolled ? 'shadow-lg bg-white/95 backdrop-blur-md' : ''
      }`}
    >
      <div className="mx-auto max-w-[1240px] px-6 lg:px-0 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 transition-transform duration-300 hover:scale-105"
          >
            <img src="/logo.png" alt="OnwardTickets" className="h-[100px] w-auto" />
          </Link>

          {/* Navigation - Desktop */}
          <nav
            className="hidden lg:flex items-center gap-8"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
          >
            {navLinks.map((link) => {
              const active = isActive(link);

              if (link.isDropdown) {
                return (
                  <div key={link.label} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                      className={`flex items-center gap-1.5 text-[14px] tracking-wide transition-all duration-300 ${
                        active
                          ? 'text-black font-semibold link-underline'
                          : 'text-gray-700 font-medium hover:text-black hover:scale-105'
                      }`}
                    >
                      {link.label}
                      <svg
                        className={`w-3.5 h-3.5 transition-all duration-300 ${
                          isServicesOpen ? 'rotate-180 text-[#2979FF]' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Dropdown */}
                    {isServicesOpen && (
                      <div
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[260px] bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50"
                        style={{ animation: 'fadeInDown 0.2s ease-out' }}
                      >
                        {services.map((service, index) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            className={`block px-5 py-2.5 text-[14px] transition-all duration-300 ${
                              pathname === service.href
                                ? 'text-[#005CFF] bg-[#F0F5FF] font-medium'
                                : 'text-gray-700 hover:text-[#005CFF] hover:bg-[#F8FAFC] hover:pl-6'
                            }`}
                            style={{ animationDelay: `${index * 0.05}s` }}
                          >
                            {service.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-[14px] tracking-wide transition-all duration-300 ${
                    active
                      ? 'text-black font-semibold link-underline'
                      : 'text-gray-700 font-medium hover:text-black hover:scale-105'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Side - Book Now */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/flight-itinerary"
              className="btn-hover-lift inline-flex items-center justify-center border-2 border-black text-black text-[13px] font-semibold tracking-wider px-6 py-2 rounded-full transition-all hover:bg-black hover:text-white"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
            >
              BOOK NOW
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-black hover:bg-black/10 rounded-lg transition-all duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className="lg:hidden mt-4 pb-4 border-t border-gray-300 pt-4 animate-slide-up"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
          >
            {navLinks.map((link) => {
              const active = isActive(link);

              if (link.isDropdown) {
                return (
                  <div key={link.label}>
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className={`flex items-center justify-between w-full py-3 text-[14px] tracking-wide transition-all duration-300 ${
                        active
                          ? 'text-black font-semibold'
                          : 'text-gray-700 font-medium hover:text-black hover:pl-2'
                      }`}
                    >
                      SERVICES
                      <svg
                        className={`w-4 h-4 transition-transform duration-300 ${
                          mobileServicesOpen ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {mobileServicesOpen && (
                      <div className="pl-4 pb-2 space-y-1 animate-fade-up">
                        {services.map((service, index) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            className={`block py-2 text-[13px] transition-all duration-300 ${
                              pathname === service.href
                                ? 'text-black font-medium'
                                : 'text-gray-500 hover:text-black hover:pl-2'
                            }`}
                            style={{ animationDelay: `${index * 0.05}s` }}
                          >
                            {service.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`block py-3 text-[14px] tracking-wide transition-all duration-300 ${
                    active
                      ? 'text-black font-semibold'
                      : 'text-gray-700 font-medium hover:text-black hover:pl-2'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-3 pt-3 border-t border-gray-300">
              <Link
                href="/flight-itinerary"
                className="btn-hover-lift block text-center border-2 border-black text-black text-[13px] font-semibold tracking-wider py-2.5 rounded-full transition-all hover:bg-black hover:text-white"
              >
                BOOK NOW
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
