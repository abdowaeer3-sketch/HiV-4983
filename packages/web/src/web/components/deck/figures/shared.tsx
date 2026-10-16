import { motion } from "motion/react";

export const C = {
  lime: "#c9f24d",
  limeDeep: "#9bc22f",
  steel: "#7fa8b8",
  coral: "#ff7a5a",
  text: "#f1f3ec",
  dim: "#9aa4a8",
  faint: "#6b7478",
  line: "rgba(255,255,255,0.14)",
  lineSoft: "rgba(255,255,255,0.08)",
  panel: "#0d1315",
};

export const stageTint = {
  structural: "rgba(201,242,77,0.82)",
  regulatory: "rgba(127,168,184,0.85)",
  accessory: "rgba(241,243,236,0.5)",
} as const;

export function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 660 300" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      {children}
    </svg>
  );
}

export function FigText({
  x,
  y,
  children,
  className = "svg-mono",
  anchor = "start",
  delay = 0,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  className?: string;
  anchor?: "start" | "middle" | "end";
  delay?: number;
}) {
  return (
    <motion.text
      x={x}
      y={y - 2}
      textAnchor={anchor}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      style={{ fontSize: 10 }}
    >
      {children}
    </motion.text>
  );
}

export function Chip({
  x,
  y,
  w = 118,
  label,
  delay,
}: {
  x: number;
  y: number;
  w?: number;
  label: string;
  delay: number;
}) {
  return (
    <motion.g
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
    >
      <rect x={x} y={y} width={w} height={22} fill="rgba(201,242,77,0.08)" stroke="rgba(201,242,77,0.5)" />
      <text x={x + w / 2} y={y + 15} textAnchor="middle" className="svg-mono svg-mono-lime">
        {label}
      </text>
    </motion.g>
  );
}

export function Virion({
  x,
  y,
  r = 26,
  color = C.lime,
  spikes = 12,
  delay = 0,
}: {
  x: number;
  y: number;
  r?: number;
  color?: string;
  spikes?: number;
  delay?: number;
}) {
  const arms = Array.from({ length: spikes }, (_, i) => (i / spikes) * Math.PI * 2);
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      style={{ transformOrigin: `${x}px ${y}px` }}
    >
      {arms.map((a, i) => (
        <g key={i}>
          <line
            x1={x + Math.cos(a) * r}
            y1={y + Math.sin(a) * r}
            x2={x + Math.cos(a) * (r + 8)}
            y2={y + Math.sin(a) * (r + 8)}
            stroke={color}
            strokeWidth={1.1}
            opacity={0.7}
          />
          <circle cx={x + Math.cos(a) * (r + 9)} cy={y + Math.sin(a) * (r + 9)} r={1.8} fill={color} opacity={0.9} />
        </g>
      ))}
      <circle cx={x} cy={y} r={r} fill="#0d1416" stroke={color} strokeWidth={1.3} />
      <circle cx={x} cy={y} r={r * 0.55} fill="none" stroke={color} strokeWidth={0.8} opacity={0.45} />
      <path
        d={`M ${x - r * 0.42} ${y - r * 0.3} L ${x + r * 0.42} ${y - r * 0.3} L ${x} ${y + r * 0.62} Z`}
        fill={color}
        opacity={0.5}
      />
    </motion.g>
  );
}

export function Legend({ items }: { items: { color: string; label: string }[] }) {
  return (
    <div className="flex items-center gap-6">
      {items.map((it) => (
        <span key={it.label} className="flex items-center gap-2">
          <span style={{ width: 9, height: 9, background: it.color, display: "inline-block" }} />
          <span className="mono text-[9.5px]" style={{ color: "var(--text-faint)" }}>
            {it.label}
          </span>
        </span>
      ))}
    </div>
  );
}
