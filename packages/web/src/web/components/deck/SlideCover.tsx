import { motion } from "motion/react";
import type { Slide } from "../../lib/deck/content";
import { DECK } from "../../lib/deck/content";
import { fadeIn, rise, riseFast, stagger } from "../../lib/deck/motion";

export function SlideCover({ slide }: { slide: Slide }) {
  return (
    <motion.div
      className="deck-slide"
      variants={stagger(0.11, 0.25)}
      initial="hidden"
      animate="show"
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src="/images/sem-cell-surface.jpg"
          alt="Scanning electron micrograph of HIV budding from a lymphocyte"
          className="duotone absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1.04, opacity: 0 }}
          animate={{ scale: 1.16, opacity: 1 }}
          transition={{ scale: { duration: 26, ease: "linear" }, opacity: { duration: 1.4 } }}
        />
        <div className="duotone-tint" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(7,9,10,0.97) 0%, rgba(7,9,10,0.9) 34%, rgba(7,9,10,0.42) 70%, rgba(7,9,10,0.78) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(0deg, rgba(7,9,10,0.94) 0%, rgba(7,9,10,0) 46%)" }}
        />
      </div>

      {/* wordmark */}
      <motion.div variants={riseFast} className="absolute left-[72px] top-[52px] flex items-center gap-3">
        <span style={{ width: 11, height: 11, background: "var(--lime)", display: "inline-block" }} />
        <span className="mono text-[11px]" style={{ color: "var(--text)" }}>
          HIV · Virology
        </span>
        <span className="mono text-[11px]" style={{ color: "var(--text-faint)" }}>
          / Module 04
        </span>
      </motion.div>

      <div className="absolute left-[72px] top-[286px]">
        <motion.div variants={riseFast} className="mono text-[11px]" style={{ color: "var(--lime)" }}>
          {slide.section}
        </motion.div>

        <div className="overflow-hidden">
          <motion.h1
            className="display"
            style={{ fontSize: 208, color: "var(--text)", marginTop: 8 }}
            initial={{ y: "108%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, delay: 0.45, ease: "easeOut" }}
          >
            {DECK.title}
          </motion.h1>
        </div>

        <motion.div variants={rise} className="mono text-[11px]" style={{ color: "var(--text-faint)", marginTop: 14 }}>
          {DECK.subtitle}
        </motion.div>

        <motion.p
          variants={rise}
          className="display-italic"
          style={{ fontSize: 30, color: "var(--text)", marginTop: 26, maxWidth: 900, lineHeight: 1.15 }}
        >
          {slide.kicker}
        </motion.p>
      </div>

      {/* cover meta — two points */}
      <div className="absolute left-[72px] top-[648px] flex gap-[46px]">
        {slide.points.map((p) => (
          <motion.div key={p.n} variants={rise} style={{ width: 286, borderTop: "1px solid var(--line)", paddingTop: 16 }}>
            <span className="mono text-[10px]" style={{ color: "var(--lime)" }}>
              {p.n}
            </span>
            <h3 style={{ fontSize: 15, fontWeight: 600, marginTop: 8 }}>{p.title}</h3>
            <p className="body-copy" style={{ fontSize: 13.5, color: "var(--text-dim)", lineHeight: 1.55, marginTop: 6 }}>
              {p.body}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        variants={fadeIn}
        className="absolute right-[72px] top-[664px] text-right"
        style={{ display: "flex", flexDirection: "column", gap: 8 }}
      >
        <span className="mono text-[10px]" style={{ color: "var(--text)" }}>
          {DECK.deckNo}
        </span>
        <span className="mono text-[10px]" style={{ color: "var(--text-faint)" }}>
          {DECK.edition}
        </span>
        <span className="mono text-[10px]" style={{ color: "var(--text-faint)" }}>
          {slide.footer}
        </span>
      </motion.div>
    </motion.div>
  );
}
