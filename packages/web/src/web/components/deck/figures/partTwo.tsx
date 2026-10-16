import { motion } from "motion/react";
import { C, FigText, Frame } from "./shared";

/* ------------------------------------------------------------------ *
 * 05 · Integration — permanent, and then two fates
 * ------------------------------------------------------------------ */

export function IntegrationFates() {
  return (
    <Frame>
      {/* nucleus */}
      <motion.g initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.15 }} style={{ transformOrigin: "228px 150px" }}>
        <circle cx={228} cy={150} r={106} fill="rgba(127,168,184,0.04)" stroke="rgba(127,168,184,0.45)" strokeWidth={1.2} strokeDasharray="5 5" />
        {[
          "M 140 108 C 180 88 232 130 268 104 C 296 84 316 96 326 88",
          "M 132 168 C 176 190 214 140 258 168 C 288 188 310 176 324 184",
          "M 156 214 C 196 226 240 208 292 220",
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke={C.steel}
            strokeWidth={1}
            opacity={0.4}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.1, delay: 0.5 + i * 0.15, ease: "easeOut" }}
          />
        ))}
        <text x={228} y={32} textAnchor="middle" className="svg-mono">
          host nucleus
        </text>
      </motion.g>

      {/* pre-integration complex enters */}
      <FigText x={22} y={144} className="svg-mono svg-mono-strong" delay={0.4}>
        PIC
      </FigText>
      <motion.circle
        cx={44}
        cy={162}
        r={6}
        fill={C.lime}
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: 148, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.5, ease: "easeInOut" }}
      />
      <FigText x={24} y={188} className="svg-mono" delay={0.6}>
        integrase
      </FigText>

      {/* provirus inserted into chromatin */}
      <motion.rect
        x={196}
        y={144}
        width={74}
        height={12}
        fill={C.lime}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5, ease: "easeOut" }}
        style={{ transformOrigin: "196px 150px" }}
      />
      <FigText x={186} y={126} delay={1.7} className="svg-mono svg-mono-lime">
        provirus inserted
      </FigText>

      {/* branches */}
      {[
        { d: "M 270 150 C 340 150 360 100 418 100", delay: 2.0 },
        { d: "M 270 150 C 340 150 360 214 418 214", delay: 2.12 },
      ].map((b, i) => (
        <motion.path
          key={i}
          d={b.d}
          fill="none"
          stroke={C.line}
          strokeWidth={1.2}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, delay: b.delay, ease: "easeOut" }}
        />
      ))}

      {/* productive fate */}
      <motion.g initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 2.5 }}>
        <rect x={420} y={44} width={218} height={104} fill="rgba(201,242,77,0.05)" stroke="rgba(201,242,77,0.4)" />
        <text x={432} y={64} className="svg-mono svg-mono-lime">
          productive infection
        </text>
        {[0, 1, 2].map((i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 2.7 + i * 0.14 }}
            style={{ transformOrigin: `${446 + i * 34}px ${100}px` }}
          >
            <circle cx={446 + i * 34} cy={100} r={9} fill="#0d1416" stroke={C.lime} strokeWidth={1} />
            <path d={`M ${438 + i * 34} 92 L ${454 + i * 34} 92 L ${446 + i * 34} 108 Z`} fill={C.lime} opacity={0.55} />
          </motion.g>
        ))}
        <text x={548} y={104} className="svg-mono">
          budding
        </text>
        <text x={432} y={130} className="svg-mono">
          Tat drives · Rev exports
        </text>
      </motion.g>

      {/* latent fate */}
      <motion.g initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 2.65 }}>
        <rect x={420} y={162} width={218} height={104} fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.14)" />
        <text x={432} y={182} className="svg-mono">
          latent infection
        </text>
        <rect x={436} y={202} width={62} height={11} fill="rgba(241,243,236,0.35)" />
        <motion.circle
          cx={467}
          cy={208}
          r={12}
          fill="none"
          stroke="rgba(241,243,236,0.4)"
          strokeWidth={1}
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{ opacity: [0.5, 0, 0.5], scale: [1, 1.9, 1] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 2.8 }}
          style={{ transformOrigin: "467px 208px" }}
        />
        <text x={516} y={212} className="svg-mono">
          silent provirus
        </text>
        <text x={432} y={234} className="svg-mono">
          resting memory CD4 T cell
        </text>
        <text x={432} y={250} className="svg-mono svg-mono-lime">
          half-life ≈ 44 months
        </text>
      </motion.g>

      <FigText x={22} y={288} delay={2.9}>
        ART blocks the cycle — it does not delete the provirus
      </FigText>
    </Frame>
  );
}

/* ------------------------------------------------------------------ *
 * 06 · Env trimer — loops, glycans, and one conserved site
 * ------------------------------------------------------------------ */

export function EnvTarget() {
  const glycans = Array.from({ length: 22 }, (_, i) => {
    const a = (-172 + i * 16) * (Math.PI / 180);
    return { x: 322 + Math.cos(a) * 64, y: 138 + Math.sin(a) * 56 };
  }).filter((g) => g.y < 200);

  const loops = [
    "M 274 122 C 298 92 350 96 376 126",
    "M 268 154 C 300 138 352 142 382 160",
    "M 286 184 C 312 172 346 174 364 188",
  ];

  return (
    <Frame>
      {/* membrane + gp41 stalk */}
      <rect x={0} y={244} width={660} height={56} fill="rgba(127,168,184,0.07)" />
      <line x1={0} y1={244} x2={660} y2={244} stroke={C.steel} strokeWidth={1.4} opacity={0.8} />
      <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
        <line x1={312} y1={244} x2={312} y2={186} stroke={C.steel} strokeWidth={2} />
        <line x1={334} y1={244} x2={334} y2={186} stroke={C.steel} strokeWidth={2} />
        {Array.from({ length: 7 }, (_, i) => (
          <line key={i} x1={312} y1={192 + i * 8} x2={334} y2={188 + i * 8} stroke={C.steel} strokeWidth={0.9} opacity={0.5} />
        ))}
        <text x={346} y={234} className="svg-mono svg-mono-strong">
          gp41
        </text>
      </motion.g>

      {/* gp120 trimer head */}
      <motion.g initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.7 }} style={{ transformOrigin: "322px 148px" }}>
        {[
          { cx: 322, cy: 130, rx: 62, ry: 50 },
          { cx: 276, cy: 162, rx: 40, ry: 32 },
          { cx: 368, cy: 162, rx: 40, ry: 32 },
        ].map((e, i) => (
          <ellipse key={i} {...e} fill="rgba(201,242,77,0.11)" stroke="rgba(201,242,77,0.45)" strokeWidth={1.1} />
        ))}
      </motion.g>

      {/* glycan shield */}
      {glycans.map((g, i) => (
        <motion.circle
          key={i}
          cx={g.x}
          cy={g.y}
          r={3.8}
          fill="rgba(207,224,230,0.8)"
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, delay: 1.2 + i * 0.05 }}
          style={{ transformOrigin: `${g.x}px ${g.y}px` }}
        />
      ))}

      {/* variable loops */}
      {loops.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          fill="none"
          stroke={C.coral}
          strokeWidth={1.7}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.95, y: [0, 3.5, 0] }}
          transition={{
            pathLength: { duration: 0.8, delay: 1.5 + i * 0.2 },
            opacity: { duration: 0.5, delay: 1.5 + i * 0.2 },
            y: { duration: 3.6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 2.4 + i * 0.3 },
          }}
        />
      ))}

      {/* labels */}
      <FigText x={186} y={92} className="svg-body-strong" delay={1.0}>
        gp120
      </FigText>
      <motion.line
        x1={224}
        y1={98}
        x2={272}
        y2={120}
        stroke={C.line}
        strokeWidth={1}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 1.1 }}
      />

      <FigText x={40} y={166} delay={2.4} className="svg-mono">
        <tspan style={{ fill: C.coral }}>V1–V5</tspan> · hypervariable
      </FigText>
      <FigText x={40} y={182} delay={2.5} className="svg-mono">
        decoy epitopes
      </FigText>
      <motion.line
        x1={148}
        y1={162}
        x2={276}
        y2={140}
        stroke={C.line}
        strokeWidth={1}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 2.6 }}
      />

      <FigText x={452} y={54} delay={2.2} className="svg-body">
        glycan shield
      </FigText>
      <FigText x={452} y={70} delay={2.3} className="svg-mono">
        covers most of the surface
      </FigText>
      <motion.line
        x1={452}
        y1={58}
        x2={392}
        y2={100}
        stroke={C.line}
        strokeWidth={1}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 2.4 }}
      />

      {/* conserved CD4 binding site */}
      <motion.ellipse
        cx={344}
        cy={138}
        rx={28}
        ry={22}
        fill="none"
        stroke={C.lime}
        strokeWidth={1.2}
        strokeDasharray="4 3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        transition={{ duration: 0.7, delay: 2.8 }}
      />
      <FigText x={452} y={112} delay={3.0} className="svg-mono svg-mono-lime">
        CD4 binding site
      </FigText>
      <FigText x={452} y={128} delay={3.1} className="svg-mono">
        conserved — the real target
      </FigText>
      <motion.line
        x1={448}
        y1={120}
        x2={374}
        y2={136}
        stroke="rgba(201,242,77,0.5)"
        strokeWidth={1}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 3.1 }}
      />

      {/* antibody approaches, lands on a decoy */}
      <motion.g
        initial={{ x: 120, opacity: 0 }}
        animate={{ x: [120, -4, 22], opacity: [0, 1, 1] }}
        transition={{ duration: 2.4, delay: 3.3, times: [0, 0.45, 1], ease: "easeOut" }}
      >
        <g transform="translate(478,132)">
          <path d="M 0 0 L 0 16 M 0 16 L -10 30 M 0 16 L 10 30" stroke={C.text} strokeWidth={1.6} fill="none" opacity={0.85} />
        </g>
      </motion.g>
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 4.7 }}>
        <path d="M 424 150 L 436 162 M 436 150 L 424 162" stroke={C.coral} strokeWidth={1.6} />
        <text x={410} y={182} className="svg-mono" style={{ fill: C.coral }}>
          decoy
        </text>
        <text x={478} y={196} className="svg-mono">
          antibody
        </text>
      </motion.g>
    </Frame>
  );
}

/* ------------------------------------------------------------------ *
 * 07 · Selection — a swarm, and the conserved core that survives
 * ------------------------------------------------------------------ */

const ESCAPE = new Set([2, 9, 13, 21, 26, 34]);

export function Escape() {
  const dots = Array.from({ length: 40 }, (_, i) => ({
    x: 46 + (i % 8) * 38,
    y: 62 + Math.floor(i / 8) * 42,
    i,
  }));

  const segments = [
    { x: 400, w: 62, label: "capsid" },
    { x: 472, w: 86, label: "RT" },
    { x: 568, w: 52, label: "MPER" },
  ];

  return (
    <Frame>
      <FigText x={46} y={34} delay={0.3}>
        one host · one quasispecies
      </FigText>

      {dots.map((d) => (
        <motion.circle
          key={d.i}
          cx={d.x}
          cy={d.y}
          r={5}
          fill={ESCAPE.has(d.i) ? C.coral : "rgba(241,243,236,0.45)"}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={
            ESCAPE.has(d.i)
              ? { opacity: 1, scale: 1.45 }
              : { opacity: 1, scale: 1 }
          }
          transition={
            ESCAPE.has(d.i)
              ? { duration: 0.5, delay: 1.55 + (d.i % 7) * 0.09, ease: "easeOut" }
              : { duration: 0.4, delay: 0.35 + d.i * 0.014 }
          }
          style={{ transformOrigin: `${d.x}px ${d.y}px` }}
        />
      ))}

      <motion.line
        x1={30}
        y1={46}
        x2={30}
        y2={252}
        stroke={C.lime}
        strokeWidth={1.4}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.85, 0], x: [0, 300] }}
        transition={{ duration: 1.5, delay: 1.05, ease: "easeInOut" }}
      />
      <FigText x={46} y={272} delay={1.2}>
        immune selection → escape variants survive
      </FigText>

      <line x1={362} y1={40} x2={362} y2={268} stroke={C.lineSoft} strokeWidth={1} />

      <FigText x={400} y={44} delay={2.0} className="svg-mono svg-mono-lime">
        conserved core
      </FigText>
      {segments.map((s, i) => (
        <motion.rect
          key={s.label}
          x={s.x}
          y={62}
          width={s.w}
          height={20}
          fill="rgba(201,242,77,0.85)"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.15 + i * 0.12, ease: "easeOut" }}
          style={{ transformOrigin: `${s.x}px 62px` }}
        />
      ))}
      {segments.map((s, i) => (
        <FigText key={`l-${s.label}`} x={s.x + s.w / 2} y={98} anchor="middle" delay={2.6 + i * 0.1} className="svg-mono svg-mono-strong">
          {s.label}
        </FigText>
      ))}

      <FigText x={400} y={148} delay={2.9} className="svg-body">
        mutations here cost fitness —
      </FigText>
      <FigText x={400} y={166} delay={3.0} className="svg-body">
        so these regions stay fixed
      </FigText>
      <FigText x={400} y={206} delay={3.1} className="svg-body-strong">
        where broadly neutralising
      </FigText>
      <FigText x={400} y={224} delay={3.2} className="svg-body-strong">
        antibodies and T-cell vaccines aim
      </FigText>
    </Frame>
  );
}

/* ------------------------------------------------------------------ *
 * 08 · Accessory proteins vs host restriction factors
 * ------------------------------------------------------------------ */

const ROWS = [
  { host: "APOBEC3G", viral: "Vif", effect: "destroyed — no hypermutation" },
  { host: "Tetherin / BST-2", viral: "Vpu", effect: "removed — virions release" },
  { host: "CD4 & MHC-I", viral: "Nef", effect: "stripped from the surface" },
  { host: "Cell-cycle control", viral: "Vpr", effect: "G2 arrest · macrophage entry" },
  { host: "T-cell activation", viral: "Tat", effect: "activation + apoptosis" },
];

export function Accessory() {
  return (
    <Frame>
      <defs>
        <marker id="acc-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M 0 0 L 8 4 L 0 8 Z" fill={C.lime} opacity={0.8} />
        </marker>
      </defs>

      {ROWS.map((r, i) => {
        const y = 26 + i * 52;
        const delay = 0.35 + i * 0.14;
        return (
          <motion.g
            key={r.viral}
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
          >
            <rect x={26} y={y} width={166} height={34} fill="rgba(127,168,184,0.10)" stroke="rgba(127,168,184,0.45)" />
            <text x={109} y={y + 21} textAnchor="middle" className="svg-body">
              {r.host}
            </text>

            <line x1={196} y1={y + 17} x2={312} y2={y + 17} stroke="rgba(201,242,77,0.55)" strokeWidth={1.2} markerEnd="url(#acc-arrow)" />
            <motion.circle
              cx={254}
              cy={y + 17}
              r={8}
              fill="none"
              stroke={C.coral}
              strokeWidth={1.4}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: delay + 0.4 }}
              style={{ transformOrigin: `254px ${y + 17}px` }}
            />
            <motion.path
              d={`M 249 ${y + 12} L 259 ${y + 22}`}
              stroke={C.coral}
              strokeWidth={1.4}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, delay: delay + 0.55 }}
            />

            <rect x={324} y={y} width={92} height={34} fill="rgba(201,242,77,0.14)" stroke="rgba(201,242,77,0.6)" />
            <text x={370} y={y + 21} textAnchor="middle" className="svg-mono svg-mono-lime">
              {r.viral}
            </text>

            <text x={432} y={y + 21} className="svg-body">
              {r.effect}
            </text>
          </motion.g>
        );
      })}

      <FigText x={26} y={278} delay={1.4}>
        five accessory proteins · five host defences switched off
      </FigText>
    </Frame>
  );
}

/* ------------------------------------------------------------------ *
 * 09 · What happens next
 * ------------------------------------------------------------------ */

const NEXT = [
  { title: "Work the four case scenarios", sub: "20 min · facilitated" },
  { title: "Sit the 10-question check", sub: "pass mark 8 / 10" },
  { title: "Keep the genome map as your card", sub: "reference · module 05" },
];

export function NextSteps() {
  return (
    <Frame>
      {NEXT.map((n, i) => {
        const y = 52 + i * 62;
        const delay = 0.5 + i * 0.3;
        return (
          <g key={n.title}>
            <motion.rect
              x={30}
              y={y}
              width={24}
              height={24}
              fill="rgba(201,242,77,0.10)"
              stroke="rgba(201,242,77,0.6)"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay }}
              style={{ transformOrigin: `42px ${y + 12}px` }}
            />
            <motion.path
              d={`M 36 ${y + 12} L 41 ${y + 18} L 49 ${y + 6}`}
              fill="none"
              stroke={C.lime}
              strokeWidth={1.8}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: delay + 0.25, ease: "easeOut" }}
            />
            <FigText x={70} y={y + 13} className="svg-body-strong" delay={delay + 0.15}>
              {n.title}
            </FigText>
            <FigText x={70} y={y + 29} delay={delay + 0.25}>
              {n.sub}
            </FigText>
          </g>
        );
      })}

      <line x1={352} y1={40} x2={352} y2={264} stroke={C.lineSoft} strokeWidth={1} />

      {/* completion ring */}
      <circle cx={492} cy={126} r={66} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={2} />
      <motion.circle
        cx={492}
        cy={126}
        r={66}
        fill="none"
        stroke={C.lime}
        strokeWidth={2.4}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, delay: 1.4, ease: "easeOut" }}
        style={{ rotate: -90, transformOrigin: "492px 126px" }}
      />
      <FigText x={492} y={122} anchor="middle" className="svg-display" delay={1.6}>
        <tspan style={{ fontSize: 30 }}>04</tspan>
      </FigText>
      <FigText x={492} y={146} anchor="middle" delay={1.8}>
        <tspan style={{ fontSize: 9, letterSpacing: "0.12em" }}>module complete</tspan>
      </FigText>

      <motion.g initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 2.3 }}>
        <rect x={386} y={206} width={216} height={38} fill="rgba(201,242,77,0.07)" stroke="rgba(201,242,77,0.5)" />
        <text x={400} y={230} className="svg-mono svg-mono-lime">
          module 05 → ART targets
        </text>
      </motion.g>
      <motion.g
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: [0, 10, 0], opacity: 1 }}
        transition={{ duration: 1.6, repeat: Infinity, repeatType: "mirror", delay: 2.6, ease: "easeInOut" }}
      >
        <path d="M 606 225 L 614 225 M 610 220 L 615 225 L 610 230" stroke={C.lime} strokeWidth={1.4} fill="none" />
      </motion.g>

      <FigText x={30} y={278} delay={2.6}>
        assessment opens after the case session
      </FigText>
    </Frame>
  );
}
