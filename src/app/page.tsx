"use client";

import { useState } from "react";
import OpeningAnimation from "@/components/wedding/OpeningAnimation";
import MainContent from "@/sections/MainContent";

export default function HomePage() {
  const [openingCompleted, setOpeningCompleted] = useState(false);

  return (
    <>
      {!openingCompleted && (
        <OpeningAnimation onComplete={() => setOpeningCompleted(true)} />
      )}
      <MainContent />
    </>
  );
}
