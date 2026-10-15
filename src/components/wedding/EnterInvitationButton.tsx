"use client";

import { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";

interface EnterInvitationButtonProps {
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

const EnterInvitationButton = forwardRef<HTMLButtonElement, EnterInvitationButtonProps>(
  ({ onClick, className, disabled }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    return (
      <button
        ref={ref}
        onClick={onClick}
        disabled={disabled}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onTouchStart={() => setIsPressed(true)}
        onTouchEnd={() => setIsPressed(false)}
        aria-label="Enter the wedding invitation"
        className={cn(
          "group relative inline-flex items-center justify-center",
          "px-8 sm:px-12 py-3 sm:py-3.5",
          "min-w-[190px] sm:min-w-[220px]",
          "text-gold-antique font-serif text-xs sm:text-sm",
          "tracking-[0.3em] sm:tracking-[0.38em] uppercase",
          "border border-gold-antique/60",
          "rounded-none",
          "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-antique focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-deep",
          "disabled:opacity-40 disabled:cursor-not-allowed",
          "cursor-pointer select-none",
          isPressed && "scale-[0.97]",
          className
        )}
        style={{
          boxShadow: isHovered
            ? "0 0 30px rgba(198,161,91,0.2), inset 0 0 20px rgba(198,161,91,0.05)"
            : "0 0 0 rgba(198,161,91,0)",
          transition: "box-shadow 0.7s ease, transform 0.2s ease, background-color 0.5s ease",
          backgroundColor: isHovered ? "rgba(198,161,91,0.06)" : "transparent",
        }}
      >
        {/* Animated corner brackets */}
        {/* Top left */}
        <span
          className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold-antique transition-all duration-500"
          style={{
            transform: isHovered ? "translate(-3px, -3px)" : "translate(0,0)",
            opacity: isHovered ? 1 : 0.5,
          }}
        />
        {/* Top right */}
        <span
          className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gold-antique transition-all duration-500"
          style={{
            transform: isHovered ? "translate(3px, -3px)" : "translate(0,0)",
            opacity: isHovered ? 1 : 0.5,
          }}
        />
        {/* Bottom left */}
        <span
          className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gold-antique transition-all duration-500"
          style={{
            transform: isHovered ? "translate(-3px, 3px)" : "translate(0,0)",
            opacity: isHovered ? 1 : 0.5,
          }}
        />
        {/* Bottom right */}
        <span
          className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gold-antique transition-all duration-500"
          style={{
            transform: isHovered ? "translate(3px, 3px)" : "translate(0,0)",
            opacity: isHovered ? 1 : 0.5,
          }}
        />

        {/* Shimmer sweep on hover */}
        <span
          className="absolute inset-0 overflow-hidden"
          style={{ borderRadius: "inherit" }}
        >
          <span
            className="absolute inset-y-0 -left-full w-1/3 bg-gradient-to-r from-transparent via-gold-antique/10 to-transparent"
            style={{
              transform: isHovered ? "translateX(400%)" : "translateX(0)",
              transition: isHovered ? "transform 0.9s ease" : "none",
            }}
          />
        </span>

        {/* Button text */}
        <span className="relative z-10 flex items-center gap-3">
          <span
            className="w-4 h-[1px] bg-gold-antique transition-all duration-500"
            style={{ transform: isHovered ? "scaleX(1.5)" : "scaleX(1)" }}
          />
          ENTER INVITATION
          <span
            className="w-4 h-[1px] bg-gold-antique transition-all duration-500"
            style={{ transform: isHovered ? "scaleX(1.5)" : "scaleX(1)" }}
          />
        </span>
      </button>
    );
  }
);

EnterInvitationButton.displayName = "EnterInvitationButton";

export default EnterInvitationButton;
