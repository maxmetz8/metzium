"use client";

import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import HeroImage from "@/images/Hero afbeelding tech laptop.jpg";
import MetziumLogo from "@/images/metzium logo png colour 2.png";
import MetziumLogoWhite from "@/images/Metzium Logo png.png";
import LogoGlow from "@/images/Metzium logo glow.png";
import { useState } from "react";

export default function Home() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFlippedPurple, setIsFlippedPurple] = useState(false);
  const [isFlippedGreen, setIsFlippedGreen] = useState(false);
  const [isFlippedBlue, setIsFlippedBlue] = useState(false);
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-center items-center h-20">
            <div className="hidden md:flex items-center space-x-8">
              <div className="relative h-8 w-32">
                <Image src={MetziumLogo} alt="Metzium" fill className="object-contain" />
              </div>
              <a href="#services" className="text-gray-400 hover:text-gray-200 transition-colors duration-300">Services</a>
              <a href="#projects" className="text-gray-400 hover:text-gray-200 transition-colors duration-300">Projects</a>
              <a href="#about" className="text-gray-400 hover:text-gray-200 transition-colors duration-300">About</a>
              <a href="#contact" className="text-gray-400 hover:text-gray-200 transition-colors duration-300">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative pt-80 pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-x-0 top-16 bottom-0 rounded-b-[80px] overflow-hidden">
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
              <Image src={MetziumLogoWhite} alt="Metzium" fill className="object-contain drop-shadow-[0_6px_18px_rgba(0,0,0,0.45)]" />
            </div>
          </div>
          <p className="text-sm md:text-base text-white/90 mb-8 mx-auto drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)] font-thin tracking-wider whitespace-nowrap">
            Professional web development services and innovative solutions for your business
          </p>
          <a
            href="#contact"
            className="inline-block bg-white/20 backdrop-blur-sm hover:bg-white/30 hover:scale-105 text-white font-semibold py-3 px-8 rounded-lg border-2 border-white/60 transition-all duration-200"
          >
            Get in Touch
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Services</h2>
          <div className="space-y-8 max-w-7xl mx-auto px-4">
            {/* First Row: Image | Orange Card | Image */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {/* Image Left */}
              <div className="md:col-span-1 relative h-72 rounded-3xl overflow-hidden">
                <Image
                  src={LogoGlow}
                  alt="Web Services"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Orange Card - Web Design */}
              <div 
                className="md:col-span-1 relative h-72 rounded-3xl overflow-hidden cursor-pointer group"
                onMouseEnter={() => setIsFlipped(true)}
                onMouseLeave={() => setIsFlipped(false)}
                style={{ perspective: '1000px' }}
              >
                {/* Front */}
                <div 
                  className={`w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 p-8 rounded-3xl flex flex-col justify-between min-h-[68] transition-all duration-500 ${isFlipped ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
                >
                  <div>
                    <p className="text-orange-900 text-sm font-semibold uppercase tracking-widest mb-4 pb-4 border-b-2 border-orange-700">Web Design</p>
                    <h3 className="text-4xl font-bold text-white mb-6">Web Design</h3>
                  </div>
                  <p className="text-orange-900 font-light text-base">Beautiful, responsive designs that engage your audience and deliver exceptional user experiences.</p>
                </div>
                
                {/* Back - Logo */}
                <div 
                  className={`absolute inset-0 w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 p-8 rounded-3xl flex items-center justify-center transition-all duration-500 ${isFlipped ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                >
                  <div className="relative w-full h-full" style={{ transform: 'scale(1.546)' }}>
                    <Image
                      src={LogoGlow}
                      alt="Metzium Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
              
              {/* Image Right */}
              <div className="md:col-span-1 relative h-72 rounded-3xl overflow-hidden">
                <Image
                  src={LogoGlow}
                  alt="Services"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Second Row: Purple Card | Image | Green Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {/* Purple Card - Hosting Service */}
              <div 
                className="md:col-span-1 relative h-72 rounded-3xl overflow-hidden cursor-pointer group"
                onMouseEnter={() => setIsFlippedPurple(true)}
                onMouseLeave={() => setIsFlippedPurple(false)}
                style={{ perspective: '1000px' }}
              >
                {/* Front */}
                <div 
                  className={`w-full h-full bg-gradient-to-br from-purple-400 to-pink-500 p-8 rounded-3xl flex flex-col justify-between min-h-[68] transition-all duration-500 ${isFlippedPurple ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
                >
                  <div>
                    <p className="text-purple-900 text-sm font-semibold uppercase tracking-widest mb-4 pb-4 border-b-2 border-purple-700">Support</p>
                    <h3 className="text-4xl font-bold text-white mb-6">Hosting<br />Service</h3>
                  </div>
                  <p className="text-purple-900 font-light text-base">Professional hosting and deployment services for your applications.</p>
                </div>
                
                {/* Back - Logo */}
                <div 
                  className={`absolute inset-0 w-full h-full bg-gradient-to-br from-purple-400 to-pink-500 p-8 rounded-3xl flex items-center justify-center transition-all duration-500 ${isFlippedPurple ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                >
                  <div className="relative w-full h-full" style={{ transform: 'scale(1.546)' }}>
                    <Image
                      src={LogoGlow}
                      alt="Metzium Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="md:col-span-1 relative h-72 rounded-3xl overflow-hidden">
                <Image
                  src={LogoGlow}
                  alt="Custom Apps"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Green Card - Custom Apps */}
              <div 
                className="md:col-span-1 relative h-72 rounded-3xl overflow-hidden cursor-pointer group"
                onMouseEnter={() => setIsFlippedGreen(true)}
                onMouseLeave={() => setIsFlippedGreen(false)}
                style={{ perspective: '1000px' }}
              >
                {/* Front */}
                <div 
                  className={`w-full h-full bg-gradient-to-br from-green-400 to-green-600 p-8 rounded-3xl flex flex-col justify-between min-h-[68] transition-all duration-500 ${isFlippedGreen ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
                >
                  <div>
                    <p className="text-green-900 text-sm font-semibold uppercase tracking-widest mb-4 pb-4 border-b-2 border-green-700">Web Development</p>
                    <h3 className="text-4xl font-bold text-white mb-6">Custom Apps</h3>
                  </div>
                  <p className="text-green-900 font-light text-base">Custom web applications built with modern technologies.</p>
                </div>
                
                {/* Back - Logo */}
                <div 
                  className={`absolute inset-0 w-full h-full bg-gradient-to-br from-green-400 to-green-600 p-8 rounded-3xl flex items-center justify-center transition-all duration-500 ${isFlippedGreen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                >
                  <div className="relative w-full h-full" style={{ transform: 'scale(1.546)' }}>
                    <Image
                      src={LogoGlow}
                      alt="Metzium Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Third Row: Image | Blue Card | Image */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {/* Image Left */}
              <div className="md:col-span-1 relative h-72 rounded-3xl overflow-hidden">
                <Image
                  src={LogoGlow}
                  alt="Services"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Blue Card - Maintenance */}
              <div 
                className="md:col-span-1 relative h-72 rounded-3xl overflow-hidden cursor-pointer group"
                onMouseEnter={() => setIsFlippedBlue(true)}
                onMouseLeave={() => setIsFlippedBlue(false)}
                style={{ perspective: '1000px' }}
              >
                {/* Front */}
                <div 
                  className={`w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 p-8 rounded-3xl flex flex-col justify-between min-h-[68] transition-all duration-500 ${isFlippedBlue ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
                >
                  <div>
                    <p className="text-blue-900 text-sm font-semibold uppercase tracking-widest mb-4 pb-4 border-b-2 border-blue-700">Support</p>
                    <h3 className="text-4xl font-bold text-white mb-6">Maintenance</h3>
                  </div>
                  <p className="text-blue-900 font-light text-base">Ongoing maintenance and technical support to keep your applications running smoothly.</p>
                </div>
                
                {/* Back - Logo */}
                <div 
                  className={`absolute inset-0 w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 p-8 rounded-3xl flex items-center justify-center transition-all duration-500 ${isFlippedBlue ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                >
                  <div className="relative w-full h-full" style={{ transform: 'scale(1.546)' }}>
                    <Image
                      src={LogoGlow}
                      alt="Metzium Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Image Right */}
              <div className="md:col-span-1 relative h-72 rounded-3xl overflow-hidden">
                <Image
                  src={LogoGlow}
                  alt="Hosting & Maintenance"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-44 px-4 sm:px-6 lg:px-8 bg-black dark:bg-black overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/6 w-96 h-96 bg-cyan-400/28 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 left-2/5 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 right-1/6 w-96 h-96 bg-pink-400/28 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto relative">
          <h2 className="text-4xl font-bold text-center mb-12">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-900 dark:bg-gray-900 rounded-lg overflow-hidden hover:shadow-xl transition-all border-2 border-cyan-400 shadow-lg shadow-cyan-400/50 hover:shadow-cyan-400/75">
              <div className="h-24 bg-transparent"></div>
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
            <div className="bg-gray-900 dark:bg-gray-900 rounded-lg overflow-hidden hover:shadow-xl transition-all border-2 border-yellow-300 shadow-lg shadow-yellow-300/50 hover:shadow-yellow-300/75">
              <div className="h-24 bg-transparent"></div>
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
            <div className="bg-gray-900 dark:bg-gray-900 rounded-lg overflow-hidden hover:shadow-xl transition-all border-2 border-pink-400 shadow-lg shadow-pink-400/50 hover:shadow-pink-400/75">
              <div className="h-24 bg-transparent"></div>
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
          <div className="flex items-center justify-center gap-3 mb-12 flex-nowrap">
            <h2 className="text-4xl font-bold text-center leading-none translate-y-[2px]">About</h2>
            <div className="relative h-16 w-56 -translate-y-[1px]">
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
