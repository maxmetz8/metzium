"use client";

import { useState } from "react";
import { submitContactForm } from "@/app/actions";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const fieldClassName =
    "w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-white placeholder:text-gray-500 transition focus:border-cyan-300/70 focus:outline-none focus:ring-2 focus:ring-cyan-300/30 disabled:cursor-not-allowed disabled:opacity-70";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const result = await submitContactForm(formData);

      if (result.success) {
        setMessage({ type: "success", text: result.message || "Message sent successfully!" });
        // Reset form
        form.reset();
      } else {
        setMessage({ type: "error", text: result.error || "Failed to send message" });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setMessage({ type: "error", text: "An unexpected error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
      {/* Honeypot field - hidden from users */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="new-password"
        className="absolute -left-[9999px] top-auto w-0 h-0 overflow-hidden"
        aria-hidden="true"
      />

      {/* First Name and Last Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-xs sm:text-sm font-medium text-white/90 mb-2">
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            className={fieldClassName}
            placeholder="John"
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-xs sm:text-sm font-medium text-white/90 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            className={fieldClassName}
            placeholder="Doe"
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* Email and Type of Enquiry */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-white/90 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className={fieldClassName}
            placeholder="you@company.com"
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label htmlFor="enquiryType" className="block text-xs sm:text-sm font-medium text-white/90 mb-2">
            Type of Enquiry *
          </label>
          <div className="relative">
            <select
              id="enquiryType"
              name="enquiryType"
              required
              className={`${fieldClassName} h-[50px] appearance-none pr-10`}
              disabled={isSubmitting}
            >
              <option value="">Select an option</option>
              <option value="General">General</option>
              <option value="Support">Support</option>
              <option value="Sales">Sales</option>
              <option value="Partnership">Partnership</option>
              <option value="Other">Other</option>
            </select>
            <svg
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-white/90 mb-2">
          How can we help? *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className={`${fieldClassName} min-h-[160px] resize-y`}
          placeholder="Tell us about your project, timeline, and goals."
          disabled={isSubmitting}
        />
      </div>

      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.type === "success"
              ? "border border-emerald-300/30 bg-emerald-400/10 text-emerald-200"
              : "border border-red-300/30 bg-red-400/10 text-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm sm:text-base font-semibold text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
