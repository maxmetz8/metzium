import FormData from "form-data";
import Mailgun from "mailgun.js";

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

function getMailgunConfig() {
  const apiKey = process.env.MAILGUN_API_KEY;
  const domain = process.env.MAILGUN_DOMAIN;
  const from = process.env.MAILGUN_FROM;
  const to = process.env.MAILGUN_TO;
  const url = process.env.MAILGUN_API_BASE_URL || "https://api.eu.mailgun.net";

  if (!apiKey) {
    throw new Error("MAILGUN_API_KEY is required");
  }

  if (!domain) {
    throw new Error("MAILGUN_DOMAIN is required");
  }

  if (!from) {
    throw new Error("MAILGUN_FROM is required");
  }

  if (!to) {
    throw new Error("MAILGUN_TO is required");
  }

  return { apiKey, domain, from, to, url };
}

export async function sendContactEmail(data: {
  firstName: string;
  lastName: string;
  email: string;
  enquiryType: string;
  message: string;
}) {
  const mailgunConfig = getMailgunConfig();
  const mailgun = new Mailgun(FormData);
  const client = mailgun.client({
    username: "api",
    key: mailgunConfig.apiKey,
    url: mailgunConfig.url,
  });

  // Prepare email content with HTML escaping
  const message = {
    from: mailgunConfig.from,
    to: [mailgunConfig.to],
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
    "h:Reply-To": data.email,
  };

  await client.messages.create(mailgunConfig.domain, message);
}
