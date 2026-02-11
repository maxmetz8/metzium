import nodemailer from "nodemailer";

// HTML escape utility to prevent XSS
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

export async function sendContactEmail(data: {
  firstName: string;
  lastName: string;
  email: string;
  enquiryType: string;
  message: string;
}) {
  // Verify environment variables are set
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error("SMTP configuration is missing");
  }

  // Create transporter with STRATO SMTP settings
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "465"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Prepare email content with HTML escaping
  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: process.env.SMTP_TO || "contact@metzium.com",
    subject: `New Contact Form Submission from ${data.firstName} ${data.lastName}`,
    text: `
  Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
  Enquiry Type: ${data.enquiryType}

Message:
${data.message}
    `.trim(),
    html: `
<h2>New Contact Form Submission</h2>
  <p><strong>Name:</strong> ${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)}</p>
<p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
  <p><strong>Enquiry Type:</strong> ${escapeHtml(data.enquiryType)}</p>
<h3>Message:</h3>
<p>${escapeHtml(data.message).replace(/\n/g, "<br>")}</p>
    `.trim(),
    replyTo: data.email,
  };

  // Send email
  await transporter.sendMail(mailOptions);
}
