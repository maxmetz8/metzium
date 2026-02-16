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

function isTrue(value: string | undefined, fallback = false): boolean {
  if (!value) return fallback;
  return value.toLowerCase() === "true";
}

function getSmtpConfig() {
  const isDevelopment = process.env.NODE_ENV !== "production";

  const host = process.env.SMTP_HOST || (isDevelopment ? "127.0.0.1" : undefined);
  const port = parseInt(process.env.SMTP_PORT || (isDevelopment ? "1025" : "587"), 10);
  const secure = isTrue(process.env.SMTP_SECURE, false);
  const smtpAuthFlag = process.env.SMTP_AUTH;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host) {
    throw new Error("SMTP_HOST is required in production");
  }

  const useAuth = smtpAuthFlag ? isTrue(smtpAuthFlag, false) : Boolean(user && pass);

  if (useAuth && (!user || !pass)) {
    throw new Error("SMTP_USER and SMTP_PASS are required when SMTP_AUTH is enabled");
  }

  const from = process.env.SMTP_FROM || user || (isDevelopment ? "no-reply@localhost" : undefined);
  const to = process.env.SMTP_TO || user;

  if (!from) {
    throw new Error("SMTP_FROM is required in production");
  }

  if (!to) {
    throw new Error("SMTP_TO is required");
  }

  return {
    host,
    port,
    secure,
    useAuth,
    user,
    pass,
    from,
    to,
  };
}

export async function sendContactEmail(data: {
  firstName: string;
  lastName: string;
  email: string;
  enquiryType: string;
  message: string;
}) {
  const smtp = getSmtpConfig();

  // SMTP setup supports both local Mailpit (no auth) and production providers (auth enabled)
  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: smtp.useAuth
      ? {
          user: smtp.user,
          pass: smtp.pass,
        }
      : undefined,
  });

  // Prepare email content with HTML escaping
  const mailOptions = {
    from: smtp.from,
    to: smtp.to,
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
    envelope: {
      from: smtp.from,
      to: smtp.to,
    },
  };

  // Send email
  await transporter.sendMail(mailOptions);
}
