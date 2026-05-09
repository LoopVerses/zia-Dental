"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const easeOut = [0.21, 0.47, 0.32, 0.98] as const;
const easeInOut = [0.65, 0, 0.35, 1] as const;

const DURATION = 1700;

export function IntroLoader() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setProgress(100);
      const t = setTimeout(() => setDone(true), 50);
      return () => clearTimeout(t);
    }

    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        const end = setTimeout(() => setDone(true), 250);
        return () => clearTimeout(end);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          className="fixed inset-0 z-[200] pointer-events-none"
          aria-hidden
        >
          <motion.div
            className="absolute inset-0 bg-dental-teal"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: easeInOut, delay: 0.05 }}
          />

          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center text-dental-white">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: easeOut }}
              className="flex flex-col items-center gap-6"
            >
              <span className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-dental-white/10 border border-dental-white/15 backdrop-blur">
                <ToothMark className="h-10 w-10" />
                <span className="absolute -inset-1 rounded-2xl ring-1 ring-dental-gold/40 animate-pulse" />
              </span>

              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5, ease: easeOut }}
                  className="font-serif text-3xl sm:text-4xl tracking-tight"
                >
                  Zia Dental
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.5 }}
                  className="mt-2 text-[10px] sm:text-xs uppercase tracking-[0.4em] text-dental-gold"
                >
                  Consultants — Islamabad
                </motion.div>
              </div>

              <div className="mt-8 w-56 sm:w-72">
                <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-dental-white/15">
                  <motion.span
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-dental-gold via-dental-gold/80 to-dental-gold"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.15, ease: "linear" }}
                  />
                </div>
                <div className="mt-3 flex justify-between text-[10px] uppercase tracking-[0.32em] text-dental-white/55">
                  <span>Crafting</span>
                  <span className="tabular-nums text-dental-gold">{progress}%</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ToothMark({ className }: { className?: string }) {
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
