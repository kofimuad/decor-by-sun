interface AdminEmailProps {
  name: string
  phone: string
  email?: string
  service: string
  style?: string
  eventDate?: string
  eventLocation?: string
  message?: string
  bookingId: string
}

export function adminNotificationEmail({
  name, phone, email, service, style, eventDate, eventLocation, message, bookingId
}: AdminEmailProps) {
  const dateStr = eventDate ? new Date(eventDate).toLocaleDateString('en-GB', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  }) : 'Not specified'

  const dashboardUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/admin/bookings/${bookingId}`
  const subject = `New Booking — ${service} from ${name}`

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8"/>
      <style>
        body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
        .wrapper { max-width: 560px; margin: 40px auto; background: #fff; border-radius: 4px; overflow: hidden; }
        .header { background: #1B4332; padding: 28px 36px; }
        .header h1 { color: #E2C97E; font-size: 18px; font-weight: 600; margin: 0; }
        .header p { color: rgba(245,240,232,0.7); font-size: 13px; margin: 4px 0 0; }
        .badge { display: inline-block; background: #C9A84C; color: #1B4332; font-size: 11px; font-weight: bold; padding: 4px 10px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 20px; }
        .body { padding: 32px 36px; }
        .details { width: 100%; border-collapse: collapse; margin: 16px 0; }
        .details tr { border-bottom: 1px solid #f0f0f0; }
        .details td { padding: 10px 0; font-size: 14px; color: #333; vertical-align: top; }
        .details td:first-child { font-weight: bold; width: 120px; color: #52796F; text-transform: uppercase; font-size: 11px; letter-spacing: 0.08em; }
        .cta { display: block; background: #1B4332; color: #E2C97E !important; text-decoration: none; padding: 14px 28px; text-align: center; border-radius: 2px; font-size: 13px; letter-spacing: 0.14em; text-transform: uppercase; font-weight: bold; margin-top: 24px; }
        .footer { padding: 20px 36px; background: #f9f9f9; border-top: 1px solid #eee; }
        .footer p { color: #aaa; font-size: 11px; margin: 0; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <h1>New Booking Inquiry</h1>
          <p>Decor by Sun · Admin Notification</p>
        </div>
        <div class="body">
          <span class="badge">⏳ Pending Review</span>
          <table class="details">
            <tr><td>Name</td><td>${name}</td></tr>
            <tr><td>Phone</td><td>${phone}</td></tr>
            ${email ? `<tr><td>Email</td><td>${email}</td></tr>` : ''}
            <tr><td>Service</td><td>${service}</td></tr>
            ${style ? `<tr><td>Style</td><td>${style}</td></tr>` : ''}
            <tr><td>Event Date</td><td>${dateStr}</td></tr>
            ${eventLocation ? `<tr><td>Location</td><td>${eventLocation}</td></tr>` : ''}
            ${message ? `<tr><td>Notes</td><td>${message}</td></tr>` : ''}
          </table>
          <a href="${dashboardUrl}" class="cta">View & Manage in Dashboard →</a>
        </div>
        <div class="footer">
          <p>This is an automated notification from your Decor by Sun website.</p>
        </div>
      </div>
    </body>
    </html>
  `

  const text = `
New Booking Inquiry — ${service} from ${name}

Name:     ${name}
Phone:    ${phone}
${email ? `Email:    ${email}` : ''}
Service:  ${service}
${style ? `Style:    ${style}` : ''}
Date:     ${dateStr}
${message ? `Notes:    ${message}` : ''}

View in dashboard: ${dashboardUrl}
  `.trim()

  return { subject, html, text }
}
