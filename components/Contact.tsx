import ContactForm from "@/components/ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="relative min-h-screen px-4 sm:px-6 lg:px-8 overflow-hidden py-24 sm:py-28">
      <div className="absolute inset-x-4 top-6 bottom-6 rounded-[20px] overflow-hidden border-2 border-black/40 bg-black/40">
        <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-slate-900/70 to-black/80" />
      </div>

      <div className="relative max-w-5xl mx-auto z-10 w-full">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-white/20 via-white/5 to-transparent"></div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-pulse delay-75"></div>
            <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse delay-150"></div>
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-white/20 via-white/5 to-transparent"></div>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center text-white mb-4">Get in Touch</h2>
        <p className="text-center text-sm sm:text-base text-gray-300 mb-10 sm:mb-12 max-w-2xl mx-auto">
          Have a project in mind? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
        </p>

        <div className="rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_30px_90px_rgba(0,0,0,0.45)] p-5 sm:p-8 md:p-10">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
