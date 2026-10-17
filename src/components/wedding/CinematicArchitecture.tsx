"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface CinematicArchitectureProps {
  className?: string;
}

const CinematicArchitecture = forwardRef<HTMLDivElement, CinematicArchitectureProps>(
  ({ className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
        aria-hidden="true"
      >
        {/* ── Atmospheric radial lighting from center ── */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(198,161,91,0.07) 0%, rgba(7,59,45,0.3) 40%, rgba(2,39,31,0) 70%)",
          }}
        />

        {/* ── Lantern glow top-center ── */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px]"
          style={{
            background:
              "radial-gradient(ellipse 50% 80% at 50% 0%, rgba(198,161,91,0.12) 0%, transparent 70%)",
          }}
        />

        {/* ── Main Islamic Architectural Scene SVG ── */}
        <svg
          className="absolute bottom-0 left-0 w-full h-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMax meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="archGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#073B2D" stopOpacity="0" />
              <stop offset="60%" stopColor="#073B2D" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#02271F" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="wallGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#073B2D" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#02271F" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="minaretGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#073B2D" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#02271F" stopOpacity="0.98" />
            </linearGradient>
            <linearGradient id="goldLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C6A15B" stopOpacity="0" />
              <stop offset="30%" stopColor="#C6A15B" stopOpacity="0.6" />
              <stop offset="70%" stopColor="#C6A15B" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#C6A15B" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* ── Far background: distant minaret skyline (layer 1 — most distant) ── */}
          {/* Left distant minarets */}
          <g opacity="0.22">
            {/* Far left slender minaret */}
            <rect x="80" y="300" width="18" height="580" fill="#073B2D" />
            <path d="M71 300 Q89 260 107 300 Z" fill="#073B2D" />
            <rect x="79" y="290" width="20" height="12" fill="#073B2D" />
            <circle cx="89" cy="287" r="7" fill="#073B2D" />
            {/* Balcony */}
            <rect x="73" y="380" width="32" height="6" fill="#073B2D" />

            {/* Second left minaret */}
            <rect x="140" y="340" width="14" height="540" fill="#073B2D" />
            <path d="M133 340 Q147 308 161 340 Z" fill="#073B2D" />
            <circle cx="147" cy="305" r="5" fill="#073B2D" />

            {/* Far right minarets */}
            <rect x="1342" y="300" width="18" height="580" fill="#073B2D" />
            <path d="M1333 300 Q1351 260 1369 300 Z" fill="#073B2D" />
            <rect x="1341" y="290" width="20" height="12" fill="#073B2D" />
            <circle cx="1351" cy="287" r="7" fill="#073B2D" />
            <rect x="1335" y="380" width="32" height="6" fill="#073B2D" />

            <rect x="1286" y="340" width="14" height="540" fill="#073B2D" />
            <path d="M1279 340 Q1293 308 1307 340 Z" fill="#073B2D" />
            <circle cx="1293" cy="305" r="5" fill="#073B2D" />
          </g>

          {/* ── Mid-ground: grand mosque silhouette with central dome ── */}
          <g opacity="0.5" fill="#052E23">
            {/* Central large dome */}
            <path d="M570 420 Q720 260 870 420 Z" />
            <rect x="570" y="420" width="300" height="480" />
            {/* Dome finial */}
            <rect x="714" y="245" width="12" height="40" fill="#052E23" />
            <path d="M712 245 Q720 228 728 245 Z" fill="#052E23" />
            <circle cx="720" cy="226" r="5" fill="#052E23" />

            {/* Left wing smaller dome */}
            <path d="M400 500 Q490 400 580 500 Z" />
            <rect x="400" y="500" width="180" height="400" />
            <rect x="484" y="388" width="10" height="30" fill="#052E23" />
            <path d="M482 388 Q489 372 496 388 Z" fill="#052E23" />

            {/* Right wing smaller dome */}
            <path d="M860 500 Q950 400 1040 500 Z" />
            <rect x="860" y="500" width="180" height="400" />
            <rect x="944" y="388" width="10" height="30" fill="#052E23" />
            <path d="M942 388 Q949 372 956 388 Z" fill="#052E23" />

            {/* Connection walls */}
            <rect x="230" y="540" width="170" height="360" />
            <rect x="1040" y="540" width="170" height="360" />
          </g>

          {/* ── Foreground architectural arches row ── */}
          <g opacity="0.75" fill="#042620">
            {/* Left outer arch */}
            <path d="M0 900 L0 680 Q60 580 120 680 L120 900 Z" />
            {/* Second arch from left */}
            <path d="M100 900 L100 660 Q175 545 250 660 L250 900 Z" />
            {/* Inner left arch */}
            <path d="M220 900 L220 620 Q310 490 400 620 L400 900 Z" />
            {/* Inner right arch */}
            <path d="M1040 900 L1040 620 Q1130 490 1220 620 L1220 900 Z" />
            {/* Second from right */}
            <path d="M1190 900 L1190 660 Q1265 545 1340 660 L1340 900 Z" />
            {/* Right outer arch */}
            <path d="M1320 900 L1320 680 Q1380 580 1440 680 L1440 900 Z" />

            {/* Bottom ground fill */}
            <rect x="0" y="820" width="1440" height="80" fill="#02271F" />
          </g>

          {/* ── GOLD ornamental horizontal border line ── */}
          <line
            x1="0"
            y1="819"
            x2="1440"
            y2="819"
            stroke="url(#goldLineGrad)"
            strokeWidth="1"
            opacity="0.7"
          />

          {/* ── Gold geometric ornamental arch frame (subtle architectural backdrop) ── */}
          <g opacity="0.22">
            {/* Outer pointed arch frame */}
            <path
              d="M440 880 L440 330 Q720 60 1000 330 L1000 880"
              stroke="#C6A15B"
              strokeWidth="0.8"
              fill="none"
              strokeLinecap="round"
            />
            {/* Inner pointed arch frame */}
            <path
              d="M460 880 L460 340 Q720 85 980 340 L980 880"
              stroke="#C6A15B"
              strokeWidth="0.5"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="4 6"
              opacity="0.5"
            />
          </g>

          {/* ── Hanging ornamental lanterns ── */}
          <g>
            {/* Left lantern */}
            <line x1="380" y1="0" x2="380" y2="90" stroke="#C6A15B" strokeWidth="1" opacity="0.4" />
            <path d="M366 90 Q380 80 394 90 L398 140 Q380 155 362 140 Z" fill="none" stroke="#C6A15B" strokeWidth="0.8" opacity="0.5" />
            <ellipse cx="380" cy="120" rx="8" ry="5" fill="#C6A15B" opacity="0.15" />

            {/* Right lantern */}
            <line x1="1060" y1="0" x2="1060" y2="90" stroke="#C6A15B" strokeWidth="1" opacity="0.4" />
            <path d="M1046 90 Q1060 80 1074 90 L1078 140 Q1060 155 1042 140 Z" fill="none" stroke="#C6A15B" strokeWidth="0.8" opacity="0.5" />
            <ellipse cx="1060" cy="120" rx="8" ry="5" fill="#C6A15B" opacity="0.15" />
          </g>

          {/* ── Islamic geometric corner ornaments (top corners) ── */}
          {/* Top left corner */}
          <g opacity="0.35" transform="translate(30, 30)">
            <path d="M0 0 L80 0 L80 6 L6 6 L6 80 L0 80 Z" stroke="#C6A15B" strokeWidth="0.8" fill="none" />
            <path d="M12 12 L60 12 L60 18 L18 18 L18 60 L12 60 Z" stroke="#C6A15B" strokeWidth="0.5" fill="none" />
            <circle cx="6" cy="6" r="3" fill="#C6A15B" opacity="0.6" />
          </g>
          {/* Top right corner */}
          <g opacity="0.35" transform="translate(1410, 30) scale(-1, 1)">
            <path d="M0 0 L80 0 L80 6 L6 6 L6 80 L0 80 Z" stroke="#C6A15B" strokeWidth="0.8" fill="none" />
            <path d="M12 12 L60 12 L60 18 L18 18 L18 60 L12 60 Z" stroke="#C6A15B" strokeWidth="0.5" fill="none" />
            <circle cx="6" cy="6" r="3" fill="#C6A15B" opacity="0.6" />
          </g>

          {/* ── Subtle atmospheric fade from top ── */}
          <rect x="0" y="0" width="1440" height="900" fill="url(#archGrad)" opacity="0.3" />
        </svg>

        {/* ── Floating ambient particles (CSS animated, very subtle) ── */}
        <div className="absolute inset-0">
          {[
            { x: "15%", y: "70%", size: 2, delay: "0s", dur: "8s" },
            { x: "28%", y: "45%", size: 1.5, delay: "1.5s", dur: "10s" },
            { x: "72%", y: "65%", size: 2, delay: "0.8s", dur: "9s" },
            { x: "85%", y: "40%", size: 1.5, delay: "2s", dur: "11s" },
            { x: "50%", y: "25%", size: 1, delay: "0.5s", dur: "12s" },
            { x: "38%", y: "80%", size: 1.5, delay: "3s", dur: "7s" },
            { x: "62%", y: "30%", size: 1, delay: "1s", dur: "9s" },
          ].map((p, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gold-antique opacity-0"
              style={{
                left: p.x,
                top: p.y,
                width: `${p.size}px`,
                height: `${p.size}px`,
                animation: `particleFloat ${p.dur} ease-in-out ${p.delay} infinite`,
              }}
            />
          ))}
        </div>

        {/* ── Subtle vignette ── */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(2,39,31,0.6) 100%)",
          }}
        />
      </div>
    );
  }
);

CinematicArchitecture.displayName = "CinematicArchitecture";

export default CinematicArchitecture;
