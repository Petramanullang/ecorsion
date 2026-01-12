"use client";

export default function ProgressRail({
  steps = [],
  activeIndex = 0,
  progressPct = 0,
  visible = false,
  onPick,
}) {
  const pct = Math.max(0, Math.min(100, Number(progressPct) || 0));

  const CONTAINER_HALF = 576;
  const RAIL_W = 84;
  const GAP_TO_CONTENT = 100;
  const SAFE_EDGE = 12;

  const sideOffset = CONTAINER_HALF + RAIL_W + GAP_TO_CONTENT;

  return (
    <div
      className={[
        "fixed z-50 hidden xl:block",
        "top-[calc(var(--navH)+14px)] bottom-[120px]",
        "pointer-events-none transition-all duration-200",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
      ].join(" ")}
      style={{ right: `max(${SAFE_EDGE}px, calc(50% - ${sideOffset}px))` }}
      aria-hidden={!visible}
    >
      <div className="pointer-events-auto brutal-frame p-3 w-[84px] bg-paper">
        <div className="text-[10px] font-black uppercase tracking-widest text-center">
          Progress
        </div>

        <div className="mt-2 tape text-[11px] font-black text-center">
          {pct}%
        </div>

        <div className="mt-3 flex justify-center">
          <div className="relative w-4 h-[170px] rounded-full border-[3px] border-ink bg-paper overflow-hidden">
            <div
              className="absolute inset-x-0 bottom-0 bg-neon-cyan"
              style={{ height: `${pct}%` }}
            />
          </div>
        </div>

        <div className="mt-3 grid gap-2 justify-items-center">
          {steps.map((s, i) => (
            <button
              key={i}
              className={[
                "w-3 h-3 rounded-full border-[2px] border-ink",
                "transition-transform duration-150",
                i === activeIndex
                  ? "bg-neon-yellow"
                  : i < activeIndex
                  ? "bg-neon-lime"
                  : "bg-paper",
                "hover:-translate-y-[2px]",
              ].join(" ")}
              title={`Ke ${s?.tag || `Bab ${i + 1}`}`}
              onClick={() => onPick?.(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
