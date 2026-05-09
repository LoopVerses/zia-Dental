"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";

const easeOut = [0.21, 0.47, 0.32, 0.98] as const;

type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  format?: "comma";
  label: string;
};

const stats: Stat[] = [
  { value: 15, suffix: "+", label: "Years of Dental Care" },
  { value: 5000, suffix: "+", format: "comma", label: "Happy Patients" },
  { value: 6, label: "Dental Specialties" },
  { value: 9, suffix: " PM", label: "Open Daily Until" },
];

export function StatsSection() {
  const { ref, inView } = useScrollAnimation<HTMLDivElement>({ margin: "-80px" });

  return (
    <section
      aria-label="Practice by the numbers"
      className="relative bg-dental-teal border-t-2 border-dental-gold"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, #C9A96E 0%, transparent 35%), radial-gradient(circle at 80% 50%, #C9A96E 0%, transparent 35%)",
        }}
      />

      <div ref={ref} className="container-x relative py-16 lg:py-20">
        <ul
          className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-4 lg:divide-x lg:divide-dental-white/10"
        >
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} start={inView} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function StatCard({
  stat,
  index,
  start,
}: {
  stat: Stat;
  index: number;
  start: boolean;
}) {
  const count = useCountUp(stat.value, 1800, start);
  const formatted =
    stat.format === "comma" ? count.toLocaleString("en-US") : String(count);

  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      animate={start ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: easeOut, delay: index * 0.1 }}
      className="flex flex-col items-center text-center px-4 lg:px-6"
    >
      <div className="font-serif text-5xl lg:text-[56px] font-medium text-dental-white leading-none tabular-nums">
        {stat.prefix}
        {formatted}
        {stat.suffix && (
          <span className="text-dental-gold">{stat.suffix}</span>
        )}
      </div>
      <div className="mt-4 text-sm uppercase tracking-[0.2em] text-dental-white/65">
        {stat.label}
      </div>
    </motion.li>
  );
}
