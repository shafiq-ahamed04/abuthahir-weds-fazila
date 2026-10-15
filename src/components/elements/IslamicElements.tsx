import React from "react";
import { cn } from "@/lib/utils";

interface ElementProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
}

/**
 * 8-Point Islamic Star (Khatam / Rub el Hizb geometry)
 * Clean, restrained, vector precision.
 */
export function IslamicStar({ className, size = 24, ...props }: ElementProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-gold-antique shrink-0", className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M24 2L29.5 12.5L40 7L38 18.5L48 24L38 29.5L40 41L29.5 35.5L24 46L18.5 35.5L8 41L10 29.5L0 24L10 18.5L8 7L18.5 12.5L24 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="24"
        cy="24"
        r="5"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

/**
 * Classic Islamic Pointed Arch (Ogee / Moorish silhouette frame)
 */
export function IslamicArchFrame({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative rounded-t-[100px] sm:rounded-t-[140px] border border-gold-antique/30 p-6 sm:p-10 backdrop-blur-md bg-emerald-deep/40",
        className
      )}
      style={{
        boxShadow: "0 20px 50px rgba(2, 39, 31, 0.4), inset 0 1px 0 rgba(198, 161, 91, 0.2)",
      }}
    >
      <div className="absolute top-4 left-1/2 -translate-x-1/2">
        <IslamicStar size={18} className="text-gold-antique/70" />
      </div>
      {children}
    </div>
  );
}

/**
 * Restrained Islamic Geometric Divider with central Khatam star
 */
export function GeometricDivider({
  className,
  accentColor = "currentColor",
}: {
  className?: string;
  accentColor?: string;
}) {
  return (
    <div className={cn("flex items-center justify-center gap-3 w-full my-6", className)}>
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold-antique/40 to-gold-antique/60" />
      <div className="flex items-center gap-1.5 text-gold-antique">
        <span className="w-1.5 h-1.5 rotate-45 border border-gold-antique/70 inline-block" />
        <IslamicStar size={20} />
        <span className="w-1.5 h-1.5 rotate-45 border border-gold-antique/70 inline-block" />
      </div>
      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gold-antique/40 to-gold-antique/60" />
    </div>
  );
}

/**
 * Decorative corner ornamentation for invitations, banners, and modal dialogs
 */
export function ArabesqueCorner({
  className,
  position = "top-left",
}: {
  className?: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) {
  const rotationClass = {
    "top-left": "",
    "top-right": "rotate-90",
    "bottom-right": "rotate-180",
    "bottom-left": "-rotate-90",
  }[position];

  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-gold-antique/50 shrink-0", rotationClass, className)}
      aria-hidden="true"
    >
      <path
        d="M2 38V14C2 7.37258 7.37258 2 14 2H38"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M6 38V16C6 10.4772 10.4772 6 16 6H38"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeDasharray="2 2"
      />
      <circle cx="14" cy="14" r="2.5" fill="currentColor" />
    </svg>
  );
}
