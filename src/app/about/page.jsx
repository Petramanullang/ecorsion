import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="px-4 py-10">
      <section className="mx-auto max-w-6xl brutal-card p-6 md:p-8">
        <div className="sticker">
          <span className="h-3 w-3 bg-neon-cyan border-ink border-3 shadow-brutalSm" />
          KELOMPOK 4 • ECORSION
        </div>

        <h1 className="mt-4 text-4xl font-black md:text-6xl">
          Profil Proyek & Tim
        </h1>

        <p className="mt-4 text-lg">
          <b>ECORSION (Economic Energy Optimization)</b> membahas hubungan{" "}
          <b>energi & ekonomi</b> dengan fokus pada <b>nikel</b>, peran nikel
          dalam <b>mobil listrik</b>, serta dampak positif dan negatifnya.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="brutal-card-sm p-4 bg-neon-yellow/35">
            <div className="text-xs font-black uppercase tracking-widest">
              Topik
            </div>
            <div className="mt-1 font-black">Nikel & Mobil Listrik</div>
          </div>
          <div className="brutal-card-sm p-4 bg-neon-cyan/30">
            <div className="text-xs font-black uppercase tracking-widest">
              Fokus
            </div>
            <div className="mt-1 font-black">Dampak Ekonomi</div>
          </div>
          <div className="brutal-card-sm p-4 bg-neon-lime/30">
            <div className="text-xs font-black uppercase tracking-widest">
              SDGs
            </div>
            <div className="mt-1 font-black">8 • 11 • 12</div>
          </div>
        </div>

        <div className="mt-8 wavy" />

        <div className="mt-8 brutal-card p-0 overflow-hidden">
          <div className="bg-neon-lime px-4 py-3 font-black uppercase tracking-widest border-b-3 border-ink">
            Struktur Tim
          </div>

          <div className="p-4 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {["Posisi", "Peran", "Nama", "NIM"].map((h) => (
                    <th
                      key={h}
                      className="border-3 border-ink bg-paper px-3 py-3 text-left text-xs font-black uppercase tracking-widest"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-3 border-ink px-3 py-3">
                    Ketua
                  </td>
                  <td className="border-3 border-ink px-3 py-3">🎨 Hipster</td>
                  <td className="border-3 border-ink px-3 py-3">
                    PETRA JULIANSEN MANULLANG
                  </td>
                  <td className="border-3 border-ink px-3 py-3">202431127</td>
                </tr>
                <tr>
                  <td className="border-3 border-ink px-3 py-3">Anggota</td>
                  <td className="border-3 border-ink px-3 py-3">💻 Hacker</td>
                  <td className="border-3 border-ink px-3 py-3">
                    Yanfa Nur Fadhlih
                  </td>
                  <td className="border-3 border-ink px-3 py-3">202431113</td>
                </tr>
                <tr>
                  <td className="border-3 border-ink px-3 py-3">Anggota</td>
                  <td className="border-3 border-ink px-3 py-3">📣 Hustler</td>
                  <td className="border-3 border-ink px-3 py-3">
                    Hadijah Tohepaly
                  </td>
                  <td className="border-3 border-ink px-3 py-3">202431078</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link className="brutal-btn bg-neon-cyan" href="/">
            Kembali ke Landing
          </Link>
          <Link className="brutal-btn bg-neon-yellow" href="/#step-5">
            Coba Simulator
          </Link>
        </div>
      </section>
    </main>
  );
}
