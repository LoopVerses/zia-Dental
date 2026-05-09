"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles } from "lucide-react";
import { SmileIllustration } from "./SmileIllustration";

type Treatment = "whitening" | "aligners" | "veneers";

type Case = {
  title: string;
  sub: string;
  treatment: Treatment;
};

const cases: Case[] = [
  {
    title: "Whitening & Polish",
    sub: "In-clinic professional whitening",
    treatment: "whitening",
  },
  {
    title: "Aligner Therapy",
    sub: "14 months · Adult orthodontics",
    treatment: "aligners",
  },
  {
    title: "Veneers & Restoration",
    sub: "Full smile makeover",
    treatment: "veneers",
  },
];

export function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".gallery-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            delay: i * 0.1,
            scrollTrigger: { trigger: card, start: "top 85%" },
          },
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      aria-labelledby="gallery-heading"
      className="relative py-24 lg:py-32 bg-dental-cream overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/2 bg-gradient-to-r from-transparent via-dental-gold/40 to-transparent"
      />

      <div className="container-x">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-dental-gold">
            <Sparkles className="h-3.5 w-3.5" />
            Smile Gallery
          </span>
          <h2
            id="gallery-heading"
            className="mt-4 font-serif font-medium text-dental-teal text-display-lg text-balance"
          >
            Real teeth,{" "}
            <span className="italic text-dental-gold">real transformations.</span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-dental-muted leading-relaxed">
            Drag the slider on each card to compare the before-and-after of three
            common treatments we deliver every week.
          </p>
        </div>

        <ul className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((c) => (
            <li key={c.title} className="gallery-card">
              <BeforeAfterCard data={c} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function BeforeAfterCard({ data }: { data: Case }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const draggingRef = useRef(false);

  const setFromPointer = (clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, x)));
  };

  useLayoutEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      setFromPointer(e.clientX);
    };
    const onUp = () => {
      draggingRef.current = false;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-dental-text/5 bg-white shadow-soft transition-all duration-500 hover:shadow-premium hover:-translate-y-1">
      <div
        ref={wrapRef}
        onPointerDown={(e) => {
          draggingRef.current = true;
          setFromPointer(e.clientX);
        }}
        className="relative aspect-[4/5] overflow-hidden cursor-ew-resize select-none bg-dental-teal"
        data-cursor="Drag"
      >
        {/* AFTER (full layer — bright, aligned) */}
        <div className="absolute inset-0">
          <SmileIllustration variant="after" treatment={data.treatment} />
        </div>

        {/* BEFORE (clipped from the left — yellowed / crooked) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <SmileIllustration variant="before" treatment={data.treatment} />
        </div>

        <span
          className="absolute top-3 left-3 rounded-full bg-white/85 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-dental-teal"
          aria-hidden
        >
          Before
        </span>
        <span
          className="absolute top-3 right-3 rounded-full bg-dental-teal/90 text-dental-white backdrop-blur px-3 py-1 text-[10px] uppercase tracking-[0.22em]"
          aria-hidden
        >
          After
        </span>

        <div
          className="absolute inset-y-0"
          style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
        >
          <span
            aria-hidden
            className="absolute inset-y-0 w-px bg-white/95 shadow-[0_0_10px_rgba(255,255,255,0.6)]"
          />
          <span
            aria-hidden
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-dental-teal shadow-soft-lg ring-1 ring-dental-gold/40"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
              <path
                d="M9 6L4 12L9 18M15 6L20 12L15 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>

      <div className="p-5 flex items-center justify-between">
        <div className="leading-tight">
          <div className="font-serif text-lg text-dental-teal">{data.title}</div>
          <div className="mt-0.5 text-xs text-dental-muted uppercase tracking-[0.18em]">
            {data.sub}
          </div>
        </div>
        <span className="text-[10px] uppercase tracking-[0.22em] text-dental-gold">
          Drag →
        </span>
      </div>
    </article>
  );
}
