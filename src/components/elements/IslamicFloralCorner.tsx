"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface FloralCornerProps {
  className?: string;
  size?: number | string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

/**
 * Exquisite Ottoman/Mughal Islamic Floral Corner Ornament
 * Features blooming floral rosettes, scrolling arabesque vines, and palmette leaves.
 */
export default function IslamicFloralCorner({
  className,
  size = 120,
  position = "top-left",
}: FloralCornerProps) {
  const rotationClass = {
    "top-left": "",
    "top-right": "rotate-90",
    "bottom-right": "rotate-180",
    "bottom-left": "-rotate-90",
  }[position];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "text-gold-antique pointer-events-none select-none transition-transform duration-700",
        rotationClass,
        className
      )}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="goldFloralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5EBD5" stopOpacity="0.9" />
          <stop offset="45%" stopColor="#C6A15B" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#A98A50" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* Main sweeping corner vine */}
      <path
        d="M6 114 C6 50, 50 6, 114 6"
        stroke="url(#goldFloralGrad)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Secondary inner contour vine */}
      <path
        d="M14 114 C14 58, 58 14, 114 14"
        stroke="#C6A15B"
        strokeWidth="0.8"
        strokeDasharray="2 2"
        opacity="0.6"
      />

      {/* Corner Rosette Center (Blooming Floral Motif) */}
      <g transform="translate(36, 36)">
        {/* Central flower bud */}
        <circle cx="0" cy="0" r="4.5" fill="#C6A15B" opacity="0.9" />
        <circle cx="0" cy="0" r="2" fill="#F5EBD5" />

        {/* 8 Floral Petals */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <path
            key={i}
            d="M0 0 C-3 -7, 3 -7, 0 0"
            fill="rgba(198,161,91,0.25)"
            stroke="#C6A15B"
            strokeWidth="0.8"
            transform={`rotate(${angle}) translate(0, -5)`}
          />
        ))}
      </g>

      {/* Upper Floral Tendril & Leaf Palmette */}
      <g transform="translate(75, 18)">
        {/* Flower bud */}
        <circle cx="0" cy="0" r="3" fill="#C6A15B" opacity="0.75" />
        <path
          d="M0 0 C-6 -8, 6 -8, 0 0"
          fill="rgba(198,161,91,0.2)"
          stroke="#C6A15B"
          strokeWidth="0.8"
          transform="rotate(35)"
        />
        {/* Curving leaf spiral */}
        <path
          d="M-10 6 C-4 2, 2 8, 8 2"
          stroke="#C6A15B"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.7"
        />
      </g>

      {/* Lower Floral Tendril & Leaf Palmette */}
      <g transform="translate(18, 75)">
        {/* Flower bud */}
        <circle cx="0" cy="0" r="3" fill="#C6A15B" opacity="0.75" />
        <path
          d="M0 0 C-6 -8, 6 -8, 0 0"
          fill="rgba(198,161,91,0.2)"
          stroke="#C6A15B"
          strokeWidth="0.8"
          transform="rotate(-55)"
        />
        {/* Curving leaf spiral */}
        <path
          d="M6 -10 C2 -4, 8 2, 2 8"
          stroke="#C6A15B"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.7"
        />
      </g>

      {/* Outer decorative tip finials */}
      <circle cx="114" cy="6" r="2.5" fill="#C6A15B" opacity="0.8" />
      <circle cx="6" cy="114" r="2.5" fill="#C6A15B" opacity="0.8" />
      <circle cx="114" cy="14" r="1.5" fill="#F5EBD5" opacity="0.6" />
      <circle cx="14" cy="114" r="1.5" fill="#F5EBD5" opacity="0.6" />
    </svg>
  );
}
