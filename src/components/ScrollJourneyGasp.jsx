"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import ImageCard from "@/components/ImageCard";
import ChapterRail from "@/components/ChapterRail";
import ProgressRail from "@/components/ProgressRail";

import {
  MiniAssembler,
  ImpactDial,
  ChoiceChips,
} from "@/components/InteractiveBits";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function ChapterCard({ step, index, media, children }) {
  const hasMedia = Boolean(media);

  return (
    <article id={`step-${index}`} className="scroll-anchor nj-chapter">
      <div className="brutal-frame p-0 bg-paper">
        <div className="brutal-surface cut-corner2">
          <div className="anim p-3 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="tape text-xs font-black uppercase tracking-widest">
                {step.tag}
              </span>
              <span className="tape text-xs font-black uppercase tracking-widest">
                Scroll → lanjut
              </span>
            </div>

            <div className="mt-4 grid gap-5 md:grid-cols-12 items-start">
              {/* ✅ kalau gak ada media: full width */}
              <div className={hasMedia ? "md:col-span-7" : "md:col-span-12"}>
                <h3 className="text-xl sm:text-2xl md:text-4xl font-black leading-[0.95]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base md:text-lg opacity-90">
                  {step.body}
                </p>

                {children ? <div className="mt-5">{children}</div> : null}

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="tape">⚡ Interaktif</span>
                  <span className="tape">🎤 Enak demo</span>
                  <span className="tape">🧠 Cepat paham</span>
                </div>
              </div>

              {hasMedia ? <div className="md:col-span-5">{media}</div> : null}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ScrollJourneyGasp({ onMood }) {
  const rootRef = useRef(null);

  const [active, setActive] = useState(0);
  const [pct, setPct] = useState(0);
  const [showRail, setShowRail] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  // ✅ lock saat klik navigasi supaya ScrollTrigger gak “nyeret” balik
  const manualLock = useRef(false);

  const steps = useMemo(
    () => [
      {
        tag: "Bab 1 • Hook",
        title: "EV terlihat hijau. Tapi hulunya… ada nikel.",
        body: "Kamu ikut petualangan dari nikel ditambang sampai jadi baterai—lalu pilih solusi yang realistis. Ada game + simulator biar pengunjung betah.",
        img: {
          src: "/images/nickel-ore.png",
          alt: "Bijih nikel",
          label: "Nikel (Bijih Nikel)",
        },
      },
      {
        tag: "Bab 2 • Problem",
        title: "Masalahnya: yang terlihat cuma ujungnya.",
        body: "Orang lihat EV di jalan, tapi tidak melihat tambang, energi pengolahan, serta dampak sosial-lingkungan di hulunya.",
        img: {
          src: "/images/nickel-mining.jpg",
          alt: "Tambang nikel",
          label: "Tambang Nikel",
        },
      },
      {
        tag: "Bab 3 • Kenapa Nikel",
        title: "Kenapa nikel jadi pusat perhatian?",
        body: "Nikel material strategis untuk baterai dan industri. Bisa menggerakkan ekonomi lewat hilirisasi—tapi butuh kontrol dampak yang nyata.",
        img: {
          src: "/images/smelter.jpg",
          alt: "Smelter",
          label: "Pengolahan / Smelter",
        },
      },
      {
        tag: "Bab 4 • Rantai Nilai",
        title: "Tambang → Olah → Baterai → EV",
        body: "Nilai tambah naik saat diolah. Tantangannya: efisiensi energi, limbah, dan transparansi rantai pasok.",
        img: {
          src: "/images/batterys.png",
          alt: "Baterai",
          label: "Baterai (Cell / Pack)",
        },
      },
      {
        tag: "Bab 5 • Game",
        title: "Mini Game: Rakit sel baterai",
        body: "Klik sel-sel baterai sampai semuanya aktif.",
        extra: "assembler",
      },
      {
        tag: "Bab 6 • Simulator",
        title: "Mainkan trade-off: kebiasaan → dampak",
        body: "Geser kebiasaan upgrade & intensitas konsumsi. Lihat dampaknya berubah.",
        extra: "dial",
        img: {
          src: "/images/electric-car.png",
          alt: "EV",
          label: "Mobil Listrik",
        },
      },
      {
        tag: "Bab 7 • Solusi",
        title: "Pilih 1 solusi realistis untuk unlock ending",
        body: "Pilih satu solusi.",
        extra: "choices",
        img: {
          src: "/images/battery-recycle-removebg.png",
          alt: "Recycle",
          label: "Daur Ulang Baterai",
        },
      },
      {
        tag: "Final • Pesan",
        title: "Nikel penting — tapi harus bertanggung jawab.",
        body: "SDGs 8/11/12 bisa sejalan kalau transparansi, efisiensi, dan circular economy jadi kebiasaan.",
      },
    ],
    []
  );

  // ===== helpers for offsets (nav + mobile hud) =====
  const getNavH = () => {
    const css = getComputedStyle(document.documentElement);
    const v = parseInt(css.getPropertyValue("--navH") || "76", 10);
    return Number.isFinite(v) ? v : 76;
  };

  const getHudH = () => {
    // mini-progress hanya ada < xl
    if (window.innerWidth >= 1280) return 0;
    const hud = document.querySelector(".mini-progress");
    return hud?.offsetHeight ? hud.offsetHeight + 10 : 0;
  };

  const computeActiveLine = () => getNavH() + getHudH() + 18;

  // ===== CUSTOM FEEL DI SINI =====
  const RAIL_REVEAL_FROM_BOTTOM_PX = 650; // 0 = Bab 1 mulai kelihatan
  const ACTIVE_LINE_TWEAK = 0; // +20 telat, -20 cepat
  const LINE_EPS = 8;

  const jumpTo = (i) => {
    manualLock.current = true;
    setActive(i);
    setShowRail(true);

    // stop anim scroll sebelumnya biar gak “nabrak”
    gsap.killTweensOf(window);

    const el = document.getElementById(`step-${i}`);
    if (!el) {
      manualLock.current = false;
      return;
    }

    // ScrollTrigger chapter-start pakai "top top+= (activeLine - LINE_EPS)".
    // Jadi saat klik nav, kita scroll sedikit melewati threshold itu
    // supaya bab yang dipilih langsung jadi active (nggak ke-shift 1 bab).
    const threshold = computeActiveLine() + ACTIVE_LINE_TWEAK - LINE_EPS; // start-line

    // bikin top bab berada *sedikit di atas* threshold
    const y = el.getBoundingClientRect().top + window.scrollY - threshold + 1;

    gsap.to(window, {
      duration: 0.8,
      ease: "power2.out",
      scrollTo: { y, autoKill: false },
      overwrite: true,
      onComplete: () => {
        manualLock.current = false;
      },
    });
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const refreshSoon = () =>
      requestAnimationFrame(() => ScrollTrigger.refresh());

    const ctx = gsap.context(() => {
      const chapters = Array.from(root.querySelectorAll(".nj-chapter"));
      if (!chapters.length) return;

      // ===== rail visibility: active during adventure =====
      ScrollTrigger.create({
        trigger: chapters[0],
        start: () => `top bottom-=${RAIL_REVEAL_FROM_BOTTOM_PX}`,
        endTrigger: root,
        end: () =>
          `bottom top+=${computeActiveLine() + ACTIVE_LINE_TWEAK - LINE_EPS}`,
        onToggle: (self) => setShowRail(self.isActive),
      });

      // ===== active chapter triggers =====
      // Pakai onEnter / onEnterBack biar state aktif nggak "nggantung"
      // dan nggak gampang ke-offset 1 bab saat klik navigasi.
      chapters.forEach((el, i) => {
        const next = chapters[i + 1];

        ScrollTrigger.create({
          trigger: el,
          start: () =>
            `top top+=${computeActiveLine() + ACTIVE_LINE_TWEAK - LINE_EPS}`,
          endTrigger: next || root,
          end: () =>
            next
              ? `top top+=${computeActiveLine() + ACTIVE_LINE_TWEAK - LINE_EPS}`
              : `bottom top+=${
                  computeActiveLine() + ACTIVE_LINE_TWEAK - LINE_EPS
                }`,
          onEnter: () => {
            if (manualLock.current) return;
            setActive(i);
          },
          onEnterBack: () => {
            if (manualLock.current) return;
            setActive(i);
          },
        });

        // small entrance animation
        const anim = el.querySelector(".anim");
        if (anim) {
          gsap.fromTo(
            anim,
            { y: 18, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top 96%",
                end: "top 75%",
                scrub: 0.6,
              },
            }
          );
        }
      });

      // ===== progress =====
      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          setPct(Math.round(self.progress * 100));

          // ✅ mentok bawah show bab terakhir
          if (!manualLock.current && self.progress > 0.995) {
            setActive(steps.length - 1);
          }
        },
      });
    }, root);

    // refresh on resize/viewport changes
    window.addEventListener("resize", refreshSoon);
    window.addEventListener("orientationchange", refreshSoon);
    window.visualViewport?.addEventListener("resize", refreshSoon);
    window.visualViewport?.addEventListener("scroll", refreshSoon);

    // refresh after images load
    const imgs = Array.from(root.querySelectorAll("img"));
    const onImgLoad = () => ScrollTrigger.refresh();
    imgs.forEach((img) => {
      if (!img.complete)
        img.addEventListener("load", onImgLoad, { once: true });
    });

    const t1 = setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      clearTimeout(t1);
      imgs.forEach((img) => img.removeEventListener("load", onImgLoad));
      window.removeEventListener("resize", refreshSoon);
      window.removeEventListener("orientationchange", refreshSoon);
      window.visualViewport?.removeEventListener("resize", refreshSoon);
      window.visualViewport?.removeEventListener("scroll", refreshSoon);
      gsap.killTweensOf(window);
      ctx.revert();
    };
  }, [steps.length]);

  return (
    <section
      id="adventure-root"
      ref={rootRef}
      className="px-4 py-10 sm:py-12 safe-bottom"
    >
      {/* ✅ Desktop: rail kiri & progress kanan */}
      <ChapterRail
        steps={steps}
        activeIndex={active}
        side="left"
        visible={showRail}
        onPick={(i) => jumpTo(i)}
      />

      <ProgressRail
        steps={steps}
        activeIndex={active}
        progressPct={pct}
        visible={showRail}
        onPick={(i) => jumpTo(i)}
      />

      {/* ✅ Mobile sheet nav */}
      {sheetOpen && (
        <div className="fixed inset-0 z-[60] xl:hidden">
          <button
            className="absolute inset-0 bg-black/30"
            aria-label="Tutup navigasi bab"
            onClick={() => setSheetOpen(false)}
          />
          <div className="absolute left-0 right-0 bottom-0 p-4 pb-6">
            <div className="brutal-card bg-paper p-4 max-h-[75vh] overflow-auto">
              <div className="flex items-center justify-between gap-3">
                <div className="font-black uppercase tracking-widest text-xs">
                  Navigasi Bab
                </div>
                <button
                  className="brutal-btn bg-paper"
                  onClick={() => setSheetOpen(false)}
                >
                  Tutup
                </button>
              </div>

              <div className="mt-3 grid gap-2">
                {steps.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSheetOpen(false);
                      jumpTo(i);
                    }}
                    className={[
                      "brutal-btn w-full text-left",
                      i === active ? "bg-neon-lime" : "bg-paper",
                    ].join(" ")}
                    style={{ padding: "10px 12px" }}
                  >
                    <span
                      className={[
                        "mr-2 inline-block dot align-middle",
                        i === active ? "active" : i < active ? "done" : "",
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
        </div>
      )}

      <div className="mx-auto max-w-6xl">
        {/* ✅ Mobile progress minimal (desktop pakai rail kanan) */}
        <div className="mini-progress xl:hidden">
          <div className="brutal-frame p-2 sm:p-3 bg-paper">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="tape text-[10px] font-black uppercase tracking-widest">
                  Bab {active + 1}/{steps.length}
                </span>
                <span className="hidden sm:block text-xs font-black truncate">
                  {steps[active]?.title}
                </span>
              </div>

              {/* dots hanya sm+ */}
              <div className="hidden sm:flex items-center gap-2">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => jumpTo(i)}
                    className={[
                      "dot",
                      i === active ? "active" : "",
                      i < active ? "done" : "",
                    ].join(" ")}
                    title={`Ke Bab ${i + 1}`}
                  />
                ))}
              </div>

              {/* hamburger sheet nav di xs */}
              <button
                className="sm:hidden brutal-btn bg-neon-yellow inline-flex items-center gap-2"
                onClick={() => setSheetOpen(true)}
                aria-label="Buka navigasi bab"
              >
                <span className="relative block w-5 h-4" aria-hidden="true">
                  <span className="absolute left-0 top-0 h-[3px] w-full bg-ink" />
                  <span className="absolute left-0 top-[6px] h-[3px] w-full bg-ink" />
                  <span className="absolute left-0 bottom-0 h-[3px] w-full bg-ink" />
                </span>
                <span className="font-black text-xs">Bab</span>
              </button>
            </div>

            <div className="mt-2 mini-bar">
              <div className="mini-fill" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6">
          {steps.map((s, i) => (
            <ChapterCard
              key={i}
              step={s}
              index={i}
              media={
                s.img?.src ? (
                  <ImageCard
                    src={s.img.src}
                    alt={s.img.alt}
                    label={s.img.label}
                  />
                ) : null
              }
            >
              {s.extra === "assembler" ? <MiniAssembler /> : null}
              {s.extra === "dial" ? <ImpactDial onMood={onMood} /> : null}
              {s.extra === "choices" ? <ChoiceChips /> : null}
            </ChapterCard>
          ))}
        </div>

        <div className="mt-6 grid gap-6">
          <div className="brutal-frame bg-paper p-4 sm:p-5">
            <div className="tape text-xs font-black uppercase tracking-widest">
              Ringkasan 30 Detik
            </div>
            <h4 className="mt-3 text-lg sm:text-xl font-black">
              EV itu “hijau”, tapi hulunya harus rapi.
            </h4>
            <p className="mt-2 text-sm sm:text-base opacity-90">
              Nikel penting buat baterai, tapi dampaknya harus dikendalikan
              lewat efisiensi energi, transparansi rantai pasok, dan circular
              economy.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="tape">SDGs 8</span>
              <span className="tape">SDGs 11</span>
              <span className="tape">SDGs 12</span>
            </div>
          </div>

          <div className="brutal-frame bg-paper p-4 sm:p-5">
            <div className="tape text-xs font-black uppercase tracking-widest">
              Checklist Aksi Realistis
            </div>
            <ul className="mt-3 grid gap-2 text-sm sm:text-base">
              <li className="flex gap-2">
                <span className="tape">1</span>
                <span className="opacity-90">
                  Perpanjang umur device (upgrade seperlunya).
                </span>
              </li>
              <li className="flex gap-2">
                <span className="tape">2</span>
                <span className="opacity-90">
                  Dukung daur ulang & pengumpulan baterai.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="tape">3</span>
                <span className="opacity-90">
                  Dorong transparansi supply chain (traceability).
                </span>
              </li>
              <li className="flex gap-2">
                <span className="tape">4</span>
                <span className="opacity-90">
                  Optimasi energi smelter + kontrol limbah.
                </span>
              </li>
            </ul>
          </div>

          <div className="brutal-frame bg-paper p-4 sm:p-5">
            <div className="tape text-xs font-black uppercase tracking-widest">
              Penutup
            </div>
            <h4 className="mt-3 text-lg sm:text-xl font-black">
              Mau ending versi “terbaik”?
            </h4>
            <p className="mt-2 text-sm sm:text-base opacity-90">
              Ulang Bab 7 (Solusi) dan coba pilihan
              lain.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="tape">Replay</span>
              <span className="tape">Diskusi</span>
              <span className="tape">Aksi Nyata</span>
            </div>
          </div>
        </div>

        {/* Spacer kecil tetap ada supaya Bab terakhir aman ke-trigger */}
        <div aria-hidden className="h-24 xl:h-16" />
      </div>
    </section>
  );
}
