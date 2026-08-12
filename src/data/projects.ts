import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";

export type Project = {
  slug: string;
  title: string;
  year: string;
  kind: string;
  image: string;
  summary: string;
  body: string[];
  stack: string[];
  link?: string;
};

export const projects: Project[] = [
  {
    slug: "atlas-design-system",
    title: "Atlas Design System",
    year: "2026",
    kind: "Design System",
    image: p1,
    summary:
      "A token-driven system that unified eleven product surfaces into one visual language.",
    body: [
      "Atlas began as a spreadsheet of inconsistencies: forty-two shades of grey, nine button heights, and no shared idea of what a card was. The first six weeks were pure archaeology — auditing every screen and naming what we found.",
      "The system ships as a single token layer with semantic aliases, so a theme change is one file rather than a thousand component edits. Adoption was measured, not mandated: teams migrated because the new primitives were faster to use than the old ones.",
      "Twelve months in, design-to-build handoff time dropped by roughly half and accessibility regressions became rare enough to be newsworthy.",
    ],
    stack: ["Figma Variables", "React", "Tailwind", "Style Dictionary"],
  },
  {
    slug: "meridian-finance",
    title: "Meridian",
    year: "2025",
    kind: "Product Design & Build",
    image: p2,
    summary:
      "A personal finance dashboard built around one question: am I okay this month?",
    body: [
      "Most finance apps answer questions nobody asked. Meridian leads with a single balance, a single trend, and everything else one scroll away.",
      "The chart is the interface. Hovering scrubs the month, and the supporting metrics rewrite themselves around the moment you're inspecting — no modals, no drill-down maze.",
      "Built as a responsive web app with an offline-first cache so the numbers are there before the network is.",
    ],
    stack: ["React", "TypeScript", "D3", "IndexedDB"],
  },
  {
    slug: "form-and-material",
    title: "Form & Material",
    year: "2025",
    kind: "Art Direction",
    image: p3,
    summary:
      "A printed catalogue and companion site for a furniture studio's first collection.",
    body: [
      "The brief was quiet: let the objects speak. We built the whole identity from paper weight, blind emboss, and a single grotesque at three sizes.",
      "The digital counterpart mirrors the print grid exactly — same margins, same rhythm — so the two read as one artifact in different materials.",
      "Photography was shot in a single afternoon with one light source and no retouching beyond dust removal.",
    ],
    stack: ["Art Direction", "Print", "Photography", "Web"],
  },
  {
    slug: "kinetic-type",
    title: "Kinetic Type",
    year: "2024",
    kind: "Experiment",
    image: p4,
    summary:
      "An ongoing study in motion typography — thirty short loops, one rule each.",
    body: [
      "Every loop starts with a constraint: one axis, one easing curve, one word. The restriction is the whole point; it forces invention where there'd otherwise be decoration.",
      "The output feeds directly back into client work. Several of the transitions in this portfolio began as entries in this series.",
      "Rendered in the browser, no video files — each loop is a few hundred bytes of transform math.",
    ],
    stack: ["Canvas", "CSS Transforms", "Variable Fonts"],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
