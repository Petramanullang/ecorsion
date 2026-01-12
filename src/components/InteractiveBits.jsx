"use client";
import { useEffect, useMemo, useState } from "react";

const clamp01to100 = (n) => Math.max(0, Math.min(100, n));
const computeImpactScore = (replaceEveryYears, intensityPct) => {
  const base = (6 - replaceEveryYears) * 14 + intensityPct * 0.8;
  return clamp01to100(Math.round(base));
};

function HowTo({ title, steps, color = "bg-neon-yellow" }) {
  return (
    <div className={`brutal-card-sm p-4 ${color}`}>
      <div className="text-xs font-black uppercase tracking-widest">
        Cara Pakai
      </div>
      <div className="mt-2 font-black">{title}</div>
      <ol className="mt-2 list-decimal pl-5 text-sm leading-relaxed">
        {steps.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ol>
    </div>
  );
}

function ChoiceChipButton({ active, label, colorClass, onClick }) {
  return (
    <button
      onClick={onClick}
      className={["brutal-btn", active ? colorClass : "bg-paper"].join(" ")}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}

export function MiniAssembler() {
  const [cells, setCells] = useState([false, false, false, false, false]);
  const done = cells.every(Boolean);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="brutal-card p-5 bg-paper torn">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="font-black uppercase tracking-widest text-sm">
              Mini Game: Rakit Sel Baterai
            </div>
            <div className="text-sm opacity-80">
              Tujuan: aktifkan semua sel untuk membentuk modul baterai.
            </div>
          </div>
          <div
            className={`brutal-card-sm px-3 py-2 ${
              done ? "bg-neon-lime" : "bg-neon-yellow"
            }`}
          >
            <div className="text-xs font-black uppercase tracking-widest">
              Status
            </div>

            <div
              className={[
                "font-black",
                done ? "text-green-500" : "text-blue-500",
              ].join(" ")}
            >
              {done ? "SELESAI" : "PROSES"}
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-5 gap-3">
          {cells.map((on, i) => (
            <button
              key={i}
              onClick={() =>
                setCells((prev) => {
                  const next = [...prev];
                  next[i] = !next[i];
                  return next;
                })
              }
              className={[
                "h-12 border-3 border-ink shadow-brutalSm transition",
                "active:translate-x-1 active:translate-y-1 active:shadow-none",
                on ? "bg-neon-cyan" : "bg-paper",
              ].join(" ")}
              aria-label={`Sel baterai ${i + 1}`}
              title="Klik untuk ON/OFF"
            />
          ))}
        </div>

        <div className="mt-3 brutal-card-sm p-3 bg-neon-cyan/30">
          <div className="text-xs font-black uppercase tracking-widest">
            Penjelasan
          </div>
          <div className="mt-1 text-sm">
            Modul baterai terdiri dari banyak sel. Semakin banyak baterai →
            semakin besar kebutuhan material (termasuk nikel).
          </div>
        </div>
      </div>

      <HowTo
        title="Game Rakit Baterai"
        steps={[
          "Klik setiap kotak sampai semuanya menyala.",
          "Perhatikan status berubah jadi SELESAI.",
          "Setelah selesai, lanjut scroll ke simulator dampak.",
        ]}
        color="bg-neon-yellow"
      />
    </div>
  );
}

export function ImpactDial({ onMood }) {
  const [replaceEveryYears, setReplaceEveryYears] = useState(2);
  const [intensity, setIntensity] = useState(45);

  const score = useMemo(
    () => computeImpactScore(replaceEveryYears, intensity),
    [replaceEveryYears, intensity]
  );

  useEffect(() => {
    const m = score > 70 ? "hot" : score > 40 ? "mid" : "cool";
    onMood?.(m);
  }, [score, onMood]);

  const badge =
    score > 70
      ? "bg-neon-pink"
      : score > 40
      ? "bg-neon-yellow"
      : "bg-neon-cyan";

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="brutal-card p-5 bg-paper">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="font-black uppercase tracking-widest text-sm">
              Simulator Trade-off
            </div>
            <div className="text-sm opacity-80">
              Geser slider → lihat “tekanan sistem” berubah.
            </div>
          </div>
          <div className={`brutal-card-sm px-3 py-2 ${badge}`}>
            <div className="text-xs font-black uppercase tracking-widest">
              Impact
            </div>
            <div className="text-xl font-black">{score}/100</div>
          </div>
        </div>

        <div className="mt-4 grid gap-4">
          <div className="brutal-card-sm p-4 bg-neon-cyan/30">
            <div className="text-xs font-black uppercase tracking-widest opacity-80">
              Ganti perangkat (tahun)
            </div>
            <input
              className="w-full mt-2"
              type="range"
              min={1}
              max={5}
              value={replaceEveryYears}
              onChange={(e) => setReplaceEveryYears(Number(e.target.value))}
            />
            <div className="font-black mt-1">{replaceEveryYears} tahun</div>
          </div>

          <div className="brutal-card-sm p-4 bg-neon-lime/30">
            <div className="text-xs font-black uppercase tracking-widest opacity-80">
              Intensitas konsumsi
            </div>
            <input
              className="w-full mt-2"
              type="range"
              min={0}
              max={100}
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
            />
            <div className="font-black mt-1">{intensity}%</div>
          </div>
        </div>

        <div className="mt-4 brutal-card-sm p-4">
          <div className="text-xs font-black uppercase tracking-widest opacity-80">
            Interpretasi Cepat
          </div>
          <div className="mt-2">
            {score > 70
              ? "Tekanan tinggi: demand material naik → risiko dampak ikut naik."
              : score > 40
              ? "Waspada: sistem mulai berat kalau kebiasaan tidak dikendalikan."
              : "Stabil: kebiasaan bijak bikin rantai pasok lebih ringan."}
          </div>
        </div>
      </div>

      <HowTo
        title="Simulator Dampak"
        steps={[
          "Geser slider ‘Ganti perangkat’ dan ‘Intensitas konsumsi’.",
          "Lihat angka Impact berubah (0–100).",
          "Diskusikan: kebiasaan mana yang paling ngaruh?",
          "Lanjut ke bab ‘Solusi’ untuk langkah realistis.",
        ]}
        color="bg-neon-lime"
      />
    </div>
  );
}

export function ChoiceChips({ onPick }) {
  const [picked, setPicked] = useState(null);

  const pick = (c) => {
    setPicked(c);
    onPick?.(c);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="brutal-card p-5 bg-paper torn">
        <div className="font-black uppercase tracking-widest text-sm">
          Solusi Praktis (Realistis)
        </div>
        <div className="text-sm opacity-80 mt-1">
          Pilih 1 solusi → ini “jalan keluar” yang bisa dilakukan banyak orang.
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <ChoiceChipButton
            active={picked === "longevity"}
            label="Perpanjang umur perangkat"
            colorClass="bg-neon-lime"
            onClick={() => pick("longevity")}
          />
          <ChoiceChipButton
            active={picked === "recycle"}
            label="Daur ulang yang benar"
            colorClass="bg-neon-cyan"
            onClick={() => pick("recycle")}
          />
          <ChoiceChipButton
            active={picked === "supply"}
            label="Dukung rantai pasok bertanggung jawab"
            colorClass="bg-neon-yellow"
            onClick={() => pick("supply")}
          />
        </div>

        <div className="mt-4 brutal-card-sm p-4 bg-neon-yellow/35">
          <div className="text-xs font-black uppercase tracking-widest">
            Hasil Pilihan
          </div>
          <div className="mt-2 text-sm">
            {picked === "longevity" &&
              "Lebih sedikit permintaan bahan mentah → tekanan tambang bisa turun."}
            {picked === "recycle" &&
              "Material punya peluang kembali ke siklus → dukung circular economy."}
            {picked === "supply" &&
              "Tekanan ke industri/brand → standar & transparansi meningkat."}
            {!picked && "Pilih satu untuk melihat dampaknya secara ringkas."}
          </div>
        </div>
      </div>

      <HowTo
        title="Pilihan Solusi"
        steps={[
          "Klik salah satu tombol solusi.",
          "Baca ‘Hasil Pilihan’ yang muncul.",
          "‘Menurut kamu paling realistis yang mana?’",
        ]}
        color="bg-neon-cyan"
      />
    </div>
  );
}
