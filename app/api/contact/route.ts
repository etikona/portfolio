import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 465,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email to YOU (the portfolio owner)
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      replyTo: email,
      subject: subject
        ? `[Portfolio] ${subject}`
        : `[Portfolio] New message from ${name}`,
      html: `
        <div style="font-family: Inter, sans-serif; max-width: 560px; margin: 0 auto; color: #0E0E0D;">
          <div style="border-bottom: 2px solid #C8B89A; padding-bottom: 1rem; margin-bottom: 1.5rem;">
            <h2 style="margin: 0; font-size: 1.3rem; font-weight: 600;">New Contact Form Submission</h2>
            <p style="margin: 0.3rem 0 0; color: #6B6B6B; font-size: 0.85rem;">From your portfolio website</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 1.5rem;">
            <tr>
              <td style="padding: 0.6rem 0; border-bottom: 1px solid #E2E0D8; font-size: 0.82rem; color: #6B6B6B; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; width: 100px;">Name</td>
              <td style="padding: 0.6rem 0; border-bottom: 1px solid #E2E0D8; font-size: 0.9rem; color: #0E0E0D;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 0.6rem 0; border-bottom: 1px solid #E2E0D8; font-size: 0.82rem; color: #6B6B6B; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Email</td>
              <td style="padding: 0.6rem 0; border-bottom: 1px solid #E2E0D8; font-size: 0.9rem; color: #0E0E0D;"><a href="mailto:${email}" style="color: #C8B89A;">${email}</a></td>
            </tr>
            ${
              subject
                ? `<tr>
              <td style="padding: 0.6rem 0; border-bottom: 1px solid #E2E0D8; font-size: 0.82rem; color: #6B6B6B; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Subject</td>
              <td style="padding: 0.6rem 0; border-bottom: 1px solid #E2E0D8; font-size: 0.9rem; color: #0E0E0D;">${subject}</td>
            </tr>`
                : ""
            }
          </table>

          <div style="background: #F8F8F6; border: 1px solid #E2E0D8; border-radius: 4px; padding: 1.25rem;">
            <p style="margin: 0 0 0.5rem; font-size: 0.75rem; color: #6B6B6B; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em;">Message</p>
            <p style="margin: 0; font-size: 0.92rem; color: #0E0E0D; line-height: 1.75; white-space: pre-wrap;">${message}</p>
          </div>

          <p style="margin-top: 1.5rem; font-size: 0.78rem; color: #6B6B6B;">
            Reply directly to this email to respond to ${name}.
          </p>
        </div>
      `,
    });

    // Auto-reply to the sender
    await transporter.sendMail({
      from: `"Eti" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Thanks for reaching out!",
      html: `
        <div style="font-family: Inter, sans-serif; max-width: 560px; margin: 0 auto; color: #0E0E0D;">
          <div style="border-bottom: 2px solid #C8B89A; padding-bottom: 1rem; margin-bottom: 1.5rem;">
            <h2 style="margin: 0; font-size: 1.2rem; font-weight: 600; font-family: 'Playfair Display', Georgia, serif;">Thanks, ${name}.</h2>
          </div>
          <p style="color: #6B6B6B; line-height: 1.8; font-size: 0.92rem;">
            I received your message and will get back to you within 24 hours.
          </p>
          <p style="color: #6B6B6B; line-height: 1.8; font-size: 0.92rem;">
            — Eti
          </p>
          <div style="border-top: 1px solid #E2E0D8; margin-top: 2rem; padding-top: 1rem;">
            <p style="font-size: 0.78rem; color: #9CA3AF; margin: 0;">
              This is an automated reply. Please do not respond to this email.
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 },
    );
  }
}
