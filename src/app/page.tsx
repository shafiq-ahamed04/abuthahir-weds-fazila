"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";

// Dynamic imports — prevents SSR issues with GSAP and browser APIs
import InvitationCover from "@/components/wedding/InvitationCover";

const BismillahScene = dynamic(
  () => import("@/sections/BismillahScene"),
  { ssr: false }
);

const MainContent = dynamic(
  () => import("@/sections/MainContent"),
  { ssr: false }
);

type Scene = "cover" | "bismillah" | "main";

export default function HomePage() {
  const [scene, setScene] = useState<Scene>("cover");
  const [showBismillah, setShowBismillah] = useState(false);
  const [showMain, setShowMain] = useState(false);

  // Scroll lock management
  useEffect(() => {
    if (scene === "cover" || scene === "bismillah") {
      document.body.style.overflow = "hidden";
    } else {
      const t = setTimeout(() => {
        document.body.style.overflow = "";
        document.body.style.overflowX = "hidden";
      }, 400);
      return () => clearTimeout(t);
    }
  }, [scene]);

  const handleEnter = useCallback(() => {
    setScene("bismillah");
    setShowBismillah(true);
  }, []);

  const handleBismillahComplete = useCallback(() => {
    setScene("main");
    setShowMain(true);
    // Bismillah stays mounted briefly during scroll-triggered transition
    setTimeout(() => setShowBismillah(false), 800);
  }, []);

  return (
    <>
      {/* ── Scene 1: Invitation Cover ── */}
      {scene === "cover" && (
        <InvitationCover onEnter={handleEnter} />
      )}

      {/* ── Scene 2: Bismillah ── */}
      {showBismillah && (
        <BismillahScene
          isVisible={showBismillah}
          onScrollToMain={handleBismillahComplete}
        />
      )}

      {/* ── Scene 3+: Main scrollable wedding content ── */}
      {showMain && <MainContent />}
    </>
  );
}
