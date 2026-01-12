"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Blob from "@/components/Blob";
import MarqueeBar from "@/components/MarqueeBar";

export default function HeroNeoBrutal({ mood, onStart }) {
  const moodLabel =
    mood === "hot" ? "TEKANAN TINGGI" : mood === "mid" ? "WASPADA" : "STABIL";
  const moodClass =
    mood === "hot"
      ? "bg-neon-pink"
      : mood === "mid"
      ? "bg-neon-yellow"
      : "bg-neon-cyan";

  return (
    <section className="px-4 pt-4 sm:pt-6">
      <div className="mx-auto max-w-6xl">
        <div className="brutal-card p-4 md:p-5 bg-paper">
          {/* Top bar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="brutal-card-sm bg-neon-cyan px-3 py-2 font-black uppercase tracking-widest">
                ECORSION
              </div>
              <div className="tape text-xs font-black uppercase tracking-widest">
                Nikel • Energi • Ekonomi • SDGs 8/11/12
              </div>
            </div>

            <div className="flex gap-2">
              <a className="brutal-btn bg-neon-yellow" href="/about">
                Profil
              </a>
              <button className="brutal-btn bg-neon-lime" onClick={onStart}>
                Mulai (60 detik)
              </button>
            </div>
          </div>

          {/* Editorial grid */}
          <div className="mt-4 grid gap-4 md:grid-cols-12">
            {/* Headline */}
            <div className="relative md:col-span-7 brutal-card p-5 sm:p-6 bg-paper torn overflow-hidden">
              <motion.div
                initial={{ opacity: 0, y: 12, rotate: -6 }}
                animate={{ opacity: 1, y: 0, rotate: -6 }}
                transition={{ duration: 0.6 }}
                className="absolute top-6 right-6 sticker"
              >
                STOP & MAININ
              </motion.div>

              <h1 className="text-[34px] leading-[0.95] sm:text-[44px] md:text-[72px] font-black tracking-tight">
                Lihat Lebih Dalam
                <br />
                dari{" "}
                <span className="inline-block bg-neon-cyan border-ink border-3 shadow-brutalSm px-3 rotate-[-1deg]">
                  Nikel Ore
                </span>
              </h1>

              <p className="mt-4 text-lg md:text-xl max-w-[58ch]">
                EV terlihat hijau. Tapi baterainya butuh nikel. Di sini kamu
                lihat <b>trade-off ekonomi vs lingkungan</b> lewat{" "}
                <b>scroll quest interaktif</b> ~ bukan baca doang.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button className="brutal-btn bg-neon-lime" onClick={onStart}>
                  Mulai Perjalanan
                </button>
                <a className="brutal-btn bg-neon-yellow" href="#step-4">
                  Game Baterai
                </a>
                <a className="brutal-btn bg-neon-cyan" href="#step-5">
                  Simulator Dampak
                </a>
              </div>

              <div className="mt-6 brutal-card-sm px-4 py-3 bg-ink text-white">
                <div className="text-xs font-black uppercase tracking-widest opacity-80">
                  Cara pakai
                </div>
                <div className="mt-1">
                  1) Klik <b>Mulai</b> → 2) Mainkan <b>Game</b> → 3) Geser{" "}
                  <b>Simulator</b> → 4) Pilih <b>Solusi</b>
                </div>
              </div>

              <div className="pointer-events-none absolute -bottom-16 -right-10 opacity-80 doodle">
                <Blob className="w-56 h-56 glow" fill="var(--neon-lime)" />
              </div>
            </div>

            {/* Collage image panel */}
            <div className="md:col-span-5 grid gap-4">
              <div className="relative brutal-card overflow-hidden p-0">
                <div className="absolute left-4 top-4 sticker">
                  <span className="h-3 w-3 bg-neon-pink border-ink border-3 shadow-brutalSm" />
                  NIKEL ORE
                </div>

                <div
                  className={`absolute right-4 top-4 brutal-card-sm px-3 py-2 ${moodClass}`}
                >
                  <div className="text-xs font-black uppercase tracking-widest">
                    Mood
                  </div>
                  <div className="font-black">{moodLabel}</div>
                </div>

                {/* Ganti ini dengan foto kamu */}
                <Image
                  src="/images/nickel-ore.png"
                  alt="Bijih nikel"
                  width={900}
                  height={600}
                  className="h-[220px] sm:h-[260px] w-full object-cover"
                  priority
                />

                <div className="border-t-3 border-b-3 border-ink grid grid-cols-3">
                  <div className="p-4 border-r-3 border-ink bg-paper">
                    <div className="text-xs font-black uppercase tracking-widest opacity-70">
                      Bab
                    </div>
                    <div className="mt-1 font-black">Tambang</div>
                  </div>
                  <div className="p-4 border-r-3 border-ink bg-neon-lime/40">
                    <div className="text-xs font-black uppercase tracking-widest opacity-70">
                      Bab
                    </div>
                    <div className="mt-1 font-black">Baterai</div>
                  </div>
                  <div className="p-4 bg-neon-cyan/30">
                    <div className="text-xs font-black uppercase tracking-widest opacity-70">
                      Bab
                    </div>
                    <div className="mt-1 font-black">Dampak</div>
                  </div>
                </div>
              </div>

              {/* Second collage card */}
              <div className="relative brutal-card pb-0 overflow-hidden torn">
                <Image
                  src="/images/electric-car.png"
                  alt="Mobil listrik"
                  width={900}
                  height={600}
                  className="h-[180px] sm:h-[300px] w-full object-cover "
                />
                <div className="absolute bottom-4 left-4 tape">
                  “EV hijau di jalan, tapi hulunya?”
                </div>
                <div className="absolute bottom-4 right-4 sticker rotate-[2deg]">
                  60 DETIK DEMO
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="md:col-span-5 brutal-card p-5 bg-paper rotate-[-0.5deg] torn">
              <div className="text-5xl font-black leading-none">“</div>
              <p className="mt-2 text-lg">
                Website ini memecahkan masalah “misinformasi EV” dengan
                interaktif: kamu melihat rantai pasok nikel secara utuh.
              </p>
              <div className="mt-4 tape inline-block">
                Problem → Validasi → Demo → Solusi
              </div>
            </div>

            {/* Problem solving strip */}
            <div className="md:col-span-7 brutal-card p-5 bg-neon-yellow/35 cut-corner2">
              <div className="text-xs font-black uppercase tracking-widest">
                Masalah yang diselesaikan
              </div>
              <div className="mt-2 text-2xl md:text-3xl font-black">
                “Orang mendukung energi hijau, tapi tidak melihat dampak
                hulunya.”
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="tape">Trade-off</span>
                <span className="tape">Transparansi</span>
                <span className="tape">Pilihan realistis</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <MarqueeBar />
        </div>
      </div>
    </section>
  );
}
