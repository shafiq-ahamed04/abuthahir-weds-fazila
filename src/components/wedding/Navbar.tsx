"use client";

import { useState, useEffect } from "react";
import { weddingData } from "@/data/wedding";

interface NavbarProps {
  onNavigateHome?: () => void;
}

export default function Navbar({ onNavigateHome }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 50;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#" },
    { label: "Our Story", href: "#our-story" },
    { label: "Events", href: "#celebrations" },
    { label: "Venue", href: "#celebrations" },
    { label: "Verses", href: "#quranic-verses" },
    { label: "Calendar", href: "#calendar" },
    { label: "Dua", href: "#dua" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      onNavigateHome?.();
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#02271F]/98 border-b border-gold-antique/25 shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3"
          : "bg-transparent py-5"
      }`}
      aria-label="Main Navigation"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10 flex items-center justify-between">
        {/* Brand Monogram */}
        <a
          href="#"
          onClick={(e) => handleLinkClick(e, "#")}
          className="font-serif text-xl sm:text-2xl text-gold-antique tracking-widest flex items-center gap-2 group"
        >
          <span className="font-light">A</span>
          <span className="text-gold-antique/50 text-xs">&amp;</span>
          <span className="font-light">F</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-7 lg:gap-9">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="font-sans text-[11px] uppercase tracking-[0.3em] text-ivory-warm/75 hover:text-gold-antique transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right side: Wedding Date badge & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold-antique/30 bg-gold-antique/10 text-gold-antique">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-antique shadow-[0_0_6px_#C6A15B]" />
            <span className="font-sans text-[10px] uppercase tracking-[0.22em] font-medium">21 &amp; 23 Mar 2027</span>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-gold-antique hover:text-ivory-warm transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#02271F]/98 border-b border-gold-antique/30 px-6 py-6 mt-3 space-y-4 shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="block font-sans text-xs uppercase tracking-[0.3em] text-ivory-warm hover:text-gold-antique py-1 border-b border-gold-antique/10"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
