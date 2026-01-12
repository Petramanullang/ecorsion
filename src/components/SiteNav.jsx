"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function NavLinkBtn({ href, active, children, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={[
        "brutal-btn inline-flex items-center gap-2 whitespace-nowrap text-xs sm:text-sm w-full sm:w-auto justify-start sm:justify-center",
        active ? "bg-neon-lime" : "bg-paper",
      ].join(" ")}
    >
      <span className="brutal-card-sm bg-neon-pink px-2 py-2 inline-flex" />
      <span className="font-black">{children}</span>
    </Link>
  );
}

function HamburgerIcon({ open }) {
  return (
    <span className="relative block w-6 h-5">
      <span
        className={[
          "absolute left-0 top-0 h-[3px] w-full bg-ink",
          "transition-transform duration-200",
          open ? "translate-y-[8px] rotate-45" : "",
        ].join(" ")}
      />
      <span
        className={[
          "absolute left-0 top-[8px] h-[3px] w-full bg-ink",
          "transition-opacity duration-200",
          open ? "opacity-0" : "opacity-100",
        ].join(" ")}
      />
      <span
        className={[
          "absolute left-0 bottom-0 h-[3px] w-full bg-ink",
          "transition-transform duration-200",
          open ? "-translate-y-[8px] -rotate-45" : "",
        ].join(" ")}
      />
    </span>
  );
}

export default function SiteNav() {
  const p = usePathname();
  const isHome = p === "/";
  const isAbout = p === "/about";

  const headerRef = useRef(null);
  const [open, setOpen] = useState(false);

  // ✅ update --navH dari tinggi navbar (HANYA header utama)
  // Mobile menu dibuat overlay di luar header, supaya --navH stabil.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    let raf = 0;

    const setVar = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const navBottom = Math.ceil(rect.bottom);
        document.documentElement.style.setProperty("--navH", `${navBottom}px`);
        window.dispatchEvent(new Event("navheightchange"));
      });
    };

    setVar();
    window.addEventListener("resize", setVar);
    window.addEventListener("orientationchange", setVar);
    window.visualViewport?.addEventListener("resize", setVar);
    window.visualViewport?.addEventListener("scroll", setVar);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", setVar);
      window.removeEventListener("orientationchange", setVar);
      window.visualViewport?.removeEventListener("resize", setVar);
      window.visualViewport?.removeEventListener("scroll", setVar);
    };
  }, []);

  // ✅ tutup menu saat pindah halaman
  useEffect(() => {
    setOpen(false);
  }, [p]);

  // ✅ UX: lock scroll + ESC to close
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      data-site-nav
      className="fixed top-2 left-2 right-2 sm:top-3 sm:left-3 sm:right-3 z-50"
      style={{ pointerEvents: "none" }}
    >
      <div
        className="mx-auto max-w-6xl brutal-frame bg-paper px-3 py-2 sm:px-4 sm:py-3"
        style={{ pointerEvents: "auto" }}
      >
        {/* TOP ROW */}
        <div className="flex items-center justify-between gap-2 sm:gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="brutal-card-sm bg-neon-cyan px-3 py-2 font-black">
              Ni
            </div>

            <div className="leading-tight">
              <div className="font-black tracking-tight">ECORSION</div>
              <div className="hidden sm:block text-xs opacity-80">
                Energi &amp; Ekonomi • Expo Mode
              </div>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden sm:flex gap-2 flex-nowrap justify-end">
            <NavLinkBtn href="/" active={isHome}>
              Landing
            </NavLinkBtn>
            <NavLinkBtn href="/about" active={isAbout}>
              Profil
            </NavLinkBtn>
          </nav>

          {/* MOBILE HAMBURGER */}
          <button
            className="sm:hidden brutal-btn bg-paper px-3 py-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="Buka navigasi"
            aria-expanded={open}
          >
            <HamburgerIcon open={open} />
          </button>
        </div>
      </div>

      {/* MOBILE OVERLAY MENU (doesn't affect header height) */}
      {open && (
        <div
          className="fixed inset-0 z-[60] sm:hidden"
          style={{ pointerEvents: "auto" }}
        >
          <button
            className="absolute inset-0 bg-black/30"
            aria-label="Tutup menu"
            onClick={() => setOpen(false)}
          />

          <div className="absolute top-[calc(var(--navH)+10px)] right-3 left-3">
            <div className="mx-auto max-w-6xl">
              <div className="brutal-frame bg-paper p-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs font-black uppercase tracking-widest">
                    Menu
                  </div>
                  <button
                    className="brutal-btn bg-paper px-3 py-2"
                    onClick={() => setOpen(false)}
                  >
                    Tutup
                  </button>
                </div>

                <div className="mt-3 grid gap-2">
                  <NavLinkBtn
                    href="/"
                    active={isHome}
                    onClick={() => setOpen(false)}
                  >
                    Landing
                  </NavLinkBtn>
                  <NavLinkBtn
                    href="/about"
                    active={isAbout}
                    onClick={() => setOpen(false)}
                  >
                    Profil
                  </NavLinkBtn>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
