"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";

const easeOut = [0.21, 0.47, 0.32, 0.98] as const;

type Testimonial = {
  name: string;
  location: string;
  stars: number;
  text: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Amna Tariq",
    location: "F-7, Islamabad",
    stars: 5,
    text: "Dr. Adeel is genuinely the most patient dentist I've ever visited. My daughter used to cry before dental visits — now she asks when we're going back. The clinic is spotless and the team is so warm.",
  },
  {
    name: "Bilal Hussain",
    location: "G-10, Islamabad",
    stars: 5,
    text: "Got my braces fitted here and the whole orthodontic journey was smooth. Clear explanations at every step, no hidden charges, and the results after 14 months — my confidence has completely changed.",
  },
  {
    name: "Sara Malik",
    location: "Blue Area, Islamabad",
    stars: 5,
    text: "I needed a root canal and was terrified. The team at Zia Dental made it completely painless — both literally and emotionally. The clinic feels more like a spa than a dentist's office.",
  },
];

const initialsOf = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

export function TestimonialsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });
  const gridInView = useInView(gridRef, { once: true, margin: "-80px" });

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative py-24 lg:py-32 bg-dental-white"
    >
      <div className="container-x">
        {/* Header */}
        <div ref={headerRef} className="max-w-2xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: easeOut }}
            className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-dental-gold"
          >
            Patient Stories
          </motion.span>
          <motion.h2
            id="testimonials-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.1 }}
            className="mt-4 font-serif font-medium text-dental-teal text-display-lg text-balance"
          >
            Smiles that <span className="italic text-dental-gold">speak for themselves.</span>
          </motion.h2>
        </div>

        {/* Cards — snap-scroll carousel on mobile, 3-col grid on desktop */}
        <ul
          ref={gridRef}
          className="mt-16 lg:mt-20 flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none scroll-smooth -mx-6 px-6 md:mx-0 md:px-0 pb-4 md:pb-0"
        >
          {testimonials.map((t, i) => (
            <motion.li
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                ease: easeOut,
                delay: i * 0.12,
              }}
              className="snap-center shrink-0 w-[85%] sm:w-[60%] md:w-auto md:shrink"
            >
              <article
                className="group relative h-full bg-white rounded-2xl border border-[#E5E0D8] p-7 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-soft-lg overflow-hidden"
              >
                {/* Gold left border accent on hover */}
                <span
                  aria-hidden
                  className="absolute left-0 top-0 bottom-0 w-1 bg-dental-gold scale-y-0 origin-top transition-transform duration-500 group-hover:scale-y-100"
                />

                <Quote
                  className="absolute top-6 right-6 h-7 w-7 text-dental-gold/20 group-hover:text-dental-gold/50 transition-colors"
                  aria-hidden
                />

                {/* Stars */}
                <div className="flex items-center gap-1" aria-label={`${t.stars} out of 5 stars`}>
                  {Array.from({ length: t.stars }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="h-4 w-4 fill-dental-gold text-dental-gold"
                      aria-hidden
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="mt-5 text-base leading-relaxed text-dental-text/85 text-pretty">
                  &ldquo;{t.text}&rdquo;
                </blockquote>

                {/* Footer — avatar + name + location */}
                <footer className="mt-6 pt-5 border-t border-[#E5E0D8] flex items-center gap-3">
                  <span
                    aria-hidden
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-dental-teal text-dental-white font-medium text-sm tracking-wide"
                  >
                    {initialsOf(t.name)}
                  </span>
                  <div className="leading-tight">
                    <div className="font-serif text-sm text-dental-teal">{t.name}</div>
                    <div className="text-xs text-dental-muted mt-0.5">{t.location}</div>
                  </div>
                </footer>
              </article>
            </motion.li>
          ))}
        </ul>

        <p className="mt-8 text-center text-xs text-dental-muted md:hidden">
          ← Swipe to read more stories →
        </p>
      </div>
    </section>
  );
}
