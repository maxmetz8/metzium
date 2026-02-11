"use client";

import { useState, useEffect } from "react";
import CardSwap, { Card } from "./CardSwap";

export default function About() {
  const [cardDimensions, setCardDimensions] = useState({
    width: 420,
    height: 480,
    cardDistance: 44,
    verticalDistance: 32,
  });

  useEffect(() => {
    const updateDimensions = () => {
      if (window.innerWidth < 640) {
        // Mobile
        setCardDimensions({
          width: 260,
          height: 360,
          cardDistance: 26,
          verticalDistance: 18,
        });
      } else if (window.innerWidth < 1024) {
        // Tablet
        setCardDimensions({
          width: 340,
          height: 420,
          cardDistance: 34,
          verticalDistance: 24,
        });
      } else {
        // Desktop
        setCardDimensions({
          width: 420,
          height: 480,
          cardDistance: 44,
          verticalDistance: 32,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const cards = [
    {
      title: "High-Impact Web Design",
      text: "We craft design systems and interfaces that feel premium, communicate clearly, and convert consistently across devices.",
    },
    {
      title: "Custom Apps That Scale",
      text: "From MVP to production, we build resilient apps with clean architecture and performance-first engineering.",
    },
    {
      title: "Reliable Hosting",
      text: "Secure deployments, monitoring, and uptime strategies that keep your product fast and dependable.",
    },
    {
      title: "Maintenance & Support",
      text: "Continuous improvements, updates, and support so your platform stays stable and future-ready.",
    },
  ];

  return (
    <section id="about" className="relative min-h-screen px-4 sm:px-6 lg:px-8 overflow-hidden pt-48 pb-44">

      <div className="relative max-w-7xl mx-auto z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-pulse delay-75"></div>
              <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse delay-150"></div>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-white/40 via-white/20 to-transparent"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-6">About Metzium</h2>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
            At Metzium, we transform ambitious ideas into exceptional digital experiences. With expertise in modern web technologies 
            and a commitment to quality, we deliver scalable solutions that drive real business results. From initial concept to 
            ongoing support, we partner with you at every stage to build products that users love and businesses rely on.
          </p>
          <button className="mt-8 inline-flex items-center gap-3 rounded-full bg-emerald-300/90 px-5 py-2 text-sm font-semibold text-emerald-950 hover:bg-emerald-300 transition">
            See solutions
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-950 text-emerald-200">•</span>
          </button>
        </div>

        {/* Right card swap */}
        <div className="relative flex justify-center lg:justify-end">
          <CardSwap
            width={cardDimensions.width}
            height={cardDimensions.height}
            cardDistance={cardDimensions.cardDistance}
            verticalDistance={cardDimensions.verticalDistance}
            delay={4500}
            pauseOnHover
          >
            {cards.map((card) => (
              <Card key={card.title} className="p-6 sm:p-10 text-white">
                <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.35em] text-white/80">Why Metzium?</div>
                <div className="mt-3 h-px w-full bg-white/20" />
                <h3 className="mt-6 sm:mt-8 text-xl sm:text-2xl font-semibold">{card.title}</h3>
                <p className="mt-4 sm:mt-5 text-xs sm:text-sm leading-relaxed text-white/80">
                  {card.text}
                </p>
              </Card>
            ))}
          </CardSwap>
        </div>
      </div>
    </section>
  );
}
