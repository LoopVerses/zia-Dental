"use client";

type Variant = "before" | "after";
type Treatment = "whitening" | "aligners" | "veneers";

const TOOTH = "M3,0 H27 Q30,0 30,4 L30,30 Q30,42 22,44 Q18,46 14,44 Q10,46 6,44 Q0,42 0,30 L0,4 Q0,0 3,0 Z";

// 8 teeth across the smile arc
const TEETH = [
  { x: 22, y: 16, scale: 0.82 },
  { x: 56, y: 8, scale: 0.92 },
  { x: 92, y: 3, scale: 1.0 },
  { x: 130, y: 1, scale: 1.05 },
  { x: 170, y: 1, scale: 1.05 },
  { x: 208, y: 3, scale: 1.0 },
  { x: 244, y: 8, scale: 0.92 },
  { x: 278, y: 16, scale: 0.82 },
] as const;

// "Before" distortion presets per treatment type
const DISTORTION: Record<Treatment, { dx: number; rot: number; shade: string; chip?: boolean; gap?: boolean }[]> = {
  whitening: [
    { dx: 0, rot: 0, shade: "#E5D2A0" },
    { dx: 0, rot: 0, shade: "#E8D6A8" },
    { dx: 0, rot: 0, shade: "#DBC58F" },
    { dx: 0, rot: 0, shade: "#E2CC97" },
    { dx: 0, rot: 0, shade: "#E2CC97" },
    { dx: 0, rot: 0, shade: "#DBC58F" },
    { dx: 0, rot: 0, shade: "#E8D6A8" },
    { dx: 0, rot: 0, shade: "#E5D2A0" },
  ],
  aligners: [
    { dx: -2, rot: -8, shade: "#F2EAD3" },
    { dx: 1, rot: 5, shade: "#F4ECD8" },
    { dx: -1, rot: -4, shade: "#F0E7CB" },
    { dx: 0, rot: 2, shade: "#F4ECD8" },
    { dx: 0, rot: -3, shade: "#F2EAD3" },
    { dx: 2, rot: 6, shade: "#F0E7CB" },
    { dx: -2, rot: -5, shade: "#F4ECD8" },
    { dx: 3, rot: 9, shade: "#F0E7CB" },
  ],
  veneers: [
    { dx: 0, rot: -2, shade: "#E0D0A4", chip: true },
    { dx: 0, rot: 1, shade: "#E5D6AC" },
    { dx: -1, rot: -3, shade: "#D8C998", chip: true, gap: true },
    { dx: 0, rot: 0, shade: "#E0D0A4" },
    { dx: 0, rot: 0, shade: "#E0D0A4" },
    { dx: 1, rot: 2, shade: "#D8C998", gap: true },
    { dx: 0, rot: -1, shade: "#E5D6AC" },
    { dx: 0, rot: 3, shade: "#E0D0A4", chip: true },
  ],
};

export function SmileIllustration({
  variant,
  treatment = "whitening",
}: {
  variant: Variant;
  treatment?: Treatment;
}) {
  const before = variant === "before";
  const distortions = DISTORTION[treatment];

  return (
    <svg
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid slice"
      className="block w-full h-full"
      role="img"
      aria-label={`Smile — ${variant} ${treatment}`}
    >
      <defs>
        <linearGradient id={`bg-${treatment}-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F0EDE8" />
          <stop offset="100%" stopColor="#E0DBD2" />
        </linearGradient>
        <linearGradient id={`lip-${treatment}-${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F1C5BA" />
          <stop offset="55%" stopColor="#DBA092" />
          <stop offset="100%" stopColor="#B47668" />
        </linearGradient>
        <radialGradient
          id={`shadow-${treatment}-${variant}`}
          cx="50%"
          cy="0%"
          r="75%"
        >
          <stop offset="0%" stopColor="#3B1A12" stopOpacity="0.78" />
          <stop offset="100%" stopColor="#3B1A12" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`shine-${treatment}-${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <filter id={`glow-${treatment}-${variant}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.6" />
        </filter>
      </defs>

      {/* Studio backdrop */}
      <rect width="320" height="200" fill={`url(#bg-${treatment}-${variant})`} />

      {/* Soft vignette */}
      <radialGradient id={`vig-${treatment}-${variant}`} cx="50%" cy="50%" r="60%">
        <stop offset="60%" stopColor="#000" stopOpacity="0" />
        <stop offset="100%" stopColor="#000" stopOpacity="0.18" />
      </radialGradient>
      <rect width="320" height="200" fill={`url(#vig-${treatment}-${variant})`} />

      {/* Mouth — outer lip */}
      <path
        d="M 22 100 Q 55 50, 160 50 Q 265 50, 298 100 Q 265 150, 160 150 Q 55 150, 22 100 Z"
        fill={`url(#lip-${treatment}-${variant})`}
      />

      {/* Inner mouth shadow */}
      <path
        d="M 48 100 Q 80 75, 160 75 Q 240 75, 272 100 Q 240 125, 160 125 Q 80 125, 48 100 Z"
        fill={`url(#shadow-${treatment}-${variant})`}
      />

      {/* Teeth row */}
      <g transform="translate(15, 55)">
        {TEETH.map((t, i) => {
          const d = distortions[i];
          const offsetX = before ? d.dx : 0;
          const rot = before ? d.rot : 0;
          const shade = before ? d.shade : "#FAFAF8";
          const tw = 30 * t.scale;
          const th = 44 * t.scale;
          const cx = tw / 2;
          const cy = th / 2;

          return (
            <g
              key={i}
              transform={`translate(${t.x + offsetX}, ${t.y}) scale(${t.scale}) rotate(${rot} ${cx} ${cy})`}
            >
              <path
                d={TOOTH}
                fill={shade}
                stroke="#C9C4BA"
                strokeWidth="0.6"
                filter={`url(#glow-${treatment}-${variant})`}
              />
              <path d={TOOTH} fill={`url(#shine-${treatment}-${variant})`} />
              {before && d.chip && (
                <path
                  d="M 20 40 L 26 44 L 18 44 Z"
                  fill="#8C7950"
                  opacity="0.55"
                />
              )}
              {before && d.gap && (
                <rect x="-3" y="20" width="3" height="20" fill="#3B1A12" opacity="0.35" />
              )}
            </g>
          );
        })}
      </g>

      {/* Subtle gum line */}
      <path
        d="M 48 60 Q 90 48, 160 48 Q 230 48, 272 60"
        fill="none"
        stroke="#C18C7E"
        strokeOpacity="0.35"
        strokeWidth="1.2"
      />
    </svg>
  );
}
