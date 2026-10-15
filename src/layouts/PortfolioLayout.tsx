import { useEffect, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Icon, Mail, Moon, Sun, ChevronDown } from "lucide-react";
import { LuLinkedin, LuGithub } from "react-icons/lu";
import { RiTwitterXLine } from "react-icons/ri";


import { Button } from "@/components/ui/button";
import { BinaryGlobe } from "@/components/portfolio/binary-globe";
import { ProjectArt } from "@/components/portfolio/project-art";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { projects } from "@/data/projects";

export function PortfolioShell() {
  const [dark, setDark] = useState(true);
  const [selected, setSelected] = useState<(typeof projects)[number] | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [projectPage, setProjectPage] = useState(0);
  const [category, setCategory] = useState<"all" | "websites" | "web-apps" | "wordpress">("all");
  const pageSize = 3;
  const filteredProjects = category === "all" ? projects : projects.filter(p => p.category === category);
  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / pageSize));
  const visibleProjects = filteredProjects.slice(projectPage * pageSize, projectPage * pageSize + pageSize);
  const rangeStart = projectPage * pageSize + 1;
  const rangeEnd = Math.min((projectPage + 1) * pageSize, filteredProjects.length);
  const selectedIndex = selected ? filteredProjects.indexOf(selected) : -1;
  const reduced = useReducedMotion();
  const transition = reduced ? { duration: 0 } : { type: "spring" as const, stiffness: 210, damping: 27 };
  useEffect(() => { document.documentElement.classList.toggle("dark", dark); }, [dark]);
  useEffect(() => { console.debug("contactOpen ->", contactOpen); }, [contactOpen]);
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
                  <Button variant="default" className="contact-button bg-primary text-primary-foreground" onClick={() => { console.debug('contact button clicked'); setContactOpen(true); }}>Let’s connect <ArrowUpRight /></Button>
                </motion.div> : <motion.article key={selected.name} className="case-study" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: reduced ? 0 : -20 }} transition={{ duration: reduced ? 0 : .25 }} aria-label={`${selected.name} case study`}>
                  <div className="case-toolbar"><Button variant="ghost" size="sm" onClick={() => setSelected(null)}><ArrowLeft /> All projects</Button><span className="eyebrow">CONCEPT CASE STUDY / {String(selectedIndex + 1).padStart(2, "0")}</span></div>
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
              <div className="section-heading">
                <div className="select-wrap">
                  <select
                    id="project-category"
                    value={category}
                    onChange={(e) => { setCategory(e.target.value as any); setProjectPage(0); setSelected(null); }}
                    className="section-heading-select"
                    aria-label="Filter projects by category"
                  >
                    <option value="all">Selected work — All</option>
                    <option value="websites">Selected work — Websites</option>
                    <option value="web-apps">Selected work — Web apps</option>
                    <option value="wordpress">Selected work — WordPress</option>
                  </select>
                  <ChevronDown className="select-icon" />
                </div>
                <div className="project-navigation">
                  <span aria-live="polite">{String(rangeStart).padStart(2, "0")} — {String(rangeEnd).padStart(2, "0")} / {String(filteredProjects.length).padStart(2, "0")}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={projectPage === 0}
                    onClick={() => setProjectPage(p => Math.max(0, p - 1))}
                    aria-label="Previous projects"
                    title="Previous projects"
                  ><ArrowLeft /></Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={projectPage >= totalPages - 1}
                    onClick={() => setProjectPage(p => Math.min(totalPages - 1, p + 1))}
                    aria-label="More projects"
                    title="More projects"
                  ><ArrowRight /></Button>
                </div>
              </div>
              <div className="project-grid">
                {visibleProjects.map((project, index) => {
                  const globalIndex = projectPage * pageSize + index; // 0-based across full list
                  const offsetY = globalIndex * 5; // match previous nth-child offsets (0,5,10,...)
                  return (
                    <motion.div
                      key={project.name}
                      className={`project-slot ${selected?.name === project.name ? "selected-slot" : ""}`}
                      layout
                      transition={transition}
                      style={{ transform: `translateY(${offsetY}px)` }}
                    >
                      <Button
                        variant="project"
                        onClick={() => { setSelected(project); const stage = document.querySelector(".content-stage"); stage?.scrollTo({ top: 0 }); }}
                        aria-label={`View ${project.name} case study`}
                        aria-pressed={selected?.name === project.name}
                      >
                        {selected?.name !== project.name ? <motion.div layoutId={`project-art-${project.name}`} transition={transition}><ProjectArt kind={project.kind} /></motion.div> : <div className={`project-art art-${project.kind} selected-art`}><ArrowUpRight /></div>}
                        <div className="project-info"><div className="project-title">{project.name}<ArrowUpRight /></div><div className="project-type">{project.type}</div><span className="project-number">{String(projectPage * pageSize + index + 1).padStart(2, "0")}</span></div>
                      </Button>
                    </motion.div>
                  );
                })}
              </div>
            </section>
          </section>
        </LayoutGroup>
      </main>
      <footer className="site-footer">
        <span>© 2026 AFOLABI ESTHER</span>
        <div className="footer-socials" aria-label="Social contacts">{[{ name: "Email", Icon: Mail, link: "mailto:starafolab@gmail.com" }, { name: "LinkedIn", Icon: LuLinkedin, link: "https://www.linkedin.com/in/hestiaarc00/" }, { name: "GitHub", Icon: LuGithub, link: "https://github.com/Hestia-Arc" }, { name: "Twitter", Icon: RiTwitterXLine, link: "https://x.com/arc_hestia00" }].map(({ name, Icon, link }) => <a href={link} key={name} onClick={() => setContactOpen(true)} aria-label={name} title={`${name} — Let's build`}><Icon /></a>)}</div>
      </footer>
      <Dialog open={contactOpen} onOpenChange={setContactOpen}>
        <DialogContent className="project-dialog">
          <Mail className="h-6 w-6 text-primary-strong" />
          <DialogTitle className="text-2xl">Let’s build something meaningful.</DialogTitle>
          <DialogDescription className="leading-relaxed">Esther’s contact details and social profiles will be available here soon.</DialogDescription>
          <div className="flex items-center gap-5 text-muted-foreground social-row"><LuGithub aria-label="GitHub" /><LuLinkedin aria-label="LinkedIn" /><RiTwitterXLine aria-label="Twitter" /></div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
