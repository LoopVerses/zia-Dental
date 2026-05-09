"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CalendarCheck, Stethoscope, Sparkles, Heart } from "lucide-react";

const steps = [
  {
    n: "01",
    icon: CalendarCheck,
    title: "Consultation",
    body: "We start with a calm, unhurried conversation. Your goals, your concerns — we map them together before any plan begins.",
    image:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
  },
  {
    n: "02",
    icon: Stethoscope,
    title: "Diagnosis",
    body: "Modern imaging, thorough examination and a written treatment plan with clear options — and clear pricing.",
    image:
      "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1200&q=80",
  },
  {
    n: "03",
    icon: Sparkles,
    title: "Treatment",
    body: "Premium materials, precise technique, and the latest tools — delivered in a quiet, spa-like setting.",
    image:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    n: "04",
    icon: Heart,
    title: "Aftercare",
    body: "Healing is part of the experience. We follow through with check-ins, guidance and lifelong support.",
    image:
      "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=1200&q=80",
  },
];

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const lines = headingRef.current?.querySelectorAll(".reveal-word");
      if (lines && lines.length) {
        gsap.fromTo(
          lines,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            ease: "expo.out",
            duration: 1.0,
            stagger: 0.05,
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
            },
          },
        );
      }

      gsap.fromTo(
        ".process-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: {
            trigger: ".process-list",
            start: "top 70%",
            end: "bottom 80%",
            scrub: 1,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>(".process-step").forEach((step, i) => {
        const img = step.querySelector(".process-img");
        const txt = step.querySelector(".process-txt");
        gsap.fromTo(
          step,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: step, start: "top 80%" },
          },
        );
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.15 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: step,
                start: "top 90%",
                end: "bottom 20%",
                scrub: 1,
              },
            },
          );
        }
        if (txt) {
          gsap.fromTo(
            txt,
            { x: i % 2 === 0 ? -40 : 40, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: step, start: "top 78%" },
            },
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const heading = "From first hello to a smile that lasts";
  const words = heading.split(" ");

  return (
    <section
      ref={sectionRef}
      id="process"
      aria-labelledby="process-heading"
      className="relative py-24 lg:py-32 bg-dental-white overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 right-0 h-96 w-96 rounded-full bg-dental-gold/8 blur-3xl"
      />

      <div className="container-x">
        <div className="max-w-3xl">
          <span className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-dental-gold">
            Your Journey
          </span>
          <h2
            id="process-heading"
            ref={headingRef}
            className="mt-4 font-serif font-medium text-dental-teal text-display-lg leading-[1.1]"
          >
            <span className="block overflow-hidden">
              {words.slice(0, 4).map((w, i) => (
                <span key={i} className="reveal-word inline-block mr-[0.22em]">
                  {w}
                </span>
              ))}
            </span>
            <span className="block overflow-hidden">
              {words.slice(4).map((w, i) => (
                <span
                  key={i}
                  className={`reveal-word inline-block mr-[0.22em] ${
                    w === "smile" || w === "lasts" ? "italic text-dental-gold" : ""
                  }`}
                >
                  {w}
                </span>
              ))}
            </span>
          </h2>
        </div>

        <ol className="process-list relative mt-20 lg:mt-24">
          <span
            aria-hidden
            className="process-line absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-dental-gold/0 via-dental-gold/60 to-dental-gold/0 sm:-translate-x-1/2"
          />

          {steps.map((step, i) => {
            const isLeft = i % 2 === 0;
            return (
              <li
                key={step.n}
                className="process-step relative grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-16 mb-20 sm:mb-32 last:mb-0"
              >
                <span
                  aria-hidden
                  className="absolute left-6 sm:left-1/2 top-2 sm:top-6 -translate-x-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-dental-cream border border-dental-gold/40 text-dental-teal shadow-soft z-10"
                >
                  <step.icon className="h-5 w-5" aria-hidden />
                </span>

                <div
                  className={`process-txt pl-20 sm:pl-0 ${
                    isLeft ? "sm:text-right sm:pr-16" : "sm:order-2 sm:pl-16"
                  }`}
                >
                  <span className="font-serif text-7xl text-dental-gold/20 leading-none select-none block">
                    {step.n}
                  </span>
                  <h3 className="mt-2 font-serif text-3xl text-dental-teal leading-tight">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-dental-muted text-pretty max-w-md sm:inline-block">
                    {step.body}
                  </p>
                </div>

                <div
                  className={`pl-20 sm:pl-0 ${
                    isLeft ? "sm:order-2 sm:pl-16" : "sm:pr-16"
                  }`}
                >
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-premium">
                    <Image
                      src={step.image}
                      alt={`${step.title} — Zia Dental experience`}
                      fill
                      sizes="(min-width: 1024px) 40vw, 95vw"
                      className="process-img object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dental-teal/35 via-transparent to-transparent" />
                    <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-dental-teal">
                      Step {step.n}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
