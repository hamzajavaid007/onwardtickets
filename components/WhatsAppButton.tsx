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
        <svg width="30" height="30" viewBox="0 0 24 24" fill="white" className="transition-transform duration-300 group-hover:rotate-12">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67-.15-.197-.297-.767-.966-.94-1.164-.173-.199-.347-.223-.644.075-.149.198-.298.347-.446.52-.149-.174-.198-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462.1.065 2.875 1.213 3.074.149.198 2.096.3 2.898.497.099.198 2.006.5 2.875.709.306.709.916 2.124.916 2.64 0 .003-5.45 4.436-9.888 4.888-4.487 0-8.413-5.335-8.884-9.884.003-5.45 4.437-9.888 9.888-9.888zM5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982-.998 2.998-.235.374-.01.57-.01.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462.1.065 2.875 1.213 3.074.149.198 2.096.3 2.898.497.099.198 2.006.5 2.875.709.306.709.916 2.124.916 2.64 0 .003-5.45 4.436-9.888 4.888-4.487 0-8.413-5.335-8.884-9.884.003-5.45 4.437-9.888 9.888-9.888zM8.413 18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413c-.003-5.45-4.437-9.884-9.885-9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413c-.003-5.45-4.437-9.884-9.885-9.884M5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982-.998 2.998-.235.374-.01.57-.01.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462.1.065 2.875 1.213 3.074.149.198 2.096.3 2.898.497.099.198 2.006.5 2.875.709.306.709.916 2.124.916 2.64 0 .003-5.45 4.436-9.888 4.888-4.487 0-8.413-5.335-8.884-9.884-.003-5.45 4.437-9.888 9.888-9.888z" />
        </svg>
      </a>
    </div>
  );
};

export default WhatsAppButton;
