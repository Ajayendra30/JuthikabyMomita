// Juthika by Momita Luxury Silk Boutique — Automated Customer Email Service
// Generates luxury email notifications (Account Confirmation, Login, Order Dispatches)
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');
const SENT_EMAILS_FILE = path.join(DATA_DIR, 'sent_emails.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function getSentEmails() {
  try {
    if (fs.existsSync(SENT_EMAILS_FILE)) {
      return JSON.parse(fs.readFileSync(SENT_EMAILS_FILE, 'utf-8'));
    }
  } catch (err) {
    console.warn('[Email Service] Error reading sent_emails.json:', err.message);
  }
  return [];
}

function saveSentEmail(record) {
  try {
    const list = getSentEmails();
    list.unshift(record);
    // Keep last 100 emails
    fs.writeFileSync(SENT_EMAILS_FILE, JSON.stringify(list.slice(0, 100), null, 2), 'utf-8');
  } catch (err) {
    console.warn('[Email Service] Error writing sent_emails.json:', err.message);
  }
}

/**
 * Configure Nodemailer Transporter
 * Automatically detects:
 * 1. Gmail configuration (GMAIL_USER & GMAIL_APP_PASSWORD)
 * 2. Generic SMTP (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS)
 * 3. Fallback to Local Safe Logger & Ethereal preview
 */
export function createEmailTransporter() {
  const gmailUser = process.env.GMAIL_USER || process.env.SMTP_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS;
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT) || 587;

  // 1. Explicit SMTP configuration
  if (smtpHost && gmailUser && gmailPass) {
    return nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: gmailUser,
        pass: gmailPass
      }
    });
  }

  // 2. Direct Gmail App Password
  if (gmailUser && gmailPass) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass
      }
    });
  }

  // 3. Fallback: No credentials in .env yet
  return null;
}

/**
 * HTML Template modeled directly after luxury fashion house confirmation emails
 * Matches the Shopify Official minimalist luxury aesthetic
 */
export function renderAccountConfirmationHtml({
  customerName = 'Valued Patron',
  storeUrl = 'http://localhost:5173',
  supportEmail = 'contact@juthikabymomita.com'
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Customer account confirmation</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f7f5f0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      color: #111111;
    }
    table {
      border-collapse: collapse;
    }
    a {
      text-decoration: none;
    }
    .btn-store:hover {
      background-color: #2b2723 !important;
    }
  </style>
</head>
<body style="margin: 0; padding: 40px 15px; background-color: #f7f5f0;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" style="max-width: 580px; background-color: #ffffff; border: 1px solid #e8dfd1; border-radius: 2px; padding: 0;" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td style="padding: 50px 45px 45px 45px;">
              
              <!-- Brand Title Header -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="left" style="padding-bottom: 36px;">
                    <div style="font-size: 15px; letter-spacing: 0.28em; text-transform: uppercase; color: #8e734c; font-weight: 500; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                      JUTHIKA BY MOMITA
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Main Greeting Headline -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="left" style="padding-bottom: 18px;">
                    <h1 style="margin: 0; font-size: 24px; line-height: 1.35; font-weight: 400; color: #111111; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Georgia, serif;">
                      Welcome to Juthika By Momita Official!
                    </h1>
                  </td>
                </tr>
              </table>

              <!-- Body Message -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="left" style="padding-bottom: 28px;">
                    <p style="margin: 0; font-size: 14px; line-height: 1.65; color: #555555; font-weight: 300;">
                      You&#39;ve activated your customer account. Next time you shop with us, log in for faster checkout.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Action Button: Visit our store -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="left" style="padding-bottom: 40px;">
                    <a href="${storeUrl}" target="_blank" class="btn-store" style="display: inline-block; background-color: #111111; color: #ffffff; padding: 14px 32px; font-size: 13px; font-weight: 500; letter-spacing: 0.04em; text-transform: none; text-decoration: none; border-radius: 2px;">
                      Visit our store
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Fine Divider Line -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="border-top: 1px solid #eeeeee; padding-top: 25px;">
                    <p style="margin: 0; font-size: 11px; line-height: 1.6; color: #888888; font-weight: 300;">
                      If you have any questions, reply to this email or contact us at <a href="mailto:${supportEmail}" style="color: #111111; text-decoration: underline;">${supportEmail}</a>.
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>
        </table>
        
        <!-- Subtle Sub-footer -->
        <table role="presentation" width="100%" style="max-width: 580px; margin-top: 16px;" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td align="center" style="font-size: 11px; color: #8c827a; font-family: monospace;">
              Sualkuchi Extra-Weft Handloom Heritage &bull; Assam, India
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Send customer account confirmation email
 */
export async function sendCustomerAccountConfirmationEmail({
  to,
  name,
  storeUrl = 'http://localhost:5173',
  isLogin = false
}) {
  const cleanEmail = (to || '').trim().toLowerCase();
  const cleanName = (name || '').trim() || 'Valued Patron';
  const supportEmail = process.env.SUPPORT_EMAIL || 'baaitaly.growify@gmail.com';
  const senderEmail = process.env.SMTP_FROM || process.env.GMAIL_USER || 'store@juthikabymomita.com';

  const htmlContent = renderAccountConfirmationHtml({
    customerName: cleanName,
    storeUrl,
    supportEmail
  });

  const mailOptions = {
    from: `"Juthika By Momita Official" <${senderEmail}>`,
    to: cleanEmail,
    subject: 'Customer account confirmation',
    text: `Welcome to Juthika By Momita Official!\n\nYou've activated your customer account. Next time you shop with us, log in for faster checkout.\n\nVisit our store: ${storeUrl}\n\nIf you have any questions, reply to this email or contact us at ${supportEmail}.`,
    html: htmlContent
  };

  const record = {
    id: `email-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    to: cleanEmail,
    recipientName: cleanName,
    subject: mailOptions.subject,
    type: isLogin ? 'LOGIN_NOTIFICATION' : 'ACCOUNT_CONFIRMATION',
    status: 'pending',
    timestamp: new Date().toISOString(),
    previewHtml: htmlContent
  };

  const transporter = createEmailTransporter();

  if (transporter) {
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`[Email Service] Delivered confirmation email to ${cleanEmail} (MessageId: ${info.messageId})`);
      record.status = 'delivered';
      record.messageId = info.messageId;
      saveSentEmail(record);
      return { success: true, delivered: true, messageId: info.messageId, record };
    } catch (err) {
      console.error(`[Email Service] Failed delivering email to ${cleanEmail}:`, err.message);
      record.status = 'failed';
      record.error = err.message;
      saveSentEmail(record);
      return { success: false, delivered: false, error: err.message, record };
    }
  } else {
    // Simulated delivery (saved in sent_emails.json and logged to console with full preview)
    console.log(`========================================================================`);
    console.log(`[Email Service - Simulated Dispatch]`);
    console.log(`To: ${cleanEmail}`);
    console.log(`Subject: ${mailOptions.subject}`);
    console.log(`From: "Juthika By Momita Official" <${senderEmail}>`);
    console.log(`Status: Logged to server/data/sent_emails.json (Add GMAIL_USER & GMAIL_APP_PASSWORD to .env for direct inbox delivery)`);
    console.log(`========================================================================`);
    record.status = 'simulated';
    record.note = 'Stored in server/data/sent_emails.json. Provide GMAIL_USER & GMAIL_APP_PASSWORD in .env for live inbox delivery.';
    saveSentEmail(record);
    return { success: true, delivered: false, simulated: true, record };
  }
}

export { getSentEmails };
