interface ClientEmailProps {
  name: string
  service: string
  style?: string
  eventDate?: string
  eventLocation?: string
  message?: string
}

export function clientConfirmationEmail({ name, service, style, eventDate, eventLocation, message }: ClientEmailProps) {
  const dateStr = eventDate ? new Date(eventDate).toLocaleDateString('en-GB', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  }) : 'To be confirmed'

  const subject = `We've received your booking — Decor by Sun ✨`

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8"/>
      <style>
        body { font-family: Georgia, serif; background: #F5F0E8; margin: 0; padding: 0; }
        .wrapper { max-width: 560px; margin: 40px auto; background: #fff; border-radius: 4px; overflow: hidden; }
        .header { background: #1B4332; padding: 36px 40px; text-align: center; }
        .header h1 { color: #E2C97E; font-size: 22px; font-weight: 400; margin: 0; letter-spacing: 0.1em; }
        .header p { color: rgba(245,240,232,0.7); font-size: 13px; margin: 6px 0 0; font-family: Arial, sans-serif; letter-spacing: 0.08em; }
        .body { padding: 36px 40px; }
        .body p { color: #2D2D2D; font-size: 15px; line-height: 1.8; margin-bottom: 16px; }
        .details { background: #F5F0E8; border-left: 3px solid #C9A84C; padding: 20px 24px; margin: 24px 0; border-radius: 2px; }
        .details table { width: 100%; border-collapse: collapse; font-family: Arial, sans-serif; }
        .details td { padding: 6px 0; font-size: 14px; color: #1B4332; vertical-align: top; }
        .details td:first-child { font-weight: bold; width: 110px; color: #52796F; text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em; }
        .footer { background: #0f2a1f; padding: 24px 40px; text-align: center; }
        .footer p { color: rgba(245,240,232,0.5); font-size: 12px; font-family: Arial, sans-serif; margin: 0; }
        .footer a { color: #E2C97E; text-decoration: none; }
        .divider { height: 1px; background: #EDE6D6; margin: 8px 0; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <h1>Decor by Sun</h1>
          <p>Elevate Your Moments with Timeless Elegance</p>
        </div>
        <div class="body">
          <p>Dear ${name},</p>
          <p>Thank you for reaching out! We've received your booking inquiry and are so excited to work with you. 🌿</p>
          <p>Here's a summary of what you submitted:</p>
          <div class="details">
            <table>
              <tr><td>Service</td><td>${service}</td></tr>
              ${style ? `<tr><td>Style</td><td>${style}</td></tr>` : ''}
              <tr><td>Event Date</td><td>${dateStr}</td></tr>
              ${eventLocation ? `<tr><td>Location</td><td>${eventLocation}</td></tr>` : ''}
              ${message ? `<tr><td>Notes</td><td>${message}</td></tr>` : ''}
            </table>
          </div>
          <p>We'll review your inquiry and get back to you <strong>within 24 hours</strong> to confirm your booking and discuss the details.</p>
          <p>In the meantime, feel free to browse our latest work on Instagram or send a WhatsApp message if you have any questions.</p>
          <p style="margin-top: 32px;">With warmth,<br/><em style="color: #1B4332; font-size: 17px;">Sun</em><br/><span style="font-family: Arial, sans-serif; font-size: 12px; color: #52796F;">Decor by Sun · Kumasi, Ghana</span></p>
        </div>
        <div class="footer">
          <p>© 2026 Decor by Sun · <a href="${process.env.NEXT_PUBLIC_SITE_URL}">decorbysun.com</a></p>
        </div>
      </div>
    </body>
    </html>
  `

  const text = `
Hi ${name},

Thank you for your booking inquiry with Decor by Sun!

Your booking summary:
- Service: ${service}
${style ? `- Style: ${style}` : ''}
- Event Date: ${dateStr}
${message ? `- Notes: ${message}` : ''}

We'll get back to you within 24 hours to confirm your booking.

Warm regards,
Sun — Decor by Sun
  `.trim()

  return { subject, html, text }
}
