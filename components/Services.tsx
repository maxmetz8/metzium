"use client";

import Image from "next/image";
import BlueWave2 from "@/images/blue wave 2.jpg";
import LogoGlow from "@/images/Metzium logo glow.png";
import { useState } from "react";

export default function Services() {
  const [isFlippedCenter, setIsFlippedCenter] = useState(false);

  return (
    <section id="services" className="relative h-dvh px-4 sm:px-6 lg:px-8 overflow-hidden flex flex-col items-center justify-center bg-black">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={BlueWave2}
          alt="Services background"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative max-w-7xl mx-auto z-10">
        <div className="border-t-2 border-white/40 mb-8"></div>
        <h2 className="text-4xl font-bold text-left mb-12">Services</h2>
        <div className="space-y-8 max-w-7xl mx-auto px-4">
          {/* First Row: Orange Card (Centered) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Orange Card - Web Design */}
            <div 
              className="md:col-span-1 md:col-start-2 relative h-48 md:h-56 rounded-3xl overflow-hidden cursor-pointer group"
              style={{ perspective: '1000px' }}
            >
              {/* Front */}
              <div 
                className="w-full h-full bg-gray-900 dark:bg-gray-900 border-2 border-orange-400 shadow-lg shadow-orange-400/50 hover:shadow-orange-400/75 p-8 rounded-3xl flex flex-col justify-between min-h-[68] transition-all duration-500"
              >
                <div>
                  <p className="text-gray-300 text-xs font-semibold uppercase tracking-widest mb-3 pb-3 border-b-2 border-gray-700">Web Design</p>
                  <h3 className="text-2xl font-bold text-white mb-4">Web Design</h3>
                </div>
                <p className="text-gray-400 font-light text-sm">Beautiful, responsive designs that engage your audience and deliver exceptional user experiences.</p>
              </div>
            </div>
          </div>

          {/* Second Row: Purple Card | Image | Green Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Purple Card - Hosting Service */}
            <div 
              className="md:col-span-1 relative h-48 md:h-56 rounded-3xl overflow-hidden cursor-pointer group"
              style={{ perspective: '1000px' }}
            >
              {/* Front */}
              <div 
                className="w-full h-full bg-gray-900 dark:bg-gray-900 border-2 border-purple-400 shadow-lg shadow-purple-400/50 hover:shadow-purple-400/75 p-8 rounded-3xl flex flex-col justify-between min-h-[68] transition-all duration-500"
              >
                <div>
                  <p className="text-gray-300 text-xs font-semibold uppercase tracking-widest mb-3 pb-3 border-b-2 border-gray-700">Support</p>
                  <h3 className="text-2xl font-bold text-white mb-4">Hosting<br />Service</h3>
                </div>
                <p className="text-gray-400 font-light text-sm">Professional hosting and deployment services for your applications.</p>
              </div>
            </div>

            {/* Image (Flippable) */}
            <div
              className="md:col-span-1 relative h-48 md:h-56 rounded-3xl overflow-hidden cursor-pointer group"
              onMouseEnter={() => setIsFlippedCenter(true)}
              onMouseLeave={() => setIsFlippedCenter(false)}
              style={{ perspective: "1000px" }}
            >
              {/* Front */}
              <div
                className={`w-full h-full rounded-3xl transition-all duration-500 ${isFlippedCenter ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
              >
                <Image
                  src="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Custom Apps"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Back - Logo */}
              <div
                className={`absolute inset-0 w-full h-full bg-[#16151a] p-8 rounded-3xl flex items-center justify-center transition-all duration-500 ${isFlippedCenter ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
              >
                <div className="relative w-full h-full" style={{ transform: "scale(1.4)" }}>
                  <Image
                    src={LogoGlow}
                    alt="Metzium Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Green Card - Custom Apps */}
            <div 
              className="md:col-span-1 relative h-48 md:h-56 rounded-3xl overflow-hidden cursor-pointer group"
              style={{ perspective: '1000px' }}
            >
              {/* Front */}
              <div 
                className="w-full h-full bg-gray-900 dark:bg-gray-900 border-2 border-green-400 shadow-lg shadow-green-400/50 hover:shadow-green-400/75 p-8 rounded-3xl flex flex-col justify-between min-h-[68] transition-all duration-500"
              >
                <div>
                  <p className="text-gray-300 text-xs font-semibold uppercase tracking-widest mb-3 pb-3 border-b-2 border-gray-700">Web Development</p>
                  <h3 className="text-2xl font-bold text-white mb-4">Custom Apps</h3>
                </div>
                <p className="text-gray-400 font-light text-sm">Custom web applications built with modern technologies.</p>
              </div>
            </div>
          </div>

          {/* Third Row: Blue Card (Centered) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Blue Card - Maintenance */}
            <div 
              className="md:col-span-1 md:col-start-2 relative h-48 md:h-56 rounded-3xl overflow-hidden cursor-pointer group"
              style={{ perspective: '1000px' }}
            >
              {/* Front */}
              <div 
                className="w-full h-full bg-gray-900 dark:bg-gray-900 border-2 border-blue-400 shadow-lg shadow-blue-400/50 hover:shadow-blue-400/75 p-8 rounded-3xl flex flex-col justify-between min-h-[68] transition-all duration-500"
              >
                <div>
                  <p className="text-gray-300 text-xs font-semibold uppercase tracking-widest mb-3 pb-3 border-b-2 border-gray-700">Support</p>
                  <h3 className="text-2xl font-bold text-white mb-4">Maintenance</h3>
                </div>
                <p className="text-gray-400 font-light text-sm">Ongoing maintenance and technical support to keep your applications running smoothly.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
