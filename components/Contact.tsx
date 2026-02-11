import ContactForm from "@/components/ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="relative h-dvh px-4 sm:px-6 lg:px-8 overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute inset-x-4 top-6 bottom-6 rounded-[20px] overflow-hidden bg-gray-50 dark:bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-slate-900/80 to-black/80" />
      </div>
      <div className="relative max-w-4xl mx-auto z-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">Get in Touch</h2>
        <p className="text-center text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-12">
          Have a project in mind? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
        <ContactForm />
      </div>
    </section>
  );
}
