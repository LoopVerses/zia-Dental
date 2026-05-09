"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, ShieldCheck, Award, Quote, type LucideIcon } from "lucide-react";
import { SITE } from "@/lib/constants";

type Pillar = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const pillars: Pillar[] = [
  {
    icon: Heart,
    title: "Gentle Approach",
    description:
      "We take the anxiety out of dentistry — slow consultations, honest options, no pressure.",
  },
  {
    icon: ShieldCheck,
    title: "Modern Hygiene",
    description:
      "Sterile, single-use instruments and modern protocols on every visit, without exception.",
  },
  {
    icon: Award,
    title: "Beautiful Results",
    description:
      "From whitening to full smile makeovers, our work is precise, natural and built to last.",
  },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (imgRef.current) {
        const img = imgRef.current.querySelector("img");
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.18 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: imgRef.current,
                start: "top 90%",
                end: "bottom 20%",
                scrub: 1,
              },
            },
          );
        }
      }

      const words = headingRef.current?.querySelectorAll(".about-word");
      if (words && words.length) {
        gsap.fromTo(
          words,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            ease: "expo.out",
            duration: 1.0,
            stagger: 0.05,
            scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
          },
        );
      }

      gsap.utils.toArray<HTMLElement>(".about-pillar").forEach((p, i) => {
        gsap.fromTo(
          p,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: i * 0.08,
            scrollTrigger: { trigger: p, start: "top 90%" },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const heading = "A practice built around people, not procedures.";
  const words = heading.split(" ");

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-heading"
      className="relative py-24 lg:py-32 bg-dental-white overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-dental-gold/8 blur-3xl"
      />

      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div ref={imgRef} className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-premium">
              <Image
                src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1200&q=80"
                alt={`${SITE.doctor.name}, ${SITE.doctor.title} at Zia Dental Consultants`}
                fill
                sizes="(min-width: 1024px) 40vw, 95vw"
                className="object-cover will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dental-teal/35 via-transparent to-transparent" />
            </div>

            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 rounded-3xl border border-dental-gold/60 -z-10"
            />

            <div className="absolute -bottom-5 left-4 sm:left-8 bg-white rounded-2xl shadow-soft-lg border border-[#E5E0D8] px-5 py-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-dental-gold text-dental-teal font-serif text-base font-semibold">
                A
              </span>
              <div className="leading-tight">
                <div className="font-serif text-sm text-dental-teal">
                  {SITE.doctor.name}
                </div>
                <div className="text-[11px] text-dental-muted mt-0.5">
                  {SITE.doctor.title}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <span className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-dental-gold">
              About Us
            </span>
            <h2
              id="about-heading"
              ref={headingRef}
              className="mt-4 font-serif font-medium text-dental-teal text-display-lg leading-[1.1]"
            >
              <span className="block overflow-hidden">
                {words.slice(0, 4).map((w, i) => (
                  <span key={i} className="about-word inline-block mr-[0.22em]">
                    {w === "people," ? (
                      <span className="italic text-dental-gold">{w}</span>
                    ) : (
                      w
                    )}
                  </span>
                ))}
              </span>
              <span className="block overflow-hidden">
                {words.slice(4).map((w, i) => (
                  <span key={i} className="about-word inline-block mr-[0.22em]">
                    {w}
                  </span>
                ))}
              </span>
            </h2>
            <p className="mt-6 text-lg text-dental-muted leading-relaxed text-pretty">
              Zia Dental Consultants was founded on a simple belief — dental care should
              feel calm, personal, and quietly excellent. We take the time to understand
              each patient before we ever pick up an instrument.
            </p>

            <ul className="mt-10 space-y-5" aria-label="What we stand for">
              {pillars.map((pillar) => (
                <li key={pillar.title} className="about-pillar flex items-start gap-4">
                  <span className="mt-0.5 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-dental-teal/10 text-dental-teal">
                    <pillar.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-serif text-lg text-dental-teal leading-tight">
                      {pillar.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-dental-muted">
                      {pillar.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <blockquote className="relative mt-10 rounded-2xl bg-dental-cream border-l-4 border-dental-gold pl-6 pr-6 py-6">
              <Quote
                className="absolute top-5 right-5 h-6 w-6 text-dental-gold/40"
                aria-hidden
              />
              <p className="font-serif italic text-lg text-dental-teal leading-relaxed text-pretty">
                &ldquo;We don&rsquo;t see patients — we see people. Every smile that walks
                through our door is a story we get to be part of.&rdquo;
              </p>
              <footer className="mt-4 text-xs uppercase tracking-[0.2em] text-dental-gold font-sans not-italic">
                — The Zia Dental Team
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
