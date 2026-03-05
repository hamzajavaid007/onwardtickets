'use client';

import { useState } from 'react';

const faqItems = [
  {
    question: 'What is an onward ticket for visa applications?',
    answer: "An onward ticket is a confirmed flight reservation that embassies and consulates require as proof you'll leave the country after your visit. It's a mandatory document for most visa applications.",
  },
  {
    question: 'How much does an onward ticket cost?',
    answer: 'Our onward tickets start from just $10 for a one-way ticket and $10 for a return ticket. Multi-city itineraries are available from $17.',
  },
  {
    question: 'How long is the onward ticket valid?',
    answer: 'Our onward tickets are valid for 24 hours up to 14 days, depending on the package you choose. This gives you enough time to submit your visa application.',
  },
  {
    question: 'Do embassies accept onward tickets from your service?',
    answer: 'Yes! Our flight reservations are 100% legitimate and accepted by embassies worldwide including Schengen, UK, USA, Canada, and Australia. Each ticket comes with a verifiable PNR.',
  },
  {
    question: 'Can I get a multi-city ticket?',
    answer: 'Yes, we offer multi-city itineraries for $17. You can include multiple destinations in a single booking, perfect for complex travel plans.',
  },
  {
    question: 'Who determines the validity period?',
    answer: 'You choose the validity period when placing your order. We recommend selecting a validity period that covers your visa appointment date plus a few extra days.',
  },
  {
    question: 'Is using an onward ticket for visa applications legal?',
    answer: 'Yes, using an onward ticket service is completely legal. We create real airline reservations with valid PNR codes that can be verified by embassy officers.',
  },
  {
    question: 'Which visa types require onward tickets?',
    answer: 'Most visa types require proof of onward travel, including tourist visas, Schengen visas, business visas, transit visas, and working holiday visas.',
  },
  {
    question: 'How quickly will I receive my visa ticket?',
    answer: 'Delivery depends on the speed you select at checkout. We offer standard, fast, and express delivery options to meet your timeline.',
  },
  {
    question: 'What if my visa gets rejected?',
    answer: 'If your visa application is rejected, the onward ticket will simply expire after its validity period. You are not obligated to use the flight reservation.',
  },
  {
    question: 'Ready for Your Visa Ticket?',
    answer: 'Get started now! Enter your travel details and receive a verifiable onward ticket for your visa application in minutes.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1240px] px-6 lg:px-0 py-[60px]">
        <div className="flex flex-col gap-[50px]">
          {/* Title */}
          <h2
            className="text-[28px] md:text-[34px] lg:text-[40px] font-medium text-center text-[#1D1D1D]"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '60px' }}
          >
            FREQUENTLY ASKED QUESTIONS
          </h2>

          {/* FAQ Items */}
          <div className="flex flex-col gap-[6px]">
            {faqItems.map((item, index) => {
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
        </div>
      </div>
    </section>
  );
}
