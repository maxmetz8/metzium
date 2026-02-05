import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import HeroImage from "@/images/Hero afbeelding tech laptop.jpg";
import MetziumLogo from "@/images/Metzium Logo png.png";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="relative h-8 w-32 -ml-24">
              <Image src={MetziumLogo} alt="Metzium" fill className="object-contain object-left" />
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#hero" className="hover:text-blue-600 transition-colors">Home</a>
              <a href="#services" className="hover:text-blue-600 transition-colors">Services</a>
              <a href="#projects" className="hover:text-blue-600 transition-colors">Projects</a>
              <a href="#about" className="hover:text-blue-600 transition-colors">About</a>
              <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative pt-80 pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-x-0 top-16 bottom-0">
          <Image
            src={HeroImage}
            alt="Technology workspace with laptop"
            fill
            priority
            className="object-cover scale-110 scale-y-125"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-indigo-900/50 to-gray-900/60" />
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-1 mb-6">
            <h1 className="text-3xl md:text-5xl font-normal text-white tracking-tight drop-shadow-[0_6px_18px_rgba(0,0,0,0.45)]">
              Welcome to
            </h1>
            <div className="relative h-16 w-64">
              <Image src={MetziumLogo} alt="Metzium" fill className="object-contain drop-shadow-[0_6px_18px_rgba(0,0,0,0.45)]" />
            </div>
          </div>
          <p className="text-sm md:text-base text-white/90 mb-8 mx-auto drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)] font-thin tracking-wider whitespace-nowrap">
            Professional web development services and innovative solutions for your business
          </p>
          <a
            href="#contact"
            className="inline-block bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold py-3 px-8 rounded-lg border-2 border-white/60 transition-all duration-200"
          >
            Get in Touch
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-2xl font-semibold mb-3">Web Design</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Beautiful, responsive designs that engage your audience and deliver exceptional user experiences.
              </p>
            </div>
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="text-2xl font-semibold mb-3">Web Development</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Custom web applications built with modern technologies, optimized for performance and scalability.
              </p>
            </div>
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-2xl font-semibold mb-3">Consulting</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Expert guidance on technology strategy, architecture decisions, and best practices for your projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-indigo-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">E-Commerce Platform</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  A modern, scalable e-commerce solution with advanced features and seamless checkout experience.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm">Next.js</span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm">TypeScript</span>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Business Dashboard</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Real-time analytics dashboard with interactive charts and comprehensive reporting capabilities.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 rounded-full text-sm">React</span>
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 rounded-full text-sm">Tailwind</span>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-green-400 to-teal-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Content Management</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Flexible CMS with intuitive interface, making content management simple and efficient.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-full text-sm">Node.js</span>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-full text-sm">MongoDB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-12">
            <h2 className="text-4xl font-bold text-center">About</h2>
            <div className="relative h-40 w-[40rem]">
              <Image src={MetziumLogo} alt="Metzium" fill className="object-contain" />
            </div>
          </div>
          <div className="prose prose-lg dark:prose-invert mx-auto">
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
              Metzium is dedicated to delivering exceptional web development services and innovative digital solutions. 
              With years of experience in the industry, we specialize in creating modern, responsive, and user-friendly 
              applications that help businesses achieve their goals.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
              Our team is passionate about staying at the forefront of web technologies, ensuring that every project 
              we undertake leverages the latest tools and best practices. We believe in building long-term partnerships 
              with our clients, providing ongoing support and guidance as their needs evolve.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              Whether you're a startup looking to establish your online presence or an established business seeking 
              to modernize your digital infrastructure, Metzium has the expertise and dedication to bring your vision to life.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Get in Touch</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
            Have a project in mind? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Metzium. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
