"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollToId } from "@/lib/scrollToId";

gsap.registerPlugin(ScrollTrigger);

export default function AdventureHUD({
  rootId = "adventure-root",
  stepsCount = 8,
  activeIndex = 0,
}) {
  const [progress, setProgress] = useState(0);

  const dots = useMemo(() => {
    // evenly spaced checkpoints along rail
    const arr = [];
    for (let i = 0; i < stepsCount; i++) {
      arr.push({
        i,
        topPct: 6 + (i / Math.max(1, stepsCount - 1)) * 84, // 6%..90%
        label: `Bab ${i + 1}`,
      });
    }
    return arr;
  }, [stepsCount]);

  useEffect(() => {
    const el = document.getElementById(rootId);
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => setProgress(self.progress),
    });

    return () => st.kill();
  }, [rootId]);

  const fillHeight = `${Math.round(progress * 100)}%`;
  const companionTop = `${6 + progress * 84}%`;

  return (
    <>
      {/* Mobile sticky progress */}
      <div className="mob-progress px-4">
        <div className="mx-auto max-w-6xl brutal-card p-3 bg-paper">
          <div className="flex items-center justify-between gap-3">
            <div className="text-xs font-black uppercase tracking-widest">
              Progress Petualangan
            </div>
            <div className="tape text-xs">
              Bab {activeIndex + 1}/{stepsCount}
            </div>
          </div>
          <div className="mt-2 mob-bar">
            <div
              className="mob-fill"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Desktop HUD */}
      <div className="hud">
        <div className="hud-panel">
          <div className="hud-rail">
            <div className="hud-fill" style={{ height: fillHeight }} />

            {/* checkpoints */}
            {dots.map((d) => {
              const isActive = d.i === activeIndex;
              const isDone = d.i < activeIndex;

              return (
                <button
                  key={d.i}
                  className={[
                    "hud-dot",
                    isActive ? "active" : "",
                    isDone ? "done" : "",
                  ].join(" ")}
                  style={{ top: `${d.topPct}%` }}
                  onClick={() => scrollToId(`step-${d.i}`)}
                  title={`Ke ${d.label}`}
                >
                  {isActive && <span className="hud-label">{d.label}</span>}
                </button>
              );
            })}

            {/* companion */}
            <motion.div
              className="hud-companion"
              style={{ top: companionTop }}
              animate={{ y: [0, -6, 0], rotate: [0, -2, 0] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="font-black text-sm">🧭</div>
            </motion.div>

            {/* treasure */}
            <div className="hud-treasure" title="Harta karun: Solusi!">
              💎
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
