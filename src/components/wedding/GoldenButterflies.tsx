"use client";

import { useEffect, useState } from "react";

interface Butterfly {
  id: number;
  startX: number;
  startY: number;
  scale: number;
  duration: number;
  delay: number;
  driftX: number;
}

const DEFAULT_BUTTERFLIES: Butterfly[] = [
  { id: 1, startX: 18, startY: 28, scale: 0.85, duration: 14, delay: 0, driftX: 35 },
  { id: 2, startX: 78, startY: 22, scale: 0.75, duration: 16, delay: 1.5, driftX: -25 },
  { id: 3, startX: 14, startY: 62, scale: 0.9, duration: 15, delay: 3, driftX: 30 },
  { id: 4, startX: 84, startY: 54, scale: 0.8, duration: 17, delay: 2, driftX: -35 },
];

export default function GoldenButterflies() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) setReducedMotion(true);
  }, []);

  if (reducedMotion) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden z-10"
      aria-hidden="true"
    >
      {DEFAULT_BUTTERFLIES.map((b) => (
        <div
          key={b.id}
          className="absolute"
          style={{
            left: `${b.startX}%`,
            top: `${b.startY}%`,
            animation: `butterflyFly ${b.duration}s ease-in-out infinite alternate`,
            animationDelay: `${b.delay}s`,
            transform: `scale(${b.scale})`,
          }}
        >
          <div
            className="relative"
            style={{
              animation: `butterflyFlutter 0.7s ease-in-out infinite alternate`,
            }}
          >
            <svg
              width="36"
              height="32"
              viewBox="0 0 36 32"
              fill="none"
              className="drop-shadow-[0_0_12px_rgba(198,161,91,0.5)]"
            >
              <defs>
                <linearGradient id={`goldWing-${b.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F5EBD5" stopOpacity="0.95" />
                  <stop offset="45%" stopColor="#C6A15B" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#A98A50" stopOpacity="0.65" />
                </linearGradient>
              </defs>
              {/* Left Wing */}
              <path
                d="M18 16 C12 6, 2 8, 2 16 C2 24, 12 22, 18 18 Z"
                fill={`url(#goldWing-${b.id})`}
                stroke="#C6A15B"
                strokeWidth="0.6"
                opacity="0.85"
                style={{
                  transformOrigin: "18px 16px",
                  animation: "wingFlapLeft 0.5s ease-in-out infinite alternate",
                }}
              />
              {/* Right Wing */}
              <path
                d="M18 16 C24 6, 34 8, 34 16 C34 24, 24 22, 18 18 Z"
                fill={`url(#goldWing-${b.id})`}
                stroke="#C6A15B"
                strokeWidth="0.6"
                opacity="0.85"
                style={{
                  transformOrigin: "18px 16px",
                  animation: "wingFlapRight 0.5s ease-in-out infinite alternate",
                }}
              />
              {/* Body */}
              <line
                x1="18"
                y1="10"
                x2="18"
                y2="22"
                stroke="#F5EBD5"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              {/* Antennae */}
              <path
                d="M18 10 Q16 7 14 6 M18 10 Q20 7 22 6"
                stroke="#C6A15B"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      ))}

      <style jsx>{`
        @keyframes butterflyFly {
          0% {
            transform: translate(0px, 0px) rotate(0deg);
          }
          33% {
            transform: translate(25px, -30px) rotate(6deg);
          }
          66% {
            transform: translate(-20px, -55px) rotate(-5deg);
          }
          100% {
            transform: translate(30px, -80px) rotate(8deg);
          }
        }
        @keyframes wingFlapLeft {
          0% {
            transform: scaleX(1) rotate(0deg);
          }
          100% {
            transform: scaleX(0.4) rotate(15deg);
          }
        }
        @keyframes wingFlapRight {
          0% {
            transform: scaleX(1) rotate(0deg);
          }
          100% {
            transform: scaleX(0.4) rotate(-15deg);
          }
        }
      `}</style>
    </div>
  );
}
