"use client";

import { forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

interface AFMonogramProps {
  className?: string;
  size?: number | string;
  animated?: boolean;
}

const AFMonogram = forwardRef<SVGSVGElement, AFMonogramProps>(
  ({ className, size, animated = false }, ref) => {
    const rawId = useId();
    const id = rawId.replace(/[:]/g, "");

    const goldGradId = `goldGrad_${id}`;
    const letterGoldId = `letterGold_${id}`;
    const goldGlowId = `goldGlow_${id}`;

    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("select-none", className)}
        aria-label="AF Monogram — Abuthahir and Fazila"
        role="img"
      >
        <defs>
          {/* Metallic gold gradient */}
          <linearGradient id={goldGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E8C97A" />
            <stop offset="30%" stopColor="#C6A15B" />
            <stop offset="60%" stopColor="#F0D890" />
            <stop offset="100%" stopColor="#A98A50" />
          </linearGradient>

          {/* Soft glow filter */}
          <filter id={goldGlowId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Metallic shimmer gradient for letter fills */}
          <linearGradient id={letterGoldId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F5E0A0" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#C6A15B" />
            <stop offset="70%" stopColor="#E8C97A" />
            <stop offset="100%" stopColor="#A98A50" />
          </linearGradient>
        </defs>

        {/* ── Outer Decorative Ring ── */}
        <circle
          cx="100"
          cy="100"
          r="90"
          stroke={`url(#${goldGradId})`}
          strokeWidth="0.6"
          strokeOpacity="0.5"
          fill="none"
        />
        <circle
          cx="100"
          cy="100"
          r="85"
          stroke={`url(#${goldGradId})`}
          strokeWidth="1.2"
          strokeOpacity="0.8"
          fill="none"
        />
        <circle
          cx="100"
          cy="100"
          r="80"
          stroke={`url(#${goldGradId})`}
          strokeWidth="0.4"
          strokeOpacity="0.4"
          fill="none"
        />

        {/* ── 8-Point Islamic Star at top ── */}
        <g transform="translate(100, 12)" filter={`url(#${goldGlowId})`}>
          <path
            d="M0 -7 L1.8 -1.8 L7 0 L1.8 1.8 L0 7 L-1.8 1.8 L-7 0 L-1.8 -1.8 Z"
            fill={`url(#${goldGradId})`}
            opacity="0.9"
          />
        </g>
        {/* ── 8-Point Islamic Star at bottom ── */}
        <g transform="translate(100, 188)" filter={`url(#${goldGlowId})`}>
          <path
            d="M0 -7 L1.8 -1.8 L7 0 L1.8 1.8 L0 7 L-1.8 1.8 L-7 0 L-1.8 -1.8 Z"
            fill={`url(#${goldGradId})`}
            opacity="0.9"
          />
        </g>
        {/* ── Stars at sides ── */}
        <g transform="translate(12, 100)" filter={`url(#${goldGlowId})`}>
          <path
            d="M0 -6 L1.5 -1.5 L6 0 L1.5 1.5 L0 6 L-1.5 1.5 L-6 0 L-1.5 -1.5 Z"
            fill={`url(#${goldGradId})`}
            opacity="0.7"
          />
        </g>
        <g transform="translate(188, 100)" filter={`url(#${goldGlowId})`}>
          <path
            d="M0 -6 L1.5 -1.5 L6 0 L1.5 1.5 L0 6 L-1.5 1.5 L-6 0 L-1.5 -1.5 Z"
            fill={`url(#${goldGradId})`}
            opacity="0.7"
          />
        </g>

        {/* ── Decorative corner flourishes ── */}
        {/* Top-left */}
        <path
          d="M25 25 Q18 18 12 25 M25 25 Q25 18 18 12"
          stroke={`url(#${goldGradId})`}
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.6"
        />
        {/* Top-right */}
        <path
          d="M175 25 Q182 18 188 25 M175 25 Q175 18 182 12"
          stroke={`url(#${goldGradId})`}
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.6"
        />
        {/* Bottom-left */}
        <path
          d="M25 175 Q18 182 12 175 M25 175 Q25 182 18 188"
          stroke={`url(#${goldGradId})`}
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.6"
        />
        {/* Bottom-right */}
        <path
          d="M175 175 Q182 182 188 175 M175 175 Q175 182 182 188"
          stroke={`url(#${goldGradId})`}
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* ── The A Letterform ── */}
        <g filter={`url(#${goldGlowId})`}>
          {/* A left stem */}
          <path
            d="M78 45 L54 148"
            stroke={`url(#${letterGoldId})`}
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* A right stem — merges gracefully */}
          <path
            d="M78 45 L102 148"
            stroke={`url(#${letterGoldId})`}
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* A crossbar */}
          <path
            d="M62 108 L94 108"
            stroke={`url(#${letterGoldId})`}
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* A apex serif ornament */}
          <path
            d="M73 45 L83 45"
            stroke={`url(#${letterGoldId})`}
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.8"
          />
          {/* A foot serifs */}
          <path
            d="M48 148 L62 148"
            stroke={`url(#${letterGoldId})`}
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.8"
          />
          <path
            d="M96 148 L110 148"
            stroke={`url(#${letterGoldId})`}
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.8"
          />
        </g>

        {/* ── The F Letterform ── */}
        <g filter={`url(#${goldGlowId})`}>
          {/* F vertical stem */}
          <path
            d="M118 45 L118 148"
            stroke={`url(#${letterGoldId})`}
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* F top horizontal */}
          <path
            d="M118 45 L154 45"
            stroke={`url(#${letterGoldId})`}
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* F mid horizontal */}
          <path
            d="M118 96 L148 96"
            stroke={`url(#${letterGoldId})`}
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* F foot serif */}
          <path
            d="M112 148 L126 148"
            stroke={`url(#${letterGoldId})`}
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.8"
          />
          {/* F top serif at right end */}
          <path
            d="M154 40 L154 50"
            stroke={`url(#${letterGoldId})`}
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.7"
          />
          {/* F mid serif at right end */}
          <path
            d="M148 91 L148 101"
            stroke={`url(#${letterGoldId})`}
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.7"
          />
        </g>

        {/* ── Elegant connector flourish between A and F ── */}
        <path
          d="M102 135 Q110 142 118 135"
          stroke={`url(#${goldGradId})`}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />

        {/* ── Central horizontal ornamental rule ── */}
        <path
          d="M40 165 Q100 162 160 165"
          stroke={`url(#${goldGradId})`}
          strokeWidth="0.8"
          fill="none"
          opacity="0.5"
        />

        {/* ── Subtle inner ring glow ── */}
        <circle
          cx="100"
          cy="100"
          r="78"
          stroke={`url(#${goldGradId})`}
          strokeWidth="0.3"
          strokeOpacity="0.25"
          fill="rgba(198,161,91,0.02)"
        />
      </svg>
    );
  }
);

AFMonogram.displayName = "AFMonogram";

export default AFMonogram;
