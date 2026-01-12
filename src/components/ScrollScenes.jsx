"use client";

import { useEffect, useMemo, useState } from "react";
import { ChoiceChips, ImpactDial, MiniAssembler } from "./InteractiveBits";

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (typeof IntersectionObserver === "undefined") return;

    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
          )[0];
        if (best?.target?.id) setActive(best.target.id);
      },
      { threshold: [0.15, 0.35, 0.55, 0.75] }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids]);

  return active;
}

function StatCard({ label, value, color = "bg-paper", tilt = "" }) {
  return (
    <div className={`brutal-card-sm px-3 py-3 ${color} ${tilt}`}>
      <div className="font-mono text-[11px] font-black uppercase tracking-widest opacity-80">
        {label}
      </div>
      <div className="font-mono font-black">{value}</div>
    </div>
  );
}

function Accordion({ items }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="grid gap-3">
      {items.map((it, idx) => {
        const isOpen = open === idx;
        return (
          <div key={idx} className="brutal-card-sm p-3 bg-paper">
            <button
              onClick={() => setOpen(isOpen ? null : idx)}
              className="w-full text-left flex items-center justify-between gap-3"
            >
              <div className="font-mono font-black uppercase tracking-widest text-sm">
                {it.q}
              </div>
              <span
                className={`brutal-card-sm px-2 py-1 ${
                  isOpen ? "bg-neon-lime" : "bg-neon-yellow"
                }`}
              >
                {isOpen ? "—" : "+"}
              </span>
            </button>
            {isOpen && (
              <div className="mt-3 text-sm leading-relaxed">{it.a}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Scene({ id, kicker, title, bg, children, sticker }) {
  return (
    <section id={id} className={`min-h-screen px-4 py-28 ${bg}`}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="tape font-mono text-xs font-black uppercase tracking-widest">
            {kicker}
          </div>
          {sticker ? <div className="sticker">{sticker}</div> : null}
        </div>

        {/* not monoton: split layout */}
        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="brutal-card p-6">
              <h2 className="text-3xl font-black leading-tight md:text-5xl">
                {title}
              </h2>
              <div className="mt-6">{children}</div>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="grid gap-4">
              <div className="blob p-5">
                <div className="font-mono text-xs font-black uppercase tracking-widest">
                  Mode Cerita
                </div>
                <div className="mt-1 font-mono font-black">
                  Scroll = Bab Baru
                </div>
                <div className="mt-2 text-sm">
                  Setiap bab punya visual & aksi. Biar tidak terasa “baca
                  laporan”.
                </div>
              </div>

              <div className="blob2 p-5">
                <div className="font-mono text-xs font-black uppercase tracking-widest">
                  Target SDGs
                </div>
                <div className="mt-1 font-mono font-black">8 • 11 • 12</div>
                <div className="mt-2 text-sm">
                  Ekonomi • Kota berkelanjutan • Konsumsi bertanggung jawab
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 zigzag" />
      </div>
    </section>
  );
}

export default function ScrollScenes({ onMood }) {
  const chapters = useMemo(
    () => ["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8"],
    []
  );
  const active = useActiveSection(chapters);
  const idx = Math.max(0, chapters.indexOf(active));
  const [choice, setChoice] = useState(null);

  return (
    <div className="relative">
      {/* Progress HUD */}
      <div className="sticky top-[76px] z-40 px-4">
        <div className="mx-auto max-w-6xl brutal-card p-3 bg-paper">
          <div className="flex items-center gap-3">
            <div className="font-mono text-xs font-black uppercase tracking-widest">
              Progress
            </div>
            <div className="flex-1 border-3 border-ink bg-paper h-4 overflow-hidden">
              <div
                className="h-full bg-neon-cyan"
                style={{ width: `${((idx + 1) / chapters.length) * 100}%` }}
              />
            </div>
            <div className="font-mono text-xs">
              {idx + 1}/{chapters.length}
            </div>
          </div>
        </div>
      </div>

      {/* CH 1 */}
      <Scene
        id="c1"
        kicker="BAB 1 — Nikel di Alam"
        title="Nikel itu tersembunyi… tapi dunia modern membangunkannya."
        bg="bg-neon-cyan/20"
        sticker="Quest: Temukan nikel"
      >
        <p className="text-lg">
          Nikel adalah mineral penting yang tersimpan di dalam bumi. Indonesia
          punya peran besar dalam rantai pasok nikel global. Tapi sebelum jadi
          teknologi, semuanya dimulai dari sini: <b>alam</b>.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <StatCard
            label="Bentuk"
            value="Bijih mineral"
            color="bg-neon-lime"
            tilt="rotate-[-1deg]"
          />
          <StatCard
            label="Lokasi"
            value="Lapisan tanah"
            color="bg-neon-yellow"
            tilt="rotate-[1deg]"
          />
          <StatCard
            label="Peran awal"
            value="Bahan baku industri"
            color="bg-neon-pink"
            tilt="rotate-[-1deg]"
          />
        </div>

        <div className="mt-6 brutal-card-sm p-4 bg-ink text-white">
          <div className="font-mono text-xs font-black uppercase opacity-80">
            Narator
          </div>
          <div className="mt-1">
            Kalau kamu scroll pelan, kamu sedang “menggali” cerita ini.
          </div>
        </div>
      </Scene>

      {/* CH 2 */}
      <Scene
        id="c2"
        kicker="BAB 2 — Penambangan"
        title="Penambangan: ekonomi bergerak, lingkungan ikut terpengaruh."
        bg="bg-neon-orange/15"
        sticker="Trade-off Zone"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-4">
            <p className="text-lg">
              Penambangan nikel bisa membuka peluang: pekerjaan, investasi, dan
              pertumbuhan ekonomi. Tapi ada biaya: perubahan lahan, energi, dan
              risiko lingkungan.
            </p>

            <div className="flex flex-wrap gap-3">
              <StatCard
                label="Dampak positif"
                value="Lapangan kerja"
                color="bg-neon-lime"
              />
              <StatCard
                label="Dampak negatif"
                value="Tekanan lingkungan"
                color="bg-neon-pink"
              />
              <StatCard
                label="Kunci"
                value="Tata kelola"
                color="bg-neon-yellow"
              />
            </div>
          </div>

          <div className="brutal-card p-5 bg-paper">
            <div className="font-mono text-xs font-black uppercase tracking-widest">
              Misi Cepat
            </div>
            <div className="mt-2">Pilih kalimat yang paling kamu setuju:</div>
            <div className="mt-4 grid gap-3">
              <div className="brutal-card-sm p-3 bg-neon-yellow/40 rotate-[1deg]">
                “Pertumbuhan ekonomi penting, tapi harus ada batas dan kontrol.”
              </div>
              <div className="brutal-card-sm p-3 bg-neon-cyan/30 rotate-[-1deg]">
                “Teknologi hijau tetap butuh sumber daya alam—jadi harus
                transparan.”
              </div>
            </div>
          </div>
        </div>
      </Scene>

      {/* CH 3 */}
      <Scene
        id="c3"
        kicker="BAB 3 — Pengolahan"
        title="Dari bijih menjadi nilai: hilirisasi membuat nikel ‘naik kelas’."
        bg="bg-neon-lime/15"
        sticker="Factory Mode"
      >
        <p className="text-lg">
          Bijih nikel tidak langsung dipakai. Ia diproses menjadi produk
          bernilai seperti <b>feronikel</b> dan <b>nikel matte</b>. Di sinilah
          nilai tambah ekonomi meningkat—tapi energi dan emisi juga bisa ikut
          meningkat jika tidak efisien.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="brutal-card-sm p-4 bg-neon-cyan/25 rotate-[-1deg]">
            <div className="font-mono text-xs font-black uppercase tracking-widest">
              Nilai Tambah
            </div>
            <div className="mt-1 font-mono font-black">Naik</div>
            <div className="mt-2 text-sm">
              Produk olahan lebih bernilai dari bahan mentah.
            </div>
          </div>
          <div className="brutal-card-sm p-4 bg-neon-yellow/25 rotate-[1deg]">
            <div className="font-mono text-xs font-black uppercase tracking-widest">
              Energi
            </div>
            <div className="mt-1 font-mono font-black">Tinggi</div>
            <div className="mt-2 text-sm">
              Efisiensi dan teknologi bersih jadi kunci.
            </div>
          </div>
          <div className="brutal-card-sm p-4 bg-neon-pink/20 rotate-[-1deg]">
            <div className="font-mono text-xs font-black uppercase tracking-widest">
              Risiko
            </div>
            <div className="mt-1 font-mono font-black">Limbah</div>
            <div className="mt-2 text-sm">Perlu pengelolaan & pengawasan.</div>
          </div>
        </div>

        <div className="mt-6">
          <Accordion
            items={[
              {
                q: "Kenapa hilirisasi penting?",
                a: "Karena meningkatkan nilai tambah ekonomi dan memperkuat industri dalam negeri, bukan hanya ekspor bahan mentah.",
              },
              {
                q: "Apa risikonya?",
                a: "Jika tidak efisien dan tidak diawasi, proses bisa meningkatkan emisi, limbah, dan konflik sosial.",
              },
            ]}
          />
        </div>
      </Scene>

      {/* CH 4 */}
      <Scene
        id="c4"
        kicker="BAB 4 — Baterai"
        title="Nikel jadi ‘jantung’ baterai: kapasitas naik, tuntutan juga naik."
        bg="bg-neon-yellow/15"
        sticker="Mini Game!"
      >
        <p className="text-lg">
          Nikel banyak digunakan di baterai lithium-ion (termasuk untuk mobil
          listrik). Semakin besar kebutuhan baterai, semakin besar juga
          kebutuhan bahan baku. Biar tidak boring: <b>kita rakit modulnya</b>.
        </p>

        <div className="mt-6">
          <MiniAssembler />
        </div>
      </Scene>

      {/* CH 5 */}
      <Scene
        id="c5"
        kicker="BAB 5 — Mobil Listrik"
        title="Energi bersih itu keren—tapi supply chain-nya harus bertanggung jawab."
        bg="bg-neon-cyan/10"
        sticker="EV Reality"
      >
        <p className="text-lg">
          Mobil listrik mengurangi emisi saat digunakan, tapi rantai pasok
          baterai (termasuk nikel) tetap punya dampak. Jadi narasinya bukan “EV
          buruk”, tapi: <b>EV harus didukung supply chain yang lebih baik</b>.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <StatCard
            label="Manfaat"
            value="Emisi penggunaan turun"
            color="bg-neon-lime"
            tilt="rotate-[-1deg]"
          />
          <StatCard
            label="Tantangan"
            value="Dampak hulu"
            color="bg-neon-pink"
            tilt="rotate-[1deg]"
          />
          <StatCard
            label="Solusi"
            value="Rantai pasok bertanggung jawab"
            color="bg-neon-yellow"
            tilt="rotate-[-1deg]"
          />
        </div>

        <div className="mt-6 brutal-card-sm p-4 bg-neon-purple/20">
          <div className="font-mono text-xs font-black uppercase tracking-widest">
            Catatan Expo
          </div>
          <div className="mt-1">
            Pengunjung biasanya berhenti di sini karena “plot twist”-nya:
            teknologi hijau tetap butuh tambang.
          </div>
        </div>
      </Scene>

      {/* CH 6 */}
      <Scene
        id="c6"
        kicker="BAB 6 — Dampak Ekonomi"
        title="Mainkan dampak: positif & negatif bisa muncul bersamaan."
        bg="bg-neon-pink/10"
        sticker="Play Zone"
      >
        <p className="text-lg">
          Nikel bisa meningkatkan ekspor & pekerjaan (positif), tapi juga
          memunculkan tekanan lingkungan & risiko ketergantungan komoditas
          (negatif). Coba “rasakan” lewat simulator.
        </p>

        <div className="mt-6">
          <ImpactDial onMood={onMood} />
        </div>
      </Scene>

      {/* CH 7 */}
      <Scene
        id="c7"
        kicker="BAB 7 — Pilihan Kita"
        title="Kamu juga bagian dari sistem: pilihan kecil bisa jadi besar."
        bg={choice ? "bg-neon-lime/10" : "bg-neon-orange/10"}
        sticker="Decision Time"
      >
        <p className="text-lg">
          Tanpa menyalahkan siapa pun: masa depan itu gabungan dari kebijakan,
          industri, dan perilaku pengguna. Pilih satu aksi dan lihat narasi jadi
          lebih “hopeful”.
        </p>

        <div className="mt-6">
          <ChoiceChips onPick={setChoice} />
        </div>

        <div className="mt-6 brutal-card-sm p-4 bg-paper">
          <div className="font-mono text-xs font-black uppercase tracking-widest">
            Story Update
          </div>
          <p className="mt-2">
            {choice === "reuse"
              ? "Kamu memilih memperpanjang umur perangkat. Permintaan bahan mentah bisa lebih terkendali."
              : choice === "recycle"
              ? "Kamu memilih daur ulang. Material punya kesempatan kembali ke siklus."
              : choice === "smart"
              ? "Kamu memilih penggunaan bijak. Ini cara paling realistis untuk kebanyakan orang."
              : "Pilih satu aksi untuk membuka vibes bab terakhir."}
          </p>
        </div>
      </Scene>

      {/* CH 8 */}
      <Scene
        id="c8"
        kicker="BAB 8 — Masa Depan"
        title="Menuju energi yang bertanggung jawab (SDG 8, 11, 12)."
        bg="bg-neon-purple/10"
        sticker="Finale"
      >
        <p className="text-lg">
          Optimisasi energi & ekonomi hanya bisa tercapai kalau pertumbuhan,
          lingkungan, dan masyarakat berjalan seimbang.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="brutal-card-sm p-4 bg-neon-lime/40 rotate-[-1deg]">
            <div className="font-mono text-xs font-black uppercase tracking-widest">
              SDG 8
            </div>
            <div className="mt-1 font-mono font-black">Pekerjaan & Ekonomi</div>
            <div className="mt-2 text-sm">
              Pertumbuhan yang tetap layak & aman.
            </div>
          </div>
          <div className="brutal-card-sm p-4 bg-neon-cyan/35 rotate-[1deg]">
            <div className="font-mono text-xs font-black uppercase tracking-widest">
              SDG 11
            </div>
            <div className="mt-1 font-mono font-black">Kota Berkelanjutan</div>
            <div className="mt-2 text-sm">
              Transportasi dan sistem yang lebih bersih.
            </div>
          </div>
          <div className="brutal-card-sm p-4 bg-neon-yellow/35 rotate-[-1deg]">
            <div className="font-mono text-xs font-black uppercase tracking-widest">
              SDG 12
            </div>
            <div className="mt-1 font-mono font-black">Konsumsi Bijak</div>
            <div className="mt-2 text-sm">
              Reduce • Reuse • Recycle, tapi real.
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a className="brutal-btn bg-neon-cyan" href="/about">
            Lihat Profil Kelompok
          </a>
          <a className="brutal-btn bg-neon-yellow" href="#top">
            Ulang dari Awal
          </a>
        </div>
      </Scene>

      {/* Closing note */}
      <section id="about" className="px-4 py-24 bg-paper">
        <div className="mx-auto max-w-6xl brutal-card p-6 md:p-8">
          <div className="tape font-mono text-xs font-black uppercase tracking-widest">
            Penutup
          </div>
          <h2 className="mt-3 text-3xl font-black md:text-5xl">
            Intinya: Nikel itu penting, tapi tidak boleh “asal”.
          </h2>
          <p className="mt-4 text-lg">
            Website ini dibuat supaya pengunjung expo paham alur besar nikel
            dari hulu ke hilir, tanpa bosan—karena setiap bab punya aksi dan
            visual.
          </p>
        </div>
      </section>
    </div>
  );
}
