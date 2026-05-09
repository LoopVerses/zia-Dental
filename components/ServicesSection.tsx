"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Shield,
  Sparkles,
  Crown,
  Activity,
  Smile,
  Heart,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

type ServiceCard = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const services: ServiceCard[] = [
  {
    icon: Shield,
    title: "General Dentistry",
    description:
      "Routine examinations, cleanings, fillings and preventive care to keep your mouth healthy for life.",
  },
  {
    icon: Sparkles,
    title: "Cosmetic Dentistry",
    description:
      "Whitening, veneers and bonding designed to refine your smile while looking entirely natural.",
  },
  {
    icon: Crown,
    title: "Crowns & Bridges",
    description:
      "Custom-crafted restorations that restore strength, function and the contour of your smile.",
  },
  {
    icon: Activity,
    title: "Root Canal Therapy",
    description:
      "Modern, comfortable endodontic treatment that saves your natural tooth and relieves pain.",
  },
  {
    icon: Smile,
    title: "Orthodontics & Aligners",
    description:
      "Traditional braces and clear aligners — straighter teeth tailored to your lifestyle.",
  },
  {
    icon: Heart,
    title: "Pediatric Dentistry",
    description:
      "Calm, friendly visits that help children build a positive relationship with the dentist.",
  },
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const words = headingRef.current?.querySelectorAll(".s-word");
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

      gsap.utils.toArray<HTMLElement>(".service-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: (i % 3) * 0.07,
            scrollTrigger: { trigger: card, start: "top 88%" },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const heading = "Comprehensive dentistry, delivered with care.";
  const words = heading.split(" ");

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-labelledby="services-heading"
      className="relative py-24 lg:py-32 bg-dental-cream"
    >
      <div className="container-x">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-dental-gold">
            What We Offer
          </span>
          <h2
            id="services-heading"
            ref={headingRef}
            className="mt-4 font-serif font-medium text-dental-teal text-display-lg leading-[1.1]"
          >
            <span className="block overflow-hidden">
              {words.slice(0, 2).map((w, i) => (
                <span key={i} className="s-word inline-block mr-[0.22em]">
                  {w}
                </span>
              ))}
            </span>
            <span className="block overflow-hidden">
              {words.slice(2).map((w, i) => (
                <span
                  key={i}
                  className={`s-word inline-block mr-[0.22em] ${
                    i >= 1 ? "italic text-dental-gold" : ""
                  }`}
                >
                  {w}
                </span>
              ))}
            </span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-dental-muted leading-relaxed text-pretty">
            From routine check-ups to full smile transformations — all under one warm,
            modern roof.
          </p>
        </div>

        <ul
          className="mt-16 lg:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          aria-label="Dental services we offer"
        >
          {services.map((service) => (
            <li key={service.title}>
              <article
                className="service-card group relative h-full bg-white rounded-2xl border border-[#E5E0D8] p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-dental-teal hover:shadow-soft-lg overflow-hidden"
                data-cursor="View"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 -z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(circle at 100% 0%, rgba(201,169,110,0.12), transparent 60%)",
                  }}
                />

                <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-dental-teal/10 text-dental-teal transition-all duration-500 group-hover:bg-dental-teal group-hover:text-dental-white group-hover:scale-110">
                  <service.icon className="h-5 w-5" aria-hidden />
                </div>

                <h3 className="relative mt-6 font-serif text-xl text-dental-teal leading-tight">
                  {service.title}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-dental-muted">
                  {service.description}
                </p>

                <div
                  className="absolute bottom-6 right-6 flex h-9 w-9 items-center justify-center rounded-full bg-dental-cream text-dental-teal opacity-0 -translate-x-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0"
                  aria-hidden
                >
                  <ArrowRight className="h-4 w-4" />
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-20 text-center">
          <p className="font-serif text-xl sm:text-2xl text-dental-teal max-w-xl mx-auto text-balance">
            Not sure what you need? Let&rsquo;s talk it through.
          </p>
          <div className="mt-7">
            <Button href="#contact" size="lg" withArrow data-cursor="Book">
              Book Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
