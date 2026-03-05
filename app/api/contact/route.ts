import { NextRequest, NextResponse } from 'next/server'
import transporter from '@/lib/mailer'

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json()

    if (!name || !message) {
      return NextResponse.json({ error: 'Name and message are required.' }, { status: 400 })
    }

    await transporter.sendMail({
      from: `"Decor by Sun Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.BUSINESS_EMAIL,
      subject: `New Contact Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h3>New Contact Message</h3>
          <p><strong>Name:</strong> ${name}</p>
          ${email ? `<p><strong>Email:</strong> ${email}</p>` : ''}
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          <p><strong>Message:</strong><br/>${message}</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 })
  }
}
