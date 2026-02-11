"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import MetziumLogo from "@/images/metzium logo png colour 2.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const pathname = usePathname();

  const navLinks = [
    { href: "/#home", label: "Home", id: "home" },
    { href: "/#services", label: "Services", id: "services" },
    { href: "/#featured-projects", label: "Projects", id: "featured-projects" },
    { href: "/#about", label: "About", id: "about" },
  ];

  // Intersection Observer for scroll tracking
  useEffect(() => {
    if (pathname !== "/") {
      setActiveLink("");
      return;
    }
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const matchingLink = navLinks.find((link) => link.id === sectionId);
          if (matchingLink) {
            setActiveLink(matchingLink.id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    navLinks.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [navLinks, pathname]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
    setIsOpen(false);
  };

  return (
    <>
      {/* Logo - Far Left */}
      <div className="fixed top-6 left-6 md:top-12 md:left-12 z-50 flex items-center">
        <Link href="/" className="flex items-center">
          <div className="relative h-6 w-24 md:h-8 md:w-32">
            <Image 
              src={MetziumLogo} 
              alt="Metzium" 
              fill 
              className="object-contain"
            />
          </div>
        </Link>
      </div>

      {/* Contact Button + Hamburger - Far Right */}
      <div className="fixed top-6 right-6 md:top-12 md:right-12 z-50 flex items-center gap-2 md:gap-3">
        <Link 
          href="/contact"
          className="hidden md:flex items-center gap-1.5 px-5 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all duration-300 text-sm font-medium shadow-lg border-2 border-white/60"
        >
          <span>Contact Us</span>
          <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"></div>
        </Link>

        <button
          onClick={toggleMenu}
          className="md:hidden p-2 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 rounded-full transition-all duration-300 shadow-lg border-2 border-white/60"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden fixed top-20 right-6 z-50 bg-white/20 backdrop-blur-sm rounded-2xl shadow-lg p-3 min-w-[200px] border-2 border-white/60">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              onClick={() => handleLinkClick(link.id)}
              className="block px-3 py-2 text-sm text-white hover:bg-white/10 rounded-lg transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 mt-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all duration-300 text-center text-sm font-medium border border-white/40"
          >
            Contact Us
          </Link>
        </div>
      )}

      <nav className="fixed top-6 md:top-12 left-1/2 -translate-x-1/2 z-50 w-fit">
        {/* Desktop Navigation - Floating Rounded Container */}
        <div className="hidden md:flex items-center bg-white/20 backdrop-blur-sm rounded-full shadow-lg px-2 py-1 gap-0 border-2 border-white/60">
          {/* Navigation Links with Sliding Background */}
          <div className="flex items-center relative w-full">
            {navLinks.map((link, index) => (
              <Link
                key={link.id}
                href={link.href}
                onClick={() => handleLinkClick(link.id)}
                className="relative px-6 py-2 text-sm font-medium text-white transition-colors duration-300 z-10 flex-1 text-center whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
            
            {/* Sliding Background */}
            {activeLink && (
              <div
                className="absolute h-8 bg-white/20 rounded-full shadow-sm transition-all duration-300 ease-out -z-0"
                style={{
                  left: `${navLinks.findIndex(l => l.id === activeLink) * (100 / navLinks.length)}%`,
                  width: `${100 / navLinks.length}%`,
                }}
              />
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
