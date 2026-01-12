"use client";

export default function ChapterSheet({
  open,
  onClose,
  steps = [],
  activeIndex = 0,
  onPick,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] lg:hidden">
      {/* backdrop */}
      <button
        className="absolute inset-0 bg-black/30"
        aria-label="Tutup navigasi bab"
        onClick={onClose}
      />

      {/* sheet */}
      <div className="absolute left-0 right-0 bottom-0 p-4 pb-6">
        <div className="brutal-frame bg-paper p-4 max-h-[75vh] overflow-auto">
          <div className="flex items-center justify-between gap-3">
            <div className="text-xs font-black uppercase tracking-widest">
              Navigasi Bab
            </div>
            <button className="brutal-btn bg-paper" onClick={onClose}>
              Tutup
            </button>
          </div>

          <div className="mt-3 grid gap-2">
            {steps.map((s, i) => (
              <button
                key={s.id ?? i}
                onClick={() => onPick?.(i)}
                className={[
                  "brutal-btn w-full text-left",
                  i === activeIndex ? "bg-neon-lime" : "bg-paper",
                ].join(" ")}
                style={{ padding: "10px 12px" }}
              >
                <span className="mr-2 inline-block align-middle">
                  <span
                    className={[
                      "w-3 h-3 inline-block rounded-full border-3 border-ink shadow-brutalSm",
                      i === activeIndex ? "bg-neon-yellow" : "bg-paper",
                    ].join(" ")}
                  />
                </span>

                <span className="align-middle text-[11px] font-black uppercase tracking-widest">
                  {String(i + 1).padStart(2, "0")}.{" "}
                  {s.title ?? s.tag ?? `Bab ${i + 1}`}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
