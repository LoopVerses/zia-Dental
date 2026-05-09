"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("top");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Scroll-spy: highlight the nav link whose section is currently in view
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.section);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.2, 0.5, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === "#top") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setOpen(false);
      return;
    }
    setOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-dental-white/90 backdrop-blur-xl border-b border-dental-text/5 shadow-soft"
          : "bg-transparent border-b border-transparent",
      )}
      role="banner"
    >
      <div className="container-x flex items-center justify-between h-20">
        <Link
          href="#top"
          onClick={(e) => handleNavClick(e, "#top")}
          aria-label={`${SITE.name} — go to top`}
          className="group flex items-center gap-3"
        >
          <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-dental-teal text-dental-white shadow-soft transition-transform duration-300 group-hover:scale-105">
            <ToothIcon className="h-6 w-6" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-xl text-dental-teal tracking-tight">
              Zia Dental
            </span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-dental-gold font-sans">
              Consultants
            </span>
          </span>
        </Link>

        <nav
          className="hidden lg:flex items-center gap-10"
          aria-label="Primary navigation"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.section;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative text-sm tracking-tight transition-colors py-2",
                  isActive
                    ? "text-dental-teal"
                    : "text-dental-text/75 hover:text-dental-teal",
                )}
              >
                {link.label}
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-dot"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="absolute left-1/2 -bottom-1 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-dental-gold"
                      aria-hidden
                    />
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-5">
          <a
            href={SITE.contact.phoneHref}
            className="flex items-center gap-2 text-sm text-dental-text/75 hover:text-dental-teal transition-colors"
            aria-label={`Call ${SITE.contact.phoneFormatted}`}
          >
            <Phone className="h-4 w-4" />
            <span className="font-medium">{SITE.contact.phoneFormatted}</span>
          </a>
          <Button href="#contact" size="sm">
            <Calendar className="h-4 w-4" />
            Book Appointment
          </Button>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden p-2 -mr-2 rounded-full text-dental-teal hover:bg-dental-teal/5 transition-colors"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="lg:hidden overflow-hidden bg-dental-white border-t border-dental-text/5"
          >
            <nav
              className="container-x py-8 flex flex-col gap-1"
              aria-label="Mobile navigation"
            >
              {NAV_LINKS.map((link, i) => {
                const isActive = activeSection === link.section;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      aria-current={isActive ? "page" : undefined}
                      className="flex items-center justify-between py-4 text-lg font-serif text-dental-teal border-b border-dental-text/5 hover:text-dental-gold transition-colors"
                    >
                      {link.label}
                      {isActive && (
                        <span className="h-2 w-2 rounded-full bg-dental-gold" aria-hidden />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={SITE.contact.phoneHref}
                  className="flex items-center gap-2 text-sm text-dental-text/75 py-2"
                >
                  <Phone className="h-4 w-4" /> {SITE.contact.phoneFormatted}
                </a>
                <Button href="#contact" size="md" withArrow>
                  Book Appointment
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function ToothIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden>
      <path
        d="M16 5c-4 0-7.5 2-7.5 6.5 0 2.5 1 4.5 1.8 7 1 3 1.2 8 2.6 8 1.2 0 1.5-3.5 2.4-6 .6-1.5.6-2 .7-2s.1.5.7 2c.9 2.5 1.2 6 2.4 6 1.4 0 1.6-5 2.6-8 .8-2.5 1.8-4.5 1.8-7C23.5 7 20 5 16 5Z"
        fill="#FAFAF8"
      />
      <circle cx="16" cy="10" r="1.4" fill="#C9A96E" />
    </svg>
  );
}
