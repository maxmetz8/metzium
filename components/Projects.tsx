"use client";

import MagicBento from "./MagicBento";

export default function Projects() {
  return (
    <section id="featured-projects" className="relative py-44 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <div className="border-t border-white/20 mb-8"></div>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between mb-10">
          <div>
            <h2 className="text-4xl font-semibold text-white">Featured Projects</h2>
            <p className="mt-3 text-gray-400 max-w-xl">
              Signature builds that blend bold design with resilient engineering.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white/90 hover:text-white hover:border-white/60 transition"
          >
            Start a project
          </a>
        </div>

        <div className="relative rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_30px_90px_rgba(0,0,0,0.45)] overflow-hidden">
          <div className="p-6 md:p-8">
            <MagicBento
              textAutoHide={true}
              enableStars={false}
              enableSpotlight
              enableBorderGlow={true}
              enableTilt={false}
              enableMagnetism={false}
              clickEffect
              spotlightRadius={290}
              particleCount={12}
              glowColor="132, 0, 255"
              disableAnimations={false}
            />
          </div>
          <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-white/10" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/10 via-slate-900/10 to-black/20" />
        </div>
      </div>
    </section>
  );
}
