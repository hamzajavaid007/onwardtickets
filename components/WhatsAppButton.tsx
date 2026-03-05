'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  // Don't show on admin pages
  if (pathname.startsWith('/admin')) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex items-center gap-3">
      {/* Tooltip */}
      {isHovered && (
        <div
          className="bg-white rounded-lg shadow-xl px-4 py-2.5 text-[13px] font-medium text-gray-700 whitespace-nowrap animate-fade-left"
          style={{
            fontFamily: 'var(--font-poppins), Poppins, sans-serif',
          }}
        >
          Need help? Chat with us!
        </div>
      )}

      {/* Button */}
      <a
        href="https://wa.me/4477561525115?text=Hi%20I%20need%20help%20with%20my%20visa%20application"
        target="_blank"
        rel="noopener noreferrer"
        className="animate-pulse-slow w-[60px] h-[60px] rounded-full bg-[#25D366] hover:bg-[#128C7E] flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Chat on WhatsApp"
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          className="text-white transition-transform duration-300 group-hover:rotate-12"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M20.52 3.48A11.78 11.78 0 0 0 12.03 0C5.39 0 .02 5.37.02 12c0 2.11.55 4.17 1.6 6L0 24l6.17-1.62A11.98 11.98 0 0 0 12.03 24h.01c6.63 0 12-5.37 12-12a11.9 11.9 0 0 0-3.52-8.52zM12.04 22.1h-.01a9.94 9.94 0 0 1-5.07-1.39l-.36-.21-3.66.96.98-3.56-.23-.37a9.92 9.92 0 0 1-1.52-5.29c0-5.48 4.47-9.95 9.96-9.95a9.9 9.9 0 0 1 7.04 2.92 9.9 9.9 0 0 1 2.92 7.04c0 5.48-4.47 9.95-9.95 9.95zm5.45-7.44c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.66.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.8-1.49-1.78-1.66-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.9-2.2-.24-.58-.48-.5-.66-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.88 1.2 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.12-.27-.2-.57-.35z"
          />
        </svg>
      </a>
    </div>
  );
};

export default WhatsAppButton;
