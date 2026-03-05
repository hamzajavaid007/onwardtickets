'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

const testimonials = [
  {
    name: 'Maria G.',
    location: 'Miami, FL',
    review:
      'Perfect for my UK visa application. The 14-day validity option gave me plenty of time for the appointment. Embassy verified it with the airline directly.',
    image: '/review-maria.jpg',
  },
  {
    name: 'Sarah M.',
    location: 'Los Angeles, CA',
    review:
      'Got my Schengen visa approved! The embassy verified my onward ticket without any issues. $10 saved me from buying a $600 flight before approval. Highly recommend!',
    image: '/review-sarah.jpg',
  },
  {
    name: 'James R.',
    location: 'New York, NY',
    review:
      'Used the 1-hour express service for my urgent Thailand visa appointment. Received valid PNR instantly. Consulate accepted it immediately. Worth every penny!',
    image: '/review-james.jpg',
  },
  {
    name: 'David K.',
    location: 'Chicago, IL',
    review:
      'Needed proof of onward travel for my Australian visa. The return ticket option was exactly what the consulate required. Approved within a week!',
    image: '/review-david.jpg',
  },
];

const CARD_WIDTH = 979;
const GAP = 120;
const STEP = CARD_WIDTH + GAP;

// Clone last item at start, first item at end for seamless looping
const slides = [
  testimonials[testimonials.length - 1],
  ...testimonials,
  testimonials[0],
];

function StarRating({ size = 30 }: { size?: number }) {
  return (
    <div className="flex" style={{ gap: '8px' }}>
      {[...Array(5)].map((_, j) => (
        <svg
          key={j}
          width={size}
          height={size}
          viewBox="0 0 30 30"
          fill="#FFC300"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15 2.5L18.09 10.18L26.18 10.97L20.09 16.32L21.82 24.18L15 20.02L8.18 24.18L9.91 16.32L3.82 10.97L11.91 10.18L15 2.5Z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsCarousel() {
  // slideIndex into the `slides` array (0 = clone of last, 1..4 = real, 5 = clone of first)
  const [slideIndex, setSlideIndex] = useState(2); // start on Sarah M. (real index 1)
  const [isTransitioning, setIsTransitioning] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const jumpWithoutAnimation = useCallback((targetIndex: number) => {
    if (trackRef.current) {
      trackRef.current.style.transition = 'none';
      setSlideIndex(targetIndex);
      // Force reflow then re-enable transition
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (trackRef.current) {
            trackRef.current.style.transition = '';
          }
          setIsTransitioning(false);
        });
      });
    }
  }, []);

  const handleTransitionEnd = useCallback(() => {
    // If we landed on a clone, snap to the real counterpart
    if (slideIndex === 0) {
      // Clone of last → jump to real last
      jumpWithoutAnimation(testimonials.length);
    } else if (slideIndex === slides.length - 1) {
      // Clone of first → jump to real first
      jumpWithoutAnimation(1);
    } else {
      setIsTransitioning(false);
    }
  }, [slideIndex, jumpWithoutAnimation]);

  const goNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSlideIndex((prev) => prev + 1);
  };

  const goPrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSlideIndex((prev) => prev - 1);
  };

  // Auto-play
  useEffect(() => {
    const timer = setInterval(goNext, 5000);
    return () => clearInterval(timer);
  });

  return (
    <section className="py-[60px] bg-white">
      {/* Section Title */}
      <div className="mx-auto max-w-[1240px] px-6 lg:px-0">
        <h2
          className="text-[28px] md:text-[34px] lg:text-[40px] font-medium text-[#1D1D1D] text-center mb-[50px]"
          style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '60px' }}
        >
          CUSTOMER REVIEWS & TESTIMONIALS
        </h2>
      </div>

      {/* === Desktop Carousel === */}
      <div className="hidden lg:block relative overflow-hidden">
        <div
          ref={trackRef}
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            gap: `${GAP}px`,
            transform: `translateX(calc(50vw - ${CARD_WIDTH / 2}px - ${slideIndex * STEP}px))`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {slides.map((t, i) => {
            const isActive = i === slideIndex;
            return (
              <div
                key={i}
                className="flex-shrink-0 bg-white rounded-[2px] flex overflow-hidden transition-all duration-500"
                style={{
                  width: `${CARD_WIDTH}px`,
                  height: '451px',
                  opacity: isActive ? 1 : 0.7,
                  boxShadow: isActive
                    ? '20px 14px 34px rgba(0, 0, 0, 0.10)'
                    : '0px 4px 250px rgba(0, 0, 0, 0.25)',
                }}
              >
                {/* Left - Text Content */}
                <div
                  className="flex flex-col gap-[20px] flex-shrink-0"
                  style={{ width: '567px', padding: '50px 30px' }}
                >
                  <div className="flex flex-col gap-[8px]">
                    <h3
                      className="text-[24px] font-medium text-[#1D1D1D]"
                      style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '36px' }}
                    >
                      {t.name}
                    </h3>
                    <p
                      className="text-[18px] font-normal text-[#1D1D1D]"
                      style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '27px' }}
                    >
                      {t.location}
                    </p>
                  </div>
                  <p
                    className="text-[18px] font-normal text-[#333333]"
                    style={{
                      fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                      lineHeight: '30px',
                      maxWidth: '507px',
                    }}
                  >
                    {t.review}
                  </p>
                  <StarRating />
                </div>

                {/* Right - Image */}
                <div className="flex-1 bg-[#D9D9D9]" style={{ borderRadius: '0 2px 2px 0' }}>
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Arrows */}
        <div
          className="absolute top-1/2 left-1/2 flex justify-between pointer-events-none"
          style={{ transform: 'translate(-50%, -50%)', width: `${CARD_WIDTH + 170}px` }}
        >
          <button
            onClick={goPrev}
            className="w-[55px] h-[55px] rounded-full bg-white flex items-center justify-center pointer-events-auto cursor-pointer hover:bg-gray-50 transition-colors"
            style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
              <path d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z" fill="#1D1D1D" />
            </svg>
          </button>
          <button
            onClick={goNext}
            className="w-[55px] h-[55px] rounded-full bg-white flex items-center justify-center pointer-events-auto cursor-pointer hover:bg-gray-50 transition-colors"
            style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
              <path d="M8.59 16.59L10 18L16 12L10 6L8.59 7.41L13.17 12L8.59 16.59Z" fill="#1D1D1D" />
            </svg>
          </button>
        </div>
      </div>

      {/* === Mobile Layout === */}
      <div className="lg:hidden px-6">
        <div className="flex flex-col gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-[8px] overflow-hidden"
              style={{ boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.10)' }}
            >
              <div className="h-[200px] bg-[#D9D9D9]">
                <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-5 flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <h3
                    className="text-[20px] font-medium text-[#1D1D1D]"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                  >
                    {t.name}
                  </h3>
                  <p
                    className="text-[14px] font-normal text-[#1D1D1D]"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                  >
                    {t.location}
                  </p>
                </div>
                <p
                  className="text-[15px] font-normal text-[#333333]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
                >
                  {t.review}
                </p>
                <StarRating size={22} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
