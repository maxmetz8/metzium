"use client";

import Image from "next/image";
import Orb from "@/components/Orb";
import MetziumLogoWhite from "@/images/Metzium Logo png.png";

export default function Hero() {
  return (
    <section id="home" className="relative h-dvh px-4 sm:px-6 lg:px-8 overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute inset-x-0 top-0 bottom-6 rounded-[20px] overflow-hidden border-2 border-black/40 bg-black/40">
        <Orb
          hoverIntensity={2}
          rotateOnHover
          hue={0}
          forceHoverState={false}
          backgroundColor="#000000"
        />
      </div>
      <div className="relative max-w-7xl mx-auto text-center z-10">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-1 mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-normal text-white tracking-tight drop-shadow-[0_6px_18px_rgba(0,0,0,0.45)]">
            Welcome to
          </h1>
          <div className="relative h-12 w-48 sm:h-16 sm:w-64">
            <Image src={MetziumLogoWhite} alt="Metzium" fill className="object-contain drop-shadow-[0_6px_18px_rgba(0,0,0,0.45)]" />
          </div>
        </div>
        <p className="text-xs sm:text-sm md:text-base text-white/90 mb-8 mx-auto drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)] font-thin tracking-wider px-4">
          Professional web development services and innovative solutions for your business
        </p>
        <a
          href="/contact"
          className="inline-block bg-white/20 backdrop-blur-sm hover:bg-white/30 hover:scale-105 text-white font-semibold py-2 px-6 sm:py-3 sm:px-8 rounded-lg border-2 border-white/60 transition-all duration-200 text-sm sm:text-base"
        >
          Start Now
        </a>
      </div>
    </section>
  );
}
