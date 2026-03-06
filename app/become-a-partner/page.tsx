import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Become a Partner | OnwardTickets',
  description: 'Join our affiliate program and earn commissions on every visa-ready booking you refer. 20% commission, 30-day cookie, monthly payouts.',
};

export default function BecomeAPartnerPage() {
  return (
    <div className="btn-hover-lift w-full bg-white" style={{ fontFamily: 'var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif' }}>

      {/* ===== HERO SECTION ===== */}
      <section
        className="btn-hover-lift relative w-full flex flex-col items-center justify-center text-center"
        style={{ marginTop: '-85px', paddingTop: '85px' }}
      >
        <div
          className="btn-hover-lift absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/partner-hero-bg.jpg)' }}
        />
        <div className="btn-hover-lift absolute inset-0 bg-black/50" />
        <div className="btn-hover-lift relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-0 py-[80px] sm:py-[100px] lg:py-[140px] flex flex-col items-center gap-[24px]">
          <h1
            className="reveal btn-hover-lift text-[36px] md:text-[48px] lg:text-[64px] font-extrabold text-white"
            style={{ lineHeight: '1.5' }}
          >
            Partner with Us &amp; Earn for Every<br className="btn-hover-lift hidden lg:block" /> Visa-Ready Booking You Refer
          </h1>
          <p
            className="btn-hover-lift text-[18px] lg:text-[20px] font-normal text-white max-w-[764px]"
            style={{ lineHeight: '1.5' }}
          >
            Get expert assistance with visa application form filling, supporting documents, and personalized consultation &ndash; delivered within 24 hours!
          </p>
          <Link
            href="/affiliate/register"
            className="btn-hover-lift inline-flex items-center gap-[16px] bg-[#005CFF] text-white rounded-[15px] px-[16px] py-[16px] text-[16px] font-bold capitalize hover:bg-[#0047CC] transition-colors"
          >
            REGISTER NOW
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ===== VALUE PROPOSITION SECTION ===== */}
      <section
        className="btn-hover-lift relative w-full"
        style={{ background: '#F7F6F9' }}
      >
        <div
          className="btn-hover-lift hidden lg:block absolute top-0 right-0 h-full w-[45%] bg-no-repeat bg-right bg-auto"
          style={{ backgroundImage: 'url(/partner-value-bg.png)', backgroundSize: 'auto 100%' }}
        />
        <div className="btn-hover-lift relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-0 py-[60px] sm:py-[80px] lg:py-[100px] flex flex-col lg:flex-row">
          <div className="btn-hover-lift lg:w-[50%] flex flex-col gap-[20px]">
            <h2
              className="reveal btn-hover-lift text-[30px] lg:text-[36px] font-bold text-[#1D2127]"
              style={{ lineHeight: '45px' }}
            >
              Help travelers get verified visa documents &mdash; and get paid for every sale you send.
            </h2>
            <p
              className="btn-hover-lift text-[18px] font-semibold text-black"
              style={{ lineHeight: '1.5' }}
            >
              At OnwardTickets.com, we provide affordable, embassy-accepted flight and hotel reservations for visa applicants worldwide. Our services are fast, trusted, and start at just &pound;5 &mdash; making them easy to promote and convert.
            </p>
            <p
              className="btn-hover-lift text-[24px] font-semibold text-black"
              style={{ lineHeight: '1.5' }}
            >
              Now you can earn 20% commission per sale by joining our affiliate program.
            </p>
            <Link
              href="/affiliate/register"
              className="btn-hover-lift inline-flex items-center gap-[16px] bg-[#005CFF] text-white rounded-[15px] px-[16px] py-[16px] text-[16px] font-bold capitalize hover:bg-[#0047CC] transition-colors self-start"
            >
              APPLY NOW
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
          <div className="btn-hover-lift lg:w-[50%]" />
        </div>
      </section>

      {/* ===== WHY JOIN OUR AFFILIATE PROGRAM ===== */}
      <section className="btn-hover-lift w-full py-[60px] sm:py-[80px] lg:py-[100px]">
        <div className="btn-hover-lift mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-0">
          <h2
            className="reveal btn-hover-lift text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-black text-center mb-[30px] sm:mb-[50px]"
            style={{ lineHeight: '1.3' }}
          >
            Why Join Our Affiliate Program?
          </h2>
          <div className="btn-hover-lift grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] sm:gap-[30px] lg:gap-[50px]">
            {[
              { title: 'Instant Delivery = Fast Conversions', desc: 'Millions apply for visas every year' },
              { title: 'Tracked for 30 Days', desc: 'You get credit even if they return later' },
              { title: 'Perfect for Bloggers, Vloggers, Travel Advisors & Writers', desc: '' },
              { title: 'High-Demand Product', desc: 'Millions apply for visas every year' },
              { title: 'Bank Transfer Payouts, Monthly', desc: 'Minimum $25' },
              { title: 'Earn 25\u201330% Commission', desc: 'On every successful referral' },
            ].map((card, i) => (
              <div
                key={i}
                className="btn-hover-lift bg-white rounded-[12px] flex flex-col items-center justify-center text-center gap-[8px]"
                style={{
                  border: '1px solid #EDEDED',
                  boxShadow: '0 14px 30px rgba(109, 109, 109, 0.25)',
                  padding: '50px 30px',
                }}
              >
                <h3
                  className="reveal btn-hover-lift text-[24px] font-extrabold text-[#005CFF]"
                  style={{ lineHeight: '45px' }}
                >
                  {card.title}
                </h3>
                {card.desc && (
                  <p className="btn-hover-lift text-[18px] font-normal text-black" style={{ lineHeight: '1.5' }}>
                    {card.desc}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHO IS THIS PROGRAM FOR? ===== */}
      <section className="btn-hover-lift w-full py-[60px] sm:py-[80px] lg:py-[100px]">
        <div className="btn-hover-lift mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-0">
          <h2
            className="reveal btn-hover-lift text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-black text-center mb-[30px] sm:mb-[40px]"
            style={{ lineHeight: '1.3' }}
          >
            Who Is This Program For?
          </h2>
          <div className="btn-hover-lift flex flex-col lg:flex-row gap-[30px]">
            <div
              className="btn-hover-lift lg:w-[50%] min-h-[400px] rounded-[20px] bg-cover bg-center bg-no-repeat hidden lg:block"
              style={{ backgroundImage: 'url(/partner-who-image.png)' }}
            />
            <div className="btn-hover-lift lg:w-[50%] flex flex-col gap-[12px]">
              {[
                { text: 'Travel bloggers and digital nomads', icon: '/partner-icon-1.svg' },
                { text: 'YouTube creators covering visa/travel hacks', icon: '/partner-icon-2.svg' },
                { text: 'Expat websites and forums', icon: '/partner-icon-3.svg' },
                { text: 'Visa consultants or student advisors', icon: '/partner-icon-4.svg' },
                { text: 'Email list owners in the travel or remote work niche', icon: '/partner-icon-5.svg' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="btn-hover-lift flex items-center gap-[16px] p-[20px] rounded-[12px]"
                  style={{ background: '#F1FAFF' }}
                >
                  <div className="btn-hover-lift w-[48px] h-[48px] rounded-full bg-[#005CFF] flex items-center justify-center flex-shrink-0">
                    <img src={item.icon} alt="" className="btn-hover-lift w-[24px] h-[24px]" style={{ filter: 'brightness(0) invert(1)' }} />
                  </div>
                  <span className="btn-hover-lift text-[18px] font-normal text-black" style={{ lineHeight: '1.5' }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== COMMISSION STRUCTURE ===== */}
      <section className="btn-hover-lift w-full py-[60px] sm:py-[80px] lg:py-[100px]" style={{ background: '#F5F9FE' }}>
        <div className="btn-hover-lift mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-0">
          <h2
            className="reveal btn-hover-lift text-[26px] sm:text-[30px] lg:text-[36px] font-bold text-black text-center mb-[30px] sm:mb-[40px]"
            style={{ lineHeight: '1.3' }}
          >
            Commission Structure
          </h2>
          <div className="btn-hover-lift mx-auto overflow-x-auto" style={{ maxWidth: '750px' }}>
            <div className="btn-hover-lift rounded-[16px] overflow-hidden">
              <div className="btn-hover-lift flex bg-[#005CFF]">
                <div className="btn-hover-lift w-[33.33%] py-[12px] sm:py-[16px] px-[10px] sm:px-[20px]">
                  <span className="btn-hover-lift text-[14px] sm:text-[18px] lg:text-[20px] font-bold text-white">Service / Product</span>
                </div>
                <div className="btn-hover-lift w-[33.33%] py-[12px] sm:py-[16px] px-[10px] sm:px-[20px] border-l border-r border-white">
                  <span className="btn-hover-lift text-[14px] sm:text-[18px] lg:text-[20px] font-bold text-white">Price</span>
                </div>
                <div className="btn-hover-lift w-[33.33%] py-[12px] sm:py-[16px] px-[10px] sm:px-[20px]">
                  <span className="btn-hover-lift text-[14px] sm:text-[18px] lg:text-[20px] font-bold text-white">Commission</span>
                </div>
              </div>
              {[
                { service: 'Flight Reservation', price: '£5', commission: '20%' },
                { service: 'Hotel Reservation', price: '£5', commission: '20%' },
                { service: 'Travel Itinerary Packages', price: '£10–£15', commission: '20%' },
                { service: 'Full Visa Assistant', price: '£30–£400', commission: '20%' },
              ].map((row, i) => (
                <div key={i} className={`flex bg-white ${i < 3 ? 'border-b border-black' : ''}`}>
                  <div className="btn-hover-lift w-[33.33%] py-[14px] sm:py-[20px] px-[10px]">
                    <span className="btn-hover-lift text-[13px] sm:text-[16px] lg:text-[18px] font-bold text-[#2B2B2B]">{row.service}</span>
                  </div>
                  <div className="btn-hover-lift w-[33.33%] py-[14px] sm:py-[20px] px-[10px] border-l border-r border-black">
                    <span className="btn-hover-lift text-[13px] sm:text-[16px] lg:text-[18px] font-bold text-[#2B2B2B]">{row.price}</span>
                  </div>
                  <div className="btn-hover-lift w-[33.33%] py-[14px] sm:py-[20px] px-[10px]">
                    <span className="btn-hover-lift text-[13px] sm:text-[16px] lg:text-[18px] font-bold text-[#2B2B2B]">{row.commission}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="btn-hover-lift mx-auto mt-[20px] sm:mt-[30px] grid grid-cols-1 md:grid-cols-3 gap-0" style={{ maxWidth: '800px' }}>
            <p className="btn-hover-lift text-[14px] sm:text-[18px] font-bold text-[#2B2B2B] text-center md:text-left py-[10px]">
              Cookie Duration: 30 days
            </p>
            <p className="btn-hover-lift text-[14px] sm:text-[18px] font-bold text-[#2B2B2B] text-center py-[10px] md:border-l md:border-r md:border-black md:px-[20px]">
              Payout Method: Bank Transfer
            </p>
            <p className="btn-hover-lift text-[14px] sm:text-[18px] font-bold text-[#2B2B2B] text-center md:text-right py-[10px]">
              Minimum Payout: &pound;25
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHAT WE PROVIDE YOU ===== */}
      <section className="btn-hover-lift w-full py-[60px] sm:py-[80px] lg:py-[100px]" style={{ background: '#F7F6F9' }}>
        <div className="btn-hover-lift mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-0 flex flex-col lg:flex-row gap-[40px] items-center">
          <div className="btn-hover-lift lg:w-[50%] flex flex-col gap-[16px]">
            <h2
              className="reveal btn-hover-lift text-[30px] lg:text-[36px] font-bold text-[#005CFF] text-left"
              style={{ lineHeight: '62px' }}
            >
              What We Provide You
            </h2>
            <ul className="btn-hover-lift text-[18px] font-semibold text-[#2B2B2B] list-disc pl-[20px] flex flex-col gap-[12px]" style={{ lineHeight: '2.5' }}>
              <li>Custom tracking link</li>
              <li>Promo banners (optional but helpful)</li>
              <li>Sample content &amp; CTAs for your blog,<br />email, or social media</li>
              <li>Transparent stats and dashboard to<br />track earnings</li>
            </ul>
          </div>
          <div className="btn-hover-lift lg:w-[50%] flex justify-center">
            <img
              src="/partner-promo.png"
              alt="Affiliate program"
              className="btn-hover-lift max-w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* ===== AFFILIATE TERMS (SIMPLIFIED) ===== */}
      <section className="btn-hover-lift w-full py-[60px] sm:py-[80px] lg:py-[100px] bg-white">
        <div className="btn-hover-lift mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-0 flex flex-col lg:flex-row gap-[30px] sm:gap-[50px] items-center">
          <div className="btn-hover-lift lg:w-[50%] hidden lg:flex justify-center">
            <img
              src="/partner-promo.png"
              alt="Affiliate terms"
              className="btn-hover-lift max-w-full h-auto"
            />
          </div>
          <div className="btn-hover-lift lg:w-[50%] flex flex-col gap-[16px]">
            <h2
              className="reveal btn-hover-lift text-[30px] lg:text-[36px] font-bold text-[#005CFF] text-left"
              style={{ lineHeight: '62px' }}
            >
              Affiliate Terms (Simplified)
            </h2>
            <ul className="btn-hover-lift text-[18px] font-semibold text-[#2B2B2B] list-disc pl-[20px] flex flex-col gap-[12px]" style={{ lineHeight: '2.5' }}>
              <li>No bidding on &ldquo;OnwardTickets&rdquo; in Google Ads</li>
              <li>No spamming or incentivized clicks</li>
              <li>Must disclose affiliate links (FTC compliance)</li>
              <li>No misleading claims (e.g., &ldquo;guaranteed visa approval&rdquo;)</li>
            </ul>
            <p className="btn-hover-lift text-[24px] font-semibold text-[#2B2B2B]" style={{ lineHeight: '1.5' }}>
              We review every application for quality and relevance.
            </p>
          </div>
        </div>
      </section>

      {/* ===== HOW TO GET STARTED ===== */}
      <section className="btn-hover-lift relative w-full">
        <div
          className="btn-hover-lift absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/partner-howto-bg.jpg)' }}
        />
        <div className="btn-hover-lift absolute inset-0 bg-black/50" />
        <div className="btn-hover-lift relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-0 py-[60px] sm:py-[80px] lg:py-[100px] flex flex-col lg:flex-row">
          <div
            className="btn-hover-lift lg:w-[65%] rounded-[12px] p-[24px] sm:p-[40px] lg:p-[60px] flex flex-col gap-[20px]"
            style={{ background: 'rgba(32, 32, 32, 0.6)' }}
          >
            <h2
              className="reveal btn-hover-lift text-[28px] sm:text-[36px] lg:text-[64px] font-extrabold text-white text-left"
              style={{ lineHeight: '1.5' }}
            >
              How to Get Started
            </h2>
            <ul className="btn-hover-lift text-[18px] font-semibold text-white list-disc pl-[20px] flex flex-col gap-[8px]" style={{ lineHeight: '2' }}>
              <li>Apply to Join using our registration form</li>
              <li>Get your unique affiliate tracking link</li>
              <li>Promote OnwardTickets on your content channels</li>
              <li>Earn commissions on every confirmed sale</li>
            </ul>
          </div>
          <div className="btn-hover-lift lg:w-[35%]" />
        </div>
      </section>

      {/* ===== CTA SECTION (replaces form) ===== */}
      <section className="btn-hover-lift w-full py-[60px] sm:py-[80px] lg:py-[100px]" style={{ background: '#F5F9FE' }}>
        <div className="btn-hover-lift mx-auto max-w-[800px] px-4 sm:px-6 lg:px-0 text-center">
          <h2
            className="reveal btn-hover-lift text-[30px] lg:text-[36px] font-bold text-[#005CFF]"
            style={{ lineHeight: '1.3' }}
          >
            Ready to Start Earning?
          </h2>
          <p className="btn-hover-lift text-[18px] text-[#2B2B2B] mt-[16px] mb-[32px]" style={{ lineHeight: '1.5' }}>
            Join our affiliate program today and earn 20% commission on every sale you refer. Application takes less than 2 minutes.
          </p>
          <Link
            href="/affiliate/register"
            className="btn-hover-lift inline-flex items-center gap-[16px] bg-[#005CFF] text-white rounded-[15px] px-[32px] py-[18px] text-[18px] font-bold capitalize hover:bg-[#0047CC] transition-colors"
          >
            APPLY NOW
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
          <p className="btn-hover-lift text-[14px] text-[#54595F] mt-[16px]">
            Already an affiliate?{' '}
            <Link href="/affiliate/login" className="btn-hover-lift text-[#005CFF] font-semibold hover:underline">
              Log in to your dashboard
            </Link>
          </p>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="btn-hover-lift w-full bg-[#005CFF] py-[40px] sm:py-[60px]">
        <div className="btn-hover-lift mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-0 flex flex-col items-center text-center gap-[16px]">
          <h2
            className="reveal btn-hover-lift text-[24px] lg:text-[30px] font-normal text-white"
            style={{ lineHeight: '1.5' }}
          >
            Have questions about the affiliate program?
          </h2>
          <p className="btn-hover-lift text-[16px] text-white/80">
            Contact us at <a href="mailto:contact@onwardtickets.com" className="btn-hover-lift underline text-white">contact@onwardtickets.com</a> or call <a href="tel:+4477561525115" className="btn-hover-lift underline text-white">+44 77561 525115</a>
          </p>
        </div>
      </section>
    </div>
  );
}
