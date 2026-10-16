import { motion } from "motion/react";
import type { FigureId } from "../../../lib/deck/content";
import { figureTitles } from "../../../lib/deck/content";
import { rise } from "../../../lib/deck/motion";
import { GenomeMap, GenomeEconomy, Entry, ReverseTranscription, GenomeMapLegend } from "./partOne";
import { IntegrationFates, EnvTarget, Escape, Accessory, NextSteps } from "./partTwo";

const MAP: Record<FigureId, React.ComponentType> = {
  genomeMap: GenomeMap,
  genomeEconomy: GenomeEconomy,
  entry: Entry,
  reverseTranscription: ReverseTranscription,
  integrationFates: IntegrationFates,
  envTarget: EnvTarget,
  escape: Escape,
  accessory: Accessory,
  nextSteps: NextSteps,
};

export function Figure({ id, caption }: { id: FigureId; caption?: string }) {
  const Body = MAP[id];
  return (
    <motion.div variants={rise} className="figure-well h-[420px] w-[716px] shrink-0">
      <div className="absolute left-0 right-0 top-0 flex items-center justify-between px-5 pt-4">
        <span className="mono text-[10px]" style={{ color: "var(--text-faint)" }}>
          {figureTitles[id]}
        </span>
        <span className="mono text-[10px]" style={{ color: "var(--lime)" }}>
          Fig.
        </span>
      </div>

      <div className="absolute inset-x-0 top-[34px] bottom-[52px]">
        <Body />
      </div>

      <div
        className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t px-5 py-3"
        style={{ borderColor: "var(--line)" }}
      >
        <span className="mono whitespace-nowrap text-[10px]" style={{ color: "var(--text-faint)" }}>
          {caption}
        </span>
        {id === "genomeMap" && (
          <div className="flex shrink-0 items-center gap-4">
            <GenomeMapLegend />
          </div>
        )}
      </div>
    </motion.div>
  );
}
