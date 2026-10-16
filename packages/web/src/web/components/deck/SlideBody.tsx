import { motion } from "motion/react";
import type { Slide } from "../../lib/deck/content";
import { DECK } from "../../lib/deck/content";
import { rise, riseFast, stagger } from "../../lib/deck/motion";
import { Figure } from "./figures";

function Headline({ text, accent }: { text: string; accent?: string }) {
  if (!accent || !text.includes(accent)) return <>{text}</>;
  const [before, ...rest] = text.split(accent);
  const after = rest.join(accent);
  return (
    <>
      {before}
      <span className="display-italic" style={{ color: "var(--lime)" }}>
        {accent}
      </span>
      {after}
    </>
  );
}

export function SlideBody({ slide }: { slide: Slide }) {
  return (
    <motion.div className="deck-slide" variants={stagger(0.1, 0.12)} initial="hidden" animate="show">
      {/* top meta bar */}
      <motion.div variants={riseFast} className="absolute left-[72px] right-[72px] top-[44px] flex items-center justify-between">
        <span className="mono text-[10.5px]">
          <span style={{ color: "var(--lime)" }}>{slide.section?.split("·")[0]}</span>
          <span style={{ color: "var(--text-faint)" }}>·{slide.section?.split("·")[1]}</span>
        </span>
        <span className="mono text-[10.5px]" style={{ color: "var(--text-faint)" }}>
          {DECK.deckNo} · {DECK.discipline}
        </span>
      </motion.div>
      <motion.div variants={riseFast} className="absolute left-[72px] right-[72px] top-[84px] hairline" />

      {/* headline + kicker */}
      <div className="absolute left-[72px] right-[72px] top-[122px]">
        <motion.h2 variants={rise} className="display" style={{ fontSize: 60, maxWidth: 1080, color: "var(--text)", marginTop: -6 }}>
          <Headline text={slide.headline} accent={slide.accent} />
        </motion.h2>
        <motion.p
          variants={rise}
          className="body-copy"
          style={{ fontSize: 17, color: "var(--text-dim)", marginTop: 20, maxWidth: 800, lineHeight: 1.5 }}
        >
          {slide.kicker}
        </motion.p>
      </div>

      {/* two points + figure */}
      <div className="absolute left-[72px] right-[72px] top-[352px] flex gap-[40px]">
        <motion.div
          variants={stagger(0.16, 0.42)}
          style={{ width: 700, height: 420, display: "flex", flexDirection: "column", justifyContent: "space-between" }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          {slide.points.map((p) => (
            <motion.div key={p.n} variants={rise} style={{ borderTop: "1px solid var(--line)", paddingTop: 20 }}>
              <div className="flex gap-5">
                <span className="mono text-[10.5px]" style={{ color: "var(--lime)", paddingTop: 5 }}>
                  {p.n}
                </span>
                <div>
                  <h3 style={{ fontSize: 20.5, fontWeight: 600, letterSpacing: "-0.012em", lineHeight: 1.2 }}>{p.title}</h3>
                  <p
                    className="body-copy"
                    style={{ fontSize: 16.5, color: "var(--text-dim)", lineHeight: 1.62, marginTop: 10, maxWidth: 606 }}
                  >
                    {p.body}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          </div>

          <div>
            {slide.footer && (
              <motion.div
                variants={riseFast}
                className="mono text-[10px]"
                style={{ color: "var(--text-faint)", marginBottom: 16 }}
              >
                {slide.footer}
              </motion.div>
            )}
            {slide.facts && (
              <motion.div
                variants={riseFast}
                style={{ borderTop: "1px solid var(--line)", paddingTop: 18, display: "flex", gap: 28 }}
              >
                {slide.facts.map((f) => (
                  <div key={f.label} style={{ width: 200 }}>
                    <div className="display" style={{ fontSize: 25, color: "var(--text)" }}>
                      {f.value}
                    </div>
                    <div
                      className="mono"
                      style={{ fontSize: 9.5, color: "var(--text-faint)", marginTop: 8, lineHeight: 1.5 }}
                    >
                      {f.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>

        {slide.figure && <Figure id={slide.figure} caption={slide.figureCaption} />}
      </div>
    </motion.div>
  );
}
