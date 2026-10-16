import { motion } from "motion/react";
import { C, Chip, FigText, Frame, Virion, stageTint } from "./shared";

/* ------------------------------------------------------------------ *
 * 01 · Genome map — nine genes, two LTRs, one 9.7 kb genome
 * ------------------------------------------------------------------ */

const GENES = [
  { name: "gag", kb: 1.5, tier: "structural" },
  { name: "pol", kb: 3.0, tier: "structural" },
  { name: "vif", kb: 0.6, tier: "accessory" },
  { name: "vpr", kb: 0.3, tier: "accessory" },
  { name: "tat", kb: 0.3, tier: "regulatory" },
  { name: "rev", kb: 0.35, tier: "regulatory" },
  { name: "vpu", kb: 0.25, tier: "accessory" },
  { name: "env", kb: 2.1, tier: "structural" },
  { name: "nef", kb: 0.6, tier: "accessory" },
] as const;

type Tier = keyof typeof stageTint;

export function GenomeMap() {
  const px = 540 / 9;
  const x0 = 62;
  const y = 116;
  const h = 26;

  let cursor = 0;
  const laid = GENES.map((g) => {
    const start = cursor;
    cursor += g.kb;
    return { ...g, x: x0 + start * px, w: g.kb * px, cx: x0 + (start + g.kb / 2) * px };
  });

  const labelY = (name: string) => (["gag", "vif", "env"].includes(name) ? y - 15 : y + h + 27);
  const cluster = laid.filter((g) => g.kb < 0.5);
  const clusterX1 = Math.min(...cluster.map((g) => g.x));
  const clusterX2 = Math.max(...cluster.map((g) => g.x + g.w));
  const clusterCx = (clusterX1 + clusterX2) / 2;

  return (
    <Frame>
      <FigText x={22} y={100} className="svg-mono svg-mono-strong">
        5′
      </FigText>
      <FigText x={642} y={100} anchor="end" className="svg-mono svg-mono-strong">
        3′
      </FigText>

      {/* LTRs */}
      {[
        { x: 22, label: "LTR" },
        { x: 602, label: "LTR" },
      ].map((l, i) => (
        <motion.g
          key={l.label + i}
          initial={{ opacity: 0, scaleX: 0.4 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.25 + i * 0.05, ease: "easeOut" }}
          style={{ transformOrigin: `${l.x}px ${y}px` }}
        >
          <rect x={l.x} y={y} width={40} height={h} fill="rgba(201,242,77,0.12)" stroke="rgba(201,242,77,0.55)" />
          <text x={l.x + 20} y={y + h / 2 + 3.5} textAnchor="middle" className="svg-mono svg-mono-lime">
            {l.label}
          </text>
        </motion.g>
      ))}

      {/* gene blocks */}
      {laid.map((g, i) => (
        <motion.g
          key={g.name}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.55, delay: 0.5 + i * 0.075, ease: "easeOut" }}
          style={{ transformOrigin: `${g.x}px ${y}px` }}
        >
          <rect x={g.x} y={y} width={g.w} height={h} fill={stageTint[g.tier as Tier]} />
          {g.w >= 74 && (
            <text x={g.cx} y={y + h / 2 + 3.5} textAnchor="middle" className="svg-mono" style={{ fill: "#0b0f11" }}>
              {g.name}
            </text>
          )}
        </motion.g>
      ))}

      {/* individual labels with leaders */}
      {laid
        .filter((g) => g.kb >= 0.5)
        .map((g, i) => {
          const above = ["gag", "vif", "env"].includes(g.name);
          const ly = labelY(g.name);
          return (
            <motion.g
              key={`lbl-${g.name}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 1.25 + i * 0.06 }}
            >
              <line
                x1={g.cx}
                y1={above ? y : y + h}
                x2={g.cx}
                y2={above ? y - 8 : y + h + 8}
                stroke={C.line}
                strokeWidth={1}
              />
              <text
                x={g.cx}
                y={ly}
                textAnchor="middle"
                className={g.w >= 74 ? "svg-mono svg-mono-lime" : "svg-mono svg-mono-strong"}
              >
                {g.name}
              </text>
            </motion.g>
          );
        })}

      {/* tight cluster bracket: vpr · tat · rev · vpu */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.6 }}
      >
        <line x1={clusterX1} y1={y + h} x2={clusterX1} y2={y + h + 12} stroke={C.line} strokeWidth={1} />
        <line x1={clusterX2} y1={y + h} x2={clusterX2} y2={y + h + 12} stroke={C.line} strokeWidth={1} />
        <line x1={clusterX1} y1={y + h + 14} x2={clusterX2} y2={y + h + 12} stroke={C.line} strokeWidth={1} />
        <line x1={clusterCx} y1={y + h + 12} x2={clusterCx} y2={y + h + 20} stroke={C.line} strokeWidth={1} />
        <text x={clusterCx} y={y + h + 32} textAnchor="middle" className="svg-mono svg-mono-strong">
          vpr · tat · rev · vpu
        </text>
      </motion.g>

      {/* scan sweep */}
      <motion.line
        x1={22}
        y1={96}
        x2={22}
        y2={y + h + 16}
        stroke={C.lime}
        strokeWidth={1}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0], x: [0, 620] }}
        transition={{ duration: 2.6, delay: 1.9, repeat: Infinity, repeatDelay: 3.4, ease: "easeInOut" }}
      />

      <FigText x={22} y={268} delay={1.9}>
        9.7 kb · two identical +ssRNA copies, packaged as a dimer
      </FigText>
    </Frame>
  );
}

/* ------------------------------------------------------------------ *
 * 02 · LTR anatomy + three splicing classes
 * ------------------------------------------------------------------ */

const SPLICE_ROWS = [
  {
    y: 168,
    label: "unspliced → gag, gag-pol",
    exons: [{ x: 90, w: 510, tier: "structural" as Tier }],
  },
  {
    y: 220,
    label: "singly spliced → env, vif, vpr, vpu",
    exons: [
      { x: 90, w: 170, tier: "structural" as Tier },
      { x: 300, w: 300, tier: "accessory" as Tier },
    ],
  },
  {
    y: 272,
    label: "multiply spliced → tat, rev, nef",
    exons: [
      { x: 90, w: 66, tier: "regulatory" as Tier },
      { x: 190, w: 54, tier: "regulatory" as Tier },
      { x: 280, w: 74, tier: "accessory" as Tier },
      { x: 400, w: 200, tier: "accessory" as Tier },
    ],
  },
];

export function GenomeEconomy() {
  const ltr = [
    { x: 40, w: 132, label: "U3", fn: "promoter + enhancer" },
    { x: 172, w: 76, label: "R", fn: "TAR — Tat-responsive" },
    { x: 248, w: 104, label: "U5", fn: "leader / poly-A signal" },
  ];

  return (
    <Frame>
      <FigText x={40} y={26}>
        LTR · at both ends of the genome
      </FigText>

      {ltr.map((b, i) => (
        <motion.g
          key={b.label}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 + i * 0.09, ease: "easeOut" }}
        >
          <rect x={b.x} y={38} width={b.w} height={38} fill="rgba(201,242,77,0.12)" stroke="rgba(201,242,77,0.55)" />
          <text x={b.x + b.w / 2} y={63} textAnchor="middle" className="svg-display">
            {b.label}
          </text>
        </motion.g>
      ))}
      <FigText x={368} y={58} delay={0.7} className="svg-body">
        the virus's own on-switch:
      </FigText>
      <FigText x={368} y={76} delay={0.8} className="svg-body">
        promoter, TAR, poly-A signal
      </FigText>

      {/* full-length RNA */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.9 }}>
        <rect x={40} y={116} width={580} height={11} fill="rgba(241,243,236,0.16)" />
        <text x={40} y={106} className="svg-mono">
          9.7 kb primary transcript
        </text>
      </motion.g>

      <motion.path
        d={`M 74 134 L 74 ${SPLICE_ROWS[2].y + 8}`}
        fill="none"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth={1}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.7, delay: 1.15, ease: "easeOut" }}
      />
      {SPLICE_ROWS.map((row, ri) => (
        <motion.path
          key={`path-${row.y}`}
          d={`M 74 ${row.y + 8} L 88 ${row.y + 8}`}
          fill="none"
          stroke={C.line}
          strokeWidth={1}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.35, delay: 1.45 + ri * 0.18, ease: "easeOut" }}
        />
      ))}

      {SPLICE_ROWS.map((row, ri) => (
        <g key={row.label}>
          <FigText x={90} y={row.y - 18} delay={1.6 + ri * 0.18}>
            {row.label}
          </FigText>
          {row.exons.map((ex, ei) => (
            <motion.rect
              key={`${row.y}-${ei}`}
              x={ex.x}
              y={row.y}
              width={ex.w}
              height={16}
              fill={stageTint[ex.tier]}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.45, delay: 1.75 + ri * 0.18 + ei * 0.06, ease: "easeOut" }}
              style={{ transformOrigin: `${ex.x}px ${row.y}px` }}
            />
          ))}
        </g>
      ))}

    </Frame>
  );
}

/* ------------------------------------------------------------------ *
 * 03 · Entry: attachment → co-receptor → fusion → core delivery
 * ------------------------------------------------------------------ */

export function Entry() {
  const spikes = 12;
  const arms = Array.from({ length: spikes }, (_, i) => (i / spikes) * Math.PI * 2);

  return (
    <Frame>
      <FigText x={22} y={26} delay={0.3}>
        life cycle · steps 1–3 of 7
      </FigText>
      <Chip x={470} y={16} label="1 · attach" delay={0.35} />
      <Chip x={470} y={46} label="2 · co-receptor" delay={1.25} />
      <Chip x={470} y={76} label="3 · fuse" delay={2.15} />

      {/* host membrane */}
      <motion.g initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
        <rect x={0} y={200} width={660} height={100} fill="rgba(127,168,184,0.07)" />
        <line x1={0} y1={200} x2={660} y2={200} stroke={C.steel} strokeWidth={1.6} opacity={0.8} />
        {Array.from({ length: 33 }, (_, i) => (
          <line key={i} x1={10 + i * 20} y1={200} x2={10 + i * 20} y2={208} stroke={C.steel} strokeWidth={1} opacity={0.28} />
        ))}
        <text x={644} y={288} textAnchor="end" className="svg-mono">
          host CD4+ T cell · cytoplasm
        </text>
      </motion.g>

      {/* receptors, labelled outward */}
      {[
        { x: 214, label: "CD4", lx: 150, ly: 150 },
        { x: 316, label: "CCR5 / CXCR4", lx: 356, ly: 150 },
      ].map((r, i) => (
        <motion.g key={r.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.55 + i * 0.12 }}>
          <rect x={r.x} y={174} width={30} height={26} fill="rgba(127,168,184,0.22)" stroke={C.steel} strokeWidth={1.1} />
          <line x1={r.lx + (i === 0 ? 40 : 0)} y1={r.ly + 5} x2={r.x + 15} y2={172} stroke={C.line} strokeWidth={1} />
          <text x={r.lx} y={r.ly} className="svg-mono svg-mono-strong">
            {r.label}
          </text>
        </motion.g>
      ))}

      {/* virion travels in and docks */}
      <motion.g
        initial={{ x: -170, y: -90, opacity: 0, rotate: -14 }}
        animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
        transition={{ duration: 1.3, delay: 0.35, ease: "easeOut" }}
      >
        <g transform="translate(266,170)">
          {arms.map((a, i) => (
            <g key={i}>
              <line
                x1={Math.cos(a) * 26}
                y1={Math.sin(a) * 26}
                x2={Math.cos(a) * 34}
                y2={Math.sin(a) * 34}
                stroke={C.lime}
                strokeWidth={1.1}
                opacity={0.75}
              />
              <circle cx={Math.cos(a) * 35} cy={Math.sin(a) * 35} r={1.9} fill={C.lime} />
            </g>
          ))}
          <circle r={26} fill="#0d1416" stroke={C.lime} strokeWidth={1.3} />
          <circle r={14} fill="none" stroke={C.lime} strokeWidth={0.8} opacity={0.45} />
          <path d="M -11 -8 L 11 -8 L 0 16 Z" fill={C.lime} opacity={0.5} />
        </g>
        <FigText x={150} y={92} className="svg-body-strong" delay={0.6}>
          gp120
        </FigText>
        <line x1={188} y1={96} x2={242} y2={146} stroke={C.line} strokeWidth={1} />
      </motion.g>

      {/* fusion flash */}
      <motion.circle
        cx={266}
        cy={200}
        r={12}
        fill="none"
        stroke={C.lime}
        strokeWidth={1.6}
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: [0, 0.9, 0], scale: [0.4, 3.2, 4] }}
        transition={{ duration: 1.1, delay: 2.15, ease: "easeOut" }}
      />
      <FigText x={316} y={124} className="svg-mono svg-mono-lime" delay={2.3}>
        gp41 fusion peptide
      </FigText>

      {/* capsid core delivered into the cytoplasm */}
      <motion.g
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 46 }}
        transition={{ duration: 1.1, delay: 2.5, ease: "easeOut" }}
      >
        <path d="M 100 202 L 126 246 L 74 246 Z" fill="rgba(201,242,77,0.18)" stroke={C.lime} strokeWidth={1.2} />
      </motion.g>
      <FigText x={148} y={240} className="svg-body" delay={3.1}>
        capsid + RNA + RT
      </FigText>
      <FigText x={148} y={256} className="svg-mono" delay={3.2}>
        reverse transcription starts inside
      </FigText>
    </Frame>
  );
}

/* ------------------------------------------------------------------ *
 * 04 · Reverse transcription — error-prone by design
 * ------------------------------------------------------------------ */

export function ReverseTranscription() {
  const tick = (x: number, y1: number, y2: number, color: string, opacity: number, key: string) => (
    <line key={key} x1={x} y1={y1} x2={x} y2={y2} stroke={color} strokeWidth={1} opacity={opacity} />
  );
  const ticks = Array.from({ length: 26 }, (_, i) => 62 + i * 21);

  return (
    <Frame>
      <FigText x={22} y={30} className="svg-body-strong">
        RNA (+)
      </FigText>
      <motion.line
        x1={62}
        y1={60}
        x2={600}
        y2={60}
        stroke={C.text}
        strokeWidth={1.4}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
      />
      {ticks.map((x, i) => tick(x, 60, 70, C.text, 0.3, `r${i}`))}

      <FigText x={22} y={152} className="svg-body-strong">
        RNA:DNA hybrid
      </FigText>
      <line x1={62} y1={172} x2={600} y2={172} stroke={C.text} strokeWidth={1} opacity={0.28} />
      <motion.line
        x1={62}
        y1={176}
        x2={600}
        y2={176}
        stroke={C.lime}
        strokeWidth={1.8}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.4, delay: 0.9, ease: "linear" }}
      />
      {ticks.map((x, i) => (
        <motion.line
          key={`h${i}`}
          x1={x}
          y1={176}
          x2={x}
          y2={190}
          stroke={C.lime}
          strokeWidth={1}
          opacity={0.45}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.45 }}
          transition={{ duration: 0.2, delay: 0.95 + i * 0.092 }}
        />
      ))}

      {[
        { y: 100, d: "0.55" },
        { y: 210, d: "2.05" },
      ].map((c, i) => (
        <motion.path
          key={i}
          d={`M 322 ${c.y} L 330 ${c.y + 10} L 338 ${c.y}`}
          fill="none"
          stroke={C.line}
          strokeWidth={1.2}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: Number(c.d) }}
        />
      ))}

      {/* reverse transcriptase travelling along the template */}
      <motion.g initial={{ x: 0 }} animate={{ x: 500 }} transition={{ duration: 2.4, delay: 0.9, ease: "linear" }}>
        <rect x={70} y={154} width={48} height={22} fill={C.lime} opacity={0.9} />
        <text x={94} y={169} textAnchor="middle" className="svg-mono" style={{ fill: "#0b0f11" }}>
          RT
        </text>
      </motion.g>

      {/* misincorporation */}
      <motion.g
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 2.1, ease: "easeOut" }}
        style={{ transformOrigin: "389px 190px" }}
      >
        <line x1={389} y1={176} x2={389} y2={194} stroke={C.coral} strokeWidth={1.8} />
        <circle cx={389} cy={185} r={9} fill="none" stroke={C.coral} strokeWidth={1} opacity={0.6} />
        <text x={396} y={214} className="svg-mono" style={{ fill: C.coral }}>
          misincorporation
        </text>
        <text x={396} y={228} className="svg-mono">
          no proofreading · ≈3 × 10⁻⁵ /base /cycle
        </text>
      </motion.g>

      {/* dsDNA product */}
      <FigText x={22} y={262} className="svg-body-strong">
        proviral DNA
      </FigText>
      <motion.line
        x1={62}
        y1={278}
        x2={600}
        y2={278}
        stroke={C.lime}
        strokeWidth={1.6}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: 2.5, ease: "easeOut" }}
      />
      <motion.line
        x1={62}
        y1={288}
        x2={600}
        y2={288}
        stroke={C.lime}
        strokeWidth={1.6}
        opacity={0.5}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: 2.62, ease: "easeOut" }}
      />
      <FigText x={600} y={258} anchor="end" className="svg-mono svg-mono-lime" delay={3.4}>
        dsDNA
      </FigText>
    </Frame>
  );
}

export function GenomeMapLegend() {
  return (
    <>
      <span className="flex items-center gap-2">
        <span style={{ width: 9, height: 9, background: stageTint.structural, display: "inline-block" }} />
        <span className="mono text-[9.5px]" style={{ color: "var(--text-faint)" }}>
          structural
        </span>
      </span>
      <span className="flex items-center gap-2">
        <span style={{ width: 9, height: 9, background: stageTint.regulatory, display: "inline-block" }} />
        <span className="mono text-[9.5px]" style={{ color: "var(--text-faint)" }}>
          regulatory
        </span>
      </span>
      <span className="flex items-center gap-2">
        <span style={{ width: 9, height: 9, background: stageTint.accessory, display: "inline-block" }} />
        <span className="mono text-[9.5px]" style={{ color: "var(--text-faint)" }}>
          accessory
        </span>
      </span>
    </>
  );
}

export { Virion };
