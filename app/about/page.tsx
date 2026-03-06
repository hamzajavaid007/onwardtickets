'use client';

import { useRef, useState } from 'react';

const testimonials = [
  {
    name: 'Sarah M.',
    location: 'Los Angeles, CA',
    avatar: '/testimonial-sarah.jpg',
    text: '\u201CNeeded proof of onward travel for my Schengen visa. OnwardTicket.us provided a legitimate reservation that the German embassy verified. Visa approved! Saved me from buying an expensive ticket before approval. Highly recommend!\u201D',
    visaType: 'Visa Type: Schengen (Germany)',
    result: 'Result: Approved',
  },
  {
    name: 'Jams.R',
    location: 'New York, NY',
    avatar: '/testimonial-jams.jpg',
    text: 'Last-minute Thailand trip. Used the 1-hour express service. Got my onward ticket immediately, showed it at Bangkok immigration, no problems. Worth every penny for the peace of mind.\u201D',
    visaType: 'Destination: Thailand',
    result: 'Result: Smooth entry',
  },
  {
    name: 'Maria G',
    location: 'Los Angeles, CA',
    avatar: '/testimonial-maria.jpg',
    text: '\u201CPlanning a 3-month European trip through multiple countries. Got a multi-city ticket showing my complete route. UK embassy accepted it without question. Extremely professional service.\u201D',
    visaType: 'Visa Type: UK Tourist Visa',
    result: 'Result: Approved',
  },
  {
    name: 'David K.',
    location: 'Chicago, IL',
    avatar: '/testimonial-david.jpg',
    text: '\u201CWas skeptical at first, but needed proof for Australia visa. The PNR was real and verifiable. Embassy called the airline and confirmed my reservation. Visa approved in 2 weeks!\u201D',
    visaType: 'Visa Type: Australia Visitor Visa',
    result: 'Result: Approved',
  },
  {
    name: 'Jennifer L.',
    location: 'Houston, TX',
    avatar: '/testimonial-jennifer.jpg',
    text: '\u201CCustomer support was amazing! Had questions at 11 PM, got immediate responses via live chat. They helped me choose the right ticket type for my situation. Perfect service.\u201D',
    visaType: 'Highlight: 24/7 Support',
    result: 'Result: Approved',
  },
];

const aboutFaqItems = [
  {
    question: 'Is this legal?',
    answer: 'Yes, absolutely. We create legitimate flight reservations (not fake documents) that meet embassy requirements for proof of onward travel.',
  },
  {
    question: 'Do embassies really accept this?',
    answer: 'Yes. Our reservations are real airline bookings with valid PNR codes that embassy officers can verify directly with airlines. We have a 99%+ embassy acceptance rate across thousands of applications.',
  },
  {
    question: 'How long is the reservation valid?',
    answer: 'Reservation validity typically ranges from 24 hours to 14 days, depending on the airline and ticket type. The validity period is determined by the airline\'s booking system, not by us.',
  },
  {
    question: 'Can I use this for actual travel?',
    answer: 'No. Our reservations are for visa documentation purposes only. If you need to actually fly, you must purchase a real flight ticket from an airline or booking site.',
  },
  {
    question: 'What if my visa gets rejected?',
    answer: 'If your visa is rejected specifically because of the onward ticket (with official embassy documentation), we provide a refund. The reservation will simply expire after its validity period.',
  },
  {
    question: 'How quickly will I receive my ticket?',
    answer: 'Delivery depends on the speed you select at checkout. We offer standard, fast, and express delivery options. Express delivery can get your ticket to you within 1 hour.',
  },
  {
    question: 'For more questions:',
    answer: 'Visit our main FAQ page or contact our 24/7 customer support team via live chat, email, or phone. We\'re always happy to help with any questions about our service.',
  },
];

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div className="flex flex-col gap-[6px]">
      {aboutFaqItems.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`overflow-hidden transition-all duration-1000 ${
              isOpen
                ? 'bg-[#E3EDFF] rounded-[16px]'
                : 'bg-white rounded-[16px] border border-[#D7D7D7]'
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="w-full flex items-center justify-between p-[20px] text-left cursor-pointer"
            >
              <span
                className="text-[16px] lg:text-[20px] font-medium text-[#1D1D1D]"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '30px' }}
              >
                {item.question}
              </span>
              <svg
                className={`w-[24px] h-[24px] flex-shrink-0 ml-4 transition-transform duration-1000 ${isOpen ? 'rotate-180' : ''}`}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="#1D1D1D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div
              className="grid transition-all duration-1000"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <div className="px-[20px] pb-[20px]">
                  <p
                    className="text-[14px] lg:text-[16px] font-normal text-[#1D1D1D]"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
                  >
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const AboutPage = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const cardWidth = 390 + 24; // card width + gap
    scrollRef.current.scrollBy({
      left: direction === 'right' ? cardWidth : -cardWidth,
      behavior: 'smooth',
    });
  };

  return (
    <div className="w-full bg-white">

      {/* Hero Section */}
      <section className="w-full bg-[#EDF3FF]">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-0 relative overflow-hidden" style={{ minHeight: '628px' }}>
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-0">

            {/* Left - Text Content */}
            <div className="flex-shrink-0 lg:w-[544px] pt-[68px] lg:pt-[123px] pb-10 lg:pb-[123px] relative z-10">
              <div className="flex flex-col gap-[24px]">
                <h1
                  className="text-[36px] md:text-[48px] lg:text-[60px] font-semibold text-[#161616]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.3' }}
                >
                  About Us &ndash;<br /><span className="text-[#005CFF]">OnwardTicket</span>.us
                </h1>
                <div className="flex flex-col gap-[8px]">
                  <p
                    className="text-[16px] font-normal text-[#161616]"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
                  >
                    <span className="font-medium">Meta Description:</span>
                    <br />
                    Learn about OnwardTicket.us - your trusted source for verified flight reservations for visa applications since 2019. 10,000+ successful visa applications. 24/7 support.
                  </p>
                  <p
                    className="text-[18px] font-semibold text-[#161616]"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '27px' }}
                  >
                    URL: /about-us
                  </p>
                </div>
              </div>
            </div>

            {/* Right - Image Grid with Decorative Ellipses */}
            <div className="hidden lg:block relative" style={{ width: '828px', height: '628px' }}>
              {/* Decorative Ellipses */}
              <div
                className="absolute rounded-full border border-[#1D1D1D]"
                style={{ width: '743px', height: '743px', left: '85px', top: '85px', opacity: 0.15 }}
              />
              <div
                className="absolute rounded-full border border-[#1D1D1D]"
                style={{ width: '743px', height: '743px', left: '0px', top: '0px', opacity: 0.15 }}
              />
              <div
                className="absolute rounded-full border border-[#1D1D1D]"
                style={{ width: '573px', height: '573px', left: '251px', top: '272px', opacity: 0.15 }}
              />
              <div
                className="absolute rounded-full border border-[#1D1D1D]"
                style={{ width: '573px', height: '573px', left: '166px', top: '187px', opacity: 0.15 }}
              />

              <div className="absolute overflow-hidden" style={{ width: '162px', height: '343px', left: '88px', top: '25px', borderRadius: '90px' }}>
                <div className="absolute inset-0 bg-[#6E1FED]" />
                <img src="/about-person1.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="absolute overflow-hidden" style={{ width: '162px', height: '162px', left: '272px', top: '25px', borderRadius: '90px' }}>
                <div className="absolute inset-0 bg-[#60D3D9]" />
                <img src="/about-person4.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="absolute overflow-hidden" style={{ width: '162px', height: '343px', left: '272px', top: '208px', borderRadius: '90px' }}>
                <div className="absolute inset-0 bg-[#FF7E29]" />
                <img src="/about-person3.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="absolute overflow-hidden" style={{ width: '162px', height: '162px', left: '88px', top: '390px', borderRadius: '90px' }}>
                <div className="absolute inset-0 bg-[#DB2A6B]" />
                <img src="/about-person2.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="absolute overflow-hidden" style={{ width: '162px', height: '343px', left: '455px', top: '117px', borderRadius: '90px' }}>
                <div className="absolute inset-0 bg-[#F4B840]" />
                <img src="/about-person5.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="mx-auto max-w-[1240px] px-6 lg:px-0 py-[80px]">
        <div className="flex flex-col lg:flex-row gap-[40px] items-center">
          <div className="flex-1">
            <div className="flex flex-col gap-[16px]">
              <h2
                className="text-[28px] sm:text-[36px] lg:text-[40px] font-medium text-[#1D1D1D]"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.4' }}
              >
                Who We Are
              </h2>
              <p
                className="text-[16px] font-normal text-[#262626]"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
              >
                OnwardTicket.us is your trusted partner for verified flight reservations designed specifically for visa applications and immigration documentation.
              </p>
            </div>
            <p
              className="text-[17px] font-normal text-[#323232] mt-[24px]"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '25.5px' }}
            >
              We understand the stress and complexity of visa applications. That&rsquo;s why we created a simple, affordable solution that eliminates the risk of buying expensive flights before visa approval&mdash;while still meeting all embassy and immigration requirements. Since 2019, we&rsquo;ve helped over 10,000 travelers from around the world successfully obtain tourist visas, business visas, and meet immigration requirements by providing legitimate, embassy-accepted onward tickets starting at just $10.
            </p>
          </div>
          <div className="relative flex-shrink-0 hidden lg:block" style={{ width: '555px', height: '423px' }}>
            <img
              src="/who-we-are-1.png"
              alt=""
              className="absolute rounded-[8px] object-cover"
              style={{ width: '307px', height: '274px', left: '0px', top: '0px' }}
            />
            <img
              src="/who-we-are-2.png"
              alt=""
              className="absolute rounded-[8px] object-cover"
              style={{ width: '307px', height: '271px', left: '248px', top: '152px' }}
            />
            <img
              src="/who-we-are-3.png"
              alt=""
              className="absolute rounded-[8px] object-cover"
              style={{ width: '175px', height: '133px', left: '165px', top: '100px' }}
            />
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="mx-auto max-w-[1240px] px-6 lg:px-0 py-[80px]">
        <div className="flex flex-col items-center gap-[40px]">
          <h2
            className="text-[28px] sm:text-[36px] lg:text-[40px] font-medium text-[#1D1D1D] text-center"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.4' }}
          >
            Our Mission
          </h2>
          <div className="flex flex-col items-center gap-[8px] text-center">
            <h3
              className="text-[24px] font-medium text-[#262626]"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '36px' }}
            >
              Making Visa Applications Stress-Free and Affordable
            </h3>
            <p
              className="text-[16px] font-normal text-[#262626]"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
            >
              Our mission is simple: Help travelers meet visa documentation<br />
              requirements without the financial risk of purchasing full-price flight<br />
              tickets before visa approval.
            </p>
          </div>

          {/* Numbered circles with connecting line + Cards */}
          <div className="w-full flex flex-col items-center gap-[40px]">
            {/* Numbered circles with connecting line */}
            <div className="relative hidden md:flex items-center justify-center w-full">
              <div className="absolute h-[1px] bg-[#BEBEBE] w-[90%]" />
              <div className="relative flex items-center justify-between w-full max-w-[1064px]">
                {[
                  { num: '1', active: true },
                  { num: '2', active: false },
                  { num: '3', active: false },
                  { num: '4', active: false },
                  { num: '5', active: false },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`w-[39px] h-[39px] rounded-full flex items-center justify-center z-10 ${
                      item.active ? 'bg-[#005CFF]' : 'bg-[#BEBEBE]'
                    }`}
                  >
                    <span
                      className="text-[18px] font-bold text-white"
                      style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '27px' }}
                    >
                      {item.num}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-[25px] justify-center">
              {[
                { text: 'Visa applications shouldn\u2019t require financial risk', active: true },
                { text: 'Travel documentation should be accessible and affordable', active: false },
                { text: 'Every traveler deserves legitimate, verifiable proof of onward travel', active: false },
                { text: 'Customer support should be available 24/7 when you need it', active: false },
                { text: 'Transparency and honesty build lasting trust', active: false },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-center rounded-[12px] ${
                    item.active ? 'bg-[#005CFF] text-white' : 'bg-white text-[#262626] border border-[#E0E0E0]'
                  }`}
                  style={{ minHeight: '200px', padding: '24px' }}
                >
                  <span
                    className="text-[18px] font-medium text-center"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '27px' }}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="mx-auto max-w-[1240px] px-6 lg:px-0 py-[80px]">
        <div className="flex flex-col gap-[60px]">
          <div className="flex flex-col items-center gap-[8px] text-center">
            <h2
              className="text-[28px] sm:text-[36px] lg:text-[40px] font-medium text-[#1D1D1D]"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.4' }}
            >
              Our Story
            </h2>
            <p
              className="text-[16px] font-normal text-[#323232]"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
            >
              How OnwardTicket.us Was Born
            </p>
          </div>

          {/* The Problem We Saw */}
          <div className="flex flex-col lg:flex-row gap-[56px] items-center">
            <img src="/story-problem.jpg" alt="" className="w-[562px] h-[402px] rounded-[6px] object-cover flex-shrink-0 hidden lg:block" />
            <div className="flex flex-col gap-[16px] flex-1">
              <h3
                className="text-[24px] font-normal text-[#1D1D1D]"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '36px' }}
              >
                The Problem We Saw:
              </h3>
              <p
                className="text-[16px] font-normal text-[#1D1D1D]"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
              >
                In 2018, our founder was helping a friend apply for a Schengen visa. The embassy required proof of onward travel, but purchasing a $600 round-trip flight before visa approval seemed risky&mdash;what if the visa was rejected?
              </p>
              <p
                className="text-[16px] font-normal text-[#1D1D1D]"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
              >
                After researching alternatives, we discovered:
              </p>
              <div
                className="text-[16px] font-normal text-[#1D1D1D]"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '32px' }}
              >
                <p>&#10060; Buying expensive flights before approval was financially risky</p>
                <p>&#10060; Free 24-hour cancellation tricks were unreliable and time-consuming</p>
                <p>&#10060; Fake documents led to visa rejections and legal issues</p>
                <p>&#10003; Legitimate flight reservations (not purchased tickets) were accepted by embassies</p>
              </div>
            </div>
          </div>

          {/* The Solution We Built */}
          <div className="flex flex-col lg:flex-row-reverse gap-[56px] items-center">
            <img src="/story-solution.jpg" alt="" className="w-[562px] h-[402px] rounded-[6px] object-cover flex-shrink-0 hidden lg:block" />
            <div className="flex flex-col gap-[16px] flex-1">
              <h3
                className="text-[24px] font-normal text-[#1D1D1D]"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '36px' }}
              >
                The Solution We Built:
              </h3>
              <p
                className="text-[16px] font-normal text-[#1D1D1D]"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
              >
                We created OnwardTicket.us to provide real, verifiable flight reservations specifically for visa documentation&mdash;affordable, legitimate, and embassy-accepted.
              </p>
              <p
                className="text-[16px] font-normal text-[#1D1D1D]"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
              >
                What started as helping one friend has grown to:
              </p>
              <div
                className="text-[16px] font-normal text-[#1D1D1D]"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '32px' }}
              >
                <p>10,000+ successful visa applications</p>
                <p>Service to travelers in 190+ countries</p>
                <p>99%+ embassy acceptance rate</p>
                <p>4.8/5 star customer rating</p>
                <p>24/7 customer support team</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="w-full">
        <div className="mx-auto flex flex-col items-center px-4 sm:px-8 lg:px-[100px] py-[40px] sm:py-[60px]" style={{ maxWidth: '1440px', gap: '50px' }}>
          <div className="flex flex-col items-center text-center">
            <h2
              className="text-[28px] sm:text-[36px] lg:text-[40px] font-medium text-[#1D1D1D]"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.4' }}
            >
              How We Work
            </h2>
            <p
              className="text-[16px] font-normal text-[#262626]"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
            >
              Our Process is Simple and Transparent
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[26px] w-full max-w-[1050px]">
            {[
              {
                step: 'Step 1',
                title: 'You Place Your Order',
                items: [
                  'Choose ticket type (one-way, return, or multi-city)',
                  'Enter your travel details',
                  'Provide passenger information (exactly as on passport)',
                  'Select delivery speed',
                ],
              },
              {
                step: 'Step 2',
                title: 'We Create Your Reservation',
                items: [
                  'Access airline booking systems',
                  'Generate valid PNR',
                  'Create verifiable reservation',
                  'Prepare embassy-ready documentation',
                ],
              },
              {
                step: 'Step 3',
                title: 'You Receive Your Ticket',
                items: [
                  'Email delivery within selected timeframe',
                  'Booking confirmation with PNR',
                  'Printable PDF documentation',
                  'Ready for visa application',
                ],
              },
              {
                step: 'Step 4',
                title: 'You Apply for Your Visa',
                items: [
                  'Submit reservation with visa application',
                  'Embassy verifies PNR with airline',
                  'Meet documentation requirements',
                  'Increase approval chances',
                ],
              },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-white rounded-[6px] flex flex-col px-4 sm:px-8 md:px-[60px] py-8 sm:py-10"
                style={{ gap: '12px', boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.06)' }}
              >
                <span
                  className="text-[18px] font-semibold text-[#005BFF]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '27px' }}
                >
                  {card.step}
                </span>
                <h3
                  className="text-[24px] font-medium text-[#262626]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '36px' }}
                >
                  {card.title}
                </h3>
                <div className="flex flex-col" style={{ gap: '8px' }}>
                  {card.items.map((item, j) => (
                    <p
                      key={j}
                      className="text-[16px] font-normal text-[#262626]"
                      style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
                    >
                      <span className="mr-[6px]">&#8226;</span>{item}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p
            className="text-[16px] font-normal text-[#262626] text-center w-full"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
          >
            That&rsquo;s it! Simple, fast, and reliable.
          </p>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-0 relative" style={{ paddingTop: '51px', paddingBottom: '60px' }}>
          {/* Decorative rectangle */}
          <img
            src="/why-choose-decor.png"
            alt=""
            className="absolute hidden lg:block pointer-events-none"
            style={{ width: '311px', height: '295px', borderRadius: '12px', right: '128px', top: '5px' }}
          />

          <div className="flex flex-col" style={{ gap: '50px' }}>
            <h2
              className="text-[28px] sm:text-[36px] lg:text-[48px] font-medium text-[#1D1D1D] text-left"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.3', maxWidth: '686px' }}
            >
              WHY CHOOSE<br /><span className="text-[#005CFF]">ONWARDTICKET.US FOR YOUR VISA?</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2" style={{ columnGap: '43px', rowGap: '25px' }}>
              {[
                { icon: '/why-choose-icon-1.png', title: 'Real Airline Reservations', titleSize: '24px', desc: 'We create actual bookings in airline systems with valid PNRs. Embassy visa officers can verify your reservation directly with carriers.' },
                { icon: '/why-choose-icon-2.png', title: 'Quick Delivery', titleSize: '18px', desc: 'Receive your ticket via email within your selected timeframe. Delivery speed options available at checkout.' },
                { icon: '/why-choose-icon-3.png', title: 'Validity', titleSize: '18px', desc: 'Ticket validity typically ranges from 24 hours up to 14 days' },
                { icon: '/why-choose-icon-4.png', title: 'Flexible Options', titleSize: '18px', desc: 'One-way tickets from $10, return tickets from $10, or multi-city itineraries for $17. Choose what matches your visa requirements.' },
                { icon: '/why-choose-icon-5.png', title: 'Embassy Accepted', titleSize: '18px', desc: 'Our reservations meet all embassy and consulate requirements. Successfully used for thousands of visa applications worldwide.' },
                { icon: '/why-choose-icon-6.png', title: 'Global Coverage', titleSize: '18px', desc: 'Book tickets for any visa application: Schengen visas, US visas, UK visas, Australian visas, and 190+ countries worldwide.' },
              ].map((card, i) => (
                <div key={i} className="bg-[#E3EDFF] rounded-[12px] p-[20px] flex flex-col gap-[20px]">
                  <div className="flex items-center gap-[20px]">
                    <img src={card.icon} alt="" className="w-[50px] h-[50px] object-contain flex-shrink-0" />
                    <span
                      className="font-medium text-[#262626]"
                      style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: card.titleSize, lineHeight: '28px' }}
                    >
                      {card.title}
                    </span>
                  </div>
                  <p
                    className="text-[18px] font-normal text-[#666666]"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '28px' }}
                  >
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section (How We Work / Core Values) */}
      <section className="mx-auto max-w-[1240px] px-6 lg:px-0 py-[80px]">
        <div className="flex flex-col gap-[40px]">
          <div className="flex flex-col lg:flex-row gap-[40px]">
            <div className="flex flex-col gap-[8px]">
              <h2
                className="text-[28px] sm:text-[36px] lg:text-[48px] font-medium text-[#1D1D1D]"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.3' }}
              >
                How We Work
              </h2>
              <h3
                className="text-[22px] sm:text-[32px] lg:text-[48px] font-normal text-[#005CFF]"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.3' }}
              >
                Our Process is Simple and Transparent
              </h3>
            </div>
            <div className="bg-white border border-[#E0E0E0] rounded-[12px] p-[30px] flex flex-col gap-[16px] lg:w-[600px] flex-shrink-0">
              <h4
                className="text-[24px] font-normal text-[#1D1D1D]"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '36px' }}
              >
                &#128142; Integrity
              </h4>
              <p
                className="text-[20px] font-medium text-[#1D1D1D]"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '30px' }}
              >
                We only provide legitimate, real reservations.
              </p>
              <p
                className="text-[16px] font-normal text-[#1D1D1D]"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
              >
                No fake PNRs, no forged documents, no deceptive practices. Our reservations are created in actual airline systems and can be verified by any embassy or immigration officer.
              </p>
              <p
                className="text-[20px] font-medium text-[#1D1D1D]"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '30px' }}
              >
                We never:
              </p>
              <div
                className="text-[16px] font-normal text-[#1D1D1D]"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
              >
                <p>Create fake bookings</p>
                <p>Forge airline documents</p>
                <p>Make false promises</p>
                <p>Misrepresent our service</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
            {[
              {
                icon: '\uD83E\uDD1D',
                title: 'Transparency',
                subtitle: 'Honest about what we provide and how it works.',
                listTitle: 'We clearly explain:',
                items: [
                  "What our service includes (and doesn't include)",
                  'How validity periods work (airline-determined, not us)',
                  'What embassies accept (and any limitations)',
                  'Realistic expectations for visa applications',
                ],
                footer: 'No hidden fees, no surprises, no fine print tricks.',
              },
              {
                icon: '\uD83C\uDFAF',
                title: 'Customer Success',
                subtitle: 'Your visa success is our success.',
                listTitle: 'We measure ourselves by:',
                items: [
                  'Successful visa applications using our tickets',
                  'Embassy acceptance rates',
                  'Customer satisfaction scores',
                  'Repeat customer rate',
                ],
                footer: 'When you succeed, we succeed.',
              },
              {
                icon: '\uD83D\uDE80',
                title: 'Innovation',
                subtitle: 'Constantly improving our service.',
                listTitle: 'We continuously:',
                items: [
                  'Monitor embassy requirement changes',
                  'Update our processes',
                  'Improve delivery times',
                  'Enhance customer experience',
                  'Add new features based on feedback',
                ],
                footer: '',
              },
              {
                icon: '\uD83D\uDC99',
                title: 'Empathy',
                subtitle: 'We understand the stress of visa applications.',
                listTitle: "We know what it's like to:",
                items: [
                  'Navigate complex visa requirements',
                  'Worry about documentation being rejected',
                  'Feel overwhelmed by the process',
                  'Need help outside business hours',
                ],
                footer: "That's why we built a service that reduces stress, not adds to it.",
              },
            ].map((card, i) => (
              <div key={i} className="bg-white border border-[#E0E0E0] rounded-[12px] p-[30px] flex flex-col gap-[12px]">
                <h4
                  className="text-[24px] font-normal text-[#1D1D1D]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '36px' }}
                >
                  {card.icon} {card.title}
                </h4>
                <p
                  className="text-[20px] font-medium text-[#1D1D1D]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '30px' }}
                >
                  {card.subtitle}
                </p>
                <p
                  className="text-[20px] font-medium text-[#1D1D1D]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '30px' }}
                >
                  {card.listTitle}
                </p>
                <div
                  className="text-[16px] font-normal text-[#1D1D1D]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
                >
                  {card.items.map((item, j) => (
                    <p key={j}>{item}</p>
                  ))}
                </div>
                {card.footer && (
                  <p
                    className="text-[20px] font-medium text-[#1D1D1D]"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '30px' }}
                  >
                    {card.footer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* By The Numbers Section */}
      <section className="w-full">
        <div className="mx-auto flex flex-col items-center px-4 sm:px-8 lg:px-[100px] py-[40px] sm:py-[60px]" style={{ maxWidth: '1148px', gap: '50px' }}>
          <div className="flex flex-col items-center text-center w-full max-w-[722px]">
            <h2
              className="text-[28px] sm:text-[36px] lg:text-[40px] font-medium text-[#1D1D1D] text-center w-full"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.4' }}
            >
              By The Numbers
            </h2>
            <p
              className="text-[16px] font-normal text-[#262626] text-center w-full"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
            >
              Our Track Record
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-[28px] w-full max-w-[948px]">
            {[
              { num: '10,000+', desc: 'Successful visa applications using our tickets' },
              { num: '190+', desc: "Countries we've helped travelers visit" },
              { num: '99%+', desc: 'Embassy acceptance rate for our reservations' },
              { num: '24/7', desc: 'Customer support availability (365 days/year)' },
              { num: '4.8/5', desc: 'Average customer rating (Trustpilot verified)' },
              { num: '1-24', desc: 'Hours delivery timeframe (depending on speed selected)' },
              { num: '$10', desc: 'Starting price (one-way or return tickets)' },
              { num: '2019', desc: 'Year founded (5+ years of experience)' },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white flex flex-col items-center justify-center text-center"
                style={{ minHeight: '140px', padding: '16px', borderRadius: '16px', border: '1px solid #DEDEDE', boxShadow: '0px 4px 44px #F2F2F2' }}
              >
                <span
                  className="text-[24px] font-medium text-[#1D1D1D] text-center"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '36px' }}
                >
                  {stat.num}
                </span>
                <p
                  className="text-[16px] font-normal text-[#323232] text-center"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
                >
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Success Stories */}
      <section className="w-full overflow-hidden">
        <div className="mx-auto flex flex-col px-4 sm:px-8 lg:px-[100px] py-[40px] sm:py-[60px]" style={{ maxWidth: '1440px', gap: '40px' }}>
          {/* Header Row */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col flex-1">
              <h2
                className="text-[28px] sm:text-[36px] lg:text-[40px] font-medium text-[#1D1D1D]"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.4' }}
              >
                Customer Success Stories
              </h2>
              <p
                className="text-[16px] font-normal text-[#262626]"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
              >
                Real Travelers, Real Results
              </p>
            </div>
            <div className="hidden lg:flex items-center" style={{ gap: '20px' }}>
              <button className="flex items-center justify-center cursor-pointer" style={{ width: '42px', height: '42px' }} aria-label="Previous" onClick={() => scrollByCard('left')}>
                <img src="/arrow-left.svg" alt="Previous" width={42} height={42} />
              </button>
              <button className="flex items-center justify-center cursor-pointer" style={{ width: '42px', height: '42px' }} aria-label="Next" onClick={() => scrollByCard('right')}>
                <img src="/arrow-right.svg" alt="Next" width={42} height={42} />
              </button>
            </div>
          </div>

          {/* Cards Row */}
          <div ref={scrollRef} className="flex overflow-x-auto" style={{ gap: '24px', scrollbarWidth: 'none' }}>
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="bg-white flex-shrink-0 flex flex-col"
                  style={{ width: '300px', minWidth: '280px', maxWidth: '390px', padding: '20px', gap: '12px', borderRadius: '12px', border: '1px solid #B5B5B5' }}
                >
                  {/* Author Header */}
                  <div className="flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center" style={{ gap: '12px' }}>
                      <div className="w-[50px] h-[50px] rounded-full bg-[#D9D9D9] overflow-hidden flex-shrink-0">
                        <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col" style={{ gap: '2px' }}>
                        <span
                          className="font-medium text-[#2D2E2E]"
                          style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: '16px', lineHeight: '24px' }}
                        >
                          {t.name}
                        </span>
                        <span
                          className="font-medium text-[#786F6F]"
                          style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: '13px', lineHeight: '18px' }}
                        >
                          {t.location}
                        </span>
                      </div>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, j) => (
                        <svg key={j} width="20" height="20" viewBox="0 0 20 20" fill="#FFC300">
                          <polygon points="10,2 12.3,7.3 18,8 14,12 15.3,18 10,15 4.7,18 6,12 2,8 7.7,7.3" />
                        </svg>
                      ))}
                    </div>
                  </div>

                  {/* Review Quote */}
                  <p
                    className="flex-1 text-[#333333]"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: '14px', fontWeight: 400, lineHeight: '20px' }}
                  >
                    {t.text}
                  </p>

                  {/* Meta Info */}
                  <div className="flex flex-col flex-shrink-0" style={{ gap: '2px' }}>
                    <span
                      className="text-[#1D1D1D]"
                      style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: '14px', fontWeight: 400, lineHeight: '20px' }}
                    >
                      {t.visaType}
                    </span>
                    <span
                      className="text-[#1D1D1D]"
                      style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: '14px', fontWeight: 400, lineHeight: '20px' }}
                    >
                      {t.result}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* What We're NOT Section */}
      <section className="mx-auto max-w-[868px] px-6 lg:px-0 py-[80px]">
        <div className="flex flex-col gap-[40px]">
          <div className="flex flex-col gap-[8px] items-center text-center">
            <h2
              className="text-[28px] sm:text-[36px] lg:text-[40px] font-medium text-[#1D1D1D]"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.4' }}
            >
              What We&rsquo;re NOT
            </h2>
            <p
              className="text-[16px] font-normal text-[#262626]"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
            >
              Setting Clear Expectations
            </p>
          </div>

          <div className="flex flex-col gap-[40px]">
            {/* Item 1: Text left, Image right */}
            <div className="flex flex-col lg:flex-row gap-[40px] items-center">
              <div className="flex-1 flex flex-col gap-[12px]">
                <h3
                  className="text-[16px] font-semibold text-[#262626]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                >
                  &#10060; We Don&rsquo;t Sell Flight Tickets for Actual Travel
                </h3>
                <p
                  className="text-[16px] font-normal text-[#262626]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
                >
                  <span className="font-semibold">Our reservations are for documentation only.</span>
                  <br />
                  If you need to actually fly, you must purchase a real flight ticket from airlines or booking sites. Our service is specifically for visa applications and immigration proof&mdash;not for boarding planes.
                </p>
              </div>
              <img
                src="/what-not-1.png"
                alt="Online tickets illustration"
                className="rounded-[8px] object-cover flex-shrink-0 hidden lg:block"
                style={{ width: '340px', height: '210px' }}
              />
            </div>

            {/* Item 2: Image left, Text right */}
            <div className="flex flex-col lg:flex-row gap-[40px] items-center">
              <img
                src="/what-not-2.png"
                alt="Visa application approved"
                className="rounded-[8px] object-cover flex-shrink-0 hidden lg:block"
                style={{ width: '340px', height: '260px' }}
              />
              <div className="flex-1 flex flex-col gap-[12px]">
                <h3
                  className="text-[16px] font-semibold text-[#262626]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                >
                  &#10060; We Don&rsquo;t Guarantee Visa Approval
                </h3>
                <div
                  className="text-[16px] font-normal text-[#262626]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
                >
                  <p><span className="font-semibold">Visa decisions are made by embassies, not us.</span></p>
                  <p className="mt-1">
                    We provide legitimate documentation that meets requirements, but visa approval depends on many factors:
                  </p>
                  <ul className="list-disc pl-[20px] mt-2">
                    <li>Your financial situation</li>
                    <li>Travel history</li>
                    <li>Ties to home country</li>
                    <li>Complete application</li>
                    <li>Embassy officer discretion</li>
                  </ul>
                </div>
                <p
                  className="text-[16px] font-normal text-[#262626] mt-2"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
                >
                  <span className="font-semibold">What we DO guarantee:</span> Legitimate, verifiable reservations accepted by embassies.
                </p>
              </div>
            </div>

            {/* Item 3: Text left, Image right */}
            <div className="flex flex-col lg:flex-row gap-[40px] items-center">
              <div className="flex-1 flex flex-col gap-[12px]">
                <h3
                  className="text-[16px] font-semibold text-[#262626]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                >
                  &#10060; We Don&rsquo;t Control Validity Periods
                </h3>
                <p
                  className="text-[16px] font-normal text-[#262626]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
                >
                  <span className="font-semibold">Validity is determined by airlines, not us.</span>
                  <br />
                  When we create a reservation, the airline&rsquo;s system determines how long it remains valid (typically 24 hours to 14 days). We cannot extend, modify, or guarantee specific validity periods
                </p>
              </div>
              <img
                src="/what-not-3.png"
                alt="Validity periods illustration"
                className="rounded-[8px] object-cover flex-shrink-0 hidden lg:block"
                style={{ width: '340px', height: '210px' }}
              />
            </div>

            {/* Item 4: Image left, Text right */}
            <div className="flex flex-col lg:flex-row gap-[40px] items-center">
              <img
                src="/what-not-4.png"
                alt="Refund policy illustration"
                className="rounded-[8px] object-cover flex-shrink-0 hidden lg:block"
                style={{ width: '340px', height: '260px' }}
              />
              <div className="flex-1 flex flex-col gap-[12px]">
                <h3
                  className="text-[16px] font-semibold text-[#262626]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                >
                  &#10060; We Don&rsquo;t Offer Refunds for Change of Mind
                </h3>
                <p
                  className="text-[16px] font-normal text-[#262626]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
                >
                  <span className="font-semibold">Digital services begin processing immediately.</span>
                  <br />
                  Once your order is placed and we create your reservation in airline systems, we&rsquo;ve incurred real costs. However, if your visa is rejected specifically because of the onward ticket (with official embassy documentation), we provide a refund. See our Refund Policy for details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment Section */}
      <section className="w-full bg-[#F7F7F7] py-[80px] overflow-hidden">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-0">
          <div className="flex flex-col gap-[24px]">
            {/* Heading */}
            <h2
              className="text-[28px] sm:text-[36px] lg:text-[48px] font-medium text-[#1D1D1D] italic"
              style={{ fontFamily: 'Georgia, \'Times New Roman\', serif', lineHeight: '1.3' }}
            >
              Our Commitment to You
            </h2>
            <p
              className="text-[16px] font-normal text-[#323232]"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
            >
              What You Can Expect From Us
            </p>

            {/* Content: Card left, Checklist right */}
            <div className="flex flex-col lg:flex-row gap-[60px] items-center mt-[16px]">
              {/* Dashboard Illustration Card - LEFT */}
              <div className="hidden lg:flex flex-shrink-0 relative" style={{ width: '420px' }}>
                {/* Decorative orange arc behind the card */}
                <div
                  className="absolute rounded-full"
                  style={{
                    width: '260px',
                    height: '260px',
                    background: 'linear-gradient(160deg, #FF7E4A, #E84D3D)',
                    right: '-60px',
                    top: '-40px',
                    zIndex: 0,
                  }}
                />
                <div className="relative z-10 w-full bg-white rounded-[16px] p-[28px] flex flex-col gap-[20px]" style={{ boxShadow: '0px 4px 40px rgba(0, 0, 0, 0.08)' }}>
                  {/* Quick Transfers */}
                  <div className="flex flex-col gap-[14px]">
                    <h4
                      className="text-[15px] font-semibold text-[#1D1D1D]"
                      style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '22px' }}
                    >
                      Quick Transfers
                    </h4>
                    {/* Avatars with connecting line */}
                    <div className="relative flex items-center justify-between">
                      {/* Horizontal connecting line behind avatars */}
                      <div className="absolute left-[24px] right-[24px] top-[20px] h-[1px] bg-[#E0E0E0]" />
                      {[
                        { name: 'Derek', color: '#F4B840' },
                        { name: 'Shane', color: '#DB2A6B' },
                        { name: 'Alvin', color: '#6E1FED' },
                        { name: 'Bob', color: '#60D3D9' },
                        { name: 'Minnie', color: '#FF7E29' },
                      ].map((person, i) => (
                        <div key={i} className="flex flex-col items-center gap-[4px] relative z-10">
                          <div
                            className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-white text-[13px] font-semibold"
                            style={{ backgroundColor: person.color, fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                          >
                            {person.name[0]}
                          </div>
                          <span
                            className="text-[10px] font-normal text-[#787171]"
                            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                          >
                            {person.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Provide Amount */}
                  <div className="flex flex-col gap-[8px]">
                    <span
                      className="text-[13px] font-medium text-[#1D1D1D]"
                      style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                    >
                      Provide Amount
                    </span>
                    <div className="w-full h-[12px] bg-[#F0F0F0] rounded-full overflow-hidden flex">
                      <div className="h-full bg-[#005CFF] rounded-full" style={{ width: '45%' }} />
                      <div className="h-full bg-[#3DD9D6] rounded-full" style={{ width: '20%' }} />
                    </div>
                  </div>

                  {/* Deposits & Expenses */}
                  <div className="flex gap-[12px]">
                    <div className="flex-1 bg-[#F9F9F9] rounded-[10px] p-[14px] flex flex-col gap-[4px]">
                      <span
                        className="text-[10px] font-normal text-[#787171]"
                        style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                      >
                        Deposits
                      </span>
                      <div className="flex items-baseline gap-[6px]">
                        <span
                          className="text-[20px] font-semibold text-[#1D1D1D]"
                          style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                        >
                          $9,350
                        </span>
                        <span
                          className="text-[10px] font-medium text-[#22C55E]"
                          style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                        >
                          &#8593;8.46%
                        </span>
                      </div>
                      <div className="w-full h-[3px] bg-[#E0E0E0] rounded-full overflow-hidden">
                        <div className="h-full bg-[#005CFF] rounded-full" style={{ width: '60%' }} />
                      </div>
                    </div>
                    <div className="flex-1 bg-[#F9F9F9] rounded-[10px] p-[14px] flex flex-col gap-[4px]">
                      <span
                        className="text-[10px] font-normal text-[#787171]"
                        style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                      >
                        Expenses
                      </span>
                      <div className="flex items-baseline gap-[6px]">
                        <span
                          className="text-[20px] font-semibold text-[#1D1D1D]"
                          style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                        >
                          $9,350
                        </span>
                        <span
                          className="text-[10px] font-medium text-[#EF4444]"
                          style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                        >
                          &#8595;11.28%
                        </span>
                      </div>
                      <div className="w-full h-[3px] bg-[#E0E0E0] rounded-full overflow-hidden">
                        <div className="h-full bg-[#005CFF] rounded-full" style={{ width: '45%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Checklist - RIGHT */}
              <div className="flex flex-col gap-[18px] flex-1">
                {[
                  { title: 'Legitimate Service', desc: 'Real airline reservations created in actual booking systems' },
                  { title: 'Verified PNRs', desc: 'Every booking reference can be checked with airlines' },
                  { title: 'Fast Delivery', desc: '1-24 hours depending on your chosen speed' },
                  { title: 'Accurate Information', desc: 'Documentation ready for embassy submission' },
                  { title: '24/7 Support', desc: 'Help available whenever you need it' },
                  { title: 'Secure Processing', desc: 'SSL encryption and secure payment systems' },
                  { title: 'Privacy Protection', desc: 'Your information handled confidentially' },
                  { title: 'Continuous Improvement', desc: 'Always working to serve you better' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-[12px]">
                    <div className="w-[24px] h-[24px] rounded-full bg-[#005CFF] flex items-center justify-center flex-shrink-0 mt-[2px]">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 7L6 10L11 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <span
                        className="text-[16px] font-normal text-[#787171]"
                        style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '26px' }}
                      >
                        <span className="font-semibold text-[#1D1D1D]">{item.title}</span> {item.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-0 py-[60px]">
          <div className="flex flex-col gap-[50px]">
            {/* Title */}
            <div className="flex flex-col items-center gap-[8px]">
              <h2
                className="text-[28px] md:text-[34px] lg:text-[40px] font-normal text-center text-[#1D1D1D]"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '60px' }}
              >
                FREQUENTLY ASKED QUESTIONS
              </h2>
              <p
                className="text-[16px] font-normal text-[#262626] text-center"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
              >
                Quick Answers to Common Questions
              </p>
            </div>

            {/* FAQ Items */}
            <FAQAccordion />
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="w-full">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-[60px] py-[60px] bg-[#EDF3FF] rounded-[12px]">
          <div className="flex flex-col gap-[8px]">
            <h2
              className="text-[32px] lg:text-[40px] font-bold text-[#1D1D1D]"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '50px' }}
            >
              Contact US
            </h2>
            <p
              className="text-[14px] font-normal text-[#323232]"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '21px' }}
            >
              We&rsquo;re Here to Help
            </p>
            <p
              className="text-[14px] font-normal text-[#323232]"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '21px' }}
            >
              Customer Support: Available 24/7, 365 days a year
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-[40px] mt-[30px]">
            {/* Left - Image */}
            <div className="w-full lg:w-1/2 hidden lg:block">
              <img
                src="/contact-support.png"
                alt="Contact support"
                className="w-full h-full min-h-[320px] rounded-[8px] object-cover"
              />
            </div>

            {/* Right - Contact Items */}
            <div className="w-full lg:w-1/2 flex flex-col gap-[16px] justify-center">
              {/* Email */}
              <div className="bg-white rounded-[12px] px-[24px] py-[16px] flex items-center gap-[14px]" style={{ boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.05)' }}>
                <span className="text-[24px] flex-shrink-0">&#9993;&#65039;</span>
                <p
                  className="text-[14px] font-normal text-[#1D1D1D]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '22px' }}
                >
                  <span className="font-semibold">Email:</span>{' '}
                  <a href="mailto:contact@onwardtickets.com" className="text-[#1D1D1D] underline">contact@onwardtickets.com</a>{' '}
                  (Response time: Usually within 30 minutes)
                </p>
              </div>

              {/* Live Chat */}
              <div className="bg-white rounded-[12px] px-[24px] py-[16px] flex items-center gap-[14px]" style={{ boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.05)' }}>
                <span className="text-[24px] flex-shrink-0">&#128172;</span>
                <p
                  className="text-[14px] font-normal text-[#1D1D1D]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '22px' }}
                >
                  <span className="font-semibold">Live Chat:</span>{' '}
                  Click the chat icon on our website (Instant connection to support team)
                </p>
              </div>

              {/* Phone */}
              <div className="bg-white rounded-[12px] px-[24px] py-[16px] flex items-center gap-[14px]" style={{ boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.05)' }}>
                <span className="text-[24px] flex-shrink-0">&#128222;</span>
                <p
                  className="text-[14px] font-normal text-[#1D1D1D]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '22px' }}
                >
                  <span className="font-semibold">Phone:</span>{' '}
                  Available on our <a href="/contact-us" className="text-[#1D1D1D] underline">Contact Page</a>
                </p>
              </div>

              {/* Business Inquiries */}
              <div className="bg-white rounded-[12px] px-[24px] py-[16px] flex items-center gap-[14px]" style={{ boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.05)' }}>
                <span className="text-[24px] flex-shrink-0">&#129309;</span>
                <p
                  className="text-[14px] font-normal text-[#1D1D1D]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '22px' }}
                >
                  <span className="font-semibold">Business Inquiries:</span>{' '}
                  <a href="mailto:contact@onwardtickets.com" className="text-[#1D1D1D] underline">contact@onwardtickets.com</a>
                </p>
              </div>

              {/* Legal/Privacy */}
              <div className="bg-white rounded-[12px] px-[24px] py-[16px] flex items-center gap-[14px]" style={{ boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.05)' }}>
                <span className="text-[24px] flex-shrink-0">&#9878;&#65039;</span>
                <p
                  className="text-[14px] font-normal text-[#1D1D1D]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '22px' }}
                >
                  <span className="font-semibold">Legal/Privacy:</span>{' '}
                  <a href="mailto:contact@onwardtickets.com" className="text-[#1D1D1D] underline">contact@onwardtickets.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Promise Section */}
      <section className="w-full bg-[#F6F9FF]">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-0 py-[80px]">
          <div className="flex flex-col lg:flex-row gap-[60px]">
            {/* Left - Image + Text */}
            <div className="flex-1 flex flex-col gap-[24px]">
              <div className="flex gap-[12px]">
                <div
                  className="rounded-[8px]"
                  style={{
                    width: '320px',
                    height: '200px',
                    background: 'url(/our-promise.png) lightgray 0px -74.526px / 100% 182.555% no-repeat',
                  }}
                />
              </div>
              <div className="flex flex-col gap-[8px]">
                <h2
                  className="text-[36px] lg:text-[40px] font-medium text-[#1D1D1D]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '60px' }}
                >
                  Our Promise
                </h2>
                <p
                  className="text-[16px] font-normal text-[#323232]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
                >
                  What We Stand Behind
                </p>
              </div>
              <div className="flex flex-col gap-[12px]">
                <p
                  className="text-[16px] font-semibold text-[#1D1D1D]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
                >
                  We believe in our service so much that:
                </p>
                <p
                  className="text-[14px] font-normal text-[#323232]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '22px' }}
                >
                  If your visa is rejected specifically because of our onward ticket (with official embassy documentation stating this), we provide a full refund. That&rsquo;s how confident we are in our reservations.
                </p>
              </div>
            </div>

            {/* Right - We promise to card */}
            <div className="flex-1 flex items-center">
              <div className="w-full bg-white border border-[#E0E0E0] rounded-[12px] p-[30px] flex flex-col gap-[20px]">
                <h3
                  className="text-[24px] font-medium text-[#1D1D1D]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '36px' }}
                >
                  We promise to:
                </h3>
                <div className="flex flex-col gap-[16px]">
                  {[
                    'Provide only legitimate, real flight reservations',
                    'Deliver within your selected timeframe',
                    'Support you 24/7 throughout your visa process',
                    'Maintain the highest standards of integrity',
                    'Continuously improve our service',
                    'Treat your information with complete confidentiality',
                    'Be transparent about what we can and cannot do',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-[12px]">
                      <span className="text-[16px] text-[#323232] mt-[2px] flex-shrink-0">&bull;</span>
                      <p
                        className="text-[14px] font-normal text-[#323232]"
                        style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '22px' }}
                      >
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Thousands Section */}
      <section className="w-full bg-white">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-0 py-[80px] flex flex-col items-center gap-[32px]">
          <h2
            className="text-[36px] lg:text-[40px] font-bold text-[#1D1D1D] text-center"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '55px' }}
          >
            Join <span className="text-[#005CFF]">Thousands</span> of Successful<br />Travelers
          </h2>
          <div className="flex flex-col items-center gap-[16px]">
            <h3
              className="text-[18px] font-semibold text-[#1D1D1D] text-center"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '27px' }}
            >
              Ready for Your Visa Application?
            </h3>
            <p
              className="text-[14px] font-normal text-[#323232] text-center"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '21px' }}
            >
              Don&rsquo;t let missing documentation delay your travel plans or force you to risk<br />
              hundreds of dollars on flights before visa approval.
            </p>
            <p
              className="text-[14px] font-normal text-[#323232] text-center"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '21px' }}
            >
              Get Your Onward Ticket Now &ndash; Starting at $10
            </p>
          </div>
          <a
            href="/flight-itinerary"
            className="inline-flex items-center justify-center bg-[#005CFF] text-white rounded-full px-[32px] py-[14px] text-[16px] font-medium hover:bg-[#0047CC] transition-colors"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
          >
            Onward Ticket Now
          </a>
          <div className="flex flex-col md:flex-row gap-[20px] mt-[8px]">
            {[
              { text: 'Real Airline PNR\nEmbassy Accepted\n24/7 Support' },
              { text: 'Used for 10,000+\nSuccessful Visa\nApplications' },
              { text: 'Delivery in 1-24\nHours \u2022 Secure &\nConfidential' },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-[#F6F9FF] rounded-[12px] flex items-center justify-center text-center"
                style={{ width: '220px', height: '120px', padding: '20px', boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.06)' }}
              >
                <p
                  className="text-[14px] font-normal text-[#323232]"
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '22px', whiteSpace: 'pre-line' }}
                >
                  <span className="text-[#005CFF]">&#10003;</span> {card.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Resources Section */}
      <section className="w-full bg-white">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-0 py-[80px] flex flex-col items-center gap-[32px]">
          <div className="flex flex-col items-center gap-[12px]">
            <h2
              className="text-[36px] lg:text-[40px] font-bold text-[#1D1D1D] text-center"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '55px' }}
            >
              Related Resources
            </h2>
            <p
              className="text-[16px] font-normal text-[#323232] text-center"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
            >
              Ready for Your Visa Application?
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-[24px] w-full max-w-[800px]">
            {/* Learn More Card */}
            <div className="flex-1 bg-white border border-[#DEDEDE] rounded-[12px] p-[30px] flex flex-col gap-[12px]">
              <h3
                className="text-[18px] font-semibold text-[#1D1D1D]"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '27px' }}
              >
                Learn More:
              </h3>
              <div className="flex flex-col gap-[8px]">
                {[
                  { label: 'How It Works', href: '/#how-it-works', desc: 'Complete process explanation' },
                  { label: 'Pricing', href: '/#pricing', desc: 'Detailed pricing and options' },
                  { label: 'FAQ', href: '/#faq', desc: 'All your questions answered' },
                  { label: 'Blog', href: '/blog', desc: 'Visa guides and travel tips' },
                  { label: 'Contact', href: '/contact-us', desc: 'Get in touch with our team' },
                ].map((item, i) => (
                  <p
                    key={i}
                    className="text-[14px] font-normal text-[#323232]"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '22px' }}
                  >
                    &bull; <a href={item.href} className="text-[#1D1D1D] underline">{item.label}</a> &ndash; {item.desc}
                  </p>
                ))}
              </div>
            </div>

            {/* Visa Guides Card */}
            <div className="flex-1 bg-white border border-[#DEDEDE] rounded-[12px] p-[30px] flex flex-col gap-[12px]">
              <h3
                className="text-[18px] font-semibold text-[#1D1D1D]"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '27px' }}
              >
                Visa Guides:
              </h3>
              <div className="flex flex-col gap-[8px]">
                {[
                  { label: 'Schengen Visa Requirements', href: '/blog' },
                  { label: 'Thailand Visa Guide', href: '/blog' },
                  { label: 'Australia Visa Documentation', href: '/blog' },
                  { label: 'Country-Specific Guides', href: '/blog' },
                ].map((item, i) => (
                  <p
                    key={i}
                    className="text-[14px] font-normal text-[#323232]"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '22px' }}
                  >
                    &bull; <a href={item.href} className="text-[#1D1D1D] underline">{item.label}</a>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency & Compliance Section */}
      <section className="w-full bg-[#F6F9FF]">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-0 py-[80px] flex flex-col items-center gap-[32px]">
          <div className="flex flex-col items-center gap-[12px]">
            <h2
              className="text-[36px] lg:text-[40px] font-bold text-[#1D1D1D] text-center"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '55px' }}
            >
              Transparency &amp; Compliance
            </h2>
            <p
              className="text-[16px] font-normal text-[#323232] text-center"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '24px' }}
            >
              Our Commitments
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-[24px] w-full max-w-[900px]">
            {/* Privacy & Security Card */}
            <div className="flex-1 bg-white border border-[#DEDEDE] rounded-[12px] p-[30px] flex flex-col gap-[12px]">
              <h3
                className="text-[18px] font-semibold text-[#1D1D1D]"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '27px' }}
              >
                Privacy &amp; Security:
              </h3>
              <div className="flex flex-col gap-[8px]">
                {[
                  'SSL encrypted website',
                  'Secure payment processing',
                  'GDPR compliant',
                  'CCPA compliant',
                  'Data protection protocols',
                ].map((item, i) => (
                  <p
                    key={i}
                    className="text-[14px] font-normal text-[#323232]"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '22px' }}
                  >
                    &bull; {item}
                  </p>
                ))}
              </div>
            </div>

            {/* Legal Compliance Card - Blue */}
            <div className="flex-1 bg-[#005CFF] rounded-[12px] p-[30px] flex flex-col gap-[12px]">
              <h3
                className="text-[18px] font-semibold text-white"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '27px' }}
              >
                Legal Compliance:
              </h3>
              <div className="flex flex-col gap-[8px]">
                {[
                  'Registered business',
                  'Transparent operations',
                  'Clear terms and conditions',
                  'Privacy policy',
                  'Refund policy',
                ].map((item, i) => (
                  <p
                    key={i}
                    className="text-[14px] font-normal text-white"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '22px' }}
                  >
                    &bull; {item}
                  </p>
                ))}
              </div>
            </div>

            {/* Quality Standards Card */}
            <div className="flex-1 bg-white border border-[#DEDEDE] rounded-[12px] p-[30px] flex flex-col gap-[12px]">
              <h3
                className="text-[18px] font-semibold text-[#1D1D1D]"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '27px' }}
              >
                Quality Standards:
              </h3>
              <div className="flex flex-col gap-[8px]">
                {[
                  'Real airline bookings only',
                  'Verified PNR generation',
                  'Embassy-accepted documentation',
                  'Continuous quality monitoring',
                ].map((item, i) => (
                  <p
                    key={i}
                    className="text-[14px] font-normal text-[#323232]"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '22px' }}
                  >
                    &bull; {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Footer CTA Section */}
      <section className="w-full relative overflow-hidden" style={{ minHeight: '280px' }}>
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #0d2d4a 0%, #1e3a5f 50%, #0d2d4a 100%)',
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 mx-auto max-w-[1240px] px-6 lg:px-0 py-[50px] flex flex-col gap-[20px]">
          <p
            className="text-white"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: '24px', fontWeight: 400, lineHeight: '42px', letterSpacing: '-0.48px', maxWidth: '700px' }}
          >
            <span style={{ fontWeight: 500 }}>About OnwardTicket.us:</span> Helping travelers meet visa requirements since 2019. Trusted by 10,000+ customers worldwide for legitimate, affordable, and reliable onward ticket reservations.
            <br />
            <span style={{ fontWeight: 500 }}>Last Updated:</span> October 2025
          </p>
          <p
            className="text-white"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: '24px', fontWeight: 400, lineHeight: '42px', letterSpacing: '-0.48px' }}
          >
            Your journey starts with the right documentation. Let us help you get there.
          </p>
          <a
            href="/flight-itinerary"
            className="inline-flex items-center justify-center bg-[#005CFF] text-white rounded-full hover:bg-[#0047CC] transition-colors w-fit"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: '16px', fontWeight: 400, lineHeight: '24px', padding: '16px 40px', gap: '10px' }}
          >
            Start Your Application
          </a>
        </div>
      </section>


    </div>
  );
};

export default AboutPage;
