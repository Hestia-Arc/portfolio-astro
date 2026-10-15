import { useEffect, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Icon, Mail, Moon, Sun } from "lucide-react";
import { SiGithub, SiLinkerd, SiX } from "react-icons/si";

import { Button } from "@/components/ui/button";
import { BinaryGlobe } from "@/components/portfolio/binary-globe";
import { ProjectArt } from "@/components/portfolio/project-art";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

const projects = [
  { name: "Flow", kind: "flow" as const, type: "Workflow management", description: "A concept for a focused workspace that brings tasks, teams, and progress together. Kanban boards turn complex workflows into clear, manageable steps.", tech: ["React", "TypeScript", "Tailwind CSS"] },
  { name: "Pulse", kind: "pulse" as const, type: "Analytics dashboard", description: "A concept for turning business data into a clear picture. A considered dashboard brings key metrics and trends together to support informed decisions.", tech: ["React", "TypeScript", "Data visualization"] },
  { name: "Formly", kind: "form" as const, type: "Interactive form builder", description: "A concept for creating forms that feel effortless. A simple builder pairs flexible fields with a clean, accessible experience for the people filling them out.", tech: ["React", "TypeScript", "Form validation"] },
  { name: "Gather", kind: "flow" as const, type: "Community platform", description: "A concept for bringing people and shared interests together in a thoughtful community space.", tech: ["React", "TypeScript", "Accessible UI"] },
  { name: "Ledger", kind: "pulse" as const, type: "Personal finance", description: "A concept for making everyday finances easier to understand, with a clear view of spending and savings.", tech: ["React", "TypeScript", "Charts"] },
  { name: "Nomad", kind: "form" as const, type: "Travel planning", description: "A concept for organizing destinations, itineraries, and the small details of a great trip.", tech: ["React", "TypeScript", "Responsive design"] },
];

export function PortfolioShell() {
  const [dark, setDark] = useState(true);
  const [selected, setSelected] = useState<(typeof projects)[number] | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [projectPage, setProjectPage] = useState(0);
  const visibleProjects = projects.slice(projectPage * 3, projectPage * 3 + 3);
  const reduced = useReducedMotion();
  const transition = reduced ? { duration: 0 } : { type: "spring" as const, stiffness: 210, damping: 27 };
  useEffect(() => { document.documentElement.classList.toggle("dark", dark); }, [dark]);
  useEffect(() => {
    if (!selected) return;
    const handleKey = (event: KeyboardEvent) => { if (event.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selected]);
  return (
    <div className="portfolio">
      <Button variant="ghost" size="icon" className="theme-button floating-theme" onClick={() => setDark(value => !value)} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} title={dark ? "Switch to light mode" : "Switch to dark mode"}>{dark ? <Sun /> : <Moon />}</Button>
      <main className="main-layout">
        <section className="globe-panel" aria-label="The world runs on code">
          <div className="globe-index"><span className="status-dot" /> THE WORLD RUNS ON CODE</div>
          <BinaryGlobe dark={dark} />
          <div className="globe-caption"><p>CONNECTED BY TECHNOLOGY.<br />BUILT WITH INTENTION.</p><span className="code-symbol">{'</>'}</span></div>
        </section>
        <LayoutGroup>
          <section className={`content-panel ${selected ? "is-project" : ""}`}>
            <div className="content-stage">
              <AnimatePresence mode="popLayout">
                {!selected ? <motion.div key="intro" className="intro-content" initial={{ opacity: 0, y: reduced ? 0 : 25 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : -45 }} transition={{ duration: reduced ? 0 : .3 }}>
                  <div className="eyebrow"><span className="status-dot" /> SOFTWARE ENGINEER · PROBLEM SOLVER</div>
                  <h1>Hi, I’m <span>Esther.</span></h1>
                  <div className="introduction">
                    <p>I’m a software engineer interested in the intersection of <strong>technology, business, and problem-solving.</strong></p>
                    <p>I model real-world workflows, simplify complex ideas, and build thoughtful digital experiences that make things work better.</p>
                  </div>
                  <Button variant="default" className="contact-button" onClick={() => setContactOpen(true)}>Let’s connect <ArrowUpRight /></Button>
                </motion.div> : <motion.article key={selected.name} className="case-study" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: reduced ? 0 : -20 }} transition={{ duration: reduced ? 0 : .25 }} aria-label={`${selected.name} case study`}>
                  <div className="case-toolbar"><Button variant="ghost" size="sm" onClick={() => setSelected(null)}><ArrowLeft /> All projects</Button><span className="eyebrow">CONCEPT CASE STUDY / 0{projects.indexOf(selected) + 1}</span></div>
                  <motion.div layoutId={`project-art-${selected.name}`} transition={transition} className="case-art"><ProjectArt kind={selected.kind} /></motion.div>
                  <motion.div initial={{ opacity: 0, y: reduced ? 0 : 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : .18, duration: reduced ? 0 : .35 }}>
                    <div className="case-heading"><h2>{selected.name}<span>.</span></h2><span>{selected.type}</span></div>
                    <p className="case-summary">{selected.description}</p>
                    <div className="case-meta"><div><span>ROLE</span><p>Design & development concept</p></div><div><span>STACK</span><div className="flex flex-wrap gap-2">{selected.tech.map(tech => <span key={tech} className="tech-tag">{tech}</span>)}</div></div></div>
                    <div className="case-section"><span>01 / THE CHALLENGE</span><h3>Making complexity feel simple.</h3><p>{selected.name} explores how {selected.type.toLowerCase()} can become clearer, more approachable, and easier to navigate without overwhelming the user.</p></div>
                    <div className="case-section"><span>02 / THE APPROACH</span><h3>Start with the people, then the process.</h3><p>Map the core user journey, prioritize the essential actions, and bring them together in a focused interface. Reusable patterns and accessible interactions keep the experience consistent across devices.</p></div>
                    <div className="case-section"><span>03 / THE OUTCOME</span><h3>A direction worth exploring.</h3><p>This is an illustrative concept, not a completed client project. The next step is to test the main journey with users and refine it based on their feedback.</p></div>
                  </motion.div>
                </motion.article>}
              </AnimatePresence>
            </div>
            <section className="work-section" aria-label="Selected projects">
              <div className="section-heading"><h2>Selected work</h2><div className="project-navigation"><span aria-live="polite">{projectPage === 0 ? "01 — 03" : "04 — 06"} / 06</span><Button variant="ghost" size="icon" disabled={projectPage === 0} onClick={() => setProjectPage(0)} aria-label="Previous projects" title="Previous projects"><ArrowLeft /></Button><Button variant="ghost" size="icon" disabled={projectPage === 1} onClick={() => setProjectPage(1)} aria-label="More projects" title="More projects"><ArrowRight /></Button></div></div>
              <div className="project-grid">{visibleProjects.map((project, index) => <motion.div key={project.name} className={`project-slot ${selected?.name === project.name ? "selected-slot" : ""}`} layout transition={transition}>
                <Button variant="project" onClick={() => { setSelected(project); const stage = document.querySelector(".content-stage"); stage?.scrollTo({ top: 0 }); }} aria-label={`View ${project.name} case study`} aria-pressed={selected?.name === project.name}>
                  {selected?.name !== project.name ? <motion.div layoutId={`project-art-${project.name}`} transition={transition}><ProjectArt kind={project.kind} /></motion.div> : <div className={`project-art art-${project.kind} selected-art`}><ArrowUpRight /></div>}
                  <div className="project-info"><div className="project-title">{project.name}<ArrowUpRight /></div><div className="project-type">{project.type}</div><span className="project-number">0{projectPage * 3 + index + 1}</span></div>
                </Button>
              </motion.div>)}</div>
            </section>
          </section>
        </LayoutGroup>
      </main>
      <footer className="site-footer"><span>© 2026 AFOLABI ESTHER</span><div className="footer-socials" aria-label="Social contacts">{[{ name: "Email", Icon: Mail }, { name: "LinkedIn", Icon: SiLinkerd }, { name: "GitHub", Icon: SiGithub }, { name: "Twitter", Icon: SiX }].map(({ name, Icon }) => <Button key={name} variant="ghost" size="icon" onClick={() => setContactOpen(true)} aria-label={name} title={`${name} — contact details coming soon`}><Icon /></Button>)}</div></footer>
      <Dialog open={contactOpen} onOpenChange={setContactOpen}>
        <DialogContent className="project-dialog">
        <Mail className="h-6 w-6 text-primary-strong" />
        <DialogTitle className="text-2xl">Let’s build something meaningful.</DialogTitle>
        <DialogDescription className="leading-relaxed">Esther’s contact details and social profiles will be available here soon.</DialogDescription>
        <div className="flex items-center gap-5 text-muted-foreground"><SiGithub aria-label="GitHub" /><SiLinkerd aria-label="LinkedIn" /><SiX aria-label="Twitter" /></div>
      </DialogContent></Dialog>
    </div>
  );
}
