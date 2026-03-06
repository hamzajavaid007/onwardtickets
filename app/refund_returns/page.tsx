import LegalPageHero from '@/components/LegalPageHero';

const sections = [
  '1. GENERAL POLICY OVERVIEW',
  '2. NO CANCELLATION POLICY',
  '3. WHEN REFUNDS ARE NOT PROVIDED',
  '4. WHEN REFUNDS MAY BE CONSIDERED',
  '5. REFUND REQUEST PROCESS',
  '6. PARTIAL REFUNDS',
  '7. CHARGEBACKS AND PAYMENT DISPUTES',
  '8. WHAT IS NOT COVERED',
  '9. ALTERNATIVES TO REFUNDS',
  '10. PRICING ERRORS',
  '11. FRAUDULENT ORDERS',
  '12. EXCEPTIONS',
  '13. CUSTOMER ACKNOWLEDGMENT',
  '14. CONTACT INFORMATION',
  '15. POLICY UPDATES',
];

const RefundPolicy = () => {
  return (
    <div className="w-full bg-white">
      <LegalPageHero
        title="Refund & Cancellation Policy - OnwardTicket.us"
        subtitle="Last Updated: October 2025"
        imageSrc="/banners/legal-hero.jpg"
      />

      {/* Important Notice Section */}
      <div className="mx-auto max-w-[1240px] px-6 lg:px-0" style={{ marginTop: '80px' }}>
        <div className="flex flex-col gap-[24px]">
          <h2
            className="text-[20px] lg:text-[25px] font-medium text-[#1D1D1D]"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '37.5px' }}
          >
            IMPORTANT NOTICE
          </h2>
          <p
            className="text-[16px] lg:text-[18px] font-normal text-[#1D1D1D]"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '32px' }}
          >
            Please read this policy carefully before placing an order. By completing a purchase on OnwardTicket.us, you acknowledge and agree to this Refund &amp; Cancellation Policy.
          </p>
        </div>
      </div>

      {/* Content Area */}
      <div style={{ marginTop: '80px' }}>
        <div className="mx-auto max-w-[1240px] px-6 lg:px-0">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-0">

            {/* Left Sidebar - Table of Contents */}
            <div className="lg:w-[425px] flex-shrink-0 bg-[#F4F4F4]">
              <div className="py-8 lg:pt-[16px] lg:pb-[16px] lg:pl-[16px] lg:pr-[16px]">
                <nav className="flex flex-col gap-[20px]">
                  {sections.map((section, i) => (
                    <a
                      key={i}
                      href={`#section-${i + 1}`}
                      className={`text-[18px] lg:text-[24px] font-medium hover:text-[#1D1D1D] transition-colors ${
                        i === 0 ? 'text-[#1D1D1D]' : 'text-[#787171]'
                      }`}
                      style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '36px' }}
                    >
                      {section}
                    </a>
                  ))}
                </nav>
              </div>
            </div>

            {/* Right Content */}
            <div className="flex-1 py-8 lg:pt-[16px] lg:pb-[16px] lg:pl-[49px]">
              <div
                className="text-[16px] lg:text-[18px] font-normal text-[#1D1D1D] whitespace-pre-line"
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '32px' }}
              >
{`1.1 No Refunds After Delivery
OnwardTicket.us operates a strict NO REFUND policy for completed and delivered services.
Once your flight reservation has been:
Successfully created in airline systems
PNR (booking reference) has been generated
Confirmation email has been delivered
NO refunds will be issued under any circumstances.
1.2 Why This Policy Exists
Digital Service Nature:
Our service is fully digital and delivered instantly
Reservations are created immediately in airline systems
Real costs are incurred the moment we access airline booking systems
PNRs cannot be "returned" or "uncreated" once generated
Immediate Processing:
Your order begins processing within seconds of payment
Airline systems are accessed immediately
Digital delivery is instant (1-24 hours depending on speed selected)`}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="mx-auto max-w-[1240px] px-6 lg:px-0 pt-[80px] pb-[60px]">
        <div
          className="bg-[#E3EDFF] px-6 lg:px-[30px] py-[50px] flex flex-col gap-[17px]"
        >
          <h2
            className="text-[20px] lg:text-[24px] font-medium text-[#1D1D1D]"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '36px' }}
          >
            SUMMARY
          </h2>
          <div className="flex flex-col gap-[22px]">
            <div
              className="text-[16px] lg:text-[20px] font-normal text-[#1D1D1D]"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '30px' }}
            >
              <p className="mb-2"><span className="font-medium">Key Points:</span></p>
              <p>&#10060; NO refunds after service is delivered (except specific cases below)</p>
              <p>&#10060; NO cancellations after payment</p>
              <p>&#10060; NO refunds for general visa rejection</p>
              <p>&#10060; NO refunds for customer errors</p>
              <p>&#10060; NO refunds for changed plans</p>
              <p className="mt-4">&#10003; Refunds ONLY if we fail to deliver</p>
              <p>&#10003; Refunds ONLY if PNR is completely invalid</p>
              <p>&#10003; Refunds ONLY for technical errors on our part</p>
              <p>&#10003; Refunds ONLY if visa rejected SPECIFICALLY because of onward ticket</p>
              <p>&#10003; Must provide official embassy rejection letter</p>
              <p>&#10003; Letter must state onward ticket was THE SOLE reason for rejection</p>
              <p>&#10003; Contact us before filing chargebacks</p>
            </div>
            <div
              className="text-[16px] lg:text-[20px] font-normal text-[#1D1D1D]"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '30px' }}
            >
              <p className="mb-2"><span className="font-medium">Visa Rejection Refund Criteria:</span></p>
              <p>Embassy letter REQUIRED stating onward ticket was the problem</p>
              <p>If rejected for multiple reasons (including onward ticket) = NO refund</p>
              <p>If rejected for other reasons only = NO refund</p>
              <p>If embassy accepted ticket but rejected visa = NO refund</p>
              <p>Only if onward ticket was THE SOLE, EXPLICIT reason = Refund approved</p>
              <p className="mt-4">This is a FINAL SALE service with limited exceptions. Purchase only if you understand and accept this policy</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default RefundPolicy;
