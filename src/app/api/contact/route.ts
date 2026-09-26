import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const clean = (value: unknown, maxLength: number) =>
  typeof value === 'string' ? value.trim().slice(0, maxLength) : '';

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  })[character] ?? character);

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const name = clean(payload.name, 100).replace(/[\r\n]/g, ' ');
    const email = clean(payload.email, 254);
    const message = clean(payload.message, 5000);
    const website = clean(payload.website, 200);

    // Honeypot: bots commonly fill hidden fields.
    if (website) return NextResponse.json({ ok: true });

    if (!name || !EMAIL_PATTERN.test(email) || message.length < 10) {
      return NextResponse.json({ error: 'Invalid form data.' }, { status: 400 });
    }

    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const password = process.env.SMTP_PASS;
    const recipient = process.env.CONTACT_TO_EMAIL ?? user;
    const port = Number(process.env.SMTP_PORT ?? 465);
    const secure = process.env.SMTP_SECURE !== 'false';

    if (!host || !user || !password || !recipient) {
      console.error('Contact form SMTP variables are not configured.');
      return NextResponse.json({ error: 'Email service is not configured.' }, { status: 503 });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass: password },
    });

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');

    await transporter.sendMail({
      from: `"Miguel Bonilla Portfolio" <${user}>`,
      to: recipient,
      replyTo: email,
      subject: `Portfolio contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<h2>New portfolio message</h2><p><strong>Name:</strong> ${safeName}</p><p><strong>Email:</strong> ${safeEmail}</p><p><strong>Message:</strong><br />${safeMessage}</p>`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Unable to send portfolio contact email:', error);
    return NextResponse.json({ error: 'Unable to send email.' }, { status: 500 });
  }
}
