import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  BatteryFull,
  Cat,
  ChevronLeft,
  Clock,
  Code,
  Download,
  ExternalLink,
  FileText,
  Folder,
  Github,
  Globe,
  Home,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  Maximize2,
  Minus,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Terminal,
  User,
  Wifi,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { portfolio } from "./data/portfolio";
import type { PortfolioApp, PortfolioAppId, PortfolioIconName } from "./data/portfolio";

type WindowState = {
  open: boolean;
  minimized: boolean;
  zIndex: number;
};

type WindowStateMap = Record<PortfolioAppId, WindowState>;

const appIcons: Record<PortfolioIconName, LucideIcon> = {
  about: User,
  projects: Folder,
  skills: Terminal,
  contact: Mail,
  resume: FileText,
};

const socialIcons: Record<string, LucideIcon> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Website: Globe,
};

function createInitialWindowState(): WindowStateMap {
  return portfolio.apps.reduce((state, app, index) => {
    state[app.id] = {
      open: app.id === "about",
      minimized: false,
      zIndex: 10 + index,
    };

    return state;
  }, {} as WindowStateMap);
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const updateMatches = () => setMatches(mediaQuery.matches);

    updateMatches();
    mediaQuery.addEventListener("change", updateMatches);

    return () => mediaQuery.removeEventListener("change", updateMatches);
  }, [query]);

  return matches;
}

function useClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return useMemo(
    () =>
      new Intl.DateTimeFormat(undefined, {
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
      }).format(now),
    [now],
  );
}

export default function App() {
  const isPhone = useMediaQuery("(max-width: 767px)");
  const [previewPhone, setPreviewPhone] = useState(false);

  if (isPhone) {
    return <IOSExperience framed={false} />;
  }

  if (previewPhone) {
    return <IPhonePreview onExit={() => setPreviewPhone(false)} />;
  }

  return <MacDesktop onPreviewPhone={() => setPreviewPhone(true)} />;
}

function MacDesktop({ onPreviewPhone }: { onPreviewPhone: () => void }) {
  const clock = useClock();
  const [catMenuOpen, setCatMenuOpen] = useState(false);
  const [windows, setWindows] = useState<WindowStateMap>(() => createInitialWindowState());
  const [activeAppId, setActiveAppId] = useState<PortfolioAppId>("about");
  const [zCounter, setZCounter] = useState(20);
  const activeWindow = windows[activeAppId];
  const activeApp =
    activeWindow?.open && !activeWindow.minimized
      ? portfolio.apps.find((app) => app.id === activeAppId)
      : undefined;

  const bringToFront = (appId: PortfolioAppId) => {
    setZCounter((current) => {
      const next = current + 1;
      setWindows((currentWindows) => ({
        ...currentWindows,
        [appId]: {
          ...currentWindows[appId],
          open: true,
          minimized: false,
          zIndex: next,
        },
      }));
      return next;
    });
    setActiveAppId(appId);
  };

  const closeWindow = (appId: PortfolioAppId) => {
    setWindows((currentWindows) => ({
      ...currentWindows,
      [appId]: {
        ...currentWindows[appId],
        open: false,
        minimized: false,
      },
    }));

    if (activeAppId === appId) {
      setActiveAppId("about");
    }
  };

  const minimizeWindow = (appId: PortfolioAppId) => {
    setWindows((currentWindows) => ({
      ...currentWindows,
      [appId]: {
        ...currentWindows[appId],
        minimized: true,
      },
    }));
  };

  return (
    <main className="mac-desktop" aria-label="Developer portfolio macOS desktop">
      <TopBar
        activeAppName={activeApp?.shortTitle ?? portfolio.desktop.finderName}
        catMenuOpen={catMenuOpen}
        clock={clock}
        onToggleCatMenu={() => setCatMenuOpen((isOpen) => !isOpen)}
        onPreviewPhone={() => {
          setCatMenuOpen(false);
          onPreviewPhone();
        }}
      />

      <section className="desktop-icons" aria-label="Desktop files">
        <button type="button" className="desktop-file" onClick={() => bringToFront("resume")}>
          <FileText size={34} />
          <span>Resume.pdf</span>
        </button>
        <button type="button" className="desktop-file" onClick={() => bringToFront("projects")}>
          <Folder size={36} />
          <span>Projects</span>
        </button>
      </section>

      <section className="window-layer" aria-label="Open portfolio windows">
        {portfolio.apps.map((app) => {
          const state = windows[app.id];

          if (!state.open || state.minimized) {
            return null;
          }

          return (
            <MacWindow
              key={app.id}
              app={app}
              isActive={activeAppId === app.id}
              state={state}
              onClose={() => closeWindow(app.id)}
              onFocus={() => bringToFront(app.id)}
              onMinimize={() => minimizeWindow(app.id)}
            />
          );
        })}
      </section>

      <Dock activeAppId={activeAppId} onOpenApp={bringToFront} windows={windows} />
    </main>
  );
}

function TopBar({
  activeAppName,
  catMenuOpen,
  clock,
  onPreviewPhone,
  onToggleCatMenu,
}: {
  activeAppName: string;
  catMenuOpen: boolean;
  clock: string;
  onPreviewPhone: () => void;
  onToggleCatMenu: () => void;
}) {
  return (
    <header className="top-bar">
      <div className="menu-left">
        <div className="cat-menu-wrap">
          <button
            type="button"
            className="cat-menu-button"
            aria-expanded={catMenuOpen}
            aria-label={portfolio.desktop.catMenuTitle}
            onClick={onToggleCatMenu}
          >
            <Cat size={18} strokeWidth={2.4} />
          </button>
          {catMenuOpen ? (
            <div className="cat-menu-popover" role="menu">
              <div className="cat-menu-heading">
                <Cat size={18} />
                <span>{portfolio.profile.handle}</span>
              </div>
              <button type="button" role="menuitem" onClick={onPreviewPhone}>
                <Smartphone size={17} />
                <span>{portfolio.desktop.previewLabel}</span>
              </button>
            </div>
          ) : null}
        </div>
        <strong className="active-app-name">{activeAppName}</strong>
        <nav className="menu-items" aria-label="Desktop menu">
          {portfolio.desktop.menuItems.map((item) => (
            <button type="button" key={item}>
              {item}
            </button>
          ))}
        </nav>
      </div>

      <div className="menu-right">
        <Wifi size={16} aria-label="Wi-Fi" />
        <BatteryFull size={17} aria-label="Battery" />
        <Search size={15} aria-label="Search" />
        <span className="clock-label">{clock}</span>
      </div>
    </header>
  );
}

function Dock({
  activeAppId,
  onOpenApp,
  windows,
}: {
  activeAppId: PortfolioAppId;
  onOpenApp: (appId: PortfolioAppId) => void;
  windows: WindowStateMap;
}) {
  return (
    <nav className="dock" aria-label="Portfolio dock">
      {portfolio.apps.map((app) => {
        const Icon = appIcons[app.icon];
        const isOpen = windows[app.id].open;
        const isActive = activeAppId === app.id && isOpen && !windows[app.id].minimized;

        return (
          <button
            type="button"
            key={app.id}
            className={`dock-item ${isActive ? "active" : ""}`}
            style={{ "--accent": app.accent } as React.CSSProperties}
            aria-label={app.dockLabel}
            onClick={() => onOpenApp(app.id)}
          >
            <span className="dock-icon">
              <Icon size={28} />
            </span>
            <span className="dock-tooltip">{app.dockLabel}</span>
            {isOpen ? <span className="dock-dot" aria-hidden="true" /> : null}
          </button>
        );
      })}
    </nav>
  );
}

function MacWindow({
  app,
  isActive,
  onClose,
  onFocus,
  onMinimize,
  state,
}: {
  app: PortfolioApp;
  isActive: boolean;
  onClose: () => void;
  onFocus: () => void;
  onMinimize: () => void;
  state: WindowState;
}) {
  const Icon = appIcons[app.icon];

  return (
    <article
      className={`mac-window ${isActive ? "active" : ""}`}
      style={
        {
          "--window-x": `${app.defaultWindow.x}px`,
          "--window-y": `${app.defaultWindow.y}px`,
          "--window-width": `${app.defaultWindow.width}px`,
          "--window-height": `${app.defaultWindow.height}px`,
          "--accent": app.accent,
          zIndex: state.zIndex,
        } as React.CSSProperties
      }
      onMouseDown={onFocus}
    >
      <header className="window-titlebar">
        <div className="traffic-lights" aria-label={`${app.title} controls`}>
          <button type="button" className="traffic close" aria-label="Close" onClick={onClose}>
            <X size={10} />
          </button>
          <button type="button" className="traffic minimize" aria-label="Minimize" onClick={onMinimize}>
            <Minus size={10} />
          </button>
          <button type="button" className="traffic zoom" aria-label="Zoom" onClick={onFocus}>
            <Maximize2 size={9} />
          </button>
        </div>
        <div className="window-title">
          <Icon size={15} />
          <span>{app.title}</span>
        </div>
      </header>
      <div className="window-body">
        <PortfolioAppContent appId={app.id} presentation="mac" />
      </div>
    </article>
  );
}

function PortfolioAppContent({
  appId,
  presentation,
}: {
  appId: PortfolioAppId;
  presentation: "mac" | "ios";
}) {
  if (appId === "about") {
    return <AboutContent presentation={presentation} />;
  }

  if (appId === "projects") {
    return <ProjectsContent />;
  }

  if (appId === "skills") {
    return <SkillsContent />;
  }

  if (appId === "contact") {
    return <ContactContent />;
  }

  return <ResumeContent />;
}

function AboutContent({ presentation }: { presentation: "mac" | "ios" }) {
  return (
    <div className={`about-layout ${presentation === "ios" ? "ios-content-wrap" : ""}`}>
      <section className="profile-pane">
        <div className="avatar" aria-hidden="true">
          {portfolio.profile.initials}
        </div>
        <div>
          <p className="eyebrow">{portfolio.profile.handle}</p>
          <h1>{portfolio.profile.name}</h1>
          <p className="role-line">{portfolio.profile.role}</p>
        </div>
      </section>

      <section className="detail-pane">
        <div className="status-row">
          <span>
            <MapPin size={15} />
            {portfolio.profile.location}
          </span>
          <span>
            <Clock size={15} />
            {portfolio.profile.availability}
          </span>
        </div>
        <p className="lead">{portfolio.profile.intro}</p>
        <p>{portfolio.profile.bio}</p>
        <div className="highlight-list">
          {portfolio.profile.highlights.map((highlight) => (
            <div className="highlight-item" key={highlight}>
              <Sparkles size={17} />
              <span>{highlight}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ProjectsContent() {
  return (
    <div className="projects-grid">
      {portfolio.projects.map((project) => (
        <article className="project-card" key={project.title}>
          <div className="project-card-heading">
            <div className="project-icon" aria-hidden="true">
              <Layers size={21} />
            </div>
            <div>
              <p className="eyebrow">Project</p>
              <h2>{project.title}</h2>
            </div>
          </div>
          <p>{project.summary}</p>
          <p className="impact">
            <ShieldCheck size={15} />
            {project.impact}
          </p>
          <div className="tag-list">
            {project.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="link-row">
            {project.links.map((link) => (
              <a href={link.href} target="_blank" rel="noreferrer" key={link.label}>
                <ExternalLink size={14} />
                {link.label}
              </a>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

function SkillsContent() {
  return (
    <div className="terminal-view">
      <div className="terminal-line">
        <span className="prompt">$</span>
        <span>cat skills.json</span>
      </div>
      <div className="skill-grid">
        {portfolio.skillGroups.map((group) => (
          <section className="skill-group" key={group.title}>
            <h2>
              <Code size={17} />
              {group.title}
            </h2>
            <ul>
              {group.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

function ContactContent() {
  const mailTo = `mailto:${portfolio.contact.email}`;

  return (
    <div className="contact-layout">
      <section className="mail-message">
        <p className="eyebrow">New message</p>
        <h1>{portfolio.profile.name}</h1>
        <p>{portfolio.contact.message}</p>
        <a className="primary-action" href={mailTo}>
          <Mail size={17} />
          {portfolio.contact.email}
        </a>
      </section>
      <section className="contact-links" aria-label="Social links">
        {portfolio.contact.links.map((link) => {
          const Icon = socialIcons[link.label] ?? Globe;

          return (
            <a href={link.href} target="_blank" rel="noreferrer" key={link.label}>
              <Icon size={19} />
              <span>{link.label}</span>
              <ExternalLink size={14} />
            </a>
          );
        })}
      </section>
    </div>
  );
}

function ResumeContent() {
  return (
    <div className="resume-view">
      <header className="resume-header">
        <div>
          <p className="eyebrow">Resume</p>
          <h1>{portfolio.profile.name}</h1>
          <p>{portfolio.profile.role}</p>
        </div>
        <a className="icon-action" href={portfolio.resume.downloadUrl} target="_blank" rel="noreferrer">
          <Download size={17} />
          <span>PDF</span>
        </a>
      </header>
      <div className="timeline">
        {portfolio.resume.items.map((item) => (
          <article className="timeline-item" key={`${item.role}-${item.organization}`}>
            <span className="timeline-dot" aria-hidden="true" />
            <p className="period">{item.period}</p>
            <h2>{item.role}</h2>
            <h3>{item.organization}</h3>
            <p>{item.summary}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function IPhonePreview({ onExit }: { onExit: () => void }) {
  return (
    <main className="iphone-stage" aria-label="iPhone portfolio preview">
      <button type="button" className="stage-back" onClick={onExit}>
        <ArrowLeft size={18} />
        <span>{portfolio.desktop.desktopLabel}</span>
      </button>
      <IOSExperience framed />
    </main>
  );
}

function IOSExperience({ framed }: { framed: boolean }) {
  const [openAppId, setOpenAppId] = useState<PortfolioAppId | null>(null);
  const app = openAppId ? portfolio.apps.find((item) => item.id === openAppId) : undefined;

  return (
    <section className={framed ? "iphone-device" : "ios-device-full"} aria-label="iOS portfolio">
      {framed ? <div className="iphone-speaker" aria-hidden="true" /> : null}
      <div className="ios-screen">
        <IOSStatusBar />
        {app ? (
          <IOSAppView app={app} onClose={() => setOpenAppId(null)} />
        ) : (
          <IOSHomeScreen onOpenApp={setOpenAppId} />
        )}
      </div>
      {framed ? <div className="iphone-home-button" aria-hidden="true" /> : null}
    </section>
  );
}

function IOSStatusBar() {
  const clock = useClock();
  const timeLabel = clock.includes(",") ? clock.split(",").slice(-1)[0].trim() : clock;

  return (
    <header className="ios-status-bar">
      <span>{portfolio.profile.handle}</span>
      <strong>{timeLabel}</strong>
      <span className="ios-status-icons">
        <Wifi size={13} />
        <BatteryFull size={14} />
      </span>
    </header>
  );
}

function IOSHomeScreen({ onOpenApp }: { onOpenApp: (appId: PortfolioAppId) => void }) {
  const pageApps = portfolio.apps.filter((app) => !["contact", "resume"].includes(app.id));
  const dockApps = portfolio.apps.filter((app) => ["contact", "resume"].includes(app.id));

  return (
    <div className="ios-home">
      <div className="ios-home-grid">
        {pageApps.map((app) => (
          <IOSIconButton app={app} key={app.id} onOpenApp={onOpenApp} />
        ))}
      </div>
      <div className="ios-home-name">
        <div className="ios-avatar">{portfolio.profile.initials}</div>
        <div>
          <p>{portfolio.profile.name}</p>
          <span>{portfolio.profile.role}</span>
        </div>
      </div>
      <nav className="ios-dock" aria-label="iOS dock">
        {dockApps.map((app) => (
          <IOSIconButton app={app} key={app.id} onOpenApp={onOpenApp} dock />
        ))}
      </nav>
    </div>
  );
}

function IOSIconButton({
  app,
  dock = false,
  onOpenApp,
}: {
  app: PortfolioApp;
  dock?: boolean;
  onOpenApp: (appId: PortfolioAppId) => void;
}) {
  const Icon = appIcons[app.icon];

  return (
    <button
      type="button"
      className={`ios-app-icon ${dock ? "in-dock" : ""}`}
      onClick={() => onOpenApp(app.id)}
    >
      <span className="ios-icon-art" style={{ "--accent": app.accent } as React.CSSProperties}>
        <Icon size={dock ? 27 : 30} />
      </span>
      <span>{app.dockLabel}</span>
    </button>
  );
}

function IOSAppView({ app, onClose }: { app: PortfolioApp; onClose: () => void }) {
  const Icon = appIcons[app.icon];

  return (
    <article className="ios-app-view">
      <header className="ios-app-nav" style={{ "--accent": app.accent } as React.CSSProperties}>
        <button type="button" onClick={onClose}>
          <ChevronLeft size={18} />
          <span>Home</span>
        </button>
        <div>
          <Icon size={17} />
          <strong>{app.shortTitle}</strong>
        </div>
        <Home size={17} aria-hidden="true" />
      </header>
      <div className="ios-app-body">
        <PortfolioAppContent appId={app.id} presentation="ios" />
      </div>
    </article>
  );
}
