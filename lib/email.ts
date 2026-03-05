import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.hostinger.com',
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 15000,
});

interface SubmissionData {
  service: string;
  name: string;
  email: string;
  phone?: string;
  travelers?: number;
  amount: number;
  urgency?: string;
  details?: string;
}

export async function sendNewOrderNotification(data: SubmissionData) {
  const notifyEmail = process.env.NOTIFY_EMAIL || 'contact@onwardtickets.com';

  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #2979FF, #0052CC); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 700;">New Order Received</h1>
        <p style="color: #93c5fd; margin: 8px 0 0; font-size: 14px;">OnwardTickets Admin</p>
      </div>

      <div style="padding: 30px;">
        <div style="background: white; border-radius: 10px; padding: 24px; border: 1px solid #e2e8f0;">
          <h2 style="margin: 0 0 20px; font-size: 16px; color: #0B1437;">Order Details</h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px; width: 140px;">Service</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0B1437; font-size: 13px; font-weight: 600;">${data.service}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;">Customer Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0B1437; font-size: 13px; font-weight: 600;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0B1437; font-size: 13px;">
                <a href="mailto:${data.email}" style="color: #2979FF; text-decoration: none;">${data.email}</a>
              </td>
            </tr>
            ${data.phone ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;">Phone</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0B1437; font-size: 13px;">${data.phone}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;">Travelers</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0B1437; font-size: 13px;">${data.travelers || 1}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;">Amount</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #059669; font-size: 15px; font-weight: 700;">£${data.amount.toFixed(2)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;">Urgency</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: ${data.urgency === 'Super Fast' ? '#ef4444' : data.urgency === 'Urgent' ? '#f97316' : '#0B1437'}; font-size: 13px; font-weight: 600;">${data.urgency || 'Standard'}</td>
            </tr>
            ${data.details ? `
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-size: 13px; vertical-align: top;">Details</td>
              <td style="padding: 10px 0; color: #0B1437; font-size: 13px; line-height: 1.5;">${data.details}</td>
            </tr>` : ''}
          </table>
        </div>

        <div style="text-align: center; margin-top: 24px;">
          <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://onwardticket.us'}/admin/submissions"
             style="display: inline-block; background: linear-gradient(135deg, #2979FF, #0052CC); color: white; padding: 12px 28px; border-radius: 10px; text-decoration: none; font-size: 14px; font-weight: 600;">
            View in Dashboard
          </a>
        </div>
      </div>

      <div style="padding: 16px 30px; background: #f1f5f9; text-align: center; border-top: 1px solid #e2e8f0;">
        <p style="margin: 0; color: #94a3b8; font-size: 12px;">This is an automated notification from OnwardTickets</p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"OnwardTickets" <${process.env.SMTP_USER}>`,
      to: notifyEmail,
      subject: `New ${data.service} Order — ${data.name} (£${data.amount.toFixed(2)})`,
      html,
    });
    console.log(`[Email] Notification sent to ${notifyEmail}`);
  } catch (error) {
    console.error('[Email] Failed to send notification:', error);
  }
}

// Email to admin when contact form is submitted
export async function sendContactNotification(data: { name: string; email: string; phone: string; message: string }) {
  const notifyEmail = process.env.NOTIFY_EMAIL || 'contact@onwardtickets.com';

  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #2979FF, #0052CC); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 700;">New Contact Message</h1>
        <p style="color: #93c5fd; margin: 8px 0 0; font-size: 14px;">OnwardTickets Admin</p>
      </div>

      <div style="padding: 30px;">
        <div style="background: white; border-radius: 10px; padding: 24px; border: 1px solid #e2e8f0;">
          <h2 style="margin: 0 0 20px; font-size: 16px; color: #0B1437;">Contact Details</h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px; width: 140px;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0B1437; font-size: 13px; font-weight: 600;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0B1437; font-size: 13px;">
                <a href="mailto:${data.email}" style="color: #2979FF; text-decoration: none;">${data.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;">Phone</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0B1437; font-size: 13px;">${data.phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-size: 13px; vertical-align: top;">Message</td>
              <td style="padding: 10px 0; color: #0B1437; font-size: 13px; line-height: 1.5;">${data.message}</td>
            </tr>
          </table>
        </div>
      </div>

      <div style="padding: 16px 30px; background: #f1f5f9; text-align: center; border-top: 1px solid #e2e8f0;">
        <p style="margin: 0; color: #94a3b8; font-size: 12px;">This is an automated notification from OnwardTickets</p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"OnwardTickets" <${process.env.SMTP_USER}>`,
      to: notifyEmail,
      subject: `New Contact Message — ${data.name}`,
      html,
    });
    console.log(`[Email] Contact notification sent to ${notifyEmail}`);
  } catch (error) {
    console.error('[Email] Failed to send contact notification:', error);
  }
}

// Email to user confirming their contact message was received
export async function sendContactConfirmation(data: { name: string; email: string }) {
  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #2979FF, #0052CC); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 700;">Message Received!</h1>
        <p style="color: #93c5fd; margin: 8px 0 0; font-size: 14px;">OnwardTicket.us</p>
      </div>
      <div style="padding: 30px;">
        <div style="background: white; border-radius: 10px; padding: 24px; border: 1px solid #e2e8f0;">
          <p style="margin: 0 0 16px; font-size: 15px; color: #0B1437;">Hi <strong>${data.name}</strong>,</p>
          <p style="margin: 0 0 16px; font-size: 14px; color: #374151; line-height: 1.6;">
            Thank you for reaching out to us! We&rsquo;ve received your message and our team will get back to you within <strong>24 hours</strong>.
          </p>
          <p style="margin: 0; font-size: 14px; color: #374151; line-height: 1.6;">
            If your inquiry is urgent, you can also email us directly at
            <a href="mailto:contact@onwardtickets.com" style="color: #2979FF; text-decoration: none; font-weight: 600;">contact@onwardtickets.com</a>.
          </p>
        </div>
      </div>
      <div style="padding: 16px 30px; background: #f1f5f9; text-align: center; border-top: 1px solid #e2e8f0;">
        <p style="margin: 0; color: #94a3b8; font-size: 12px;">OnwardTicket.us &mdash; Trusted Visa Document Services</p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"OnwardTicket.us" <${process.env.SMTP_USER}>`,
      to: data.email,
      subject: 'We Received Your Message — OnwardTicket.us',
      html,
    });
    console.log(`[Email] Contact confirmation sent to ${data.email}`);
  } catch (error) {
    console.error('[Email] Failed to send contact confirmation:', error);
  }
}

// Email to customer confirming their order was received
export async function sendOrderConfirmation(data: SubmissionData) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://onwardticket.us';

  const serviceNames: Record<string, string> = {
    'cover-letter': 'Cover Letter',
    'travel-plan': 'Travel Plan',
    'hotel-reservation': 'Hotel Reservation',
    'flight-itinerary': 'Flight Itinerary',
    'visa-essentials-package': 'Visa Essentials Package',
    'visa-supporting-documents': 'Visa Supporting Documents',
    'visa-form-filling': 'Visa Application Form Filling',
    'ph-buy-dummy-ticket': 'Dummy Ticket (PH)',
    'expert-consultant': 'Expert Visa Consultant',
  };

  const serviceName = serviceNames[data.service] || data.service;

  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #2979FF, #0052CC); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 700;">Order Confirmed!</h1>
        <p style="color: #93c5fd; margin: 8px 0 0; font-size: 14px;">OnwardTicket.us</p>
      </div>
      <div style="padding: 30px;">
        <div style="background: white; border-radius: 10px; padding: 24px; border: 1px solid #e2e8f0;">
          <p style="margin: 0 0 16px; font-size: 15px; color: #0B1437;">Hi <strong>${data.name}</strong>,</p>
          <p style="margin: 0 0 16px; font-size: 14px; color: #374151; line-height: 1.6;">
            Thank you for your order! We&rsquo;ve received your request and our team is now processing it.
          </p>

          <div style="background: #F0F9FF; border: 1px solid #BAE6FD; border-radius: 8px; padding: 16px; margin: 16px 0;">
            <p style="margin: 0 0 12px; font-size: 13px; color: #0369A1; font-weight: 600;">Order Summary</p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 6px 0; color: #0369A1; font-size: 13px;">Service:</td>
                <td style="padding: 6px 0; color: #0369A1; font-size: 13px; font-weight: 600;">${serviceName}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #0369A1; font-size: 13px;">Travelers:</td>
                <td style="padding: 6px 0; color: #0369A1; font-size: 13px; font-weight: 600;">${data.travelers || 1}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #0369A1; font-size: 13px;">Speed:</td>
                <td style="padding: 6px 0; color: #0369A1; font-size: 13px; font-weight: 600;">${data.urgency || 'Standard'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #0369A1; font-size: 13px;">Amount:</td>
                <td style="padding: 6px 0; color: #059669; font-size: 15px; font-weight: 700;">&pound;${data.amount.toFixed(2)}</td>
              </tr>
            </table>
          </div>

          <div style="background: #FEF3C7; border: 1px solid #FDE68A; border-radius: 8px; padding: 16px; margin: 16px 0;">
            <p style="margin: 0 0 8px; font-size: 13px; color: #92400E; font-weight: 600;">What happens next?</p>
            <ul style="margin: 0; padding-left: 18px; font-size: 13px; color: #78350F; line-height: 1.8;">
              <li>Our team will begin processing your order</li>
              <li>You&rsquo;ll receive your documents via email</li>
              <li>Delivery time depends on the speed selected</li>
            </ul>
          </div>

          <p style="margin: 16px 0 0; font-size: 14px; color: #374151; line-height: 1.6;">
            If you have any questions, contact us at
            <a href="mailto:contact@onwardtickets.com" style="color: #2979FF; text-decoration: none; font-weight: 600;">contact@onwardtickets.com</a>.
          </p>
        </div>
      </div>
      <div style="padding: 16px 30px; background: #f1f5f9; text-align: center; border-top: 1px solid #e2e8f0;">
        <p style="margin: 0; color: #94a3b8; font-size: 12px;">OnwardTicket.us &mdash; Trusted Visa Document Services</p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"OnwardTicket.us" <${process.env.SMTP_USER}>`,
      to: data.email,
      subject: `Order Confirmed — ${serviceName}`,
      html,
    });
    console.log(`[Email] Order confirmation sent to ${data.email}`);
  } catch (error) {
    console.error('[Email] Failed to send order confirmation:', error);
  }
}

// Email to affiliate when a referral purchase is made
export async function sendAffiliateReferralSaleEmail(data: {
  affiliateName: string;
  affiliateEmail: string;
  commissionRate: number;
  service: string;
  amount: number;
  commission: number;
  customerName: string;
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://onwardticket.us';

  const serviceNames: Record<string, string> = {
    'cover-letter': 'Cover Letter',
    'travel-plan': 'Travel Plan',
    'hotel-reservation': 'Hotel Reservation',
    'flight-itinerary': 'Flight Itinerary',
    'visa-essentials-package': 'Visa Essentials Package',
    'visa-supporting-documents': 'Visa Supporting Documents',
    'visa-form-filling': 'Visa Application Form Filling',
    'ph-buy-dummy-ticket': 'Dummy Ticket (PH)',
    'expert-consultant': 'Expert Visa Consultant',
  };

  const serviceName = serviceNames[data.service] || data.service;

  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #059669, #10B981); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 700;">New Referral Sale!</h1>
        <p style="color: #D1FAE5; margin: 8px 0 0; font-size: 14px;">You just earned a commission</p>
      </div>
      <div style="padding: 30px;">
        <div style="background: white; border-radius: 10px; padding: 24px; border: 1px solid #e2e8f0;">
          <p style="margin: 0 0 16px; font-size: 15px; color: #0B1437;">Hi <strong>${data.affiliateName}</strong>,</p>
          <p style="margin: 0 0 16px; font-size: 14px; color: #374151; line-height: 1.6;">
            Great news! Someone purchased through your referral link. Here are the details:
          </p>

          <div style="background: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 8px; padding: 16px; margin: 16px 0;">
            <p style="margin: 0 0 12px; font-size: 13px; color: #065F46; font-weight: 600;">Sale Details</p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 6px 0; color: #065F46; font-size: 13px;">Service:</td>
                <td style="padding: 6px 0; color: #065F46; font-size: 13px; font-weight: 600;">${serviceName}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #065F46; font-size: 13px;">Customer:</td>
                <td style="padding: 6px 0; color: #065F46; font-size: 13px; font-weight: 600;">${data.customerName}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #065F46; font-size: 13px;">Order Amount:</td>
                <td style="padding: 6px 0; color: #065F46; font-size: 13px; font-weight: 600;">&pound;${data.amount.toFixed(2)}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #065F46; font-size: 13px;">Your Commission (${data.commissionRate}%):</td>
                <td style="padding: 6px 0; color: #059669; font-size: 15px; font-weight: 700;">&pound;${data.commission.toFixed(2)}</td>
              </tr>
            </table>
          </div>

          <p style="margin: 16px 0 0; font-size: 14px; color: #374151; line-height: 1.6;">
            Keep sharing your referral link to earn more commissions!
          </p>
        </div>
        <div style="text-align: center; margin-top: 24px;">
          <a href="${siteUrl}/affiliate/dashboard"
             style="display: inline-block; background: linear-gradient(135deg, #059669, #10B981); color: white; padding: 12px 28px; border-radius: 10px; text-decoration: none; font-size: 14px; font-weight: 600;">
            View Your Dashboard
          </a>
        </div>
      </div>
      <div style="padding: 16px 30px; background: #f1f5f9; text-align: center; border-top: 1px solid #e2e8f0;">
        <p style="margin: 0; color: #94a3b8; font-size: 12px;">OnwardTickets Affiliate Program</p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"OnwardTickets" <${process.env.SMTP_USER}>`,
      to: data.affiliateEmail,
      subject: `New Referral Sale — You earned £${data.commission.toFixed(2)}!`,
      html,
    });
    console.log(`[Email] Referral sale notification sent to ${data.affiliateEmail}`);
  } catch (error) {
    console.error('[Email] Failed to send referral sale notification:', error);
  }
}

interface AffiliateData {
  name: string;
  email: string;
  phone: string;
  website: string;
  platform: string;
}

export async function sendAffiliateNotification(data: AffiliateData) {
  const notifyEmail = process.env.NOTIFY_EMAIL || 'contact@onwardtickets.com';

  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #2979FF, #0052CC); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 700;">New Affiliate Application</h1>
        <p style="color: #93c5fd; margin: 8px 0 0; font-size: 14px;">OnwardTickets Affiliate Program</p>
      </div>
      <div style="padding: 30px;">
        <div style="background: white; border-radius: 10px; padding: 24px; border: 1px solid #e2e8f0;">
          <h2 style="margin: 0 0 20px; font-size: 16px; color: #0B1437;">Applicant Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px; width: 140px;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0B1437; font-size: 13px; font-weight: 600;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0B1437; font-size: 13px;">
                <a href="mailto:${data.email}" style="color: #2979FF; text-decoration: none;">${data.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;">Phone</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0B1437; font-size: 13px;">${data.phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;">Platform</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0B1437; font-size: 13px; font-weight: 600;">${data.platform}</td>
            </tr>
            ${data.website ? `
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-size: 13px;">Website</td>
              <td style="padding: 10px 0; color: #0B1437; font-size: 13px;">
                <a href="${data.website}" style="color: #2979FF; text-decoration: none;">${data.website}</a>
              </td>
            </tr>` : ''}
          </table>
        </div>
        <div style="text-align: center; margin-top: 24px;">
          <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://onwardticket.us'}/admin/affiliates"
             style="display: inline-block; background: linear-gradient(135deg, #2979FF, #0052CC); color: white; padding: 12px 28px; border-radius: 10px; text-decoration: none; font-size: 14px; font-weight: 600;">
            Review in Dashboard
          </a>
        </div>
      </div>
      <div style="padding: 16px 30px; background: #f1f5f9; text-align: center; border-top: 1px solid #e2e8f0;">
        <p style="margin: 0; color: #94a3b8; font-size: 12px;">This is an automated notification from OnwardTickets</p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"OnwardTickets" <${process.env.SMTP_USER}>`,
      to: notifyEmail,
      subject: `New Affiliate Application — ${data.name} (${data.platform})`,
      html,
    });
    console.log(`[Email] Affiliate notification sent to ${notifyEmail}`);
  } catch (error) {
    console.error('[Email] Failed to send affiliate notification:', error);
  }
}

// Email to affiliate user on registration
export async function sendAffiliateRegistrationEmail(data: { name: string; email: string }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://onwardtickets.com';

  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #2979FF, #0052CC); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 700;">Application Received!</h1>
        <p style="color: #93c5fd; margin: 8px 0 0; font-size: 14px;">OnwardTickets Affiliate Program</p>
      </div>
      <div style="padding: 30px;">
        <div style="background: white; border-radius: 10px; padding: 24px; border: 1px solid #e2e8f0;">
          <p style="margin: 0 0 16px; font-size: 15px; color: #0B1437;">Hi <strong>${data.name}</strong>,</p>
          <p style="margin: 0 0 16px; font-size: 14px; color: #374151; line-height: 1.6;">
            Thank you for applying to the OnwardTickets Affiliate Program! We&rsquo;ve received your application and our team is currently reviewing it.
          </p>
          <div style="background: #FEF3C7; border: 1px solid #FDE68A; border-radius: 8px; padding: 16px; margin: 16px 0;">
            <p style="margin: 0; font-size: 13px; color: #92400E; font-weight: 600;">What happens next?</p>
            <ul style="margin: 8px 0 0; padding-left: 18px; font-size: 13px; color: #78350F; line-height: 1.8;">
              <li>Our team will review your application within <strong>24&ndash;48 hours</strong></li>
              <li>You&rsquo;ll receive an email once your application is approved</li>
              <li>After approval, you can log in to your affiliate dashboard and start earning</li>
            </ul>
          </div>
          <p style="margin: 16px 0 0; font-size: 14px; color: #374151; line-height: 1.6;">
            If you have any questions in the meantime, feel free to reach out to us at
            <a href="mailto:contact@onwardtickets.com" style="color: #2979FF; text-decoration: none; font-weight: 600;">contact@onwardtickets.com</a>.
          </p>
        </div>
        <div style="text-align: center; margin-top: 24px;">
          <a href="${siteUrl}/become-a-partner"
             style="display: inline-block; background: linear-gradient(135deg, #2979FF, #0052CC); color: white; padding: 12px 28px; border-radius: 10px; text-decoration: none; font-size: 14px; font-weight: 600;">
            Learn More About Our Program
          </a>
        </div>
      </div>
      <div style="padding: 16px 30px; background: #f1f5f9; text-align: center; border-top: 1px solid #e2e8f0;">
        <p style="margin: 0; color: #94a3b8; font-size: 12px;">OnwardTickets &mdash; Trusted Visa Document Services</p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"OnwardTickets" <${process.env.SMTP_USER}>`,
      to: data.email,
      subject: 'Application Received — OnwardTickets Affiliate Program',
      html,
    });
    console.log(`[Email] Registration confirmation sent to ${data.email}`);
  } catch (error) {
    console.error('[Email] Failed to send registration confirmation:', error);
  }
}

// Email to affiliate user on status update (approved/rejected)
export async function sendAffiliateStatusEmail(data: { name: string; email: string; status: 'approved' | 'rejected'; referralCode?: string }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://onwardtickets.com';

  const isApproved = data.status === 'approved';

  const approvedHtml = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #059669, #10B981); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 700;">You&rsquo;re Approved! 🎉</h1>
        <p style="color: #D1FAE5; margin: 8px 0 0; font-size: 14px;">OnwardTickets Affiliate Program</p>
      </div>
      <div style="padding: 30px;">
        <div style="background: white; border-radius: 10px; padding: 24px; border: 1px solid #e2e8f0;">
          <p style="margin: 0 0 16px; font-size: 15px; color: #0B1437;">Hi <strong>${data.name}</strong>,</p>
          <p style="margin: 0 0 16px; font-size: 14px; color: #374151; line-height: 1.6;">
            Great news! Your affiliate application has been <strong style="color: #059669;">approved</strong>. You can now log in to your affiliate dashboard and start earning commissions.
          </p>
          <div style="background: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 8px; padding: 16px; margin: 16px 0;">
            <p style="margin: 0 0 8px; font-size: 13px; color: #065F46; font-weight: 600;">Your Login Credentials</p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 6px 0; color: #065F46; font-size: 13px;">Email:</td>
                <td style="padding: 6px 0; color: #065F46; font-size: 13px; font-weight: 600;">${data.email}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #065F46; font-size: 13px;">Referral Code:</td>
                <td style="padding: 6px 0; color: #065F46; font-size: 13px; font-weight: 600;">${data.referralCode || 'Check your dashboard'}</td>
              </tr>
            </table>
          </div>
          <div style="background: #F0F4F8; border-radius: 8px; padding: 16px; margin: 16px 0;">
            <p style="margin: 0 0 8px; font-size: 13px; color: #0B1437; font-weight: 600;">Getting Started:</p>
            <ul style="margin: 0; padding-left: 18px; font-size: 13px; color: #374151; line-height: 1.8;">
              <li>Log in to your dashboard using your email and referral code</li>
              <li>Copy your unique referral links from the dashboard</li>
              <li>Share on your blog, social media, or email list</li>
              <li>Earn <strong>20% commission</strong> on every sale</li>
            </ul>
          </div>
        </div>
        <div style="text-align: center; margin-top: 24px;">
          <a href="${siteUrl}/affiliate/login"
             style="display: inline-block; background: linear-gradient(135deg, #059669, #10B981); color: white; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-size: 15px; font-weight: 700;">
            Log In to Your Dashboard
          </a>
        </div>
      </div>
      <div style="padding: 16px 30px; background: #f1f5f9; text-align: center; border-top: 1px solid #e2e8f0;">
        <p style="margin: 0; color: #94a3b8; font-size: 12px;">OnwardTickets &mdash; Trusted Visa Document Services</p>
      </div>
    </div>
  `;

  const rejectedHtml = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #2979FF, #0052CC); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 700;">Application Update</h1>
        <p style="color: #93c5fd; margin: 8px 0 0; font-size: 14px;">OnwardTickets Affiliate Program</p>
      </div>
      <div style="padding: 30px;">
        <div style="background: white; border-radius: 10px; padding: 24px; border: 1px solid #e2e8f0;">
          <p style="margin: 0 0 16px; font-size: 15px; color: #0B1437;">Hi <strong>${data.name}</strong>,</p>
          <p style="margin: 0 0 16px; font-size: 14px; color: #374151; line-height: 1.6;">
            Thank you for your interest in the OnwardTickets Affiliate Program. After reviewing your application, we&rsquo;re unable to approve it at this time.
          </p>
          <p style="margin: 0 0 16px; font-size: 14px; color: #374151; line-height: 1.6;">
            This could be due to various reasons, such as platform relevance or audience fit. You&rsquo;re welcome to reapply in the future if your circumstances change.
          </p>
          <p style="margin: 16px 0 0; font-size: 14px; color: #374151; line-height: 1.6;">
            If you have any questions, please contact us at
            <a href="mailto:contact@onwardtickets.com" style="color: #2979FF; text-decoration: none; font-weight: 600;">contact@onwardtickets.com</a>.
          </p>
        </div>
        <div style="text-align: center; margin-top: 24px;">
          <a href="${siteUrl}/affiliate/register"
             style="display: inline-block; background: linear-gradient(135deg, #2979FF, #0052CC); color: white; padding: 12px 28px; border-radius: 10px; text-decoration: none; font-size: 14px; font-weight: 600;">
            Reapply
          </a>
        </div>
      </div>
      <div style="padding: 16px 30px; background: #f1f5f9; text-align: center; border-top: 1px solid #e2e8f0;">
        <p style="margin: 0; color: #94a3b8; font-size: 12px;">OnwardTickets &mdash; Trusted Visa Document Services</p>
      </div>
    </div>
  `;

  const subject = isApproved
    ? 'Congratulations! Your Affiliate Application is Approved'
    : 'Affiliate Application Update — OnwardTickets';

  try {
    await transporter.sendMail({
      from: `"OnwardTickets" <${process.env.SMTP_USER}>`,
      to: data.email,
      subject,
      html: isApproved ? approvedHtml : rejectedHtml,
    });
    console.log(`[Email] Affiliate ${data.status} email sent to ${data.email}`);
  } catch (error) {
    console.error(`[Email] Failed to send affiliate ${data.status} email:`, error);
  }
}

export async function sendEmailVerification(data: { name: string; email: string; token: string }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://onwardticket.us';
  const verificationLink = `${siteUrl}/api/verify-email?token=${data.token}`;

  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #2979FF, #0052CC); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 700;">Verify Your Email</h1>
        <p style="color: #93c5fd; margin: 8px 0 0; font-size: 14px;">OnwardTickets</p>
      </div>

      <div style="padding: 30px;">
        <div style="background: white; border-radius: 10px; padding: 24px; border: 1px solid #e2e8f0; text-align: center;">
          <p style="margin: 0 0 20px; color: #64748b; font-size: 15px;">
            Hello ${data.name},
          </p>
          <p style="margin: 0 0 20px; color: #64748b; font-size: 14px; line-height: 1.6;">
            Thank you for your order! Please verify your email address to complete your submission.
          </p>
          <div style="margin: 30px 0;">
            <a href="${verificationLink}"
               style="display: inline-block; background: linear-gradient(135deg, #2979FF, #0052CC); color: white; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-size: 15px; font-weight: 700;">
              Verify Email
            </a>
          </div>
          <p style="margin: 20px 0 0; color: #94a3b8; font-size: 13px;">
            This link will expire in 24 hours.
          </p>
          <p style="margin: 10px 0; color: #64748b; font-size: 13px;">
            Or copy and paste this URL:
          </p>
          <p style="margin: 0; padding: 15px; background: #f1f5f9; border-radius: 8px; color: #0B1437; font-size: 12px; word-break: break-all;">
            ${verificationLink}
          </p>
        </div>
      </div>

      <div style="padding: 16px 30px; background: #f1f5f9; text-align: center; border-top: 1px solid #e2e8f0;">
        <p style="margin: 0; color: #94a3b8; font-size: 12px;">OnwardTickets &mdash; Trusted Visa Document Services</p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"OnwardTickets" <${process.env.SMTP_USER}>`,
      to: data.email,
      subject: 'Verify Your Email - OnwardTickets',
      html,
    });
    console.log(`[Email] Email verification sent to ${data.email}`);
  } catch (error) {
    console.error('[Email] Failed to send verification email:', error);
  }
}

// Email for admin password reset
export async function sendAdminPasswordResetEmail(data: { email: string; resetLink: string }) {
  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #2979FF, #0052CC); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 700;">Password Reset</h1>
        <p style="color: #93c5fd; margin: 8px 0 0; font-size: 14px;">OnwardTickets Admin</p>
      </div>
      <div style="padding: 30px;">
        <div style="background: white; border-radius: 10px; padding: 24px; border: 1px solid #e2e8f0;">
          <p style="margin: 0 0 16px; font-size: 15px; color: #0B1437;">Hello,</p>
          <p style="margin: 0 0 16px; font-size: 14px; color: #374151; line-height: 1.6;">
            We received a request to reset your admin password. Click the button below to set a new password.
          </p>
          <div style="text-align: center; margin: 24px 0;">
            <a href="${data.resetLink}"
               style="display: inline-block; background: linear-gradient(135deg, #2979FF, #0052CC); color: white; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-size: 15px; font-weight: 700;">
              Reset Password
            </a>
          </div>
          <p style="margin: 16px 0 0; color: #94a3b8; font-size: 13px;">
            This link expires in 1 hour. If you did not request this, you can ignore this email.
          </p>
          <p style="margin: 10px 0; color: #64748b; font-size: 12px;">
            Or copy and paste this URL: ${data.resetLink}
          </p>
        </div>
      </div>
      <div style="padding: 16px 30px; background: #f1f5f9; text-align: center; border-top: 1px solid #e2e8f0;">
        <p style="margin: 0; color: #94a3b8; font-size: 12px;">OnwardTickets &mdash; Admin Panel</p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"OnwardTickets" <${process.env.SMTP_USER}>`,
      to: data.email,
      subject: 'Password Reset — OnwardTickets Admin',
      html,
    });
    console.log(`[Email] Password reset email sent to ${data.email}`);
  } catch (error) {
    console.error('[Email] Failed to send password reset email:', error);
  }
}

// Email for affiliate password reset
export async function sendAffiliatePasswordResetEmail(data: { name: string; email: string; resetLink: string }) {
  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #2979FF, #0052CC); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 700;">Referral Code Reminder</h1>
        <p style="color: #93c5fd; margin: 8px 0 0; font-size: 14px;">OnwardTickets Affiliate Program</p>
      </div>
      <div style="padding: 30px;">
        <div style="background: white; border-radius: 10px; padding: 24px; border: 1px solid #e2e8f0;">
          <p style="margin: 0 0 16px; font-size: 15px; color: #0B1437;">Hi <strong>${data.name}</strong>,</p>
          <p style="margin: 0 0 16px; font-size: 14px; color: #374151; line-height: 1.6;">
            We received a request to recover your affiliate login credentials. Click the button below to view your referral code.
          </p>
          <div style="text-align: center; margin: 24px 0;">
            <a href="${data.resetLink}"
               style="display: inline-block; background: linear-gradient(135deg, #2979FF, #0052CC); color: white; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-size: 15px; font-weight: 700;">
              Recover My Credentials
            </a>
          </div>
          <p style="margin: 16px 0 0; color: #94a3b8; font-size: 13px;">
            This link expires in 1 hour. If you did not request this, you can ignore this email.
          </p>
        </div>
      </div>
      <div style="padding: 16px 30px; background: #f1f5f9; text-align: center; border-top: 1px solid #e2e8f0;">
        <p style="margin: 0; color: #94a3b8; font-size: 12px;">OnwardTickets Affiliate Program</p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"OnwardTickets" <${process.env.SMTP_USER}>`,
      to: data.email,
      subject: 'Credential Recovery — OnwardTickets Affiliate',
      html,
    });
    console.log(`[Email] Affiliate password reset email sent to ${data.email}`);
  } catch (error) {
    console.error('[Email] Failed to send affiliate password reset email:', error);
  }
}
