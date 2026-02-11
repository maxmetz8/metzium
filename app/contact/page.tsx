import Contact from "@/components/Contact";

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Contact />
      <footer className="text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Metzium. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
