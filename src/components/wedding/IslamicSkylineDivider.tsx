"use client";

import { memo } from "react";

interface IslamicSkylineDividerProps {
  className?: string;
  variant?: "dome" | "arch" | "star";
}

function IslamicSkylineDividerComponent({
  className = "",
  variant = "dome",
}: IslamicSkylineDividerProps) {
  return (
    <div
      className={`relative w-full flex items-center justify-center py-6 sm:py-8 overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Left Hairline Gradient */}
      <div
        className="flex-1 h-[1px] max-w-xs sm:max-w-md lg:max-w-lg"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(198,161,91,0.1) 30%, rgba(198,161,91,0.7) 100%)",
        }}
      />

      {/* Center Islamic Architectural Emblem */}
      <div className="relative mx-3 sm:mx-6 flex items-center justify-center">
        {/* Soft Radial Ambient Glow */}
        <div
          className="absolute -inset-4 rounded-full opacity-40 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(198,161,91,0.5) 0%, transparent 70%)",
          }}
        />

        {variant === "dome" && (
          <svg
            className="w-14 sm:w-20 h-8 sm:h-10 text-gold-antique drop-shadow-[0_0_8px_rgba(198,161,91,0.5)]"
            viewBox="0 0 100 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Mosque Dome Center Silhouette */}
            <path
              d="M50 4 C50 4 44 14 36 21 C28 28 26 34 26 40 L74 40 C74 34 72 28 64 21 C56 14 50 4 50 4 Z"
              fill="rgba(198,161,91,0.12)"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            {/* Crescent & Finial at top */}
            <circle cx="50" cy="4" r="1.5" fill="currentColor" />
            <path
              d="M48.5 2.5 C49.5 1.5 51.5 1.5 52.5 2.5 C51.2 3.2 50.8 4 50.8 5 C49.8 4.2 49 3.2 48.5 2.5 Z"
              fill="currentColor"
            />

            {/* Inner Multifoil Arch Accent */}
            <path
              d="M42 40 C42 32 46 27 50 24 C54 27 58 32 58 40"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeDasharray="1.5 1.5"
            />

            {/* Left Minaret Silhouette */}
            <path
              d="M20 18 L20 40 M18 40 L22 40 M20 14 L20 18 M19 14 L21 14"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <circle cx="20" cy="12" r="1" fill="currentColor" />

            {/* Right Minaret Silhouette */}
            <path
              d="M80 18 L80 40 M78 40 L82 40 M80 14 L80 18 M79 14 L81 14"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <circle cx="80" cy="12" r="1" fill="currentColor" />

            {/* Base platform line */}
            <line x1="12" y1="41" x2="88" y2="41" stroke="currentColor" strokeWidth="1" />
          </svg>
        )}

        {variant === "arch" && (
          <svg
            className="w-12 sm:w-16 h-7 sm:h-9 text-gold-antique drop-shadow-[0_0_8px_rgba(198,161,91,0.5)]"
            viewBox="0 0 80 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M40 5 C34 14 24 22 24 38 L56 38 C56 22 46 14 40 5 Z"
              fill="rgba(198,161,91,0.12)"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <circle cx="40" cy="5" r="1.5" fill="currentColor" />
            <path
              d="M32 38 C32 29 36 22 40 18 C44 22 48 29 48 38"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeDasharray="2 2"
            />
            <line x1="16" y1="39" x2="64" y2="39" stroke="currentColor" strokeWidth="1" />
          </svg>
        )}
      </div>

      {/* Right Hairline Gradient */}
      <div
        className="flex-1 h-[1px] max-w-xs sm:max-w-md lg:max-w-lg"
        style={{
          background:
            "linear-gradient(90deg, rgba(198,161,91,0.7) 0%, rgba(198,161,91,0.1) 70%, transparent 100%)",
        }}
      />
    </div>
  );
}

export default memo(IslamicSkylineDividerComponent);
