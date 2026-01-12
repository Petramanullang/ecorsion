"use client";

import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

function getNavHeight() {
  const nav =
    document.querySelector("[data-site-nav]") ||
    document.querySelector("header") ||
    document.querySelector("nav");

  if (nav) {
    const r = nav.getBoundingClientRect?.();
    if (r && r.bottom) return Math.ceil(r.bottom);
    if (nav.offsetHeight) return nav.offsetHeight;
  }

  const v = getComputedStyle(document.documentElement).getPropertyValue(
    "--navH"
  );
  const n = parseInt(v || "76", 10);
  return Number.isFinite(n) ? n : 76;
}

export function scrollToId(id, extra = 18) {
  const el = document.getElementById(id);
  if (!el) return;

  const navH = getNavHeight();

  // mini-progress hanya relevan di mobile (< xl)
  const hud = document.querySelector(".mini-progress");
  const hudH =
    hud && window.innerWidth < 1280 ? (hud.offsetHeight || 0) + 10 : 0;

  const offsetY = navH + hudH + extra;

  gsap.to(window, {
    duration: 0.8,
    ease: "power2.out",
    scrollTo: { y: el, offsetY, autoKill: false },
    overwrite: true,
  });
}
