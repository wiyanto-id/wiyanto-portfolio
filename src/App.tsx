import { useEffect, useState } from 'react';

type ProjectCategory = 'All' | 'Technology' | 'Creative' | 'Research';

type Project = {
  id: number;
  category: Exclude<ProjectCategory, 'All'>;
  eyebrow: string;
  title: string;
  description: string;
  accent: string;
};

const navigation = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const projects: Project[] = [
  {
    id: 1,
    category: 'Technology',
    eyebrow: 'Project placeholder 01',
    title: 'A future digital product',
    description: 'Reserved for a technical project summary, its purpose, and the role it played in the final outcome.',
    accent: 'blue',
  },
  {
    id: 2,
    category: 'Creative',
    eyebrow: 'Project placeholder 02',
    title: 'A considered creative work',
    description: 'Reserved for a creative case study that explains the idea, the process, and the finished experience.',
    accent: 'gold',
  },
  {
    id: 3,
    category: 'Research',
    eyebrow: 'Project placeholder 03',
    title: 'An inquiry in progress',
    description: 'Reserved for research, writing, or experimentation that demonstrates curiosity and a clear point of view.',
    accent: 'green',
  },
];

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

  const visibleProjects = activeCategory === 'All'
    ? projects
    : projects.filter((project) => project.category === activeCategory);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setSelectedProject(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <header className="site-header">
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
              <p className="section-kicker light-kicker">Personal identity / digital portfolio</p>
              <h1>Heritage meets <em>technology.</em></h1>
              <p className="hero-intro">A thoughtful digital home for work, ideas, and the principles that shape them.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#projects">View projects <span aria-hidden="true">↗</span></a>
                <a className="button button-text-light" href="#about">About me <span aria-hidden="true">↓</span></a>
              </div>
              <div className="hero-note">
                <span className="hero-note-line" aria-hidden="true" />
                <span>Initial portfolio structure — content will evolve with the work.</span>
              </div>
            </div>

            <div className="emblem-placeholder" aria-label="Reserved area for the original WIYANTO emblem">
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
            <div className="section-intro">
              <p className="section-kicker">01 / About</p>
              <h2>A place for the story behind the work.</h2>
            </div>
            <div className="about-content">
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
            <div className="section-heading-row">
              <div className="section-intro">
                <p className="section-kicker light-kicker">02 / Selected work</p>
                <h2>Projects with room<br />for the real story.</h2>
              </div>
              <p className="section-description light-description">A flexible archive for technical and creative work. Project details remain intentionally open until the portfolio content is ready.</p>
            </div>

            <div className="filter-row" aria-label="Project categories">
              {(['All', 'Technology', 'Creative', 'Research'] as ProjectCategory[]).map((category) => (
                <button
                  key={category}
                  className={`filter-button ${activeCategory === category ? 'is-active' : ''}`}
                  type="button"
                  aria-pressed={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="project-grid">
              {visibleProjects.map((project) => (
                <article className="project-card" key={project.id}>
                  <div className={`project-visual accent-${project.accent}`}>
                    <span className="project-number">0{project.id}</span>
                    <span className="project-visual-label">Image reserved</span>
                  </div>
                  <div className="project-card-body">
                    <div className="project-meta">
                      <span>{project.category}</span>
                      <span>Placeholder</span>
                    </div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <button className="card-link" type="button" onClick={() => setSelectedProject(project)}>
                      View project brief <span aria-hidden="true">↗</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="expertise-section ivory-section section-padding" id="expertise">
          <div className="container">
            <div className="section-heading-row expertise-heading">
              <div className="section-intro">
                <p className="section-kicker">03 / Expertise</p>
                <h2>Capabilities in<br /><em>progress.</em></h2>
              </div>
              <p className="section-description">A structured overview of the technical, creative, and personal practices that will define the portfolio.</p>
            </div>
            <div className="skills-grid">
              {skills.map((skill) => (
                <article className="skill-card" key={skill.number}>
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
            <div className="section-intro">
              <p className="section-kicker">04 / Experience &amp; education</p>
              <h2>A clear record of<br /><em>what comes next.</em></h2>
            </div>
            <div className="timeline" aria-label="Experience and education placeholders">
              {timelineEntries.map((entry, index) => (
                <article className="timeline-entry" key={entry.label}>
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
            <div className="contact-copy">
              <p className="section-kicker light-kicker">05 / Contact</p>
              <h2>Begin with a<br /><em>conversation.</em></h2>
              <p className="contact-intro">This is the future home for a clear invitation to connect, collaborate, or learn more about the work.</p>
            </div>
            <div className="contact-panel">
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

      {selectedProject && (
        <div className="modal-backdrop" role="presentation" onClick={() => setSelectedProject(null)}>
          <div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" type="button" aria-label="Close project brief" onClick={() => setSelectedProject(null)}>×</button>
            <span className="section-kicker">{selectedProject.category} / Brief placeholder</span>
            <h2 id="project-modal-title">{selectedProject.title}</h2>
            <p>{selectedProject.description}</p>
            <div className="modal-note">This space is ready for the project objective, contribution, process, and outcome once real portfolio content is available.</div>
            <button className="button button-dark" type="button" onClick={() => setSelectedProject(null)}>Close brief</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
