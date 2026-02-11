import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <Projects />
      <About />
      <Contact />

      {/* Footer */}
      <footer className="bg-black text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Metzium. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
