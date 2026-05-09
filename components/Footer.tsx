import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";
import { SITE } from "@/lib/constants";

const footerServices = [
  "General Dentistry",
  "Cosmetic Dentistry",
  "Crowns & Bridges",
  "Root Canal",
  "Orthodontics",
  "Pediatric",
] as const;

const quickLinks = [
  { href: "#top", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
  { href: "#contact", label: "Book Appointment" },
] as const;

export function Footer() {
  return (
    <footer
      className="relative bg-dental-teal text-dental-white pt-20 pb-8"
      role="contentinfo"
    >
      <div className="container-x">
        {/* TOP — 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Col 1 — Brand */}
          <div className="lg:col-span-4">
            <Link
              href="#top"
              className="inline-flex items-center gap-3 group"
              aria-label={`${SITE.name} — go to top`}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-dental-white/10 border border-dental-white/15 transition-transform duration-300 group-hover:scale-105">
                <ToothIcon className="h-6 w-6" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="font-serif text-xl text-dental-white tracking-tight">
                  Zia Dental
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-dental-gold">
                  Consultants
                </span>
              </span>
            </Link>

            <p className="mt-6 font-serif italic text-base text-dental-white/85 leading-relaxed max-w-sm">
              &ldquo;{SITE.tagline}&rdquo;
            </p>
            <p className="mt-4 text-sm text-dental-white/65 leading-relaxed max-w-sm">
              A calm, modern dental practice in the heart of Islamabad — led by{" "}
              <span className="text-dental-white">{SITE.doctor.name}</span>.
            </p>

            <a
              href={SITE.contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-medium text-sm px-5 py-2.5 shadow-soft transition-all duration-300 hover:-translate-y-0.5"
              aria-label="Chat with us on WhatsApp"
            >
              <MessageCircle className="h-4 w-4" />
              Message on WhatsApp
            </a>
          </div>

          {/* Col 2 — Services */}
          <div className="lg:col-span-3">
            <h3 className="font-serif text-base text-dental-white mb-5">Services</h3>
            <ul className="space-y-3">
              {footerServices.map((s) => (
                <li key={s}>
                  <Link
                    href="#services"
                    className="text-sm text-dental-white/65 hover:text-dental-gold transition-colors"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Quick links */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-base text-dental-white mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-dental-white/65 hover:text-dental-gold transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div className="lg:col-span-3">
            <h3 className="font-serif text-base text-dental-white mb-5">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={SITE.location.mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-dental-white/65 hover:text-dental-gold transition-colors leading-relaxed"
                >
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-dental-gold" />
                  {SITE.location.full}
                </a>
              </li>
              <li>
                <a
                  href={SITE.contact.phoneHref}
                  className="flex items-start gap-2.5 text-dental-white/65 hover:text-dental-gold transition-colors"
                >
                  <Phone className="h-4 w-4 mt-0.5 flex-shrink-0 text-dental-gold" />
                  {SITE.contact.phoneFormatted}
                </a>
              </li>
              <li>
                <a
                  href={SITE.contact.emailHref}
                  className="flex items-start gap-2.5 text-dental-white/65 hover:text-dental-gold transition-colors break-all"
                >
                  <Mail className="h-4 w-4 mt-0.5 flex-shrink-0 text-dental-gold" />
                  {SITE.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-dental-white/65 leading-relaxed">
                <Clock className="h-4 w-4 mt-0.5 flex-shrink-0 text-dental-gold" />
                {SITE.hours.summary}
              </li>
            </ul>

            <a
              href={SITE.location.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-dental-white border-b border-dental-gold/40 pb-0.5 hover:text-dental-gold hover:border-dental-gold transition-colors"
            >
              View on Google Maps
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Gold divider — 30% opacity */}
        <div
          aria-hidden
          className="mt-16 h-px"
          style={{ background: "rgba(201, 169, 110, 0.3)" }}
        />

        {/* BOTTOM */}
        <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="text-xs text-dental-white/55 leading-relaxed">
            <p>
              &copy; {new Date().getFullYear()} {SITE.name} · All rights reserved.
            </p>
            <p className="mt-1">
              {SITE.doctor.name} · {SITE.location.area}, {SITE.location.city},{" "}
              {SITE.location.country}
            </p>
          </div>
          <p className="text-xs text-dental-white/55">
            Made with <span className="text-rose-400">Loopverses</span> Technologies          </p>
        </div>
      </div>
    </footer>
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
