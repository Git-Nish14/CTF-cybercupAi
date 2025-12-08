import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { name, email, subject, category, message } = await request.json();
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email address" },
        { status: 400 }
      );
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email to admin/support team
    const adminMailOptions = {
      from: `"CTF-Cybercup Support" <${process.env.EMAIL_USER}>`,
      to: process.env.SUPPORT_EMAIL || process.env.EMAIL_USER,
      subject: `[${category.toUpperCase()}] ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #043657 0%, #0D6BA8 100%);
              color: white;
              padding: 30px;
              border-radius: 10px 10px 0 0;
              text-align: center;
            }
            .content {
              background: #f8f9fa;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .field {
              margin-bottom: 20px;
              padding: 15px;
              background: white;
              border-radius: 5px;
              border-left: 4px solid #0D6BA8;
            }
            .label {
              font-weight: bold;
              color: #043657;
              margin-bottom: 5px;
              text-transform: uppercase;
              font-size: 12px;
              letter-spacing: 1px;
            }
            .value {
              color: #555;
              font-size: 14px;
            }
            .message-box {
              background: white;
              padding: 20px;
              border-radius: 5px;
              border: 1px solid #dee2e6;
              white-space: pre-wrap;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              padding-top: 20px;
              border-top: 1px solid #dee2e6;
              color: #6c757d;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">New Support Request</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">CTF-Cybercup.ai</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Category</div>
                <div class="value">${category}</div>
              </div>
              
              <div class="field">
                <div class="label">From</div>
                <div class="value">${name}</div>
              </div>
              
              <div class="field">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              
              <div class="field">
                <div class="label">Subject</div>
                <div class="value">${subject}</div>
              </div>
              
              <div class="field">
                <div class="label">Message</div>
                <div class="message-box">${message}</div>
              </div>
              
              <div class="footer">
                <p>This message was sent from the CTF-Cybercup.ai support form</p>
                <p>Time: ${new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
New Support Request - CTF-Cybercup.ai

Category: ${category}
From: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
Time: ${new Date().toLocaleString()}
      `,
    };

    // Auto-reply email to user
    const userMailOptions = {
      from: `"CTF-Cybercup Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Re: ${subject} - We've received your message`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #043657 0%, #0D6BA8 100%);
              color: white;
              padding: 30px;
              border-radius: 10px 10px 0 0;
              text-align: center;
            }
            .content {
              background: #f8f9fa;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .message {
              background: white;
              padding: 20px;
              border-radius: 5px;
              margin: 20px 0;
              border-left: 4px solid #0D6BA8;
            }
            .button {
              display: inline-block;
              padding: 12px 30px;
              background: linear-gradient(135deg, #043657 0%, #0D6BA8 100%);
              color: white;
              text-decoration: none;
              border-radius: 25px;
              margin: 20px 0;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              padding-top: 20px;
              border-top: 1px solid #dee2e6;
              color: #6c757d;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">Thank You for Contacting Us!</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">CTF-Cybercup.ai Support</p>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              
              <p>Thank you for reaching out to CTF-Cybercup.ai support. We've received your message and our team will review it shortly.</p>
              
              <div class="message">
                <strong>Your Request Details:</strong><br>
                <strong>Category:</strong> ${category}<br>
                <strong>Subject:</strong> ${subject}<br>
                <strong>Submitted:</strong> ${new Date().toLocaleString()}
              </div>
              
              <p><strong>What happens next?</strong></p>
              <ul>
                <li>Our support team will review your request</li>
                <li>We typically respond within 24 hours during business days</li>
                <li>You'll receive a response at <strong>${email}</strong></li>
              </ul>
              
              <p>While you wait, you might find these resources helpful:</p>
              
              <div style="text-align: center;">
                <a href="${
                  process.env.NEXT_PUBLIC_APP_URL || "https://ctf-cybercup.ai"
                }/docs" class="button">Browse Documentation</a>
              </div>
              
              <div class="footer">
                <p><strong>Need immediate help?</strong></p>
                <p>For urgent issues, email us directly at support@ctf-cybercup.ai</p>
                <p style="margin-top: 20px;">
                  This is an automated response. Please do not reply to this email.<br>
                  © ${new Date().getFullYear()} CTF-Cybercup.ai - All rights reserved
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Hi ${name},

Thank you for reaching out to CTF-Cybercup.ai support. We've received your message and our team will review it shortly.

Your Request Details:
Category: ${category}
Subject: ${subject}
Submitted: ${new Date().toLocaleString()}

What happens next?
- Our support team will review your request
- We typically respond within 24 hours during business days
- You'll receive a response at ${email}

While you wait, visit our documentation at ${
        process.env.NEXT_PUBLIC_APP_URL || "https://ctf-cybercup.ai"
      }/docs

Need immediate help? Email us directly at support@ctf-cybercup.ai

---
This is an automated response. Please do not reply to this email.
© ${new Date().getFullYear()} CTF-Cybercup.ai - All rights reserved
      `,
    };
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    return NextResponse.json(
      {
        success: true,
        message:
          "Your message has been sent successfully! We'll get back to you soon.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Support email error:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to send message. Please try again later or email us directly at support@ctf-cybercup.ai",
      },
      { status: 500 }
    );
  }
}
