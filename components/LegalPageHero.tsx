import type { ReactNode } from 'react';
import Image from 'next/image';

type LegalPageHeroProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  imageSrc: string;
  heightPx?: number;
};

export default function LegalPageHero({ title, subtitle, imageSrc, heightPx = 479 }: LegalPageHeroProps) {
  return (
    <div className="mx-auto max-w-[1240px] px-6 lg:px-0">
      <div
        className="relative w-full overflow-hidden"
        style={{ height: `clamp(260px, 55vw, ${heightPx}px)` }}
      >
        <Image
          src={imageSrc}
          alt=""
          fill
          priority
          sizes="(max-width: 1240px) 100vw, 1240px"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black" style={{ opacity: 0.54 }} />

        <div className="relative h-full flex flex-col justify-center px-4 sm:px-[30px] lg:pr-[270px] py-[50px] sm:py-[70px] lg:py-[90px]">
          <div className="flex flex-col gap-[12px]">
            <h1
              className="text-[36px] md:text-[48px] lg:text-[60px] font-semibold text-white"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.3' }}
            >
              {title}
            </h1>
            {subtitle ? (
              <p
                className="text-[16px] font-normal text-white"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
              >
                {subtitle}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
