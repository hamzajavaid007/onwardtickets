export interface FieldDef {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'richtext' | 'image' | 'url' | 'number';
  value: string;
}

export interface ItemDef {
  id: string;
  fields: FieldDef[];
}

export interface SectionDef {
  id: string;
  type: string;
  label: string;
  order: number;
  fields: FieldDef[];
  items?: ItemDef[];
}

export interface PageDefault {
  slug: string;
  title: string;
  sections: SectionDef[];
}

export const PAGE_DEFAULTS: PageDefault[] = [
  // ─── GLOBAL (Header, Footer, Marquee, SEO, WhatsApp) ───
  {
    slug: 'global',
    title: 'Global',
    sections: [
      {
        id: 'header',
        type: 'header',
        label: 'Header',
        order: 0,
        fields: [
          { key: 'logoUrl', label: 'Logo URL', type: 'image', value: '/logo.png' },
          { key: 'logoAlt', label: 'Logo Alt Text', type: 'text', value: 'OnwardTickets' },
          { key: 'bgColor', label: 'Background Color', type: 'text', value: '#ffffff' },
          { key: 'scrolledBg', label: 'Scrolled Background', type: 'text', value: '#ffffff' },
          { key: 'ctaText', label: 'CTA Button Text', type: 'text', value: 'BOOK NOW' },
          { key: 'ctaLink', label: 'CTA Button Link', type: 'url', value: '/#pricing' },
        ],
        items: [
          { id: 'nav-1', fields: [{ key: 'label', label: 'Label', type: 'text', value: 'HOME' }, { key: 'url', label: 'URL', type: 'url', value: '/' }] },
          { id: 'nav-2', fields: [{ key: 'label', label: 'Label', type: 'text', value: 'PRICING' }, { key: 'url', label: 'URL', type: 'url', value: '/#pricing' }] },
          { id: 'nav-3', fields: [{ key: 'label', label: 'Label', type: 'text', value: 'SERVICES' }, { key: 'url', label: 'URL', type: 'url', value: '#' }] },
          { id: 'nav-4', fields: [{ key: 'label', label: 'Label', type: 'text', value: 'BLOGS' }, { key: 'url', label: 'URL', type: 'url', value: '/blog' }] },
          { id: 'nav-5', fields: [{ key: 'label', label: 'Label', type: 'text', value: 'CONTACT US' }, { key: 'url', label: 'URL', type: 'url', value: '/contact-us' }] },
        ],
      },
      {
        id: 'footer',
        type: 'footer',
        label: 'Footer',
        order: 1,
        fields: [
          { key: 'logoUrl', label: 'Logo URL', type: 'image', value: '/logo.png' },
          { key: 'description', label: 'Description', type: 'textarea', value: 'The Embassy recommends not purchasing tickets until visa is approved. Why would you risk your time and money?\nWe provide flight and hotel reservations. Perfect solution for digital nomads and travellers who want to extend or apply for visas.' },
          { key: 'email', label: 'Contact Email', type: 'text', value: 'contact@onwardtickets.com' },
          { key: 'copyright', label: 'Copyright Text', type: 'text', value: '© 2025 OnwardTickets. All rights reserved.' },
        ],
        items: [
          { id: 'link-1', fields: [{ key: 'label', label: 'Label', type: 'text', value: 'Refund Policy' }, { key: 'url', label: 'URL', type: 'url', value: '/refund_returns' }] },
          { id: 'link-2', fields: [{ key: 'label', label: 'Label', type: 'text', value: 'Privacy Policy' }, { key: 'url', label: 'URL', type: 'url', value: '/privacy-policy' }] },
          { id: 'link-3', fields: [{ key: 'label', label: 'Label', type: 'text', value: 'Affiliate Program' }, { key: 'url', label: 'URL', type: 'url', value: '/become-a-partner' }] },
          { id: 'link-4', fields: [{ key: 'label', label: 'Label', type: 'text', value: 'Terms and conditions' }, { key: 'url', label: 'URL', type: 'url', value: '/terms-conditions' }] },
        ],
      },
      {
        id: 'marquee-banner',
        type: 'marquee',
        label: 'Marquee Banner',
        order: 2,
        fields: [
          { key: 'message', label: 'Banner Message', type: 'text', value: 'Get 10% OFF your first order with code WELCOME10' },
          { key: 'bgColor', label: 'Background Color', type: 'text', value: '#2979FF' },
          { key: 'textColor', label: 'Text Color', type: 'text', value: '#ffffff' },
        ],
      },
      {
        id: 'seo',
        type: 'seo',
        label: 'SEO',
        order: 3,
        fields: [
          { key: 'siteTitle', label: 'Site Title', type: 'text', value: 'OnwardTickets - Flight Itinerary & Visa Documents for Visa Applications' },
          { key: 'siteDescription', label: 'Site Description', type: 'textarea', value: 'Get verified onward tickets, flight itineraries, and visa documents for visa applications. Starting at $10. Accepted by embassies worldwide.' },
          { key: 'ogImage', label: 'OG Image', type: 'image', value: '/og-image.png' },
          { key: 'keywords', label: 'Keywords', type: 'textarea', value: 'onward ticket, flight itinerary, visa application, flight reservation, dummy ticket' },
        ],
      },
      {
        id: 'whatsapp',
        type: 'whatsapp',
        label: 'WhatsApp',
        order: 4,
        fields: [
          { key: 'phoneNumber', label: 'Phone Number', type: 'text', value: '4477561525115' },
          { key: 'defaultMessage', label: 'Default Message', type: 'text', value: 'Hi I need help with my visa application' },
          { key: 'tooltipText', label: 'Tooltip Text', type: 'text', value: 'Need help? Chat with us!' },
        ],
      },
    ],
  },
  // ─── HOMEPAGE ───
  {
    slug: 'home',
    title: 'Homepage',
    sections: [
      {
        id: 'hero',
        type: 'hero',
        label: 'Hero Section',
        order: 0,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'Verified Onward Ticket for Visa Applications | Starting at $10' },
          { key: 'subheading', label: 'Subheading', type: 'textarea', value: 'Need proof of onward travel for your visa application? Get a real, verifiable flight reservation. Valid 24 hours upto 14 days. Accepted by embassies worldwide.' },
          { key: 'ctaText', label: 'CTA Button Text', type: 'text', value: 'Get Onward Ticket Now' },
          { key: 'ctaLink', label: 'CTA Button Link', type: 'url', value: '#pricing' },
          { key: 'secondaryCtaText', label: 'Secondary Button Text', type: 'text', value: 'How It Works' },
          { key: 'secondaryCtaLink', label: 'Secondary Button Link', type: 'url', value: '#how-it-works' },
          { key: 'heroImage', label: 'Hero Image', type: 'image', value: '/hero-girl.png' },
          { key: 'planeImage', label: 'Plane Image', type: 'image', value: '/hero-plane.jpg' },
        ],
        items: [
          { id: 'badge-1', fields: [{ key: 'text', label: 'Badge Text', type: 'text', value: 'Embassy Accepted' }] },
          { id: 'badge-2', fields: [{ key: 'text', label: 'Badge Text', type: 'text', value: 'Airline-Verified PNR' }] },
          { id: 'badge-3', fields: [{ key: 'text', label: 'Badge Text', type: 'text', value: 'One-Way, Return & Multi-City Options' }] },
        ],
      },
      {
        id: 'what-is-onward',
        type: 'text',
        label: 'What is an Onward Ticket',
        order: 1,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'What is an ONWARD TICKET For Visa Application?' },
          { key: 'description', label: 'Description', type: 'textarea', value: 'An onward ticket is a confirmed flight reservation required by embassies and consulates as proof you plan to leave a country after your visit.' },
          { key: 'subtext', label: 'Sub-description', type: 'text', value: 'Most visa applications demand this documentation before approval' },
        ],
      },
      {
        id: 'why-onward-ticket',
        type: 'image_text',
        label: 'Why You Need an Onward Ticket',
        order: 2,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'Why You Need an Onward Ticket for Your Visa:' },
          { key: 'image', label: 'Image', type: 'image', value: '/visa-document.jpg' },
          { key: 'problemTitle', label: 'Problem Card Title', type: 'text', value: 'The Problem' },
          { key: 'problemText', label: 'Problem Card Text', type: 'textarea', value: 'Buying a full-price ticket before visa approval is risky. What if your visa gets rejected? You lose hundreds of dollars' },
          { key: 'solutionTitle', label: 'Solution Card Title', type: 'text', value: 'The Solution' },
          { key: 'solutionText', label: 'Solution Card Text', type: 'textarea', value: 'OnwardTicket.us provides legitimate, verifiable flight reservations specifically for visa applications without the full ticket cost.' },
        ],
        items: [
          { id: 'bullet-1', fields: [{ key: 'text', label: 'Bullet Point', type: 'text', value: 'Embassy visa requirements mandate proof of exit plans' }] },
          { id: 'bullet-2', fields: [{ key: 'text', label: 'Bullet Point', type: 'text', value: 'Consulates verify you won\'t overstay your visa' }] },
          { id: 'bullet-3', fields: [{ key: 'text', label: 'Bullet Point', type: 'text', value: 'Flight reservations prove legitimate travel intentions' }] },
          { id: 'bullet-4', fields: [{ key: 'text', label: 'Bullet Point', type: 'text', value: 'Required for tourist, business, and student visa applications' }] },
        ],
      },
      {
        id: 'how-it-works',
        type: 'cards',
        label: 'How Onward Ticket Works',
        order: 3,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'HOW ONWARD TICKET WORKS' },
        ],
        items: [
          {
            id: 'step-1',
            fields: [
              { key: 'title', label: 'Title', type: 'text', value: 'Enter Flight & Traveler Details' },
              { key: 'description', label: 'Description', type: 'textarea', value: 'Enter your flight information (departure, destination, dates) and traveler details. Choose one-way, return, or multi-city ticket.' },
            ],
          },
          {
            id: 'step-2',
            fields: [
              { key: 'title', label: 'Title', type: 'text', value: 'Select Delivery Speed & Make Payment' },
              { key: 'description', label: 'Description', type: 'textarea', value: 'Choose your delivery speed (standard, fast, or express) and complete secure payment using credit/debit card, Apple Pay, or Google Pay.' },
            ],
          },
          {
            id: 'step-3',
            fields: [
              { key: 'title', label: 'Title', type: 'text', value: 'Receive Your Ticket via Email' },
              { key: 'description', label: 'Description', type: 'textarea', value: 'Get your verifiable flight reservation with PNR (booking reference) delivered directly to your email.' },
            ],
          },
        ],
      },
      {
        id: 'why-choose-us',
        type: 'cards',
        label: 'Why Choose OnwardTicket.us',
        order: 4,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'WHY CHOOSE ONWARDTICKET.US FOR YOUR VISA?' },
        ],
        items: [
          { id: 'card-1', fields: [{ key: 'title', label: 'Title', type: 'text', value: 'Real Airline Reservations' }, { key: 'description', label: 'Description', type: 'textarea', value: 'We create actual bookings in airline systems with valid PNRs. Embassy visa officers can verify your reservation directly with carriers.' }] },
          { id: 'card-2', fields: [{ key: 'title', label: 'Title', type: 'text', value: 'Quick Delivery' }, { key: 'description', label: 'Description', type: 'textarea', value: 'Receive your ticket via email within your selected timeframe. Delivery speed options available at checkout.' }] },
          { id: 'card-3', fields: [{ key: 'title', label: 'Title', type: 'text', value: 'Validity' }, { key: 'description', label: 'Description', type: 'textarea', value: 'Ticket validity typically ranges from 24 hours up to 14 days' }] },
          { id: 'card-4', fields: [{ key: 'title', label: 'Title', type: 'text', value: 'Flexible Options' }, { key: 'description', label: 'Description', type: 'textarea', value: 'One-way tickets from $10, return tickets from $10, or multi-city itineraries for $17. Choose what matches your visa requirements.' }] },
          { id: 'card-5', fields: [{ key: 'title', label: 'Title', type: 'text', value: 'Embassy Accepted' }, { key: 'description', label: 'Description', type: 'textarea', value: 'Our reservations meet all embassy and consulate requirements. Successfully used for thousands of visa applications worldwide.' }] },
          { id: 'card-6', fields: [{ key: 'title', label: 'Title', type: 'text', value: 'Global Coverage' }, { key: 'description', label: 'Description', type: 'textarea', value: 'Book tickets for any visa application: Schengen visas, US visas, UK visas, Australian visas, and 190+ countries worldwide.' }] },
        ],
      },
      {
        id: 'is-legal',
        type: 'image_text',
        label: 'Is Onward Ticket Legal?',
        order: 5,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'IS ONWARD TICKET LEGAL?' },
          { key: 'mainStatement', label: 'Main Statement', type: 'text', value: 'Yes, onward tickets from OnwardTicket.us are completely legal.' },
          { key: 'supportingText', label: 'Supporting Text', type: 'textarea', value: "Many travelers worry about using onward ticket services. Here's the truth:" },
          { key: 'image', label: 'Image', type: 'image', value: '/legal-section.png' },
        ],
        items: [
          { id: 'bullet-1', fields: [{ key: 'text', label: 'Bullet Point', type: 'text', value: 'We create real reservations in airline systems' }] },
          { id: 'bullet-2', fields: [{ key: 'text', label: 'Bullet Point', type: 'text', value: 'Immigration officers can verify your booking' }] },
          { id: 'bullet-3', fields: [{ key: 'text', label: 'Bullet Point', type: 'text', value: 'No fake documents or fraudulent bookings' }] },
          { id: 'bullet-4', fields: [{ key: 'text', label: 'Bullet Point', type: 'text', value: 'Used successfully by thousands for visas worldwide' }] },
          { id: 'bullet-5', fields: [{ key: 'text', label: 'Bullet Point', type: 'text', value: 'Complies with international travel requirements' }] },
        ],
      },
      {
        id: 'countries',
        type: 'cards',
        label: 'Countries Requiring Onward Tickets',
        order: 6,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'COUNTRIES REQUIRING ONWARD TICKETS' },
          { key: 'flagsImage', label: 'Flags Collage Image', type: 'image', value: '/flags-collage.png' },
        ],
        items: [
          {
            id: 'region-1',
            fields: [
              { key: 'title', label: 'Region Title', type: 'text', value: 'Southeast Asia' },
              { key: 'countries', label: 'Countries List', type: 'textarea', value: '- Thailand - Required for visa exemption\n- Indonesia - Mandatory for visa on arrival\n- Philippines - Immigration strictly enforces\n- Malaysia - Often checked at immigration\n- Singapore - Required for visa-free entry' },
            ],
          },
          {
            id: 'region-2',
            fields: [
              { key: 'title', label: 'Region Title', type: 'text', value: 'Americas:' },
              { key: 'countries', label: 'Countries List', type: 'textarea', value: '- Costa Rica - Strictly enforced\n- Panama - Required for entry\n- Brazil - Visa applications need proof\n- Peru - Immigration may request\n- Mexico - Occasionally required' },
            ],
          },
          {
            id: 'region-3',
            fields: [
              { key: 'title', label: 'Region Title', type: 'text', value: 'Oceania:' },
              { key: 'countries', label: 'Countries List', type: 'textarea', value: '- New Zealand - Mandatory requirement\n- Australia - Required for tourist visas\n- Fiji - Immigration enforcement varies' },
            ],
          },
        ],
      },
      {
        id: 'visa-guide',
        type: 'cards',
        label: 'Visa Application Guide',
        order: 7,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'VISA APPLICATION GUIDE: PROOF OF ONWARD TRAVEL' },
        ],
        items: [
          {
            id: 'guide-1',
            fields: [
              { key: 'title', label: 'Title', type: 'text', value: 'When Do You Need Proof for Your Visa?' },
              { key: 'content', label: 'Content', type: 'textarea', value: 'Schengen Visa Applications: Most Schengen countries require proof of return or onward travel. Upload your flight reservation as part of visa documentation.\nTourist Visa Requirements: Countries like Thailand, Indonesia, Philippines, and many others mandate onward tickets for tourist visa approval.\nBusiness Visas: Even business visa applications often require proof you\'ll depart after your authorized stay.' },
            ],
          },
          {
            id: 'guide-2',
            fields: [
              { key: 'title', label: 'Title', type: 'text', value: 'What Embassy Officers Verify:' },
              { key: 'content', label: 'Content', type: 'textarea', value: 'Valid PNR: They check your booking reference with airline reservation systems\nDeparture Date: Must align with your requested visa duration\nReturn/Onward Destination: Must show clear exit from their country\nPassenger Details: Must match your passport information exactly' },
            ],
          },
          {
            id: 'guide-3',
            fields: [
              { key: 'title', label: 'Title', type: 'text', value: 'Tips for Visa Applications:' },
              { key: 'content', label: 'Content', type: 'textarea', value: 'Book your ticket 24-48 hours before your appointment\nChoose 14-day validity for flexibility with appointment dates\nEnsure passenger name matches passport precisely\nSave confirmation email for upload to visa portal' },
            ],
          },
          {
            id: 'guide-4',
            fields: [
              { key: 'title', label: 'Title', type: 'text', value: 'Common Visa Types Requiring Onward Tickets:' },
              { key: 'content', label: 'Content', type: 'textarea', value: 'Tourist Visas: Thailand, Indonesia, Bali, Philippines, Vietnam, Malaysia, Singapore\nSchengen Visas: France, Germany, Italy, Spain, Netherlands, Switzerland\nOther Popular: UK, Australia, New Zealand, Japan, South Korea, Dubai/UAE' },
            ],
          },
          {
            id: 'guide-5',
            fields: [
              { key: 'title', label: 'Title', type: 'text', value: "What's Included:" },
              { key: 'content', label: 'Content', type: 'textarea', value: 'Verified flight reservation with booking reference\nEmail confirmation with PNR\nAirline-verifiable documentation\nReady for embassy submission\nDelivery speed options available' },
              { key: 'buttonText', label: 'Button Text', type: 'text', value: 'see more' },
            ],
          },
          {
            id: 'guide-6',
            fields: [
              { key: 'title', label: 'Title', type: 'text', value: 'Simple Process:' },
              { key: 'content', label: 'Content', type: 'textarea', value: 'Enter flight & traveler details\nSelect delivery speed & make payment\nReceive your ticket via email' },
            ],
          },
        ],
      },
      {
        id: 'why-trust',
        type: 'cards',
        label: 'Why Trust OnwardTicket.us',
        order: 8,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'Why Trust OnwardTicket.us?' },
          { key: 'description', label: 'Description', type: 'textarea', value: 'All onward tickets are generated through real flight bookings, ensuring authenticity and acceptance by airlines and immigration authorities.' },
        ],
        items: [
          { id: 'trust-1', fields: [{ key: 'title', label: 'Title', type: 'text', value: '10,000+ Happy Customers' }, { key: 'subtitle', label: 'Subtitle', type: 'text', value: 'Successfully helped travelers worldwide' }] },
          { id: 'trust-2', fields: [{ key: 'title', label: 'Title', type: 'text', value: 'Instant Support' }, { key: 'subtitle', label: 'Subtitle', type: 'text', value: '24/7 customer service team' }] },
          { id: 'trust-3', fields: [{ key: 'title', label: 'Title', type: 'text', value: 'Secure Platform' }, { key: 'subtitle', label: 'Subtitle', type: 'text', value: 'SSL encrypted payment processing' }] },
          { id: 'trust-4', fields: [{ key: 'title', label: 'Title', type: 'text', value: 'Established Service' }, { key: 'subtitle', label: 'Subtitle', type: 'text', value: 'Operating since 2019' }] },
        ],
      },
      {
        id: 'pricing',
        type: 'cards',
        label: 'Pricing Cards',
        order: 9,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'Common Visa Types Requiring Onward Tickets' },
        ],
        items: [
          {
            id: 'pricing-1',
            fields: [
              { key: 'title', label: 'Title', type: 'text', value: 'Flight Itinerary' },
              { key: 'price', label: 'Price', type: 'text', value: '£5 Per Person' },
              { key: 'description', label: 'Description', type: 'text', value: 'Get Itinerary in few hours via email' },
              { key: 'buttonText', label: 'Button Text', type: 'text', value: 'Order Now' },
              { key: 'buttonLink', label: 'Button Link', type: 'url', value: '/flight-itinerary' },
              { key: 'feature1', label: 'Feature 1', type: 'text', value: 'Verifiable –24 Hours up to 14 days' },
              { key: 'feature2', label: 'Feature 2', type: 'text', value: '24 Hours Delivery' },
              { key: 'feature3', label: 'Feature 3', type: 'text', value: 'Upto 2 Corrections' },
              { key: 'feature4', label: 'Feature 4', type: 'text', value: 'PNR / Reference No' },
            ],
          },
          {
            id: 'pricing-2',
            fields: [
              { key: 'title', label: 'Title', type: 'text', value: 'Hotel Reservation' },
              { key: 'price', label: 'Price', type: 'text', value: '£5 Per Person' },
              { key: 'description', label: 'Description', type: 'text', value: 'Get Hotel Reservation in few hours via email' },
              { key: 'buttonText', label: 'Button Text', type: 'text', value: 'Order Now' },
              { key: 'buttonLink', label: 'Button Link', type: 'url', value: '/hotel-reservation' },
              { key: 'feature1', label: 'Feature 1', type: 'text', value: 'Verifiable' },
              { key: 'feature2', label: 'Feature 2', type: 'text', value: '24 Hours Delivery' },
              { key: 'feature3', label: 'Feature 3', type: 'text', value: 'Upto 2 Corrections' },
              { key: 'feature4', label: 'Feature 4', type: 'text', value: 'PNR / Reference No' },
            ],
          },
          {
            id: 'pricing-3',
            fields: [
              { key: 'title', label: 'Title', type: 'text', value: 'Travel Plan' },
              { key: 'price', label: 'Price', type: 'text', value: '£15 Per Person' },
              { key: 'description', label: 'Description', type: 'text', value: 'Get Travel Plan in few hours via email' },
              { key: 'buttonText', label: 'Button Text', type: 'text', value: 'Order Now' },
              { key: 'buttonLink', label: 'Button Link', type: 'url', value: '/travel-plan' },
              { key: 'feature1', label: 'Feature 1', type: 'text', value: '15 days' },
              { key: 'feature2', label: 'Feature 2', type: 'text', value: 'Specific for Visa purpose' },
              { key: 'feature3', label: 'Feature 3', type: 'text', value: '24 Hours Delivery' },
              { key: 'feature4', label: 'Feature 4', type: 'text', value: '3 Revisions' },
            ],
          },
          {
            id: 'pricing-4',
            fields: [
              { key: 'title', label: 'Title', type: 'text', value: 'Cover Letter' },
              { key: 'price', label: 'Price', type: 'text', value: '£15 Per Person' },
              { key: 'description', label: 'Description', type: 'text', value: 'Get Cover Letter in few hours via email' },
              { key: 'buttonText', label: 'Button Text', type: 'text', value: 'Order Now' },
              { key: 'buttonLink', label: 'Button Link', type: 'url', value: '/cover-letter' },
              { key: 'feature1', label: 'Feature 1', type: 'text', value: '15 days' },
              { key: 'feature2', label: 'Feature 2', type: 'text', value: 'Specific for Visa purpose' },
              { key: 'feature3', label: 'Feature 3', type: 'text', value: '24 Hours Delivery' },
              { key: 'feature4', label: 'Feature 4', type: 'text', value: '3 Revisions' },
            ],
          },
        ],
      },
      {
        id: 'payment-options',
        type: 'cards',
        label: 'Secure Payment Options',
        order: 10,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'Secure Payment Options' },
        ],
        items: [
          { id: 'payment-1', fields: [{ key: 'title', label: 'Title', type: 'text', value: 'Credit/Debit Cards' }, { key: 'image', label: 'Image', type: 'image', value: '/credit-cards.png' }] },
          { id: 'payment-2', fields: [{ key: 'title', label: 'Title', type: 'text', value: 'Apple Pay' }, { key: 'image', label: 'Image', type: 'image', value: '/apple-pay.png' }] },
          { id: 'payment-3', fields: [{ key: 'title', label: 'Title', type: 'text', value: 'Google Pay' }, { key: 'image', label: 'Image', type: 'image', value: '/google-pay.png' }] },
        ],
      },
      {
        id: 'seo',
        type: 'seo',
        label: 'SEO',
        order: 11,
        fields: [
          { key: 'metaTitle', label: 'Meta Title', type: 'text', value: 'OnwardTickets - Verified Flight Reservations for Visa Applications | Starting at $10' },
          { key: 'metaDescription', label: 'Meta Description', type: 'textarea', value: 'Get verified onward tickets and flight itineraries for visa applications. Real airline reservations with valid PNR. Accepted by embassies worldwide. Starting at $10.' },
          { key: 'ogImage', label: 'OG Image', type: 'image', value: '/og-image.png' },
          { key: 'keywords', label: 'Keywords', type: 'textarea', value: 'onward ticket, flight itinerary, visa application, flight reservation, dummy ticket, proof of onward travel' },
        ],
      },
    ],
  },

  // ─── ABOUT ───
  {
    slug: 'about',
    title: 'About Us',
    sections: [
      {
        id: 'hero',
        type: 'hero',
        label: 'Hero Section',
        order: 0,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'About Us – OnwardTicket.us' },
          { key: 'metaDescription', label: 'Meta Description', type: 'textarea', value: 'Learn about OnwardTicket.us - your trusted source for verified flight reservations for visa applications since 2019. 10,000+ successful visa applications. 24/7 support.' },
          { key: 'image1', label: 'Person Image 1', type: 'image', value: '/about-person1.jpg' },
          { key: 'image2', label: 'Person Image 2', type: 'image', value: '/about-person2.jpg' },
          { key: 'image3', label: 'Person Image 3', type: 'image', value: '/about-person3.jpg' },
          { key: 'image4', label: 'Person Image 4', type: 'image', value: '/about-person4.jpg' },
          { key: 'image5', label: 'Person Image 5', type: 'image', value: '/about-person5.jpg' },
        ],
      },
      {
        id: 'who-we-are',
        type: 'text',
        label: 'Who We Are',
        order: 1,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'Who We Are' },
          { key: 'intro', label: 'Intro Paragraph', type: 'textarea', value: 'OnwardTicket.us is your trusted partner for verified flight reservations designed specifically for visa applications and immigration documentation.' },
          { key: 'body', label: 'Body Text', type: 'textarea', value: "We understand the stress and complexity of visa applications. That's why we created a simple, affordable solution that eliminates the risk of buying expensive flights before visa approval—while still meeting all embassy and immigration requirements. Since 2019, we've helped over 10,000 travelers from around the world successfully obtain tourist visas, business visas, and meet immigration requirements by providing legitimate, embassy-accepted onward tickets starting at just $10." },
          { key: 'image1', label: 'Image 1', type: 'image', value: '/who-we-are-1.png' },
          { key: 'image2', label: 'Image 2', type: 'image', value: '/who-we-are-2.png' },
          { key: 'image3', label: 'Image 3 (Overlay)', type: 'image', value: '/who-we-are-3.png' },
        ],
      },
      {
        id: 'our-mission',
        type: 'text',
        label: 'Our Mission',
        order: 2,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'Our Mission' },
          { key: 'title', label: 'Mission Title', type: 'text', value: 'Making Visa Applications Stress-Free and Affordable' },
          { key: 'subtitle', label: 'Mission Subtitle', type: 'textarea', value: 'Our mission is simple: Help travelers meet visa documentation requirements without the financial risk of purchasing full-price flight tickets before visa approval.' },
        ],
        items: [
          { id: 'value-1', fields: [{ key: 'text', label: 'Value', type: 'text', value: "Visa applications shouldn't require financial risk" }] },
          { id: 'value-2', fields: [{ key: 'text', label: 'Value', type: 'text', value: 'Travel documentation should be accessible and affordable' }] },
          { id: 'value-3', fields: [{ key: 'text', label: 'Value', type: 'text', value: 'Every traveler deserves legitimate, verifiable proof of onward travel' }] },
          { id: 'value-4', fields: [{ key: 'text', label: 'Value', type: 'text', value: 'Customer support should be available 24/7 when you need it' }] },
          { id: 'value-5', fields: [{ key: 'text', label: 'Value', type: 'text', value: 'Transparency and honesty build lasting trust' }] },
        ],
      },
      {
        id: 'our-story',
        type: 'image_text',
        label: 'Our Story',
        order: 3,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'Our Story' },
          { key: 'subtitle', label: 'Subtitle', type: 'text', value: 'How OnwardTicket.us Was Born' },
          { key: 'problemHeading', label: 'Problem Heading', type: 'text', value: 'The Problem We Saw:' },
          { key: 'problemText1', label: 'Problem Text 1', type: 'textarea', value: 'In 2018, our founder was helping a friend apply for a Schengen visa. The embassy required proof of onward travel, but purchasing a $600 round-trip flight before visa approval seemed risky—what if the visa was rejected?' },
          { key: 'problemText2', label: 'Problem Text 2', type: 'text', value: 'After researching alternatives, we discovered:' },
          { key: 'problemImage', label: 'Problem Image', type: 'image', value: '/story-problem.jpg' },
          { key: 'solutionHeading', label: 'Solution Heading', type: 'text', value: 'The Solution We Built:' },
          { key: 'solutionText1', label: 'Solution Text 1', type: 'textarea', value: 'We created OnwardTicket.us to provide real, verifiable flight reservations specifically for visa documentation—affordable, legitimate, and embassy-accepted.' },
          { key: 'solutionText2', label: 'Solution Text 2', type: 'text', value: 'What started as helping one friend has grown to:' },
          { key: 'solutionImage', label: 'Solution Image', type: 'image', value: '/story-solution.jpg' },
        ],
        items: [
          { id: 'problem-1', fields: [{ key: 'text', label: 'Problem Bullet', type: 'text', value: 'Buying expensive flights before approval was financially risky' }] },
          { id: 'problem-2', fields: [{ key: 'text', label: 'Problem Bullet', type: 'text', value: 'Free 24-hour cancellation tricks were unreliable and time-consuming' }] },
          { id: 'problem-3', fields: [{ key: 'text', label: 'Problem Bullet', type: 'text', value: 'Fake documents led to visa rejections and legal issues' }] },
          { id: 'problem-4', fields: [{ key: 'text', label: 'Problem Bullet', type: 'text', value: 'Legitimate flight reservations (not purchased tickets) were accepted by embassies' }] },
          { id: 'solution-1', fields: [{ key: 'text', label: 'Solution Bullet', type: 'text', value: '10,000+ successful visa applications' }] },
          { id: 'solution-2', fields: [{ key: 'text', label: 'Solution Bullet', type: 'text', value: 'Service to travelers in 190+ countries' }] },
          { id: 'solution-3', fields: [{ key: 'text', label: 'Solution Bullet', type: 'text', value: '99%+ embassy acceptance rate' }] },
          { id: 'solution-4', fields: [{ key: 'text', label: 'Solution Bullet', type: 'text', value: '4.8/5 star customer rating' }] },
          { id: 'solution-5', fields: [{ key: 'text', label: 'Solution Bullet', type: 'text', value: '24/7 customer support team' }] },
        ],
      },
      {
        id: 'stats',
        type: 'stats',
        label: 'By The Numbers',
        order: 4,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'By The Numbers' },
          { key: 'subtitle', label: 'Subtitle', type: 'text', value: 'Our Track Record' },
        ],
        items: [
          { id: 'stat-1', fields: [{ key: 'number', label: 'Number', type: 'text', value: '10,000+' }, { key: 'label', label: 'Label', type: 'text', value: 'Successful visa applications using our tickets' }] },
          { id: 'stat-2', fields: [{ key: 'number', label: 'Number', type: 'text', value: '190+' }, { key: 'label', label: 'Label', type: 'text', value: 'Countries we\'ve helped travelers visit' }] },
          { id: 'stat-3', fields: [{ key: 'number', label: 'Number', type: 'text', value: '99%+' }, { key: 'label', label: 'Label', type: 'text', value: 'Embassy acceptance rate for our reservations' }] },
          { id: 'stat-4', fields: [{ key: 'number', label: 'Number', type: 'text', value: '24/7' }, { key: 'label', label: 'Label', type: 'text', value: 'Customer support availability (365 days/year)' }] },
          { id: 'stat-5', fields: [{ key: 'number', label: 'Number', type: 'text', value: '4.8/5' }, { key: 'label', label: 'Label', type: 'text', value: 'Average customer rating (Trustpilot verified)' }] },
          { id: 'stat-6', fields: [{ key: 'number', label: 'Number', type: 'text', value: '1-24' }, { key: 'label', label: 'Label', type: 'text', value: 'Hours delivery timeframe (depending on speed selected)' }] },
          { id: 'stat-7', fields: [{ key: 'number', label: 'Number', type: 'text', value: '$10' }, { key: 'label', label: 'Label', type: 'text', value: 'Starting price (one-way or return tickets)' }] },
          { id: 'stat-8', fields: [{ key: 'number', label: 'Number', type: 'text', value: '2019' }, { key: 'label', label: 'Label', type: 'text', value: 'Year founded (5+ years of experience)' }] },
        ],
      },
      {
        id: 'how-we-work',
        type: 'cards',
        label: 'How We Work',
        order: 5,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'How We Work' },
          { key: 'subtitle', label: 'Subtitle', type: 'text', value: 'Our Process is Simple and Transparent' },
          { key: 'footerText', label: 'Footer Text', type: 'text', value: "That's it! Simple, fast, and reliable." },
        ],
        items: [
          { id: 'step-1', fields: [{ key: 'title', label: 'Title', type: 'text', value: 'You Place Your Order' }, { key: 'description', label: 'Description', type: 'textarea', value: 'Choose ticket type (one-way, return, or multi-city)\nEnter your travel details\nProvide passenger information (exactly as on passport)\nSelect delivery speed' }] },
          { id: 'step-2', fields: [{ key: 'title', label: 'Title', type: 'text', value: 'We Create Your Reservation' }, { key: 'description', label: 'Description', type: 'textarea', value: 'Access airline booking systems\nGenerate valid PNR\nCreate verifiable reservation\nPrepare embassy-ready documentation' }] },
          { id: 'step-3', fields: [{ key: 'title', label: 'Title', type: 'text', value: 'You Receive Your Ticket' }, { key: 'description', label: 'Description', type: 'textarea', value: 'Email delivery within selected timeframe\nBooking confirmation with PNR\nPrintable PDF documentation\nReady for visa application' }] },
          { id: 'step-4', fields: [{ key: 'title', label: 'Title', type: 'text', value: 'You Apply for Your Visa' }, { key: 'description', label: 'Description', type: 'textarea', value: 'Submit reservation with visa application\nEmbassy verifies PNR with airline\nMeet documentation requirements\nIncrease approval chances' }] },
        ],
      },
      {
        id: 'core-values',
        type: 'cards',
        label: 'Core Values',
        order: 6,
        fields: [
          { key: 'integrityTitle', label: 'Integrity Title', type: 'text', value: 'Integrity' },
          { key: 'integritySubtitle', label: 'Integrity Subtitle', type: 'text', value: 'We only provide legitimate, real reservations.' },
          { key: 'integrityBody', label: 'Integrity Body', type: 'textarea', value: 'No fake PNRs, no forged documents, no deceptive practices. Our reservations are created in actual airline systems and can be verified by any embassy or immigration officer.' },
        ],
        items: [
          { id: 'integrity-never-1', fields: [{ key: 'text', label: 'We never', type: 'text', value: 'Create fake bookings' }] },
          { id: 'integrity-never-2', fields: [{ key: 'text', label: 'We never', type: 'text', value: 'Forge airline documents' }] },
          { id: 'integrity-never-3', fields: [{ key: 'text', label: 'We never', type: 'text', value: 'Make false promises' }] },
          { id: 'integrity-never-4', fields: [{ key: 'text', label: 'We never', type: 'text', value: 'Misrepresent our service' }] },
          { id: 'value-transparency', fields: [{ key: 'title', label: 'Title', type: 'text', value: 'Transparency' }, { key: 'subtitle', label: 'Subtitle', type: 'text', value: 'Honest about what we provide and how it works.' }, { key: 'footer', label: 'Footer', type: 'text', value: 'No hidden fees, no surprises, no fine print tricks.' }] },
          { id: 'value-customer-success', fields: [{ key: 'title', label: 'Title', type: 'text', value: 'Customer Success' }, { key: 'subtitle', label: 'Subtitle', type: 'text', value: 'Your visa success is our success.' }, { key: 'footer', label: 'Footer', type: 'text', value: 'When you succeed, we succeed.' }] },
          { id: 'value-innovation', fields: [{ key: 'title', label: 'Title', type: 'text', value: 'Innovation' }, { key: 'subtitle', label: 'Subtitle', type: 'text', value: 'Constantly improving our service.' }] },
          { id: 'value-empathy', fields: [{ key: 'title', label: 'Title', type: 'text', value: 'Empathy' }, { key: 'subtitle', label: 'Subtitle', type: 'text', value: 'We understand the stress of visa applications.' }, { key: 'footer', label: 'Footer', type: 'text', value: "That's why we built a service that reduces stress, not adds to it." }] },
        ],
      },
      {
        id: 'what-were-not',
        type: 'cards',
        label: "What We're NOT",
        order: 7,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: "What We're NOT" },
          { key: 'subtitle', label: 'Subtitle', type: 'text', value: 'Setting Clear Expectations' },
        ],
        items: [
          { id: 'not-1', fields: [{ key: 'title', label: 'Title', type: 'text', value: "We Don't Sell Flight Tickets for Actual Travel" }, { key: 'bold', label: 'Bold Label', type: 'text', value: 'Our reservations are for documentation only.' }, { key: 'body', label: 'Body', type: 'textarea', value: 'If you need to actually fly, you must purchase a real flight ticket from airlines or booking sites. Our service is specifically for visa applications and immigration proof—not for boarding planes.' }, { key: 'image', label: 'Image', type: 'image', value: '/what-not-1.png' }] },
          { id: 'not-2', fields: [{ key: 'title', label: 'Title', type: 'text', value: "We Don't Guarantee Visa Approval" }, { key: 'bold', label: 'Bold Label', type: 'text', value: 'Visa decisions are made by embassies, not us.' }, { key: 'body', label: 'Body', type: 'textarea', value: 'We provide legitimate documentation that meets requirements, but visa approval depends on many factors: Your financial situation, Travel history, Ties to home country, Complete application, Embassy officer discretion.\nWhat we DO guarantee: Legitimate, verifiable reservations accepted by embassies.' }, { key: 'image', label: 'Image', type: 'image', value: '/what-not-2.png' }] },
          { id: 'not-3', fields: [{ key: 'title', label: 'Title', type: 'text', value: "We Don't Control Validity Periods" }, { key: 'bold', label: 'Bold Label', type: 'text', value: 'Validity is determined by airlines, not us.' }, { key: 'body', label: 'Body', type: 'textarea', value: "When we create a reservation, the airline's system determines how long it remains valid (typically 24 hours to 14 days). We cannot extend, modify, or guarantee specific validity periods" }, { key: 'image', label: 'Image', type: 'image', value: '/what-not-3.png' }] },
          { id: 'not-4', fields: [{ key: 'title', label: 'Title', type: 'text', value: "We Don't Offer Refunds for Change of Mind" }, { key: 'bold', label: 'Bold Label', type: 'text', value: 'Digital services begin processing immediately.' }, { key: 'body', label: 'Body', type: 'textarea', value: "Once your order is placed and we create your reservation in airline systems, we've incurred real costs. However, if your visa is rejected specifically because of the onward ticket (with official embassy documentation), we provide a refund. See our Refund Policy for details." }, { key: 'image', label: 'Image', type: 'image', value: '/what-not-4.png' }] },
        ],
      },
      {
        id: 'our-commitment',
        type: 'cards',
        label: 'Our Commitment to You',
        order: 8,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'Our Commitment to You' },
          { key: 'subtitle', label: 'Subtitle', type: 'text', value: 'What You Can Expect From Us' },
        ],
        items: [
          { id: 'commit-1', fields: [{ key: 'title', label: 'Title', type: 'text', value: 'Legitimate Service' }, { key: 'description', label: 'Description', type: 'text', value: 'Real airline reservations created in actual booking systems' }] },
          { id: 'commit-2', fields: [{ key: 'title', label: 'Title', type: 'text', value: 'Verified PNRs' }, { key: 'description', label: 'Description', type: 'text', value: 'Every booking reference can be checked with airlines' }] },
          { id: 'commit-3', fields: [{ key: 'title', label: 'Title', type: 'text', value: 'Fast Delivery' }, { key: 'description', label: 'Description', type: 'text', value: '1-24 hours depending on your chosen speed' }] },
          { id: 'commit-4', fields: [{ key: 'title', label: 'Title', type: 'text', value: 'Accurate Information' }, { key: 'description', label: 'Description', type: 'text', value: 'Documentation ready for embassy submission' }] },
          { id: 'commit-5', fields: [{ key: 'title', label: 'Title', type: 'text', value: '24/7 Support' }, { key: 'description', label: 'Description', type: 'text', value: 'Help available whenever you need it' }] },
          { id: 'commit-6', fields: [{ key: 'title', label: 'Title', type: 'text', value: 'Secure Processing' }, { key: 'description', label: 'Description', type: 'text', value: 'SSL encryption and secure payment systems' }] },
          { id: 'commit-7', fields: [{ key: 'title', label: 'Title', type: 'text', value: 'Privacy Protection' }, { key: 'description', label: 'Description', type: 'text', value: 'Your information handled confidentially' }] },
          { id: 'commit-8', fields: [{ key: 'title', label: 'Title', type: 'text', value: 'Continuous Improvement' }, { key: 'description', label: 'Description', type: 'text', value: 'Always working to serve you better' }] },
        ],
      },
      {
        id: 'why-choose-us',
        type: 'cards',
        label: 'Why Choose OnwardTicket.us',
        order: 9,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'WHY CHOOSE ONWARDTICKET.US FOR YOUR VISA?' },
          { key: 'decorImage', label: 'Decorative Image', type: 'image', value: '/why-choose-decor.png' },
        ],
        items: [
          { id: 'card-1', fields: [{ key: 'title', label: 'Title', type: 'text', value: 'Real Airline Reservations' }, { key: 'description', label: 'Description', type: 'textarea', value: 'We create actual bookings in airline systems with valid PNRs. Embassy visa officers can verify your reservation directly with carriers.' }, { key: 'icon', label: 'Icon', type: 'image', value: '/why-choose-icon-1.png' }] },
          { id: 'card-2', fields: [{ key: 'title', label: 'Title', type: 'text', value: 'Quick Delivery' }, { key: 'description', label: 'Description', type: 'textarea', value: 'Receive your ticket via email within your selected timeframe. Delivery speed options available at checkout.' }, { key: 'icon', label: 'Icon', type: 'image', value: '/why-choose-icon-2.png' }] },
          { id: 'card-3', fields: [{ key: 'title', label: 'Title', type: 'text', value: 'Validity' }, { key: 'description', label: 'Description', type: 'textarea', value: 'Ticket validity typically ranges from 24 hours up to 14 days' }, { key: 'icon', label: 'Icon', type: 'image', value: '/why-choose-icon-3.png' }] },
          { id: 'card-4', fields: [{ key: 'title', label: 'Title', type: 'text', value: 'Flexible Options' }, { key: 'description', label: 'Description', type: 'textarea', value: 'One-way tickets from $10, return tickets from $10, or multi-city itineraries for $17. Choose what matches your visa requirements.' }, { key: 'icon', label: 'Icon', type: 'image', value: '/why-choose-icon-4.png' }] },
          { id: 'card-5', fields: [{ key: 'title', label: 'Title', type: 'text', value: 'Embassy Accepted' }, { key: 'description', label: 'Description', type: 'textarea', value: 'Our reservations meet all embassy and consulate requirements. Successfully used for thousands of visa applications worldwide.' }, { key: 'icon', label: 'Icon', type: 'image', value: '/why-choose-icon-5.png' }] },
          { id: 'card-6', fields: [{ key: 'title', label: 'Title', type: 'text', value: 'Global Coverage' }, { key: 'description', label: 'Description', type: 'textarea', value: 'Book tickets for any visa application: Schengen visas, US visas, UK visas, Australian visas, and 190+ countries worldwide.' }, { key: 'icon', label: 'Icon', type: 'image', value: '/why-choose-icon-6.png' }] },
        ],
      },
      {
        id: 'testimonials',
        type: 'testimonials',
        label: 'Customer Success Stories',
        order: 10,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'Customer Success Stories' },
          { key: 'subtitle', label: 'Subtitle', type: 'text', value: 'Real Travelers, Real Results' },
        ],
        items: [
          { id: 'test-1', fields: [{ key: 'name', label: 'Name', type: 'text', value: 'Sarah M.' }, { key: 'location', label: 'Location', type: 'text', value: 'Los Angeles, CA' }, { key: 'text', label: 'Review', type: 'textarea', value: 'Needed proof of onward travel for my Schengen visa. OnwardTicket.us provided a legitimate reservation that the German embassy verified. Visa approved!' }, { key: 'image', label: 'Avatar', type: 'image', value: '/testimonial-sarah.jpg' }] },
          { id: 'test-2', fields: [{ key: 'name', label: 'Name', type: 'text', value: 'Jams.R' }, { key: 'location', label: 'Location', type: 'text', value: 'New York, NY' }, { key: 'text', label: 'Review', type: 'textarea', value: 'Last-minute Thailand trip. Used the 1-hour express service. Got my onward ticket immediately, showed it at Bangkok immigration, no problems.' }, { key: 'image', label: 'Avatar', type: 'image', value: '/testimonial-jams.jpg' }] },
          { id: 'test-3', fields: [{ key: 'name', label: 'Name', type: 'text', value: 'Maria G' }, { key: 'location', label: 'Location', type: 'text', value: 'Los Angeles, CA' }, { key: 'text', label: 'Review', type: 'textarea', value: 'Planning a 3-month European trip through multiple countries. Got a multi-city ticket showing my complete route. UK embassy accepted it without question.' }, { key: 'image', label: 'Avatar', type: 'image', value: '/testimonial-maria.jpg' }] },
          { id: 'test-4', fields: [{ key: 'name', label: 'Name', type: 'text', value: 'David K.' }, { key: 'location', label: 'Location', type: 'text', value: 'Chicago, IL' }, { key: 'text', label: 'Review', type: 'textarea', value: 'Was skeptical at first, but needed proof for Australia visa. The PNR was real and verifiable. Embassy called the airline and confirmed my reservation. Visa approved in 2 weeks!' }, { key: 'image', label: 'Avatar', type: 'image', value: '/testimonial-david.jpg' }] },
          { id: 'test-5', fields: [{ key: 'name', label: 'Name', type: 'text', value: 'Jennifer L.' }, { key: 'location', label: 'Location', type: 'text', value: 'Houston, TX' }, { key: 'text', label: 'Review', type: 'textarea', value: 'Customer support was amazing! Had questions at 11 PM, got immediate responses via live chat. They helped me choose the right ticket type for my situation.' }, { key: 'image', label: 'Avatar', type: 'image', value: '/testimonial-jennifer.jpg' }] },
        ],
      },
      {
        id: 'contact-section',
        type: 'text',
        label: 'Contact Us Section',
        order: 11,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'Contact US' },
          { key: 'subtitle', label: 'Subtitle', type: 'text', value: "We're Here to Help" },
          { key: 'note', label: 'Support Note', type: 'text', value: 'Customer Support: Available 24/7, 365 days a year' },
          { key: 'image', label: 'Support Image', type: 'image', value: '/contact-support.png' },
        ],
        items: [
          { id: 'contact-1', fields: [{ key: 'label', label: 'Label', type: 'text', value: 'Email' }, { key: 'value', label: 'Value', type: 'text', value: 'contact@onwardtickets.com' }, { key: 'note', label: 'Note', type: 'text', value: 'Response time: Usually within 30 minutes' }] },
          { id: 'contact-2', fields: [{ key: 'label', label: 'Label', type: 'text', value: 'Live Chat' }, { key: 'value', label: 'Value', type: 'text', value: 'Click the chat icon on our website' }, { key: 'note', label: 'Note', type: 'text', value: 'Instant connection to support team' }] },
          { id: 'contact-3', fields: [{ key: 'label', label: 'Label', type: 'text', value: 'Phone' }, { key: 'value', label: 'Value', type: 'text', value: 'Available on our Contact Page' }] },
          { id: 'contact-4', fields: [{ key: 'label', label: 'Label', type: 'text', value: 'Business Inquiries' }, { key: 'value', label: 'Value', type: 'text', value: 'contact@onwardtickets.com' }] },
          { id: 'contact-5', fields: [{ key: 'label', label: 'Label', type: 'text', value: 'Legal/Privacy' }, { key: 'value', label: 'Value', type: 'text', value: 'contact@onwardtickets.com' }] },
        ],
      },
      {
        id: 'our-promise',
        type: 'text',
        label: 'Our Promise',
        order: 12,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'Our Promise' },
          { key: 'subtitle', label: 'Subtitle', type: 'text', value: 'What We Stand Behind' },
          { key: 'image', label: 'Image', type: 'image', value: '/our-promise.png' },
          { key: 'introBold', label: 'Intro Bold Text', type: 'text', value: 'We believe in our service so much that:' },
          { key: 'introBody', label: 'Intro Body', type: 'textarea', value: 'If your visa is rejected specifically because of our onward ticket (with official embassy documentation stating this), we provide a full refund. That\'s how confident we are in our reservations.' },
        ],
        items: [
          { id: 'promise-1', fields: [{ key: 'text', label: 'Promise', type: 'text', value: 'Provide only legitimate, real flight reservations' }] },
          { id: 'promise-2', fields: [{ key: 'text', label: 'Promise', type: 'text', value: 'Deliver within your selected timeframe' }] },
          { id: 'promise-3', fields: [{ key: 'text', label: 'Promise', type: 'text', value: 'Support you 24/7 throughout your visa process' }] },
          { id: 'promise-4', fields: [{ key: 'text', label: 'Promise', type: 'text', value: 'Maintain the highest standards of integrity' }] },
          { id: 'promise-5', fields: [{ key: 'text', label: 'Promise', type: 'text', value: 'Continuously improve our service' }] },
          { id: 'promise-6', fields: [{ key: 'text', label: 'Promise', type: 'text', value: 'Treat your information with complete confidentiality' }] },
          { id: 'promise-7', fields: [{ key: 'text', label: 'Promise', type: 'text', value: 'Be transparent about what we can and cannot do' }] },
        ],
      },
      {
        id: 'join-thousands',
        type: 'cta',
        label: 'Join Thousands CTA',
        order: 13,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'Join Thousands of Successful Travelers' },
          { key: 'subtitle', label: 'Subtitle', type: 'text', value: 'Ready for Your Visa Application?' },
          { key: 'body1', label: 'Body Text 1', type: 'textarea', value: "Don't let missing documentation delay your travel plans or force you to risk hundreds of dollars on flights before visa approval." },
          { key: 'body2', label: 'Body Text 2', type: 'text', value: 'Get Your Onward Ticket Now – Starting at $10' },
          { key: 'ctaText', label: 'CTA Button Text', type: 'text', value: 'Onward Ticket Now' },
          { key: 'ctaLink', label: 'CTA Button Link', type: 'url', value: '/flight-itinerary' },
        ],
        items: [
          { id: 'info-1', fields: [{ key: 'text', label: 'Info Card', type: 'text', value: 'Real Airline PNR | Embassy Accepted | 24/7 Support' }] },
          { id: 'info-2', fields: [{ key: 'text', label: 'Info Card', type: 'text', value: 'Used for 10,000+ Successful Visa Applications' }] },
          { id: 'info-3', fields: [{ key: 'text', label: 'Info Card', type: 'text', value: 'Delivery in 1-24 Hours | Secure & Confidential' }] },
        ],
      },
      {
        id: 'related-resources',
        type: 'cards',
        label: 'Related Resources',
        order: 14,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'Related Resources' },
          { key: 'subtitle', label: 'Subtitle', type: 'text', value: 'Ready for Your Visa Application?' },
        ],
        items: [
          { id: 'link-1', fields: [{ key: 'label', label: 'Label', type: 'text', value: 'How It Works' }, { key: 'url', label: 'URL', type: 'url', value: '/#how-it-works' }, { key: 'description', label: 'Description', type: 'text', value: 'Complete process explanation' }] },
          { id: 'link-2', fields: [{ key: 'label', label: 'Label', type: 'text', value: 'Pricing' }, { key: 'url', label: 'URL', type: 'url', value: '/#pricing' }, { key: 'description', label: 'Description', type: 'text', value: 'Detailed pricing and options' }] },
          { id: 'link-3', fields: [{ key: 'label', label: 'Label', type: 'text', value: 'FAQ' }, { key: 'url', label: 'URL', type: 'url', value: '/#faq' }, { key: 'description', label: 'Description', type: 'text', value: 'All your questions answered' }] },
          { id: 'link-4', fields: [{ key: 'label', label: 'Label', type: 'text', value: 'Blog' }, { key: 'url', label: 'URL', type: 'url', value: '/blog' }, { key: 'description', label: 'Description', type: 'text', value: 'Visa guides and travel tips' }] },
          { id: 'link-5', fields: [{ key: 'label', label: 'Label', type: 'text', value: 'Contact' }, { key: 'url', label: 'URL', type: 'url', value: '/contact-us' }, { key: 'description', label: 'Description', type: 'text', value: 'Get in touch with our team' }] },
          { id: 'guide-1', fields: [{ key: 'label', label: 'Label', type: 'text', value: 'Schengen Visa Requirements' }, { key: 'url', label: 'URL', type: 'url', value: '/blog' }] },
          { id: 'guide-2', fields: [{ key: 'label', label: 'Label', type: 'text', value: 'Thailand Visa Guide' }, { key: 'url', label: 'URL', type: 'url', value: '/blog' }] },
          { id: 'guide-3', fields: [{ key: 'label', label: 'Label', type: 'text', value: 'Australia Visa Documentation' }, { key: 'url', label: 'URL', type: 'url', value: '/blog' }] },
          { id: 'guide-4', fields: [{ key: 'label', label: 'Label', type: 'text', value: 'Country-Specific Guides' }, { key: 'url', label: 'URL', type: 'url', value: '/blog' }] },
        ],
      },
      {
        id: 'transparency',
        type: 'cards',
        label: 'Transparency & Compliance',
        order: 15,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'Transparency & Compliance' },
          { key: 'subtitle', label: 'Subtitle', type: 'text', value: 'Our Commitments' },
        ],
        items: [
          { id: 'comp-1', fields: [{ key: 'title', label: 'Title', type: 'text', value: 'Privacy & Security' }, { key: 'items', label: 'Items', type: 'textarea', value: 'SSL encrypted website\nSecure payment processing\nGDPR compliant\nCCPA compliant\nData protection protocols' }] },
          { id: 'comp-2', fields: [{ key: 'title', label: 'Title', type: 'text', value: 'Legal Compliance' }, { key: 'items', label: 'Items', type: 'textarea', value: 'Registered business\nTransparent operations\nClear terms and conditions\nPrivacy policy\nRefund policy' }] },
          { id: 'comp-3', fields: [{ key: 'title', label: 'Title', type: 'text', value: 'Quality Standards' }, { key: 'items', label: 'Items', type: 'textarea', value: 'Real airline bookings only\nVerified PNR generation\nEmbassy-accepted documentation\nContinuous quality monitoring' }] },
        ],
      },
      {
        id: 'faq',
        type: 'faq',
        label: 'FAQ',
        order: 16,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'FREQUENTLY ASKED QUESTIONS' },
          { key: 'subtitle', label: 'Subtitle', type: 'text', value: 'Quick Answers to Common Questions' },
        ],
        items: [
          { id: 'faq-1', fields: [{ key: 'question', label: 'Question', type: 'text', value: 'Is this legal?' }, { key: 'answer', label: 'Answer', type: 'textarea', value: 'Yes, absolutely. We create legitimate flight reservations (not fake documents) that meet embassy requirements for proof of onward travel.' }] },
          { id: 'faq-2', fields: [{ key: 'question', label: 'Question', type: 'text', value: 'Do embassies really accept this?' }, { key: 'answer', label: 'Answer', type: 'textarea', value: 'Yes. Our reservations are real airline bookings with valid PNR codes that embassy officers can verify directly with airlines. We have a 99%+ embassy acceptance rate across thousands of applications.' }] },
          { id: 'faq-3', fields: [{ key: 'question', label: 'Question', type: 'text', value: 'How long is the reservation valid?' }, { key: 'answer', label: 'Answer', type: 'textarea', value: "Reservation validity typically ranges from 24 hours to 14 days, depending on the airline and ticket type. The validity period is determined by the airline's booking system, not by us." }] },
          { id: 'faq-4', fields: [{ key: 'question', label: 'Question', type: 'text', value: 'Can I use this for actual travel?' }, { key: 'answer', label: 'Answer', type: 'textarea', value: 'No. Our reservations are for visa documentation purposes only. If you need to actually fly, you must purchase a real flight ticket from an airline or booking site.' }] },
          { id: 'faq-5', fields: [{ key: 'question', label: 'Question', type: 'text', value: 'What if my visa gets rejected?' }, { key: 'answer', label: 'Answer', type: 'textarea', value: 'If your visa is rejected specifically because of the onward ticket (with official embassy documentation stating this), we provide a refund. The reservation will simply expire after its validity period.' }] },
          { id: 'faq-6', fields: [{ key: 'question', label: 'Question', type: 'text', value: 'How quickly will I receive my ticket?' }, { key: 'answer', label: 'Answer', type: 'textarea', value: 'Delivery depends on the speed you select at checkout. We offer standard, fast, and express delivery options. Express delivery can get your ticket to you within 1 hour.' }] },
          { id: 'faq-7', fields: [{ key: 'question', label: 'Question', type: 'text', value: 'For more questions:' }, { key: 'answer', label: 'Answer', type: 'textarea', value: "Visit our main FAQ page or contact our 24/7 customer support team via live chat, email, or phone. We're always happy to help with any questions about our service." }] },
        ],
      },
      {
        id: 'footer-cta',
        type: 'cta',
        label: 'Footer CTA',
        order: 17,
        fields: [
          { key: 'aboutText', label: 'About Text', type: 'textarea', value: 'About OnwardTicket.us: Helping travelers meet visa requirements since 2019. Trusted by 10,000+ customers worldwide for legitimate, affordable, and reliable onward ticket reservations.' },
          { key: 'lastUpdated', label: 'Last Updated', type: 'text', value: 'Last Updated: October 2025' },
          { key: 'tagline', label: 'Tagline', type: 'text', value: 'Your journey starts with the right documentation. Let us help you get there.' },
          { key: 'ctaText', label: 'CTA Button Text', type: 'text', value: 'Start Your Application' },
          { key: 'ctaLink', label: 'CTA Button Link', type: 'url', value: '/flight-itinerary' },
        ],
      },
      {
        id: 'seo',
        type: 'seo',
        label: 'SEO',
        order: 18,
        fields: [
          { key: 'metaTitle', label: 'Meta Title', type: 'text', value: 'About OnwardTickets - Trusted Flight Reservation Service Since 2019' },
          { key: 'metaDescription', label: 'Meta Description', type: 'textarea', value: 'Learn about OnwardTickets - helping 10,000+ travelers worldwide with verified flight reservations for visa applications since 2019.' },
          { key: 'ogImage', label: 'OG Image', type: 'image', value: '/og-image.png' },
          { key: 'keywords', label: 'Keywords', type: 'textarea', value: 'about onward tickets, flight reservation service, visa document provider, trusted visa service' },
        ],
      },
    ],
  },

  // ─── VISA ASSISTANT ───
  {
    slug: 'visa-assistant',
    title: 'Visa Assistant',
    sections: [
      {
        id: 'hero',
        type: 'hero',
        label: 'Hero Section',
        order: 0,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'Struggling with Your Visa? Let Experts Handle It!' },
          { key: 'subheading', label: 'Subheading', type: 'textarea', value: 'Get expert assistance with visa application form filling, supporting documents, and personalized consultation – delivered within 24 hours!' },
          { key: 'ctaText', label: 'CTA Button Text', type: 'text', value: 'GET VISA ASSISTANCE NOW' },
          { key: 'ctaLink', label: 'CTA Button Link', type: 'url', value: '#services' },
          { key: 'heroImage', label: 'Hero Image', type: 'image', value: '/visa-hero-woman.jpg' },
        ],
      },
      {
        id: 'stats',
        type: 'stats',
        label: 'Stats',
        order: 1,
        fields: [],
        items: [
          { id: 'stat-1', fields: [{ key: 'number', label: 'Number', type: 'text', value: '10,000+' }, { key: 'label', label: 'Label', type: 'text', value: 'Visa applications processed worldwide' }] },
          { id: 'stat-2', fields: [{ key: 'number', label: 'Number', type: 'text', value: '100+' }, { key: 'label', label: 'Label', type: 'text', value: 'Trusted by applicants from 50+ countries.' }] },
          { id: 'stat-3', fields: [{ key: 'number', label: 'Number', type: 'text', value: '5+' }, { key: 'label', label: 'Label', type: 'text', value: 'Years Experience' }] },
        ],
      },
      {
        id: 'how-it-works',
        type: 'cards',
        label: 'How It Works',
        order: 2,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'How It Works' },
          { key: 'subheading', label: 'Subheading', type: 'text', value: 'Get your visa application & documents in just a few clicks!' },
        ],
        items: [
          { id: 'step-1', fields: [{ key: 'title', label: 'Title', type: 'text', value: 'Step 1: Choose a Service' }, { key: 'description', label: 'Description', type: 'text', value: 'Pick the visa assistance service you need.' }] },
          { id: 'step-2', fields: [{ key: 'title', label: 'Title', type: 'text', value: 'Step 2: Submit & Pay' }, { key: 'description', label: 'Description', type: 'text', value: 'Fill in details & complete payment.' }] },
          { id: 'step-3', fields: [{ key: 'title', label: 'Title', type: 'text', value: 'Step 3: Get Your Documents' }, { key: 'description', label: 'Description', type: 'text', value: 'Receive embassy-approved files in 24 hours.' }] },
        ],
      },
      {
        id: 'services',
        type: 'cards',
        label: 'Service Cards',
        order: 3,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'Visa Application Form Filling' },
        ],
        items: [
          { id: 'svc-1', fields: [{ key: 'title', label: 'Title', type: 'text', value: 'Visa Filling' }, { key: 'price', label: 'Price', type: 'text', value: '£120' }, { key: 'buttonText', label: 'Button Text', type: 'text', value: 'Order Now' }, { key: 'buttonLink', label: 'Button Link', type: 'url', value: '/visa-application-form-filling' }] },
          { id: 'svc-2', fields: [{ key: 'title', label: 'Title', type: 'text', value: 'Visa Supporting Documents' }, { key: 'price', label: 'Price', type: 'text', value: '£35' }, { key: 'buttonText', label: 'Button Text', type: 'text', value: 'Order Now' }, { key: 'buttonLink', label: 'Button Link', type: 'url', value: '/visa-supporting-documents' }] },
          { id: 'svc-3', fields: [{ key: 'title', label: 'Title', type: 'text', value: 'Visa Essentials Package' }, { key: 'price', label: 'Price', type: 'text', value: '£150' }, { key: 'buttonText', label: 'Button Text', type: 'text', value: 'Order Now' }, { key: 'buttonLink', label: 'Button Link', type: 'url', value: '/visa-essentials-package' }] },
          { id: 'svc-4', fields: [{ key: 'title', label: 'Title', type: 'text', value: 'Hire an Expert Visa Consultant' }, { key: 'price', label: 'Price', type: 'text', value: '£70' }, { key: 'buttonText', label: 'Button Text', type: 'text', value: 'Order Now' }, { key: 'buttonLink', label: 'Button Link', type: 'url', value: '/hire-an-expert-visa-consultant' }] },
        ],
      },
      {
        id: 'why-choose-us',
        type: 'cards',
        label: 'Why Choose Us',
        order: 4,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'Why Choose Us?' },
          { key: 'image', label: 'Image', type: 'image', value: '/visa-why-choose-woman.svg' },
        ],
        items: [
          { id: 'reason-1', fields: [{ key: 'text', label: 'Reason', type: 'text', value: 'Fast & Reliable – Get your documents within 24 hours' }] },
          { id: 'reason-2', fields: [{ key: 'text', label: 'Reason', type: 'text', value: '100% Embassy-Compliant – Professionally formatted & verifiable' }] },
          { id: 'reason-3', fields: [{ key: 'text', label: 'Reason', type: 'text', value: 'Hassle-Free Process – Simple steps, no complications' }] },
          { id: 'reason-4', fields: [{ key: 'text', label: 'Reason', type: 'text', value: 'Expert Assistance – Guided by visa specialists' }] },
          { id: 'reason-5', fields: [{ key: 'text', label: 'Reason', type: 'text', value: 'Secure & Confidential – Your data is protected with strict privacy measures' }] },
          { id: 'reason-6', fields: [{ key: 'text', label: 'Reason', type: 'text', value: 'Affordable & Transparent Pricing – No hidden fees' }] },
        ],
      },
      {
        id: 'testimonials',
        type: 'testimonials',
        label: 'Testimonials',
        order: 5,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: "What Traveler's Say" },
        ],
        items: [
          { id: 'test-1', fields: [{ key: 'name', label: 'Name', type: 'text', value: 'Aisha K., UK' }, { key: 'text', label: 'Review', type: 'textarea', value: 'I needed a Schengen visa for my Europe trip, and their supporting documents were perfect! The embassy approved everything without issues.' }] },
          { id: 'test-2', fields: [{ key: 'name', label: 'Name', type: 'text', value: 'James UAE' }, { key: 'text', label: 'Review', type: 'textarea', value: 'The expert consultant guided me step by step for my Canada visa. They even reviewed my documents to ensure everything was correct!' }] },
          { id: 'test-3', fields: [{ key: 'name', label: 'Name', type: 'text', value: 'Sophie M., Philippines' }, { key: 'text', label: 'Review', type: 'textarea', value: 'Booked their visa form filling service for my Schengen visa. It was error-free, embassy-compliant, and delivered in just a few hours!' }] },
        ],
      },
      {
        id: 'faq',
        type: 'faq',
        label: 'FAQ',
        order: 6,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'FREQUENTLY ASKED QUESTIONS' },
        ],
        items: [
          { id: 'faq-1', fields: [{ key: 'question', label: 'Question', type: 'text', value: 'How long does it take to receive my visa documents?' }, { key: 'answer', label: 'Answer', type: 'textarea', value: 'All our documents are delivered within 24 hours, including visa form filling, supporting documents, and complete packages.' }] },
          { id: 'faq-2', fields: [{ key: 'question', label: 'Question', type: 'text', value: 'How does visa application form filling work?' }, { key: 'answer', label: 'Answer', type: 'textarea', value: "It's simple! Just provide your basic details (name, email, contact via WhatsApp/Telegram). Our visa expert will reach out and handle everything for you." }] },
          { id: 'faq-3', fields: [{ key: 'question', label: 'Question', type: 'text', value: 'Is my personal information secure?' }, { key: 'answer', label: 'Answer', type: 'textarea', value: 'Absolutely! We use strict privacy measures to keep your data safe & confidential.' }] },
          { id: 'faq-4', fields: [{ key: 'question', label: 'Question', type: 'text', value: 'Are the flight & hotel reservations verifiable?' }, { key: 'answer', label: 'Answer', type: 'textarea', value: 'Yes! All our reservations are verifiable and valid for visa purposes.' }] },
          { id: 'faq-5', fields: [{ key: 'question', label: 'Question', type: 'text', value: 'What if I need revisions or changes?' }, { key: 'answer', label: 'Answer', type: 'textarea', value: 'No worries! If there\'s any issue with the documents, we offer free corrections.' }] },
        ],
      },
      {
        id: 'seo',
        type: 'seo',
        label: 'SEO',
        order: 7,
        fields: [
          { key: 'metaTitle', label: 'Meta Title', type: 'text', value: 'Visa Assistant - Expert Visa Application Help | OnwardTickets' },
          { key: 'metaDescription', label: 'Meta Description', type: 'textarea', value: 'Get expert help with your visa application. Our visa assistants handle form filling, document preparation, and more.' },
          { key: 'ogImage', label: 'OG Image', type: 'image', value: '/og-image.png' },
          { key: 'keywords', label: 'Keywords', type: 'textarea', value: 'visa assistant, visa application help, visa form filling, visa documents' },
        ],
      },
    ],
  },

  // ─── BECOME A PARTNER ───
  {
    slug: 'become-a-partner',
    title: 'Become a Partner',
    sections: [
      {
        id: 'hero',
        type: 'hero',
        label: 'Hero Section',
        order: 0,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'Partner with Us & Earn for Every Visa-Ready Booking You Refer' },
          { key: 'subheading', label: 'Subheading', type: 'textarea', value: 'Get expert assistance with visa application form filling, supporting documents, and personalized consultation – delivered within 24 hours!' },
          { key: 'ctaText', label: 'CTA Button Text', type: 'text', value: 'REGISTER NOW' },
          { key: 'ctaLink', label: 'CTA Button Link', type: 'url', value: '/affiliate/register' },
          { key: 'backgroundImage', label: 'Background Image', type: 'image', value: '/partner-hero-bg.jpg' },
        ],
      },
      {
        id: 'value-proposition',
        type: 'text',
        label: 'Value Proposition',
        order: 1,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'Help travelers get verified visa documents — and get paid for every sale you send.' },
          { key: 'body1', label: 'Body Text 1', type: 'textarea', value: 'At OnwardTickets.com, we provide affordable, embassy-accepted flight and hotel reservations for visa applicants worldwide. Our services are fast, trusted, and start at just £5 — making them easy to promote and convert.' },
          { key: 'body2', label: 'Body Text 2', type: 'text', value: 'Now you can earn 20% commission per sale by joining our affiliate program.' },
          { key: 'ctaText', label: 'CTA Button Text', type: 'text', value: 'APPLY NOW' },
          { key: 'ctaLink', label: 'CTA Button Link', type: 'url', value: '/affiliate/register' },
          { key: 'backgroundImage', label: 'Background Image', type: 'image', value: '/partner-value-bg.png' },
        ],
      },
      {
        id: 'why-join',
        type: 'cards',
        label: 'Why Join Our Affiliate Program',
        order: 2,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'Why Join Our Affiliate Program?' },
        ],
        items: [
          { id: 'card-1', fields: [{ key: 'title', label: 'Title', type: 'text', value: 'Instant Delivery = Fast Conversions' }, { key: 'description', label: 'Description', type: 'text', value: 'Millions apply for visas every year' }] },
          { id: 'card-2', fields: [{ key: 'title', label: 'Title', type: 'text', value: 'Tracked for 30 Days' }, { key: 'description', label: 'Description', type: 'text', value: 'You get credit even if they return later' }] },
          { id: 'card-3', fields: [{ key: 'title', label: 'Title', type: 'text', value: 'Perfect for Bloggers, Vloggers, Travel Advisors & Writers' }, { key: 'description', label: 'Description', type: 'text', value: '' }] },
          { id: 'card-4', fields: [{ key: 'title', label: 'Title', type: 'text', value: 'High-Demand Product' }, { key: 'description', label: 'Description', type: 'text', value: 'Millions apply for visas every year' }] },
          { id: 'card-5', fields: [{ key: 'title', label: 'Title', type: 'text', value: 'Bank Transfer Payouts, Monthly' }, { key: 'description', label: 'Description', type: 'text', value: 'Minimum $25' }] },
          { id: 'card-6', fields: [{ key: 'title', label: 'Title', type: 'text', value: 'Earn 25–30% Commission' }, { key: 'description', label: 'Description', type: 'text', value: 'On every successful referral' }] },
        ],
      },
      {
        id: 'who-is-for',
        type: 'cards',
        label: 'Who Is This Program For?',
        order: 3,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'Who Is This Program For?' },
          { key: 'image', label: 'Side Image', type: 'image', value: '/partner-who-image.png' },
        ],
        items: [
          { id: 'who-1', fields: [{ key: 'text', label: 'Target Audience', type: 'text', value: 'Travel bloggers and digital nomads' }, { key: 'icon', label: 'Icon', type: 'image', value: '/partner-icon-1.svg' }] },
          { id: 'who-2', fields: [{ key: 'text', label: 'Target Audience', type: 'text', value: 'YouTube creators covering visa/travel hacks' }, { key: 'icon', label: 'Icon', type: 'image', value: '/partner-icon-2.svg' }] },
          { id: 'who-3', fields: [{ key: 'text', label: 'Target Audience', type: 'text', value: 'Expat websites and forums' }, { key: 'icon', label: 'Icon', type: 'image', value: '/partner-icon-3.svg' }] },
          { id: 'who-4', fields: [{ key: 'text', label: 'Target Audience', type: 'text', value: 'Visa consultants or student advisors' }, { key: 'icon', label: 'Icon', type: 'image', value: '/partner-icon-4.svg' }] },
          { id: 'who-5', fields: [{ key: 'text', label: 'Target Audience', type: 'text', value: 'Email list owners in the travel or remote work niche' }, { key: 'icon', label: 'Icon', type: 'image', value: '/partner-icon-5.svg' }] },
        ],
      },
      {
        id: 'commission-structure',
        type: 'cards',
        label: 'Commission Structure',
        order: 4,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'Commission Structure' },
          { key: 'cookieDuration', label: 'Cookie Duration', type: 'text', value: 'Cookie Duration: 30 days' },
          { key: 'payoutMethod', label: 'Payout Method', type: 'text', value: 'Payout Method: Bank Transfer' },
          { key: 'minimumPayout', label: 'Minimum Payout', type: 'text', value: 'Minimum Payout: £25' },
        ],
        items: [
          { id: 'row-1', fields: [{ key: 'service', label: 'Service', type: 'text', value: 'Flight Reservation' }, { key: 'price', label: 'Price', type: 'text', value: '£5' }, { key: 'commission', label: 'Commission', type: 'text', value: '20%' }] },
          { id: 'row-2', fields: [{ key: 'service', label: 'Service', type: 'text', value: 'Hotel Reservation' }, { key: 'price', label: 'Price', type: 'text', value: '£5' }, { key: 'commission', label: 'Commission', type: 'text', value: '20%' }] },
          { id: 'row-3', fields: [{ key: 'service', label: 'Service', type: 'text', value: 'Travel Itinerary Packages' }, { key: 'price', label: 'Price', type: 'text', value: '£10–£15' }, { key: 'commission', label: 'Commission', type: 'text', value: '20%' }] },
          { id: 'row-4', fields: [{ key: 'service', label: 'Service', type: 'text', value: 'Full Visa Assistant' }, { key: 'price', label: 'Price', type: 'text', value: '£30–£400' }, { key: 'commission', label: 'Commission', type: 'text', value: '20%' }] },
        ],
      },
      {
        id: 'what-we-provide',
        type: 'text',
        label: 'What We Provide You',
        order: 5,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'What We Provide You' },
          { key: 'image', label: 'Image', type: 'image', value: '/partner-promo.png' },
        ],
        items: [
          { id: 'provide-1', fields: [{ key: 'text', label: 'Item', type: 'text', value: 'Custom tracking link' }] },
          { id: 'provide-2', fields: [{ key: 'text', label: 'Item', type: 'text', value: 'Promo banners (optional but helpful)' }] },
          { id: 'provide-3', fields: [{ key: 'text', label: 'Item', type: 'text', value: 'Sample content & CTAs for your blog, email, or social media' }] },
          { id: 'provide-4', fields: [{ key: 'text', label: 'Item', type: 'text', value: 'Transparent stats and dashboard to track earnings' }] },
        ],
      },
      {
        id: 'affiliate-terms',
        type: 'text',
        label: 'Affiliate Terms (Simplified)',
        order: 6,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'Affiliate Terms (Simplified)' },
          { key: 'image', label: 'Image', type: 'image', value: '/partner-promo.png' },
          { key: 'footer', label: 'Footer Text', type: 'text', value: 'We review every application for quality and relevance.' },
        ],
        items: [
          { id: 'term-1', fields: [{ key: 'text', label: 'Term', type: 'text', value: 'No bidding on "OnwardTickets" in Google Ads' }] },
          { id: 'term-2', fields: [{ key: 'text', label: 'Term', type: 'text', value: 'No spamming or incentivized clicks' }] },
          { id: 'term-3', fields: [{ key: 'text', label: 'Term', type: 'text', value: 'Must disclose affiliate links (FTC compliance)' }] },
          { id: 'term-4', fields: [{ key: 'text', label: 'Term', type: 'text', value: 'No misleading claims (e.g., "guaranteed visa approval")' }] },
        ],
      },
      {
        id: 'how-to-start',
        type: 'text',
        label: 'How to Get Started',
        order: 7,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'How to Get Started' },
          { key: 'backgroundImage', label: 'Background Image', type: 'image', value: '/partner-howto-bg.jpg' },
        ],
        items: [
          { id: 'start-1', fields: [{ key: 'text', label: 'Step', type: 'text', value: 'Apply to Join using our registration form' }] },
          { id: 'start-2', fields: [{ key: 'text', label: 'Step', type: 'text', value: 'Get your unique affiliate tracking link' }] },
          { id: 'start-3', fields: [{ key: 'text', label: 'Step', type: 'text', value: 'Promote OnwardTickets on your content channels' }] },
          { id: 'start-4', fields: [{ key: 'text', label: 'Step', type: 'text', value: 'Earn commissions on every confirmed sale' }] },
        ],
      },
      {
        id: 'cta',
        type: 'cta',
        label: 'Ready to Start Earning?',
        order: 8,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'Ready to Start Earning?' },
          { key: 'body', label: 'Body Text', type: 'textarea', value: 'Join our affiliate program today and earn 20% commission on every sale you refer. Application takes less than 2 minutes.' },
          { key: 'ctaText', label: 'CTA Button Text', type: 'text', value: 'APPLY NOW' },
          { key: 'ctaLink', label: 'CTA Button Link', type: 'url', value: '/affiliate/register' },
          { key: 'loginText', label: 'Login Text', type: 'text', value: 'Already an affiliate?' },
          { key: 'loginLink', label: 'Login Link', type: 'url', value: '/affiliate/login' },
          { key: 'loginLinkText', label: 'Login Link Text', type: 'text', value: 'Log in to your dashboard' },
        ],
      },
      {
        id: 'final-cta',
        type: 'cta',
        label: 'Final CTA / Contact',
        order: 9,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'Have questions about the affiliate program?' },
          { key: 'email', label: 'Contact Email', type: 'text', value: 'contact@onwardtickets.com' },
          { key: 'phone', label: 'Contact Phone', type: 'text', value: '+44 77561 525115' },
        ],
      },
      {
        id: 'seo',
        type: 'seo',
        label: 'SEO',
        order: 10,
        fields: [
          { key: 'metaTitle', label: 'Meta Title', type: 'text', value: 'Become a Partner - Affiliate Program | OnwardTickets' },
          { key: 'metaDescription', label: 'Meta Description', type: 'textarea', value: 'Join the OnwardTickets affiliate program. Earn commissions by referring customers to our flight reservation and visa document services.' },
          { key: 'ogImage', label: 'OG Image', type: 'image', value: '/og-image.png' },
          { key: 'keywords', label: 'Keywords', type: 'textarea', value: 'affiliate program, travel affiliate, onward ticket affiliate, earn commissions' },
        ],
      },
    ],
  },

  // ─── CONTACT US ───
  {
    slug: 'contact-us',
    title: 'Contact Us',
    sections: [
      {
        id: 'hero',
        type: 'hero',
        label: 'Page Header',
        order: 0,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'Contact Us' },
          { key: 'subheading', label: 'Subheading', type: 'text', value: "Have questions? We'd love to hear from you." },
        ],
      },
      {
        id: 'contact-form',
        type: 'text',
        label: 'Contact Form Settings',
        order: 1,
        fields: [
          { key: 'submitButtonText', label: 'Submit Button Text', type: 'text', value: 'Send Message' },
          { key: 'submittingText', label: 'Submitting Text', type: 'text', value: 'Sending...' },
          { key: 'successMessage', label: 'Success Message', type: 'text', value: "Message sent successfully! We'll get back to you soon." },
          { key: 'namePlaceholder', label: 'Name Placeholder', type: 'text', value: 'Your full name' },
          { key: 'phonePlaceholder', label: 'Phone Placeholder', type: 'text', value: 'Your phone number' },
          { key: 'emailPlaceholder', label: 'Email Placeholder', type: 'text', value: 'your@email.com' },
          { key: 'messagePlaceholder', label: 'Message Placeholder', type: 'text', value: 'How can we help you?' },
        ],
      },
      {
        id: 'contact-info',
        type: 'text',
        label: 'Contact Information',
        order: 2,
        fields: [
          { key: 'sidebarTitle', label: 'Sidebar Title', type: 'text', value: 'Address & Contact' },
          { key: 'phone', label: 'Phone Number', type: 'text', value: '+44 7763 055200' },
          { key: 'email', label: 'Email', type: 'text', value: 'contact@onwardtickets.com' },
          { key: 'address1', label: 'Address Line 1', type: 'text', value: 'OnwardTickets' },
          { key: 'address2', label: 'Address Line 2', type: 'text', value: '123 Main Street' },
          { key: 'address3', label: 'Address Line 3', type: 'text', value: 'London, UK' },
        ],
      },
      {
        id: 'social-media',
        type: 'cards',
        label: 'Social Media Links',
        order: 3,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'Follow Us' },
        ],
        items: [
          { id: 'social-1', fields: [{ key: 'platform', label: 'Platform', type: 'text', value: 'Facebook' }, { key: 'url', label: 'URL', type: 'url', value: 'https://www.facebook.com/onwardtickets' }] },
          { id: 'social-2', fields: [{ key: 'platform', label: 'Platform', type: 'text', value: 'Twitter' }, { key: 'url', label: 'URL', type: 'url', value: 'https://twitter.com/onwardtickets' }] },
          { id: 'social-3', fields: [{ key: 'platform', label: 'Platform', type: 'text', value: 'YouTube' }, { key: 'url', label: 'URL', type: 'url', value: 'https://www.youtube.com/@onwardtickets' }] },
          { id: 'social-4', fields: [{ key: 'platform', label: 'Platform', type: 'text', value: 'Instagram' }, { key: 'url', label: 'URL', type: 'url', value: 'https://www.instagram.com/onwardtickets' }] },
        ],
      },
      {
        id: 'seo',
        type: 'seo',
        label: 'SEO',
        order: 4,
        fields: [
          { key: 'metaTitle', label: 'Meta Title', type: 'text', value: 'Contact Us - OnwardTickets Support' },
          { key: 'metaDescription', label: 'Meta Description', type: 'textarea', value: 'Get in touch with OnwardTickets. Contact our support team for help with flight reservations, visa documents, and more.' },
          { key: 'ogImage', label: 'OG Image', type: 'image', value: '/og-image.png' },
          { key: 'keywords', label: 'Keywords', type: 'textarea', value: 'contact onward tickets, support, help, customer service' },
        ],
      },
    ],
  },

  // ─── PRIVACY POLICY ───
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    sections: [
      {
        id: 'hero',
        type: 'hero',
        label: 'Hero Section',
        order: 0,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'Privacy Policy - OnwardTicket.us' },
          { key: 'lastUpdated', label: 'Last Updated', type: 'text', value: 'Last Updated: October 2025' },
        ],
      },
      {
        id: 'introduction',
        type: 'text',
        label: 'Introduction',
        order: 1,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'INTRODUCTION' },
          { key: 'body', label: 'Body Text', type: 'richtext', value: 'OnwardTicket.us ("we," "our," or "us") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services. By using OnwardTicket.us, you agree to the collection and use of information in accordance with this policy.' },
        ],
      },
      {
        id: 'table-of-contents',
        type: 'cards',
        label: 'Table of Contents',
        order: 2,
        fields: [],
        items: [
          { id: 'toc-1', fields: [{ key: 'text', label: 'Section', type: 'text', value: '1. INFORMATION WE COLLECT' }] },
          { id: 'toc-2', fields: [{ key: 'text', label: 'Section', type: 'text', value: '2. HOW WE USE YOUR INFORMATION' }] },
          { id: 'toc-3', fields: [{ key: 'text', label: 'Section', type: 'text', value: '3. HOW WE SHARE YOUR INFORMATION' }] },
          { id: 'toc-4', fields: [{ key: 'text', label: 'Section', type: 'text', value: '4. COOKIES AND TRACKING TECHNOLOGIES' }] },
          { id: 'toc-5', fields: [{ key: 'text', label: 'Section', type: 'text', value: '5. DATA RETENTION' }] },
          { id: 'toc-6', fields: [{ key: 'text', label: 'Section', type: 'text', value: '6. DATA SECURITY' }] },
          { id: 'toc-7', fields: [{ key: 'text', label: 'Section', type: 'text', value: '7. YOUR PRIVACY RIGHTS' }] },
          { id: 'toc-8', fields: [{ key: 'text', label: 'Section', type: 'text', value: '8. INTERNATIONAL DATA TRANSFERS' }] },
          { id: 'toc-9', fields: [{ key: 'text', label: 'Section', type: 'text', value: "9. CHILDREN'S PRIVACY" }] },
          { id: 'toc-10', fields: [{ key: 'text', label: 'Section', type: 'text', value: '10. THIRD-PARTY LINKS' }] },
          { id: 'toc-11', fields: [{ key: 'text', label: 'Section', type: 'text', value: '11. CALIFORNIA PRIVACY RIGHTS (CCPA)' }] },
          { id: 'toc-12', fields: [{ key: 'text', label: 'Section', type: 'text', value: '12. EUROPEAN PRIVACY RIGHTS (GDPR)' }] },
          { id: 'toc-13', fields: [{ key: 'text', label: 'Section', type: 'text', value: '13. CHANGES TO THIS PRIVACY POLICY' }] },
          { id: 'toc-14', fields: [{ key: 'text', label: 'Section', type: 'text', value: '14. CONTACT US' }] },
          { id: 'toc-15', fields: [{ key: 'text', label: 'Section', type: 'text', value: '15. DATA BREACH NOTIFICATION' }] },
        ],
      },
      {
        id: 'content',
        type: 'text',
        label: 'Policy Content',
        order: 3,
        fields: [
          { key: 'body', label: 'Full Policy Content', type: 'richtext', value: '1.1 Personal Information You Provide\nWhen You Book a Reservation, We Collect:\nFull name (as it appears on passport)\nEmail address\nPhone number (if provided)\nTravel dates and destinations\nDeparture and arrival cities\nPassport details (if required for certain routes)\nWhen You Contact Support:\nName and email address\nMessage content and communication history\nOrder number (if applicable)\nWhen You Create an Account (if applicable):\nUsername and password\nProfile information\nCommunication preferences\n1.2 Payment Information\nPayment Processing:\nWe do NOT store credit card information on our servers\nPayment data is processed securely by third-party payment processors (Stripe, PayPal, etc.)\nWe receive only confirmation of successful payment\nWe may retain transaction ID and payment status\nInformation Shared with Payment Processors:\nCardholder name\nBilling address\nPayment amount\nTransaction details\n1.3 Automatically Collected Information\nWhen You Visit Our Website:\nIP address\nBrowser type and version\nDevice information (type, operating system)\nPages visited and time spent\nReferring website\nDate and time of visit\nClickstream data\nCookies and Tracking Technologies:\nSession cookies (essential for functionality)\nAnalytics cookies (Google Analytics, etc.)\nMarketing cookies (with your consent)\nPixel tags and web beacons' },
        ],
      },
      {
        id: 'summary',
        type: 'text',
        label: 'Summary',
        order: 4,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'SUMMARY' },
          { key: 'body', label: 'Summary Content', type: 'richtext', value: 'Key Points:\n✓ We collect information necessary to provide flight reservation services\n✓ We share data with airlines and essential service providers only\n✓ We do NOT sell your personal information\n✓ We use industry-standard security measures\n✓ You have rights to access, correct, and delete your data\n✓ We comply with GDPR, CCPA, and applicable privacy laws\n✓ Contact us with any privacy concerns\nYour Privacy Matters to Us.' },
          { key: 'footer', label: 'Footer Text', type: 'text', value: 'Last Updated: October 2025 OnwardTickets - Privacy Policy Questions? Contact: contact@onwardtickets.com' },
        ],
      },
      {
        id: 'seo',
        type: 'seo',
        label: 'SEO',
        order: 5,
        fields: [
          { key: 'metaTitle', label: 'Meta Title', type: 'text', value: 'Privacy Policy - OnwardTickets' },
          { key: 'metaDescription', label: 'Meta Description', type: 'textarea', value: 'Read our privacy policy. Learn how OnwardTickets collects, uses, and protects your personal information.' },
          { key: 'ogImage', label: 'OG Image', type: 'image', value: '/og-image.png' },
          { key: 'keywords', label: 'Keywords', type: 'textarea', value: 'privacy policy, data protection, GDPR, personal information' },
        ],
      },
    ],
  },

  // ─── TERMS & CONDITIONS ───
  {
    slug: 'terms-conditions',
    title: 'Terms & Conditions',
    sections: [
      {
        id: 'hero',
        type: 'hero',
        label: 'Hero Section',
        order: 0,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'Terms & Conditions - OnwardTicket.us' },
          { key: 'lastUpdated', label: 'Last Updated', type: 'text', value: 'Last Updated: October 2025' },
        ],
      },
      {
        id: 'introduction',
        type: 'text',
        label: 'Introduction',
        order: 1,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'ACCEPTANCE OF TERMS' },
          { key: 'body', label: 'Body Text', type: 'richtext', value: 'By accessing and using OnwardTicket.us (the "Website" or "Service"), you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our Service.\n\nService Provider: OnwardTicket.us operates as a flight reservation booking service specifically for visa application purposes.\n\nService Description: We provide temporary flight reservations with valid airline PNR (Passenger Name Record) booking references for use in visa applications and immigration documentation.' },
        ],
      },
      {
        id: 'table-of-contents',
        type: 'cards',
        label: 'Table of Contents',
        order: 2,
        fields: [],
        items: [
          { id: 'toc-1', fields: [{ key: 'text', label: 'Section', type: 'text', value: '1. ACCEPTANCE OF TERMS' }] },
          { id: 'toc-2', fields: [{ key: 'text', label: 'Section', type: 'text', value: '2. SERVICE OVERVIEW' }] },
          { id: 'toc-3', fields: [{ key: 'text', label: 'Section', type: 'text', value: '3. RESERVATION VALIDITY' }] },
          { id: 'toc-4', fields: [{ key: 'text', label: 'Section', type: 'text', value: '4. BOOKING PROCESS' }] },
          { id: 'toc-5', fields: [{ key: 'text', label: 'Section', type: 'text', value: '5. PRICING AND PAYMENT' }] },
          { id: 'toc-6', fields: [{ key: 'text', label: 'Section', type: 'text', value: '6. DELIVERY' }] },
          { id: 'toc-7', fields: [{ key: 'text', label: 'Section', type: 'text', value: '7. REFUNDS AND CANCELLATIONS' }] },
          { id: 'toc-8', fields: [{ key: 'text', label: 'Section', type: 'text', value: '8. USE OF RESERVATION' }] },
          { id: 'toc-9', fields: [{ key: 'text', label: 'Section', type: 'text', value: '9. LIMITATIONS OF LIABILITY' }] },
          { id: 'toc-10', fields: [{ key: 'text', label: 'Section', type: 'text', value: '10. CUSTOMER CONDUCT' }] },
          { id: 'toc-11', fields: [{ key: 'text', label: 'Section', type: 'text', value: '11. INTELLECTUAL PROPERTY' }] },
          { id: 'toc-12', fields: [{ key: 'text', label: 'Section', type: 'text', value: '12. PRIVACY AND DATA' }] },
          { id: 'toc-13', fields: [{ key: 'text', label: 'Section', type: 'text', value: '13. THIRD-PARTY SERVICES' }] },
          { id: 'toc-14', fields: [{ key: 'text', label: 'Section', type: 'text', value: '14. MODIFICATIONS TO TERMS' }] },
          { id: 'toc-15', fields: [{ key: 'text', label: 'Section', type: 'text', value: '15. CUSTOMER SUPPORT' }] },
          { id: 'toc-16', fields: [{ key: 'text', label: 'Section', type: 'text', value: '16. DISPUTE RESOLUTION' }] },
          { id: 'toc-17', fields: [{ key: 'text', label: 'Section', type: 'text', value: '17. MISCELLANEOUS' }] },
          { id: 'toc-18', fields: [{ key: 'text', label: 'Section', type: 'text', value: '18. CONTACT INFORMATION' }] },
        ],
      },
      {
        id: 'acknowledgment',
        type: 'text',
        label: 'Acknowledgment',
        order: 3,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'ACKNOWLEDGMENT' },
          { key: 'body', label: 'Summary Content', type: 'richtext', value: 'Key Points:\n✓ We collect information necessary to provide flight reservation services\n✓ We share data with airlines and essential service providers only\n✓ We do NOT sell your personal information\n✓ We use industry-standard security measures\n✓ You have rights to access, correct, and delete your data\n✓ We comply with GDPR, CCPA, and applicable privacy laws\n✓ Contact us with any privacy concerns\nYour Privacy Matters to Us.' },
          { key: 'footer', label: 'Footer Text', type: 'text', value: 'Last Updated: October 2025 OnwardTickets - Privacy Policy Questions? Contact: contact@onwardtickets.com' },
        ],
      },
      {
        id: 'seo',
        type: 'seo',
        label: 'SEO',
        order: 4,
        fields: [
          { key: 'metaTitle', label: 'Meta Title', type: 'text', value: 'Terms & Conditions - OnwardTickets' },
          { key: 'metaDescription', label: 'Meta Description', type: 'textarea', value: 'Read the terms and conditions for using OnwardTickets flight reservation and visa document services.' },
          { key: 'ogImage', label: 'OG Image', type: 'image', value: '/og-image.png' },
          { key: 'keywords', label: 'Keywords', type: 'textarea', value: 'terms and conditions, terms of service, legal, onward tickets terms' },
        ],
      },
    ],
  },

  // ─── REFUND & RETURNS ───
  {
    slug: 'refund-returns',
    title: 'Refund & Cancellation Policy',
    sections: [
      {
        id: 'hero',
        type: 'hero',
        label: 'Hero Section',
        order: 0,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'Refund & Cancellation Policy - OnwardTicket.us' },
          { key: 'lastUpdated', label: 'Last Updated', type: 'text', value: 'Last Updated: October 2025' },
        ],
      },
      {
        id: 'important-notice',
        type: 'text',
        label: 'Important Notice',
        order: 1,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'IMPORTANT NOTICE' },
          { key: 'body', label: 'Body Text', type: 'richtext', value: 'Please read this policy carefully before placing an order. By completing a purchase on OnwardTicket.us, you acknowledge and agree to this Refund & Cancellation Policy.' },
        ],
      },
      {
        id: 'table-of-contents',
        type: 'cards',
        label: 'Table of Contents',
        order: 2,
        fields: [],
        items: [
          { id: 'toc-1', fields: [{ key: 'text', label: 'Section', type: 'text', value: '1. GENERAL POLICY OVERVIEW' }] },
          { id: 'toc-2', fields: [{ key: 'text', label: 'Section', type: 'text', value: '2. NO CANCELLATION POLICY' }] },
          { id: 'toc-3', fields: [{ key: 'text', label: 'Section', type: 'text', value: '3. WHEN REFUNDS ARE NOT PROVIDED' }] },
          { id: 'toc-4', fields: [{ key: 'text', label: 'Section', type: 'text', value: '4. WHEN REFUNDS MAY BE CONSIDERED' }] },
          { id: 'toc-5', fields: [{ key: 'text', label: 'Section', type: 'text', value: '5. REFUND REQUEST PROCESS' }] },
          { id: 'toc-6', fields: [{ key: 'text', label: 'Section', type: 'text', value: '6. PARTIAL REFUNDS' }] },
          { id: 'toc-7', fields: [{ key: 'text', label: 'Section', type: 'text', value: '7. CHARGEBACKS AND PAYMENT DISPUTES' }] },
          { id: 'toc-8', fields: [{ key: 'text', label: 'Section', type: 'text', value: '8. WHAT IS NOT COVERED' }] },
          { id: 'toc-9', fields: [{ key: 'text', label: 'Section', type: 'text', value: '9. ALTERNATIVES TO REFUNDS' }] },
          { id: 'toc-10', fields: [{ key: 'text', label: 'Section', type: 'text', value: '10. PRICING ERRORS' }] },
          { id: 'toc-11', fields: [{ key: 'text', label: 'Section', type: 'text', value: '11. FRAUDULENT ORDERS' }] },
          { id: 'toc-12', fields: [{ key: 'text', label: 'Section', type: 'text', value: '12. EXCEPTIONS' }] },
          { id: 'toc-13', fields: [{ key: 'text', label: 'Section', type: 'text', value: '13. CUSTOMER ACKNOWLEDGMENT' }] },
          { id: 'toc-14', fields: [{ key: 'text', label: 'Section', type: 'text', value: '14. CONTACT INFORMATION' }] },
          { id: 'toc-15', fields: [{ key: 'text', label: 'Section', type: 'text', value: '15. POLICY UPDATES' }] },
        ],
      },
      {
        id: 'content',
        type: 'text',
        label: 'Policy Content',
        order: 3,
        fields: [
          { key: 'body', label: 'Full Policy Content', type: 'richtext', value: '1.1 No Refunds After Delivery\nOnwardTicket.us operates a strict NO REFUND policy for completed and delivered services.\nOnce your flight reservation has been:\nSuccessfully created in airline systems\nPNR (booking reference) has been generated\nConfirmation email has been delivered\nNO refunds will be issued under any circumstances.\n1.2 Why This Policy Exists\nDigital Service Nature:\nOur service is fully digital and delivered instantly\nReservations are created immediately in airline systems\nReal costs are incurred the moment we access airline booking systems\nPNRs cannot be "returned" or "uncreated" once generated\nImmediate Processing:\nYour order begins processing within seconds of payment\nAirline systems are accessed immediately\nDigital delivery is instant (1-24 hours depending on speed selected)' },
        ],
      },
      {
        id: 'summary',
        type: 'text',
        label: 'Summary',
        order: 4,
        fields: [
          { key: 'heading', label: 'Heading', type: 'text', value: 'SUMMARY' },
          { key: 'noRefunds', label: 'No Refunds Section', type: 'richtext', value: '✗ NO refunds after service is delivered (except specific cases below)\n✗ NO cancellations after payment\n✗ NO refunds for general visa rejection\n✗ NO refunds for customer errors\n✗ NO refunds for changed plans' },
          { key: 'refundsOnly', label: 'Refunds Only Section', type: 'richtext', value: '✓ Refunds ONLY if we fail to deliver\n✓ Refunds ONLY if PNR is completely invalid\n✓ Refunds ONLY for technical errors on our part\n✓ Refunds ONLY if visa rejected SPECIFICALLY because of onward ticket\n✓ Must provide official embassy rejection letter\n✓ Letter must state onward ticket was THE SOLE reason for rejection\n✓ Contact us before filing chargebacks' },
          { key: 'visaCriteria', label: 'Visa Rejection Criteria', type: 'richtext', value: 'Visa Rejection Refund Criteria:\nEmbassy letter REQUIRED stating onward ticket was the problem\nIf rejected for multiple reasons (including onward ticket) = NO refund\nIf rejected for other reasons only = NO refund\nIf embassy accepted ticket but rejected visa = NO refund\nOnly if onward ticket was THE SOLE, EXPLICIT reason = Refund approved\n\nThis is a FINAL SALE service with limited exceptions. Purchase only if you understand and accept this policy' },
        ],
      },
      {
        id: 'seo',
        type: 'seo',
        label: 'SEO',
        order: 5,
        fields: [
          { key: 'metaTitle', label: 'Meta Title', type: 'text', value: 'Refund & Cancellation Policy - OnwardTickets' },
          { key: 'metaDescription', label: 'Meta Description', type: 'textarea', value: 'Read our refund and cancellation policy. Understand the terms for refunds on OnwardTickets flight reservation services.' },
          { key: 'ogImage', label: 'OG Image', type: 'image', value: '/og-image.png' },
          { key: 'keywords', label: 'Keywords', type: 'textarea', value: 'refund policy, cancellation policy, returns, onward tickets refund' },
        ],
      },
    ],
  },
];

export function getPageDefault(slug: string): PageDefault | undefined {
  return PAGE_DEFAULTS.find(p => p.slug === slug);
}
