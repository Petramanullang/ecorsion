"use client";

import { useEffect, useMemo, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollToId } from "@/lib/scrollToId";

gsap.registerPlugin(ScrollTrigger);

export default function MiniProgress({
  rootId = "adventure-root",
  steps = [],
  activeIndex = 0,
}) {
  const [progress, setProgress] = useState(0);

  const total = steps.length || 1;
  const current = steps[activeIndex];

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

  const pct = Math.round(progress * 100);

  const dots = useMemo(() => steps.map((_, i) => i), [steps]);

  return (
    <div className="mini-progress px-4">
      <div className="mx-auto max-w-6xl brutal-card p-3 bg-paper cut-corner2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="tape text-xs font-black uppercase tracking-widest">
              Bab {activeIndex + 1}/{total}
            </div>
            <div className="text-xs md:text-sm font-black">
              {current?.title || "Perjalanan"}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {dots.map((i) => (
              <button
                key={i}
                className={[
                  "dot",
                  i === activeIndex ? "active" : "",
                  i < activeIndex ? "done" : "",
                ].join(" ")}
                title={`Ke Bab ${i + 1}`}
                onClick={() => scrollToId(`step-${i}`)}
              />
            ))}
          </div>
        </div>

        <div className="mt-2 mini-bar">
          <div className="mini-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
}
