"use server";

import { headers } from "next/headers";
import { contactFormSchema } from "@/lib/validation";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendContactEmail } from "@/lib/email";
import { ZodError } from "zod";

export async function submitContactForm(formData: FormData) {
  try {
    // Get client IP for rate limiting
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const realIp = headersList.get("x-real-ip");
    const ip = forwardedFor?.split(",")[0] || realIp || "unknown";

    // Verify origin to prevent CSRF
    const origin = headersList.get("origin");
    const host = headersList.get("host");
    const allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);
    
    // In production, origin should always be present for POST requests
    // Allow missing origin only in development
    if (origin) {
      if (!host) {
        return {
          success: false,
          error: "Invalid request",
        };
      }
      const originUrl = new URL(origin);
      const isHostMatch = originUrl.host === host;
      const isExplicitlyAllowed = allowedOrigins.some((allowed) => {
        try {
          // Supports entries like: https://www.metzium.com
          return new URL(allowed).host === originUrl.host;
        } catch {
          // Supports entries like: www.metzium.com
          return allowed === originUrl.host;
        }
      });

      if (!isHostMatch && !isExplicitlyAllowed) {
        return {
          success: false,
          error: "Invalid origin",
        };
      }
    } else if (process.env.NODE_ENV === "production") {
      // In production, require origin header
      return {
        success: false,
        error: "Invalid request - missing origin",
      };
    }

    // Check rate limit
    const rateLimitResult = checkRateLimit(ip);
    if (!rateLimitResult.allowed) {
      return {
        success: false,
        error: `Too many requests. Please try again after ${rateLimitResult.resetAt.toLocaleTimeString()}.`,
      };
    }

    // Extract and validate form data
    const rawData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      enquiryType: formData.get("enquiryType") as string,
      message: formData.get("message") as string,
      company: formData.get("company") as string, // Honeypot field
    };

    // Honeypot check - if filled, it's likely a bot
    if (rawData.company) {
      return {
        success: false,
        error: "Invalid submission",
      };
    }

    // Basic spam checks - count total links in message
    const message = rawData.message || "";
    const spamPatterns = [
      /https?:\/\//gi,  // Match both http and https
      /\[url=/gi,
      /\[link=/gi,
      /<a href=/gi,
    ];

    // Count total links across all patterns
    let totalLinks = 0;
    spamPatterns.forEach(pattern => {
      const matches = message.match(pattern);
      if (matches) {
        totalLinks += matches.length;
      }
    });

    if (totalLinks > 2) {
      return {
        success: false,
        error: "Your message contains too many links. Please remove some and try again.",
      };
    }

    // Validate with Zod
    const validatedData = contactFormSchema.parse(rawData);

    // Send email
    await sendContactEmail(validatedData);

    return {
      success: true,
      message: "Thank you for your message! We'll get back to you soon.",
    };
  } catch (error) {
    console.error("Contact form error:", error);

    if (error instanceof ZodError) {
      return {
        success: false,
        error: error.issues[0]?.message || "Validation failed",
      };
    }

    return {
      success: false,
      error: "Failed to send message. Please try again later.",
    };
  }
}
