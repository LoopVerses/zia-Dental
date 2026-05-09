"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, Minus, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

const faqs = [
  {
    q: "Do I need a referral to book an appointment?",
    a: "No referral needed — you can book directly with us. New patients are welcome any day of the week, including Sundays from 12 PM.",
  },
  {
    q: "Are clear aligners (Invisalign-style) suitable for adults?",
    a: "Absolutely. Most adult cases — crowding, spacing, mild bite issues — are candidates. We&rsquo;ll confirm with a 3D scan during your consultation and walk through the timeline honestly.",
  },
  {
    q: "How much does a routine cleaning or check-up cost?",
    a: "Routine consultation and exam start from a transparent fixed price. Any treatment is quoted in writing before we begin — never any surprises at the till.",
  },
  {
    q: "What about anxious or first-time patients?",
    a: "We deliberately built the practice around calm. Slower consults, soft music, and the ability to pause anytime. Many of our most loyal patients arrived terrified.",
  },
  {
    q: "Do you treat children?",
    a: "Yes — pediatric dentistry is one of our specialties. We focus on building a positive first relationship with the dentist, not just fixing teeth.",
  },
  {
    q: "How long does a smile makeover take?",
    a: "It depends on the plan. Cosmetic veneers can be 2–3 visits; full alignment cases run 8–18 months. We&rsquo;ll give a realistic timeline upfront.",
  },
];

export function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(0);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".faq-row").forEach((row, i) => {
        gsap.fromTo(
          row,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            delay: i * 0.05,
            scrollTrigger: { trigger: row, start: "top 90%" },
          },
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="faq"
      aria-labelledby="faq-heading"
      className="relative py-24 lg:py-32 bg-dental-white"
    >
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32 self-start">
            <span className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-dental-gold">
              FAQ
            </span>
            <h2
              id="faq-heading"
              className="mt-4 font-serif font-medium text-dental-teal text-display-lg leading-[1.1] text-balance"
            >
              Honest answers to{" "}
              <span className="italic text-dental-gold">honest questions.</span>
            </h2>
            <p className="mt-6 text-base text-dental-muted leading-relaxed text-pretty">
              Still curious? We&rsquo;re happy to talk it through over WhatsApp or a
              quick call — no commitment, no pressure.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                href={SITE.contact.whatsappHref}
                variant="primary"
                size="md"
                aria-label="Chat with us on WhatsApp"
                data-cursor="Chat"
              >
                <MessageCircle className="h-4 w-4" />
                Ask on WhatsApp
              </Button>
              <Button
                href="#contact"
                variant="outline"
                size="md"
                withArrow
                data-cursor="Book"
              >
                Book a call
              </Button>
            </div>
          </div>

          <ul className="lg:col-span-7 divide-y divide-dental-text/10 border-y border-dental-text/10">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={f.q} className="faq-row">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="group w-full text-left flex items-start justify-between gap-6 py-6 lg:py-7"
                    data-cursor={isOpen ? "Close" : "Open"}
                  >
                    <span className="font-serif text-lg lg:text-xl text-dental-teal pr-4 leading-snug transition-colors group-hover:text-dental-teal-light">
                      {f.q}
                    </span>
                    <span
                      aria-hidden
                      className={`mt-1 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                        isOpen
                          ? "bg-dental-teal text-dental-gold border-dental-teal rotate-180"
                          : "bg-white text-dental-teal border-dental-text/15 group-hover:border-dental-gold"
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
                        className="overflow-hidden"
                      >
                        <p
                          className="pb-7 max-w-2xl text-base leading-relaxed text-dental-muted text-pretty"
                          dangerouslySetInnerHTML={{ __html: f.a }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
