"use client";

import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let lenis: import("lenis").default | null = null;
    let rafId = 0;
    let cancelled = false;
    let onAnchorClick: ((e: Event) => void) | null = null;

    (async () => {
      const Lenis = (await import("lenis")).default;
      if (cancelled) return;

      lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.4,
        lerp: 0.1,
      });

      onAnchorClick = (e: Event) => {
        const target = e.target as HTMLElement | null;
        if (!target) return;
        const link = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
        if (!link) return;
        const href = link.getAttribute("href") ?? "";
        if (href.length < 2) return;
        const el = document.querySelector(href);
        if (!el) return;
        e.preventDefault();
        lenis?.scrollTo(el as HTMLElement, { offset: -80, duration: 1.4 });
      };
      document.addEventListener("click", onAnchorClick);

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    })();

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      if (onAnchorClick) document.removeEventListener("click", onAnchorClick);
      if (lenis) lenis.destroy();
    };
  }, []);

  return null;
}
