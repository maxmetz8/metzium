"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { submitContactForm } from "@/app/actions";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<"firstName" | "lastName" | "email" | "enquiryType" | "message", string>>
  >({});
  const fieldClassName =
    "w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-white placeholder:text-gray-500 transition focus:border-cyan-300/70 focus:outline-none focus:ring-2 focus:ring-cyan-300/30 disabled:cursor-not-allowed disabled:opacity-70";

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    setFieldErrors({});

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const result = await submitContactForm(formData);

      if (result.success) {
        setMessage({ type: "success", text: result.message || "Message sent successfully!" });
        setFieldErrors({});
        form.reset();
        setTimeout(() => setMessage(null), 4000);
      } else {
        setMessage({ type: "error", text: result.error || "Failed to send message" });
        setFieldErrors(result.fieldErrors ?? {});
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
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="new-password"
        className="absolute -left-[9999px] top-auto w-0 h-0 overflow-hidden"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="mb-2 block text-xs font-medium text-white/90 sm:text-sm">
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
          {fieldErrors.firstName ? <p className="mt-1 text-sm text-rose-300">{fieldErrors.firstName}</p> : null}
        </div>
        <div>
          <label htmlFor="lastName" className="mb-2 block text-xs font-medium text-white/90 sm:text-sm">
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
          {fieldErrors.lastName ? <p className="mt-1 text-sm text-rose-300">{fieldErrors.lastName}</p> : null}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-2 block text-xs font-medium text-white/90 sm:text-sm">
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
          {fieldErrors.email ? <p className="mt-1 text-sm text-rose-300">{fieldErrors.email}</p> : null}
        </div>
        <div>
          <label htmlFor="enquiryType" className="mb-2 block text-xs font-medium text-white/90 sm:text-sm">
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
          {fieldErrors.enquiryType ? <p className="mt-1 text-sm text-rose-300">{fieldErrors.enquiryType}</p> : null}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-xs font-medium text-white/90 sm:text-sm">
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
        {fieldErrors.message ? <p className="mt-1 text-sm text-rose-300">{fieldErrors.message}</p> : null}
      </div>

      {isMounted && message
        ? createPortal(
            <div className="pointer-events-none fixed inset-x-0 top-4 z-[9999] flex justify-center px-4 sm:top-6">
              <div
                role="status"
                aria-live="polite"
                className={`pointer-events-auto w-[min(94vw,36rem)] rounded-2xl border px-5 py-4 shadow-2xl backdrop-blur-sm ${
                  message.type === "success"
                    ? "border-emerald-200/60 bg-emerald-950/90 text-emerald-50"
                    : "border-rose-200/60 bg-rose-950/90 text-rose-50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                      message.type === "success"
                        ? "bg-emerald-400/30 text-emerald-50"
                        : "bg-rose-400/30 text-rose-50"
                    }`}
                  >
                    {message.type === "success" ? "✓" : "!"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">
                      {message.type === "success" ? "Message sent" : "Message failed"}
                    </p>
                    <p className="mt-1 break-words text-sm leading-5 text-white/95">{message.text}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMessage(null)}
                    className="shrink-0 rounded-full p-1 text-white/75 transition hover:bg-white/10 hover:text-white"
                    aria-label="Close notification"
                  >
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                      <path d="M4.22 4.22a.75.75 0 0 1 1.06 0L10 8.94l4.72-4.72a.75.75 0 1 1 1.06 1.06L11.06 10l4.72 4.72a.75.75 0 0 1-1.06 1.06L10 11.06l-4.72 4.72a.75.75 0 0 1-1.06-1.06L8.94 10 4.22 5.28a.75.75 0 0 1 0-1.06Z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
