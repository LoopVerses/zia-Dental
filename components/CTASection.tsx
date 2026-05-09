"use client";

import { motion } from "framer-motion";
import { Calendar, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { SITE } from "@/lib/constants";

const easeOut = [0.21, 0.47, 0.32, 0.98] as const;

const PLUS_PATTERN = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'>
    <g fill='none' stroke='#1E3A4A' stroke-opacity='0.18' stroke-width='1' stroke-linecap='round'>
      <path d='M20 13v14M13 20h14'/>
    </g>
  </svg>`,
)}`;

export function CTASection() {
  const { ref, inView } = useScrollAnimation<HTMLDivElement>({ margin: "-100px" });

  return (
    <section
      aria-labelledby="cta-heading"
      className="relative bg-dental-cream overflow-hidden"
    >
      {/* Plus pattern background */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: `url("${PLUS_PATTERN}")`,
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />

      {/* Floating decorative tooth shapes */}
      <ToothShape className="absolute -top-10 -left-10 h-44 w-44 text-dental-teal opacity-[0.05] -rotate-12" />
      <ToothShape className="absolute -bottom-12 -right-12 h-56 w-56 text-dental-teal opacity-[0.05] rotate-[18deg]" />
      <ToothShape className="absolute top-1/2 left-[8%] h-20 w-20 text-dental-gold opacity-[0.08] rotate-[40deg] hidden lg:block" />
      <ToothShape className="absolute top-1/3 right-[10%] h-24 w-24 text-dental-gold opacity-[0.08] -rotate-[20deg] hidden lg:block" />

      <div ref={ref} className="container-x relative py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: easeOut }}
          className="mx-auto max-w-[700px] text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.92 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-dental-teal/15 bg-white/70 backdrop-blur px-4 py-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-dental-gold" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-dental-teal">
              Ready when you are.
            </span>
          </motion.span>

          <motion.h2
            id="cta-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.2 }}
            className="mt-6 font-serif font-medium text-dental-teal text-display-lg text-balance leading-[1.1]"
          >
            Your best smile is{" "}
            <span className="italic text-dental-gold">closer</span> than you think.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.3 }}
            className="mt-6 text-base sm:text-lg text-dental-muted leading-relaxed text-pretty"
          >
            Visit us at Melody Market, G-6 Markaz — or call to book a consultation. No
            pressure, no surprises.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.4 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <Button href="#contact" size="lg" withArrow aria-label="Book an appointment">
              <Calendar className="h-4 w-4" />
              Book Appointment
            </Button>
            <Button
              href={SITE.contact.phoneHref}
              variant="outline"
              size="lg"
              aria-label={`Call ${SITE.contact.phoneFormatted}`}
            >
              <Phone className="h-4 w-4" />
              Call {SITE.contact.phoneFormatted}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ToothShape({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M32 8c-9 0-16 4.5-16 13 0 5 2 9 4 14s2 17 5 17c2.5 0 3-7 5-12 1-2.5 1.5-3 2-3s1 .5 2 3c2 5 2.5 12 5 12 3 0 3-12 5-17s4-9 4-14C48 12.5 41 8 32 8Z" />
    </svg>
  );
}
