"use client";

import Image from "next/image";
import HeroImage from "@/images/Hero afbeelding tech laptop.jpg";
import MetziumLogoWhite from "@/images/Metzium Logo png.png";

export default function Hero() {
  return (
    <section id="home" className="relative h-dvh px-4 sm:px-6 lg:px-8 overflow-hidden flex flex-col items-center justify-center bg-black">
      <div className="absolute inset-x-4 top-6 bottom-6 rounded-[20px] overflow-hidden">
        <Image
          src={HeroImage}
          alt="Technology workspace with laptop"
          fill
          priority
          className="object-cover scale-110 scale-y-125"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-slate-900/5 to-black/5" />
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
          Start Now
        </a>
      </div>
    </section>
  );
}
