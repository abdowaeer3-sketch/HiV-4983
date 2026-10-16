export type FigureId =
  | "genomeMap"
  | "genomeEconomy"
  | "entry"
  | "reverseTranscription"
  | "integrationFates"
  | "envTarget"
  | "escape"
  | "accessory"
  | "nextSteps";

export type Point = {
  n: string;
  title: string;
  body: string;
};

export type Fact = { value: string; label: string };

export type Slide = {
  id: string;
  kind: "cover" | "content" | "closing";
  section?: string;
  headline: string;
  accent?: string;
  kicker?: string;
  points: Point[];
  figure?: FigureId;
  figureCaption?: string;
  footer?: string;
  facts?: Fact[];
};

export const DECK = {
  module: "Module 04",
  discipline: "Virology fundamentals",
  title: "HIV",
  subtitle: "Genome, replication, antigenic and pathogenic genes",
  deckNo: "Deck No. 0004",
  edition: "Training edition · 2026",
};

export const slides: Slide[] = [
  {
    id: "cover",
    kind: "cover",
    section: "Training deck · Module 04",
    headline: "HIV",
    kicker: "One virus, four questions — genome, replication, escape, damage.",
    points: [
      {
        n: "01",
        title: "10 slides, two points each",
        body: "Genome structure · Replication cycle · Antigenic genes · Pathogenic genes.",
      },
      {
        n: "02",
        title: "Ends on what happens next",
        body: "Case scenarios, knowledge check, and the reference map you keep.",
      },
    ] as Point[],
    footer: "Virology fundamentals · 12 min",
  },
  {
    id: "genome-1",
    kind: "content",
    section: "01 · Genome structure",
    headline: "Two copies, nine genes",
    accent: "nine genes",
    kicker: "Before anything replicates, know exactly what gets copied.",
    points: [
      {
        n: "01",
        title: "A diploid RNA genome",
        body: "Two identical, positive-sense single strands of roughly 9.7 kb — capped at the 5′ end, poly-adenylated at the 3′ — packaged with reverse transcriptase inside the capsid.",
      },
      {
        n: "02",
        title: "Three tiers of genes",
        body: "Structural: gag, pol, env. Regulatory: tat, rev. Accessory: vif, vpr, vpu, nef. A genome built for economy, not for clarity.",
      },
    ],
    figure: "genomeMap",
    figureCaption: "5′ → 3′ · two LTRs flanking nine overlapping genes",
    facts: [
      { value: "9.7", label: "kb · two RNA copies" },
      { value: "9", label: "genes, three tiers" },
      { value: "2", label: "LTRs, one per end" },
    ],
  },
  {
    id: "genome-2",
    kind: "content",
    section: "01 · Genome structure",
    headline: "One genome, fifteen proteins",
    accent: "fifteen proteins",
    kicker: "Everything the virus makes is squeezed out of the same stretch of RNA.",
    points: [
      {
        n: "01",
        title: "The LTRs are the control panel",
        body: "U3-R-U5 repeats at both ends carry the promoter, enhancer and poly-A signal. The 5′ LTR is Tat-responsive, so the virus can amplify its own transcription.",
      },
      {
        n: "02",
        title: "Overlapping frames, differential splicing",
        body: "One transcript set is read three ways — unspliced (Gag, Gag-Pol), singly spliced (Env, Vif, Vpr, Vpu) and multiply spliced (Tat, Rev, Nef) — yielding fifteen proteins.",
      },
    ],
    figure: "genomeEconomy",
    figureCaption: "Three splicing classes, one 9.7 kb genome",
    facts: [
      { value: "15", label: "proteins, one genome" },
      { value: "3", label: "splicing classes" },
      { value: "U3 · R · U5", label: "LTR anatomy" },
    ],
  },
  {
    id: "replication-1",
    kind: "content",
    section: "02 · Replication cycle",
    headline: "Entry: docking, then delivery",
    accent: "docking",
    kicker: "Step one is a two-key lock — and both keys belong to the host cell.",
    points: [
      {
        n: "01",
        title: "Two receptors, in sequence",
        body: "gp120 binds CD4, changes shape, then engages a chemokine co-receptor — CCR5 or CXCR4. That second contact is what triggers fusion.",
      },
      {
        n: "02",
        title: "The capsid is the delivery vehicle",
        body: "gp41 inserts its fusion peptide, the membranes merge, and the cone-shaped capsid enters the cytoplasm — shielding the genome while reverse transcription begins.",
      },
    ],
    figure: "entry",
    figureCaption: "Attachment → co-receptor binding → fusion → core entry",
    facts: [
      { value: "2", label: "receptors in sequence" },
      { value: "CCR5 / CXCR4", label: "co-receptor choice" },
      { value: "7", label: "life-cycle steps" },
    ],
  },
  {
    id: "replication-2",
    kind: "content",
    section: "02 · Replication cycle",
    headline: "Reverse transcription: RNA in, DNA out",
    accent: "RNA in, DNA out",
    kicker: "The step that makes HIV permanent — and permanently variable.",
    points: [
      {
        n: "01",
        title: "The genome is rewritten as DNA",
        body: "Reverse transcriptase copies the two RNA strands into a double-stranded DNA copy that the host nucleus will accept as its own.",
      },
      {
        n: "02",
        title: "No proofreading, no fidelity",
        body: "RT cannot proofread: about 3 × 10⁻⁵ errors per base per cycle. Every round of replication manufactures mutants — a quasispecies inside a single host.",
      },
    ],
    figure: "reverseTranscription",
    figureCaption: "RNA → RNA:DNA hybrid → double-stranded DNA",
    facts: [
      { value: "3 × 10⁻⁵", label: "errors per base" },
      { value: "2", label: "RNA strands copied" },
      { value: "0", label: "proofreading" },
    ],
  },
  {
    id: "replication-3",
    kind: "content",
    section: "02 · Replication cycle",
    headline: "Two fates of the provirus",
    accent: "Two fates",
    kicker: "Integration is permanent. What happens next is not.",
    points: [
      {
        n: "01",
        title: "Productive infection",
        body: "Tat drives transcription, Rev exports unspliced RNA, Gag-Pol and Env assemble at the membrane, virions bud — and protease maturation makes them infectious.",
      },
      {
        n: "02",
        title: "Latent infection",
        body: "In resting memory CD4 T cells the provirus falls silent: no protein, no target. Its half-life runs to roughly 44 months, which is why ART is lifelong.",
      },
    ],
    figure: "integrationFates",
    figureCaption: "Integrate → transcribe and release, or integrate → silence",
    facts: [
      { value: "~44", label: "months half-life" },
      { value: "5", label: "steps ART blocks" },
      { value: "lifelong", label: "treatment duration" },
    ],
  },
  {
    id: "antigenic-1",
    kind: "content",
    section: "03 · Antigenic genes",
    headline: "Env: the moving target",
    accent: "moving target",
    kicker: "The one protein antibodies must hit is the one that changes fastest.",
    points: [
      {
        n: "01",
        title: "Env is the antibody target",
        body: "gp120 (surface) and gp41 (transmembrane) are the only viral proteins exposed on the virion — and env is the most variable gene in the genome.",
      },
      {
        n: "02",
        title: "Loops and glycans do the hiding",
        body: "Five hypervariable loops (V1–V5) and a glycan shield over most of the surface steer antibodies toward decoy epitopes. Escape variants are selected within weeks.",
      },
    ],
    figure: "envTarget",
    figureCaption: "Variable loops and glycans sitting over conserved machinery",
    facts: [
      { value: "V1–V5", label: "hypervariable loops" },
      { value: "~50%", label: "of Env mass is glycan" },
      { value: "3", label: "subunits per trimer" },
    ],
  },
  {
    id: "antigenic-2",
    kind: "content",
    section: "03 · Antigenic genes",
    headline: "Escape is the default",
    accent: "default",
    kicker: "Immune pressure does not eliminate HIV. It edits it.",
    points: [
      {
        n: "01",
        title: "Mutation plus recombination",
        body: "Error-prone RT and template switching generate a swarm of variants; cytotoxic T cells then select escape mutations in Gag, Pol and Nef epitopes.",
      },
      {
        n: "02",
        title: "What survives is conserved",
        body: "Because escape is cheap almost everywhere else, the conserved core — capsid, reverse transcriptase, the gp41 MPER — is where broadly neutralising antibodies and T-cell vaccines aim.",
      },
    ],
    figure: "escape",
    figureCaption: "Selection sweeps a quasispecies; conserved regions stay fixed",
    facts: [
      { value: "~10⁹", label: "new virions per day" },
      { value: "weeks", label: "to select escape" },
      { value: "Gag · RT · MPER", label: "conserved targets" },
    ],
  },
  {
    id: "pathogenic",
    kind: "content",
    section: "04 · Pathogenic genes",
    headline: "Accessory proteins run interference",
    accent: "interference",
    kicker: "Five small proteins whose job is to switch the host cell off.",
    points: [
      {
        n: "01",
        title: "Nef and Tat drive the damage",
        body: "Nef strips CD4 and MHC-I from the surface and activates T cells; Tat transactivates the provirus and pushes infected cells toward apoptosis — the engine of progression.",
      },
      {
        n: "02",
        title: "Vif, Vpu and Vpr disarm the cell",
        body: "Vif destroys APOBEC3G, Vpu degrades CD4 and blocks tetherin, Vpr arrests the cell cycle and aids macrophage infection — each one counters a host restriction factor.",
      },
    ],
    figure: "accessory",
    figureCaption: "Host restriction factor → viral countermeasure",
    facts: [
      { value: "5", label: "accessory proteins" },
      { value: "3", label: "factors countered" },
      { value: "Nef · Tat", label: "progression drivers" },
    ],
  },
  {
    id: "next",
    kind: "closing",
    section: "05 · Wrap-up",
    headline: "What happens next",
    accent: "next",
    kicker: "Four sections, one map: genome → cycle → escape → damage.",
    points: [
      {
        n: "01",
        title: "Carry the map into the clinic",
        body: "Every step above is a licensed drug target — entry, reverse transcription, integration, protease, capsid. ART stops the cycle; it does not clear the latent reservoir.",
      },
      {
        n: "02",
        title: "Your next three steps",
        body: "Work the four case scenarios · sit the 10-question check · keep the genome map as your reference card.",
      },
    ],
    figure: "nextSteps",
    figureCaption: "Case scenarios → knowledge check → applied module",
    footer: "Questions → module lead · Module 05: Antiretroviral targets",
    facts: [
      { value: "4", label: "case scenarios" },
      { value: "10", label: "question check" },
      { value: "1", label: "reference map" },
    ],
  },
];

export const figureTitles: Record<FigureId, string> = {
  genomeMap: "Genome map",
  genomeEconomy: "Splicing classes",
  entry: "Entry",
  reverseTranscription: "Reverse transcription",
  integrationFates: "Integration",
  envTarget: "Env trimer",
  escape: "Selection",
  accessory: "Restriction factors",
  nextSteps: "Handoff",
};
