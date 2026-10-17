"use client";

import { useEffect, useState, useRef } from "react";
import { IslamicStar } from "@/components/elements/IslamicElements";

interface NavItem {
  id: string;
  label: string;
  icon: (props: { className?: string }) => React.JSX.Element;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: "story",
    label: "Story",
    icon: ({ className }) => (
      <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
  },
  {
    id: "groom",
    label: "Groom",
    icon: ({ className }) => (
      <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    id: "bride",
    label: "Bride",
    icon: ({ className }) => (
      <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 3v18M3 12h18M5.636 5.636l12.728 12.728M18.364 5.636L5.636 18.364" />
      </svg>
    ),
  },
  {
    id: "celebrations",
    label: "Events",
    icon: ({ className }) => (
      <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    id: "dua",
    label: "Blessings",
    icon: ({ className }) => <IslamicStar size={15} className={className} />,
  },
];

export default function MobileBottomDock() {
  const [isVisible, setIsVisible] = useState(true);
  const [activeId, setActiveId] = useState<string>("story");
  const lastScrollYRef = useRef(0);

  // Use IntersectionObserver to track active section with ZERO layout thrashing
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Simple scroll direction detection without querying DOM
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const diff = currentY - lastScrollYRef.current;

          if (diff > 15 && currentY > 200) {
            setIsVisible(false);
          } else if (diff < -10 || currentY <= 150) {
            setIsVisible(true);
          }

          lastScrollYRef.current = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <aside
      className={`fixed left-1/2 -translate-x-1/2 z-40 md:hidden transition-all duration-300 transform-gpu pointer-events-auto ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0 pointer-events-none"
      }`}
      style={{ bottom: "max(16px, env(safe-area-inset-bottom, 16px))" }}
      aria-label="Quick Mobile Navigation Dock"
    >
      <nav className="flex items-center gap-1 sm:gap-2 px-3 py-1.5 rounded-full border border-gold-antique/30 bg-[#02271f]/98 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
        {NAV_ITEMS.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`flex flex-col items-center justify-center px-2.5 py-1 rounded-full transition-all duration-200 ${
                isActive
                  ? "bg-gold-antique/20 text-gold-antique shadow-[0_0_10px_rgba(198,161,91,0.3)]"
                  : "text-ivory-warm/70 hover:text-gold-antique"
              }`}
            >
              <item.icon
                className={`transition-transform duration-200 ${
                  isActive ? "scale-110 text-gold-antique" : "text-ivory-warm/70"
                }`}
              />
              <span className="font-sans text-[9px] uppercase tracking-wider mt-0.5 font-medium">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
