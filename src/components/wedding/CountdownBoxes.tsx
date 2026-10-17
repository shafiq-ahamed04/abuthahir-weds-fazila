"use client";

import { useEffect, useState, memo } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownBoxesProps {
  targetDate: number;
}

function CountdownBoxesComponent({ targetDate }: CountdownBoxesProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    function updateCountdown() {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
      {/* Days */}
      <div className="flex flex-col items-center p-3 rounded border border-gold-antique/25 bg-[#02211a]/95">
        <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-gold-antique font-light">
          {timeLeft.days}
        </span>
        <span className="font-sans text-[9px] uppercase tracking-wider text-ivory-warm/70 mt-1">
          Days
        </span>
      </div>

      {/* Hours */}
      <div className="flex flex-col items-center p-3 rounded border border-gold-antique/25 bg-[#02211a]/95">
        <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-gold-antique font-light">
          {timeLeft.hours}
        </span>
        <span className="font-sans text-[9px] uppercase tracking-wider text-ivory-warm/70 mt-1">
          Hours
        </span>
      </div>

      {/* Minutes */}
      <div className="flex flex-col items-center p-3 rounded border border-gold-antique/25 bg-[#02211a]/95">
        <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-gold-antique font-light">
          {timeLeft.minutes}
        </span>
        <span className="font-sans text-[9px] uppercase tracking-wider text-ivory-warm/70 mt-1">
          Minutes
        </span>
      </div>

      {/* Seconds */}
      <div className="flex flex-col items-center p-3 rounded border border-gold-antique/25 bg-[#02211a]/95">
        <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-gold-antique font-light">
          {timeLeft.seconds}
        </span>
        <span className="font-sans text-[9px] uppercase tracking-wider text-ivory-warm/70 mt-1">
          Seconds
        </span>
      </div>
    </div>
  );
}

export const CountdownBoxes = memo(CountdownBoxesComponent);
export default CountdownBoxes;
