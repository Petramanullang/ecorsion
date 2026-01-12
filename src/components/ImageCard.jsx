"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageCard({ src, alt, label }) {
  const [failed, setFailed] = useState(false);

  // fallback kalau file gambar belum ada di /public/images
  if (!src || failed) {
    return (
      <div className="relative brutal-card p-0 overflow-hidden cut-corner2">
        <div className="h-[180px] sm:h-[240px] lg:h-[260px] w-full bg-paper">
          <div className="h-full w-full grid place-items-center">
            <div className="tape text-xs font-black uppercase tracking-widest">
              {label || "Gambar"}
            </div>
          </div>
        </div>

        {label ? (
          <div className="absolute left-3 top-3 tape text-xs font-black uppercase tracking-widest">
            {label}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="relative brutal-card p-0 overflow-hidden cut-corner2">
      <Image
        src={src}
        alt={alt || "image"}
        width={1200}
        height={800}
        sizes="(max-width: 768px) 100vw, 40vw"
        className="h-[180px] sm:h-[240px] lg:h-[260px] w-full object-cover rounded-xl"
        onError={() => setFailed(true)}
      />
      {label ? (
        <div className="absolute left-3 top-3 tape text-xs font-black uppercase tracking-widest">
          {label}
        </div>
      ) : null}
    </div>
  );
}
