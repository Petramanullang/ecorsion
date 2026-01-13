"use client";

import { useEffect, useRef, useState } from "react";
import { scrollToId } from "@/lib/scrollToId";
import Link from "next/link";

// Auto-hide saat scroll turun, muncul lagi saat scroll naik / berhenti.
export default function QuickControls() {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);
  const idleTimer = useRef(null);

  useEffect(() => {
    lastY.current = window.scrollY || 0;

    const evaluate = () => {
      const y = window.scrollY || 0;
      const dy = y - lastY.current;

      // dekat atas => selalu tampil
      if (y < 60) {
        setHidden(false);
      } else {
        // scroll turun => hide, scroll naik => show
        if (dy > 6) setHidden(true);
        if (dy < -6) setHidden(false);
      }

      lastY.current = y;
      ticking.current = false;

      // kalau user berhenti scroll sebentar, munculin lagi
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
      idleTimer.current = window.setTimeout(() => setHidden(false), 650);
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(evaluate);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
    };
  }, []);

  return (
    <div
      className={[
        "fixed left-3 right-3 bottom-3 z-40",
        "transition-transform duration-200",
        hidden ? "translate-y-[110%]" : "translate-y-0",
      ].join(" ")}
    >
      <div className="mx-auto max-w-6xl brutal-frame bg-paper px-3 py-3">
        <div className="flex items-center justify-between gap-2">
          <div className="text-xs font-black uppercase tracking-widest opacity-80 hidden sm:inline">
            Controls
          </div>

          <div className="flex gap-2">
            <button
              className="brutal-btn bg-neon-lime"
              onClick={() => scrollToId("step-0", 18)}
            >
              Mulai
            </button>
            <button
              className="brutal-btn bg-neon-yellow"
              onClick={() => scrollToId("step-4", 18)}
            >
              Game
            </button>
            <button
              className="brutal-btn bg-neon-cyan"
              onClick={() => scrollToId("step-5", 18)}
            >
              Simulator
            </button>
            <button
              className="brutal-btn bg-neon-pink"
              onClick={() => scrollToId("step-6", 18)}
            >
              Solusi
            </button>
            <button className="brutal-btn">
              <Link href={"https://itpln.ac.id/"}>ITPLN</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
