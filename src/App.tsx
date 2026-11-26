import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type MouseEvent as ReactMouseEvent } from 'react';
import { useHomepageMotion } from './useHomepageMotion';

type ProjectCategory = 'All' | 'Technology' | 'Creative' | 'Research';
type ProjectType = 'web-application' | 'game' | 'downloadable-application' | 'library' | 'research' | 'creative' | 'experimental';
type ProjectStatus = 'Details pending' | 'Planned' | 'In progress';

type ProjectAction = {
  href: string;
  label?: string;
  external?: boolean;
  download?: boolean;
};

type Project = {
  id: number;
  category: Exclude<ProjectCategory, 'All'>;
  type: ProjectType;
  title: string;
  description: string;
  overview: string;
  status: ProjectStatus;
  accent: string;
  preview?: string;
  tools?: string[];
  resources?: {
    primary?: ProjectAction;
    secondary?: ProjectAction;
  };
};

const navigation = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const projectTypeLabels: Record<ProjectType, string> = {
  'web-application': 'Web application',
  game: 'Game',
  'downloadable-application': 'Downloadable application',
  library: 'Library / asset collection',
  research: 'Research project',
  creative: 'Creative project',
  experimental: 'Experimental project',
};

const recommendedPrimaryActions: Record<ProjectType, string> = {
  'web-application': 'Launch app',
  game: 'Play game',
  'downloadable-application': 'Get app',
  library: 'Explore library',
  research: 'Read research',
  creative: 'View project',
  experimental: 'Explore experiment',
};

const projects: Project[] = [
  {
    id: 1,
    category: 'Technology',
    type: 'web-application',
    title: 'A future digital product',
    description: 'Reserved for a technical project summary, its purpose, and the role it played in the final outcome.',
    overview: 'Reserved for the objective, contribution, development process, and outcome of a future web application.',
    status: 'Details pending',
    accent: 'blue',
  },
  {
    id: 2,
    category: 'Creative',
    type: 'game',
    title: 'A future interactive experience',
    description: 'Reserved for a game or interactive work, its central idea, and the experience it is designed to create.',
    overview: 'Reserved for the game concept, player experience, development process, and final release details.',
    status: 'Details pending',
    accent: 'red',
  },
  {
    id: 3,
    category: 'Technology',
    type: 'downloadable-application',
    title: 'A useful application in progress',
    description: 'Reserved for a downloadable product and the practical problem it is intended to address.',
    overview: 'Reserved for the application objective, supported platforms, contribution, and distribution details.',
    status: 'Details pending',
    accent: 'gold',
  },
  {
    id: 4,
    category: 'Technology',
    type: 'library',
    title: 'A considered resource library',
    description: 'Reserved for a collection of reusable assets, references, or tools organized for future access.',
    overview: 'Reserved for the library purpose, collection structure, maintenance approach, and intended audience.',
    status: 'Details pending',
    accent: 'green',
  },
  {
    id: 5,
    category: 'Research',
    type: 'research',
    title: 'An inquiry in progress',
    description: 'Reserved for research, writing, or experimentation that demonstrates curiosity and a clear point of view.',
    overview: 'Reserved for the research question, method, contribution, supporting materials, and findings.',
    status: 'Details pending',
    accent: 'blue',
  },
  {
    id: 6,
    category: 'Creative',
    type: 'creative',
    title: 'A considered creative work',
    description: 'Reserved for a creative case study that explains the idea, the process, and the finished experience.',
    overview: 'Reserved for the creative brief, process, contribution, and outcome of a future project.',
    status: 'Details pending',
    accent: 'gold',
  },
  {
    id: 7,
    category: 'Research',
    type: 'experimental',
    title: 'An open-ended experiment',
    description: 'Reserved for an unfinished or exploratory work where the process is part of the story.',
    overview: 'Reserved for the experiment premise, current state, observations, and possible next steps.',
    status: 'In progress',
    accent: 'green',
  },
];

function getProjectActions(project: Project): Array<ProjectAction & { label: string; primary: boolean }> {
  const actions: Array<ProjectAction & { label: string; primary: boolean }> = [];
  const primary = project.resources?.primary;
  const secondary = project.resources?.secondary;

  if (primary) {
    actions.push({ ...primary, label: primary.label ?? recommendedPrimaryActions[project.type], primary: true });
  }

  if (secondary) {
    actions.push({ ...secondary, label: secondary.label ?? 'View supporting material', primary: false });
  }

  return actions;
}

const skills = [
  {
    number: '01',
    title: 'Technology',
    description: 'A future-ready list of tools, platforms, and technical practices will be organized here.',
    items: ['Technical capability placeholder', 'Tools and platforms placeholder', 'Working method placeholder'],
  },
  {
    number: '02',
    title: 'Creative practice',
    description: 'A clear view of the creative disciplines and visual thinking that support the work will be added here.',
    items: ['Creative discipline placeholder', 'Design approach placeholder', 'Craft and process placeholder'],
  },
  {
    number: '03',
    title: 'Principles',
    description: 'The personal principles that guide decisions, collaboration, and meaningful outcomes belong in this space.',
    items: ['Principle placeholder', 'Collaboration value placeholder', 'Learning practice placeholder'],
  },
];

const timelineEntries = [
  { label: 'Professional history', title: 'Role or practice placeholder', meta: 'Dates and organization to be added', body: 'Use this space for a concise account of responsibilities, contribution, and growth.' },
  { label: 'Education', title: 'Institution or course placeholder', meta: 'Dates and field to be added', body: 'Use this space for relevant study, training, or formal education.' },
  { label: 'Development', title: 'Milestone or learning placeholder', meta: 'Date and context to be added', body: 'Use this space for a meaningful development milestone, certificate, or independent practice.' },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const appRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const visibleProjects = activeCategory === 'All'
    ? projects
    : projects.filter((project) => project.category === activeCategory);
  const modalActions = selectedProject ? getProjectActions(selectedProject) : [];
  const prefersReducedMotion = useReducedMotion();

  useHomepageMotion(appRef, selectedProject !== null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!selectedProject) {
      triggerRef.current?.focus();
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedProject]);

  const closeMenu = () => setMenuOpen(false);
  const closeProject = () => setSelectedProject(null);
  const openProject = (project: Project, event: ReactMouseEvent<HTMLButtonElement>) => {
    triggerRef.current = event.currentTarget;
    setSelectedProject(project);
  };

  const handleModalKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeProject();
      return;
    }

    if (event.key !== 'Tab') {
      return;
    }

    const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
    );

    if (!focusableElements || focusableElements.length === 0) {
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  return (
    <div ref={appRef} className="site-shell">
      <header className="site-header" data-animate="site-header">
        <div className="container header-inner">
          <a className="wordmark" href="#home" aria-label="WIYANTO home" onClick={closeMenu}>
            <span className="wordmark-name">WIYANTO</span>
            <span className="wordmark-caption">Personal portfolio</span>
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
          >
            <span />
            <span />
            <span />
          </button>

          <nav id="primary-navigation" className={`primary-navigation ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
            <div className="nav-links">
              {navigation.map((item) => (
                <a key={item.href} href={item.href} onClick={closeMenu}>
                  {item.label}
                </a>
              ))}
            </div>
            <a className="button button-small button-outline" href="#contact" onClick={closeMenu}>
              Start a conversation
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero-section navy-section" id="home">
          <div className="hero-grid container">
            <div className="hero-copy">
              <p className="section-kicker light-kicker" data-animate="hero-label">Personal identity / digital portfolio</p>
              <h1 data-animate="hero-headline">Heritage meets <em data-animate="hero-emphasis">technology.</em></h1>
              <p className="hero-intro" data-animate="hero-intro">A thoughtful digital home for work, ideas, and the principles that shape them.</p>
              <div className="hero-actions" data-animate="hero-actions">
                <a className="button button-primary" href="#projects">View projects <span aria-hidden="true">↗</span></a>
                <a className="button button-text-light" href="#about">About me <span aria-hidden="true">↓</span></a>
              </div>
              <div className="hero-note" data-animate="hero-note">
                <span className="hero-note-line" aria-hidden="true" />
                <span>Initial portfolio structure — content will evolve with the work.</span>
              </div>
            </div>

            <div className="emblem-placeholder" data-animate="emblem" aria-label="Reserved area for the original WIYANTO emblem">
              <div className="placeholder-frame">
                <span className="placeholder-mark">W</span>
                <span className="placeholder-label">Original emblem<br />reserved for later integration</span>
              </div>
              <span className="placeholder-index">01 / Identity</span>
            </div>
          </div>
          <div className="hero-waterline" aria-hidden="true" />
        </section>

        <section className="about-section ivory-section section-padding" id="about">
          <div className="container about-grid">
            <div className="section-intro" data-reveal>
              <p className="section-kicker">01 / About</p>
              <h2>A place for the story behind the work.</h2>
            </div>
            <div className="about-content" data-reveal>
              <p className="lead-copy">This section will introduce the person behind WIYANTO — the background, perspective, and interests that give the portfolio its context.</p>
              <div className="about-details">
                <div className="detail-block">
                  <span className="detail-label">Biography</span>
                  <p>Placeholder for a concise personal biography and the journey that led here.</p>
                </div>
                <div className="detail-block">
                  <span className="detail-label">Point of view</span>
                  <p>Placeholder for the ideas, principles, and questions that guide the work.</p>
                </div>
              </div>
              <a className="text-link" href="#expertise">Explore the approach <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </section>

        <section className="projects-section navy-section section-padding" id="projects">
          <div className="container">
            <div className="section-heading-row" data-reveal>
              <div className="section-intro">
                <p className="section-kicker light-kicker">02 / Selected work</p>
                <h2>Projects with room<br />for the real story.</h2>
              </div>
              <p className="section-description light-description">A flexible archive for technical and creative work. Project details remain intentionally open until the portfolio content is ready.</p>
            </div>

            <div className="filter-row" aria-label="Project categories">
              {(['All', 'Technology', 'Creative', 'Research'] as ProjectCategory[]).map((category) => (
                <motion.button
                  key={category}
                  className={`filter-button ${activeCategory === category ? 'is-active' : ''}`}
                  type="button"
                  aria-pressed={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            <div className="project-grid" data-reveal-group>
              {visibleProjects.map((project) => (
                <motion.article
                  className="project-card"
                  key={project.id}
                  whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.995 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  <div className={`project-visual accent-${project.accent}`}>
                    <span className="project-number">0{project.id}</span>
                    <span className="project-visual-label">Image reserved</span>
                  </div>
                  <div className="project-card-body" data-reveal-item>
                    <div className="project-meta">
                      <span>{project.category}</span>
                      <span>{projectTypeLabels[project.type]}</span>
                    </div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <button className="card-link" type="button" onClick={(event) => openProject(project, event)}>
                      View project brief <span aria-hidden="true">↗</span>
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="expertise-section ivory-section section-padding" id="expertise">
          <div className="container">
            <div className="section-heading-row expertise-heading" data-reveal>
              <div className="section-intro">
                <p className="section-kicker">03 / Expertise</p>
                <h2>Capabilities in<br /><em>progress.</em></h2>
              </div>
              <p className="section-description">A structured overview of the technical, creative, and personal practices that will define the portfolio.</p>
            </div>
            <div className="skills-grid" data-reveal-group>
              {skills.map((skill) => (
                <article className="skill-card" data-reveal-item key={skill.number}>
                  <span className="skill-number">{skill.number}</span>
                  <h3>{skill.title}</h3>
                  <p>{skill.description}</p>
                  <ul>
                    {skill.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="experience-section paper-section section-padding" id="experience">
          <div className="container experience-grid">
            <div className="section-intro" data-reveal>
              <p className="section-kicker">04 / Experience &amp; education</p>
              <h2>A clear record of<br /><em>what comes next.</em></h2>
            </div>
            <div className="timeline" data-reveal-group aria-label="Experience and education placeholders">
              {timelineEntries.map((entry, index) => (
                <article className="timeline-entry" data-reveal-item key={entry.label}>
                  <div className="timeline-marker"><span>0{index + 1}</span></div>
                  <div className="timeline-copy">
                    <span className="entry-label">{entry.label}</span>
                    <h3>{entry.title}</h3>
                    <p className="entry-meta">{entry.meta}</p>
                    <p>{entry.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section navy-section section-padding" id="contact">
          <div className="container contact-grid">
            <div className="contact-copy" data-reveal>
              <p className="section-kicker light-kicker">05 / Contact</p>
              <h2>Begin with a<br /><em>conversation.</em></h2>
              <p className="contact-intro">This is the future home for a clear invitation to connect, collaborate, or learn more about the work.</p>
            </div>
            <div className="contact-panel" data-reveal>
              <div className="contact-row">
                <span className="detail-label light-label">Email</span>
                <span className="reserved-value">Contact address reserved</span>
              </div>
              <div className="contact-row">
                <span className="detail-label light-label">Professional links</span>
                <span className="reserved-value">Social profiles reserved</span>
              </div>
              <div className="contact-action">
                <span>Ready when the details are.</span>
                <a className="button button-primary" href="#home">Return to top <span aria-hidden="true">↑</span></a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer navy-section">
        <div className="container footer-top">
          <a className="wordmark wordmark-footer" href="#home">
            <span className="wordmark-name">WIYANTO</span>
            <span className="wordmark-caption">Personal portfolio</span>
          </a>
          <p className="footer-description">A personal portfolio foundation for work, ideas, and a considered digital presence.</p>
          <div className="footer-links">
            <span className="detail-label light-label">Explore</span>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© Year reserved for final portfolio content</span>
          <span>Made with intention</span>
        </div>
      </footer>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="modal-backdrop"
            role="presentation"
            onClick={closeProject}
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.22, ease: 'easeOut' }}
          >
            <motion.div
              ref={modalRef}
              className="project-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              aria-describedby="project-modal-description"
              onKeyDown={handleModalKeyDown}
              onClick={(event) => event.stopPropagation()}
              initial={prefersReducedMotion ? false : { y: 12, scale: 0.985, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={prefersReducedMotion ? undefined : { y: 8, scale: 0.99, opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.28, ease: 'easeOut' }}
            >
              <button ref={closeButtonRef} className="modal-close" type="button" aria-label="Close project brief" onClick={closeProject}>×</button>
              <span className="section-kicker">{selectedProject.category} / {projectTypeLabels[selectedProject.type]}</span>
              <h2 id="project-modal-title">{selectedProject.title}</h2>
              <p id="project-modal-description" className="modal-description">{selectedProject.description}</p>

              <div className="modal-meta">
                <div className="modal-meta-item">
                  <span className="detail-label">Project type</span>
                  <span>{projectTypeLabels[selectedProject.type]}</span>
                </div>
                <div className="modal-meta-item">
                  <span className="detail-label">Status</span>
                  <span>{selectedProject.status}</span>
                </div>
              </div>

              <div className="modal-overview">
                <span className="detail-label">Overview</span>
                <p>{selectedProject.overview}</p>
              </div>

              {selectedProject.preview && (
                <div className="modal-overview">
                  <span className="detail-label">Preview</span>
                  <p>{selectedProject.preview}</p>
                </div>
              )}

              {selectedProject.tools && selectedProject.tools.length > 0 && (
                <div className="modal-tools">
                  <span className="detail-label">Tools</span>
                  <div className="tool-list">
                    {selectedProject.tools.map((tool) => <span key={tool}>{tool}</span>)}
                  </div>
                </div>
              )}

              {modalActions.length > 0 && (
                <div className="modal-actions" aria-label="Project actions">
                  {modalActions.map((action) => (
                    <a
                      key={action.label}
                      className={`button ${action.primary ? 'button-primary' : 'button-secondary'}`}
                      href={action.href}
                      target={action.external ? '_blank' : undefined}
                      rel={action.external ? 'noreferrer' : undefined}
                      download={action.download ? true : undefined}
                    >
                      {action.label} <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </div>
              )}

              <button className="button button-dark modal-close-action" type="button" onClick={closeProject}>Close brief</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
