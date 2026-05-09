"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ShieldCheck,
  Microscope,
  Coffee,
  HeartHandshake,
  Wallet,
  Clock,
} from "lucide-react";

const features = [
  {
    icon: Microscope,
    title: "World-class technology",
    body: "Digital impressions, 3D imaging and modern endodontic tools — precision built into every visit.",
  },
  {
    icon: ShieldCheck,
    title: "Sterile, every time",
    body: "Single-use instruments. Hospital-grade sterilization. We don&rsquo;t cut corners on safety.",
  },
  {
    icon: HeartHandshake,
    title: "Genuinely warm care",
    body: "We slow down. We listen first. Our patients become friends — and most stay for life.",
  },
  {
    icon: Coffee,
    title: "Spa-like comfort",
    body: "A calm reception, soft lighting, and a clinic that doesn&rsquo;t feel like one. Anxiety-friendly.",
  },
  {
    icon: Wallet,
    title: "Honest pricing",
    body: "Clear written estimates before treatment. No hidden costs, no upsell, no surprises.",
  },
  {
    icon: Clock,
    title: "Open until 9 PM",
    body: "Late hours, every day. Built around your schedule — including Sundays from 12 PM.",
  },
];

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".feature-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            delay: (i % 3) * 0.08,
            scrollTrigger: { trigger: card, start: "top 88%" },
          },
        );
      });

      gsap.fromTo(
        ".features-bg",
        { yPercent: 30 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why"
      aria-labelledby="why-heading"
      className="relative py-24 lg:py-32 bg-dental-white overflow-hidden"
    >
      <div
        aria-hidden
        className="features-bg pointer-events-none absolute inset-0 -z-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 40% at 20% 30%, rgba(201,169,110,0.10), transparent 60%), radial-gradient(ellipse 50% 35% at 80% 70%, rgba(30,58,74,0.08), transparent 60%)",
        }}
      />

      <div className="container-x relative">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-14 lg:mb-20">
          <div className="lg:col-span-7">
            <span className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-dental-gold">
              Why Zia Dental
            </span>
            <h2
              id="why-heading"
              className="mt-4 font-serif font-medium text-dental-teal text-display-lg leading-[1.1] text-balance"
            >
              Six reasons our patients
              <span className="italic text-dental-gold"> never look back.</span>
            </h2>
          </div>
          <p className="lg:col-span-5 text-base sm:text-lg text-dental-muted leading-relaxed text-pretty">
            Premium dentistry isn&rsquo;t about the price tag — it&rsquo;s about the
            details that turn a procedure into a quietly excellent experience.
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {features.map((f) => (
            <li key={f.title}>
              <article
                className="feature-card group relative h-full overflow-hidden rounded-3xl border border-dental-text/5 bg-white p-7 lg:p-8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-premium"
                data-cursor="Discover"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(circle at top right, rgba(201,169,110,0.10), transparent 60%)",
                  }}
                />

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-dental-cream text-dental-teal transition-all duration-500 group-hover:bg-dental-teal group-hover:text-dental-gold group-hover:rotate-6">
                  <f.icon className="h-6 w-6" aria-hidden />
                </div>

                <h3 className="mt-7 font-serif text-xl text-dental-teal leading-snug">
                  {f.title}
                </h3>
                <p
                  className="mt-3 text-sm leading-relaxed text-dental-muted"
                  dangerouslySetInnerHTML={{ __html: f.body }}
                />

                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 right-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-dental-gold via-dental-gold/70 to-transparent transition-transform duration-700 group-hover:scale-x-100"
                />
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
