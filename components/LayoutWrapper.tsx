'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import MarqueeBanner from '@/components/MarqueeBanner';
import GlobalAnimations from '@/components/GlobalAnimations';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  const isAffiliate = pathname.startsWith('/affiliate') && pathname !== '/affiliate/register';

  if (isAdmin || isAffiliate) {
    return <>{children}</>;
  }

  return (
    <>
      <GlobalAnimations />
      <MarqueeBanner />
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
