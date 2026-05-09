"use client";

import { Award, BadgeCheck, GraduationCap, Globe2, ShieldCheck, Star } from "lucide-react";

const items = [
  { icon: Award, label: "PMC Registered" },
  { icon: GraduationCap, label: "BDS · MSc Orthodontics" },
  { icon: BadgeCheck, label: "Invisalign Certified" },
  { icon: Globe2, label: "Member · Pakistan Dental Association" },
  { icon: ShieldCheck, label: "ISO Sterilization Standards" },
  { icon: Star, label: "5-Star Rated · 200+ Reviews" },
  { icon: Award, label: "15+ Years of Practice" },
  { icon: GraduationCap, label: "Continued Clinical Education" },
];

export function TrustMarquee() {
  const repeated = [...items, ...items];

  return (
    <section
      aria-label="Credentials and trust signals"
      className="relative bg-dental-cream border-y border-dental-gold/15 py-7 overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-dental-cream to-transparent z-10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-dental-cream to-transparent z-10"
      />

      <div className="flex items-center w-max animate-marquee-x will-change-transform">
        {repeated.map((it, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-8 sm:px-12"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-dental-teal border border-dental-gold/30">
              <it.icon className="h-4 w-4" aria-hidden />
            </span>
            <span className="font-serif text-base sm:text-lg text-dental-teal whitespace-nowrap">
              {it.label}
            </span>
            <span aria-hidden className="text-dental-gold/50 font-serif text-2xl">
              ·
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
