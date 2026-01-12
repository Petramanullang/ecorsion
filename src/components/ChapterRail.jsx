"use client";

export default function ChapterRail({
  steps = [],
  activeIndex = 0,
  side = "left",
  onPick,
  visible = false,
}) {
  const CONTAINER_HALF = 576; // max-w-6xl / 2
  const RAIL_W = 220;
  const GAP_TO_CONTENT = 100; // jarak ke konten
  const SAFE_EDGE = 12;

  const sideOffset = CONTAINER_HALF + RAIL_W + GAP_TO_CONTENT;

  const posStyle =
    side === "left"
      ? { left: `max(${SAFE_EDGE}px, calc(50% - ${sideOffset}px))` }
      : { right: `max(${SAFE_EDGE}px, calc(50% - ${sideOffset}px))` };

  return (
    <div
      className={[
        "fixed z-50 hidden xl:block",
        "top-[calc(var(--navH)+14px)] bottom-[120px]",
        "pointer-events-none transition-all duration-200",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
      ].join(" ")}
      style={posStyle}
      aria-hidden={!visible}
    >
      <div className="pointer-events-auto brutal-frame p-3 w-[220px] bg-paper">
        <div className="text-xs font-black uppercase tracking-widest">
          Navigasi Bab
        </div>

        <div className="mt-3 grid gap-2">
          {steps.map((s, i) => (
            <button
              key={i}
              onClick={() => onPick?.(i)}
              className={[
                "brutal-btn w-full text-left",
                i === activeIndex ? "bg-neon-lime" : "bg-paper",
              ].join(" ")}
              style={{ padding: "10px 12px" }}
            >
              <span
                className={[
                  "mr-2 inline-block dot align-middle",
                  i === activeIndex ? "active" : i < activeIndex ? "done" : "",
                ].join(" ")}
              />
              <span className="align-middle text-[11px] font-black uppercase tracking-widest">
                {i + 1}. {s.tag}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
