"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  Check,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const easeOut = [0.21, 0.47, 0.32, 0.98] as const;

const SERVICES_OPTIONS = [
  "General Dentistry",
  "Cosmetic Dentistry",
  "Crowns & Bridges",
  "Root Canal Therapy",
  "Orthodontics & Aligners",
  "Pediatric Dentistry",
] as const;

type FormState = {
  name: string;
  phone: string;
  service: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initial: FormState = { name: "", phone: "", service: "", message: "" };

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Please enter your full name.";
  if (!form.phone.trim()) errors.phone = "Please enter your phone number.";
  else if (!/^[\d\s+()-]{7,}$/.test(form.phone.trim()))
    errors.phone = "Please enter a valid phone number.";
  if (!form.service) errors.service = "Please choose a service.";
  if (!form.message.trim() || form.message.trim().length < 5)
    errors.message = "A short message helps us prepare for your visit.";
  return errors;
}

export function ContactSection() {
  const { ref: leftRef, inView: leftInView } = useScrollAnimation<HTMLDivElement>({
    margin: "-100px",
  });
  const { ref: rightRef, inView: rightInView } = useScrollAnimation<HTMLDivElement>({
    margin: "-100px",
  });

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative py-24 lg:py-32 bg-dental-white"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-96 w-[60rem] rounded-full bg-dental-cream/50 blur-3xl"
      />

      <div className="container-x relative">
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <span className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-dental-gold">
            Get in Touch
          </span>
          <h2
            id="contact-heading"
            className="mt-4 font-serif font-medium text-dental-teal text-display-lg text-balance"
          >
            Let&rsquo;s start with a{" "}
            <span className="italic text-dental-gold">conversation.</span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-dental-muted leading-relaxed text-pretty">
            Book an appointment, ask a quick question, or just stop by. We&rsquo;re here
            to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* LEFT — info card */}
          <motion.div
            ref={leftRef}
            initial={{ opacity: 0, x: -40 }}
            animate={leftInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: easeOut }}
            className="bg-dental-teal text-dental-white rounded-3xl p-8 lg:p-10 relative overflow-hidden"
          >
            <div
              aria-hidden
              className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-dental-gold/10 blur-3xl"
            />

            <div className="relative">
              <h3 className="font-serif text-2xl mb-2">Get in Touch</h3>
              <p className="text-sm text-dental-white/65 mb-8">
                Whichever way you prefer — we&rsquo;re ready to listen.
              </p>

              <ul className="space-y-5">
                <ContactRow
                  icon={Phone}
                  label="Phone"
                  value={SITE.contact.phoneFormatted}
                  href={SITE.contact.phoneHref}
                />
                <ContactRow
                  icon={Mail}
                  label="Email"
                  value={SITE.contact.email}
                  href={SITE.contact.emailHref}
                />
                <ContactRow
                  icon={MapPin}
                  label="Address"
                  value={SITE.location.full}
                  href={SITE.location.mapsHref}
                  external
                />
                <ContactRow
                  icon={Clock}
                  label="Hours"
                  value={`Open Daily · ${SITE.hours.summary.replace("Open Daily · ", "")}`}
                />
              </ul>

              <div className="mt-10 pt-8 border-t border-dental-white/10">
                <div className="text-xs uppercase tracking-[0.2em] text-dental-white/50 mb-4">
                  Or reach out via
                </div>
                <div className="flex items-center gap-3">
                  <SocialButton
                    href={SITE.contact.whatsappHref}
                    label="Chat on WhatsApp"
                    external
                  >
                    <MessageCircle className="h-4 w-4" />
                  </SocialButton>
                  <SocialButton
                    href={SITE.contact.phoneHref}
                    label="Call us"
                  >
                    <Phone className="h-4 w-4" />
                  </SocialButton>
                  <SocialButton
                    href={SITE.contact.emailHref}
                    label="Email us"
                  >
                    <Mail className="h-4 w-4" />
                  </SocialButton>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — form card */}
          <motion.div
            ref={rightRef}
            initial={{ opacity: 0, x: 40 }}
            animate={rightInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: easeOut }}
            className="bg-white rounded-3xl shadow-premium border border-[#E5E0D8] p-8 lg:p-10"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
  external,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const content = (
    <>
      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-dental-white/10 text-dental-gold transition-colors group-hover:bg-dental-gold group-hover:text-dental-teal">
        <Icon className="h-4 w-4" aria-hidden />
      </span>
      <span className="flex-grow min-w-0">
        <span className="block text-[11px] uppercase tracking-[0.18em] text-dental-white/50">
          {label}
        </span>
        <span className="block mt-0.5 text-sm text-dental-white leading-snug break-words">
          {value}
        </span>
      </span>
    </>
  );

  if (!href) {
    return (
      <li className="flex items-start gap-4 py-1">{content}</li>
    );
  }

  return (
    <li>
      <a
        href={href}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        className="group flex items-start gap-4 py-1 -mx-2 px-2 rounded-lg hover:bg-dental-white/[0.04] transition-colors"
      >
        {content}
      </a>
    </li>
  );
}

function SocialButton({
  href,
  label,
  external,
  children,
}: {
  href: string;
  label: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full bg-dental-white/10 text-dental-white border border-dental-white/15 hover:bg-dental-gold hover:text-dental-teal hover:border-dental-gold transition-all duration-300"
    >
      {children}
    </a>
  );
}

function ContactForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update =
    (field: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v = validate(form);
    if (Object.keys(v).length > 0) {
      setErrors(v);
      const firstError = Object.keys(v)[0];
      const el = document.getElementById(`field-${firstError}`);
      el?.focus();
      return;
    }
    setSubmitting(true);
    // Simulate request — wire to a real endpoint when ready
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="flex flex-col items-center text-center py-12"
        >
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 18,
              delay: 0.1,
            }}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-dental-teal text-dental-white shadow-soft-lg"
          >
            <Check className="h-10 w-10" strokeWidth={2.5} />
          </motion.div>
          <h3 className="mt-6 font-serif text-2xl text-dental-teal">
            Thank you, {form.name.split(" ")[0]}!
          </h3>
          <p className="mt-3 text-base text-dental-muted max-w-sm">
            We&rsquo;ll call you back shortly to confirm your appointment.
          </p>
          <button
            type="button"
            onClick={() => {
              setForm(initial);
              setSubmitted(false);
            }}
            className="mt-8 text-sm text-dental-gold hover:text-dental-teal transition-colors underline-offset-4 hover:underline"
          >
            Send another message
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={onSubmit}
          noValidate
          className="space-y-5"
        >
          <Field
            id="field-name"
            label="Full Name"
            error={errors.name}
          >
            <input
              id="field-name"
              type="text"
              value={form.name}
              onChange={update("name")}
              autoComplete="name"
              placeholder="Your name"
              className={inputClass(!!errors.name)}
            />
          </Field>

          <Field
            id="field-phone"
            label="Phone Number"
            error={errors.phone}
          >
            <input
              id="field-phone"
              type="tel"
              value={form.phone}
              onChange={update("phone")}
              autoComplete="tel"
              placeholder="03XX XXXXXXX"
              className={inputClass(!!errors.phone)}
            />
          </Field>

          <Field id="field-service" label="Service" error={errors.service}>
            <select
              id="field-service"
              value={form.service}
              onChange={update("service")}
              className={cn(
                inputClass(!!errors.service),
                "appearance-none bg-white pr-10",
              )}
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%231E3A4A' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 16px center",
              }}
            >
              <option value="">Choose a service…</option>
              {SERVICES_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>

          <Field id="field-message" label="Message" error={errors.message}>
            <textarea
              id="field-message"
              value={form.message}
              onChange={update("message")}
              rows={4}
              placeholder="Tell us a little about what you'd like to discuss…"
              className={cn(inputClass(!!errors.message), "resize-none")}
            />
          </Field>

          <button
            type="submit"
            disabled={submitting}
            className="group relative w-full flex items-center justify-center gap-2 rounded-xl bg-dental-teal text-dental-white font-medium tracking-tight px-6 py-4 transition-all duration-300 hover:bg-dental-teal-light hover:shadow-soft-lg disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dental-gold focus-visible:ring-offset-2"
          >
            {submitting ? (
              <>
                <span className="h-4 w-4 rounded-full border-2 border-dental-white/30 border-t-dental-white animate-spin" />
                Sending…
              </>
            ) : (
              <>
                Send Message
                <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            )}
          </button>

          <p className="text-xs text-dental-muted text-center">
            By submitting you agree to be contacted about your enquiry. We never share
            your details.
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-medium text-dental-muted mb-2"
      >
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            role="alert"
            className="mt-1.5 text-xs text-red-600"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "w-full rounded-xl border bg-white px-4 py-3 text-sm text-dental-text placeholder:text-dental-text/30 transition-all duration-200",
    "focus:outline-none focus:ring-4",
    hasError
      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
      : "border-[#E5E0D8] focus:border-dental-teal focus:ring-dental-teal/10",
  );
}
