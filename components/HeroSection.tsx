"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Calendar, Star, Sparkles } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";
import { STATS } from "@/lib/services";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const easeOut = [0.21, 0.47, 0.32, 0.98] as const;

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const headingWords = headingRef.current?.querySelectorAll(".hero-word");
      if (headingWords && headingWords.length) {
        gsap.fromTo(
          headingWords,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.06,
            delay: 0.3,
          },
        );
      }

      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      gsap.to(".hero-bg-blob", {
        y: 60,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headlineLines = [
    ["Nurturing", "your"],
    ["smile,", "one"],
    ["connection", "at", "a", "time."],
  ];

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-label="Welcome to Zia Dental Consultants"
      className="relative isolate min-h-screen flex items-center pt-28 pb-24 lg:pt-32 lg:pb-32 bg-white overflow-hidden"
    >

      <div className="container-x relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* LEFT — content */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeOut, delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border border-dental-gold/30 bg-dental-gold/8 px-4 py-1.5 mb-7 backdrop-blur-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-dental-gold" />
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-dental-gold">
                Islamabad&rsquo;s Trusted Dental Care
              </span>
            </motion.div>

            <h1
              ref={headingRef}
              className="font-serif font-medium text-dental-text text-[44px] sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight"
            >
              {headlineLines.map((line, li) => (
                <span key={li} className="block overflow-hidden">
                  {line.map((word, wi) => (
                    <span
                      key={`${li}-${wi}`}
                      className="hero-word inline-block mr-[0.22em]"
                    >
                      {li === 0 && wi === 1 ? (
                        <span className="text-dental-teal italic">{word}</span>
                      ) : li === 1 && wi === 0 ? (
                        <span className="text-dental-teal italic">{word}</span>
                      ) : (
                        word
                      )}
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeOut, delay: 1.2 }}
              className="mt-7 max-w-xl text-lg leading-relaxed text-dental-muted text-pretty"
            >
              Zia Dental Consultants is a calm, modern practice in the heart of
              Islamabad — blending advanced dentistry with the warmth of personal
              attention.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeOut, delay: 1.35 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Button
                href="#contact"
                size="lg"
                withArrow
                aria-label="Book an appointment"
                data-cursor="Book"
              >
                <Calendar className="h-4 w-4" />
                Book Appointment
              </Button>
              <Button
                href={SITE.contact.phoneHref}
                variant="outline"
                size="lg"
                aria-label={`Call ${SITE.contact.phoneFormatted}`}
                data-cursor="Call"
              >
                <Phone className="h-4 w-4" />
                Call {SITE.contact.phoneFormatted}
              </Button>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeOut, delay: 1.5 }}
              className="mt-12 flex flex-wrap items-stretch gap-3"
              aria-label="Practice highlights"
            >
              {STATS.map((stat) => (
                <li
                  key={stat.label}
                  className="flex items-center gap-3 rounded-2xl bg-white/80 backdrop-blur border border-dental-text/5 px-4 py-3 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-soft-lg"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-dental-teal/8 text-dental-teal">
                    <stat.icon className="h-4 w-4" />
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="font-serif text-lg text-dental-teal font-semibold">
                      {stat.value}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.16em] text-dental-muted">
                      {stat.label}
                    </span>
                  </span>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* RIGHT — image */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: easeOut, delay: 0.5 }}
            className="lg:col-span-2 relative order-first lg:order-last"
          >
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-dental-teal/15 via-dental-teal-light/10 to-dental-gold/12 blur-2xl"
            />

            <motion.div
              ref={imageRef}
              initial={{ rotate: 0 }}
              animate={{ rotate: 2 }}
              transition={{ duration: 1.2, ease: easeOut, delay: 0.7 }}
              className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-premium"
              data-cursor="Explore"
            >
              <Image
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80"
                alt="Modern interior of Zia Dental Consultants clinic in Islamabad"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 95vw"
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dental-teal/40 via-transparent to-transparent" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-3xl" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30, rotate: -2 }}
              animate={{ opacity: 1, y: 0, rotate: -3 }}
              transition={{ duration: 0.7, ease: easeOut, delay: 1.6 }}
              className="absolute -bottom-5 -left-3 sm:-left-6 bg-white rounded-2xl shadow-soft-lg border border-dental-text/5 px-4 py-3 flex items-center gap-3"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <div className="leading-tight">
                <div className="text-[11px] uppercase tracking-[0.18em] text-dental-muted">
                  Open Today
                </div>
                <div className="text-sm font-medium text-dental-teal">
                  Until 9:00 PM
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20, rotate: 4 }}
              animate={{ opacity: 1, y: 0, rotate: 4 }}
              transition={{ duration: 0.7, ease: easeOut, delay: 1.75 }}
              className="absolute -top-4 -right-3 sm:-right-6 bg-white rounded-2xl shadow-soft-lg border border-dental-text/5 px-4 py-3 flex items-center gap-3"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-dental-gold/15">
                <Star className="h-4 w-4 text-dental-gold fill-dental-gold" />
              </span>
              <div className="leading-tight">
                <div className="text-sm font-semibold text-dental-teal">
                  5,000+ Patients
                </div>
                <div className="text-[11px] text-dental-muted">
                  trusted us with their care
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute left-1/2 -translate-x-1/2 bottom-8 hidden md:flex flex-col items-center gap-2 z-10 pointer-events-none"
        aria-hidden
      >
        <span className="text-[10px] uppercase tracking-[0.32em] text-dental-muted">
          Scroll
        </span>
        <span className="relative h-10 w-[1px] bg-dental-teal/15 overflow-hidden">
          <span className="absolute inset-x-0 top-0 h-3 bg-dental-gold animate-scroll-cue" />
        </span>
      </motion.div>

      {/* Wave divider */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 leading-[0] pointer-events-none z-[1]"
      >
        <svg
          viewBox="0 0 1440 96"
          preserveAspectRatio="none"
          className="w-full h-12 sm:h-16 lg:h-20 block"
        >
          <path
            d="M0,64 C240,16 480,112 720,64 C960,16 1200,96 1440,48 L1440,96 L0,96 Z"
            fill="#F0EDE8"
            fillOpacity="0.5"
          />
          <path
            d="M0,80 C240,32 480,112 720,72 C960,32 1200,104 1440,64 L1440,96 L0,96 Z"
            fill="#FAFAF8"
          />
        </svg>
      </div>
    </section>
  );
}
