"use client";

export default function EdgeGimmicks() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-10 opacity-90"
      aria-hidden="true"
    >
      {/* kiri atas: shard */}
      <div className="absolute left-6 top-[140px] hidden md:block">
        <div className="shard w-[140px] p-3 bg-neon-cyan/35">
          <div className="text-xs font-black uppercase tracking-widest">
            Mode
          </div>
          <div className="mt-1 font-black">Adventure</div>
        </div>
      </div>

      {/* kanan tengah: ribbon */}
      <div className="absolute right-7 top-[44%] hidden md:block">
        <div className="ribbon bg-neon-yellow/70">Klik titik bab → loncat</div>
      </div>

      {/* kiri bawah: shard2 */}
      <div className="absolute left-8 bottom-[110px] hidden md:block">
        <div className="shard2 w-[150px] p-3 bg-neon-lime/35">
          <div className="text-xs font-black uppercase tracking-widest">
            Goal
          </div>
          <div className="mt-1 font-black">Solusi Nyata 💎</div>
        </div>
      </div>
    </div>
  );
}
