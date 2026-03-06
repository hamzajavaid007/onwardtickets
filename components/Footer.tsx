import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full">
      {/* Main Footer */}
      <div className="relative overflow-hidden">
        {/* Background image - faded airplane */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: 'url(/partner-hero-bg.jpg)' }}
        />
        <div className="absolute inset-0 bg-white/80" />

        <div className="relative z-10 mx-auto max-w-[1240px] px-6 lg:px-0 py-[60px]">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-0 justify-between">
            {/* Left - Logo and Description */}
            <div className="flex flex-col gap-5 lg:max-w-[380px] reveal-left">
              <img
                src="/logo.png"
                alt="OnwardTickets"
                className="h-[100px] w-auto object-contain self-start transition-transform duration-300 hover:scale-105"
              />
              <p
                className="text-[15px] text-[#333333] leading-relaxed"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                The Embassy recommends not purchasing tickets until visa is approved. Why would you risk your time and money?
                <br />
                We provide flight and hotel reservations. Perfect solution for digital nomads and travellers who want to extend or apply for visas.
              </p>
            </div>

            {/* Middle - Quick Links */}
            <div className="flex flex-col gap-5 reveal">
              <h3
                className="text-[20px] font-bold text-[#005CFF]"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                Quick Links
              </h3>
              <div className="flex flex-col gap-3.5">
                {[
                  { label: 'Refund Policy', href: '/refund_returns' },
                  { label: 'Privacy Policy', href: '/privacy-policy' },
                  { label: 'Affiliate Program', href: '/become-a-partner' },
                  { label: 'Terms and conditions', href: '/terms-conditions' },
                ].map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-2 text-[15px] text-[#333333] hover:text-[#005CFF] transition-all duration-300 hover:translate-x-1 link-underline"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', animationDelay: `${index * 0.05}s` }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#333333"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right - Contact Us */}
            <div className="flex flex-col gap-5 reveal-right">
              <h3
                className="text-[20px] font-bold text-[#005CFF]"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
              >
                Contact Us
              </h3>
              <div className="flex flex-col gap-3.5">
                {/* Phone */}
                <a
                  href="tel:+4477561525115"
                  className="flex items-center gap-2 text-[15px] text-[#333333] hover:text-[#005CFF] transition-all duration-300 hover:translate-x-1 hover:scale-105"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="#333333"
                    className="transition-colors duration-300"
                  >
                    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24A11.36 11.36 0 0019.99 16a1 1 0 011 1v3.5a1 1 0 01-1 1C10.07 21.5 2.5 13.93 2.5 4.99a1 1 0 011-1H7a1 1 0 011 1c0 1.25.2 2.46.57 3.59a1 1 0 01-.25 1.02l-2.2 2.19z" />
                  </svg>
                  +44 77561 525115
                </a>
                {/* Email */}
                <a
                  href="mailto:contact@onwardtickets.com"
                  className="flex items-center gap-2 text-[15px] text-[#333333] hover:text-[#005CFF] transition-all duration-300 hover:translate-x-1 hover:scale-105"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#333333"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-colors duration-300"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M22 7l-10 7L2 7" />
                  </svg>
                  contact@onwardtickets.com
                </a>
              </div>

              {/* Follow Us */}
              <div className="flex flex-col gap-3 mt-2">
                <h4
                  className="text-[16px] font-bold text-[#005CFF]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                >
                  Follow Us
                </h4>
                <div className="flex items-center gap-4">
                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/onwardtickets"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[36px] h-[36px] rounded-full bg-[#1D1D1D] hover:bg-[#005CFF] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#005CFF]/30"
                    aria-label="Facebook"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                    </svg>
                  </a>
                  {/* Twitter */}
                  <a
                    href="https://twitter.com/onwardtickets"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[36px] h-[36px] rounded-full bg-[#1D1D1D] hover:bg-[#005CFF] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#005CFF]/30"
                    aria-label="Twitter"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                    </svg>
                  </a>
                  {/* YouTube */}
                  <a
                    href="https://www.youtube.com/@onwardtickets"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[36px] h-[36px] rounded-full bg-[#1D1D1D] hover:bg-[#FF0000] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#FF0000]/30"
                    aria-label="YouTube"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                      <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33zM9.75 15.02l5.75-3.27-5.75-3.27v6.54z" />
                      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#1D1D1D" />
                    </svg>
                  </a>
                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/onwardtickets"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[36px] h-[36px] rounded-full bg-[#1D1D1D] hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/30"
                    aria-label="Instagram"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#005CFF] hover:bg-[#0047CC] transition-colors duration-300">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-0 py-4 flex items-center justify-center">
          <p
            className="text-[15px] text-white text-center hover:text-[#5ec5dc] transition-colors duration-300"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
          >
            Copyright © {new Date().getFullYear()} Onwards Tickets. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
