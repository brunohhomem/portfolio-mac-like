import { useState } from "react";
import { FileText, Folder } from "lucide-react";
import { usePreferences } from "../../context/PreferencesContext";
import type { PortfolioApp, PortfolioAppId } from "../../data/portfolio";
import { useClock } from "../../hooks/useClock";
import { AppWindowContent } from "../apps/AppWindowContent";
import { Dock } from "./Dock";
import { MacWindow } from "./MacWindow";
import { TopBar } from "./TopBar";
import type { WindowStateMap } from "./windowTypes";

function createInitialWindowState(apps: PortfolioApp[]): WindowStateMap {
  return apps.reduce((state, app, index) => {
    state[app.id] = {
      open: app.id === "about",
      minimized: false,
      x: app.defaultWindow.x,
      y: app.defaultWindow.y,
      zIndex: 10 + index,
    };

    return state;
  }, {} as WindowStateMap);
}

export function MacDesktop({ onPreviewPhone }: { onPreviewPhone: () => void }) {
  const { portfolio } = usePreferences();
  const clock = useClock();
  const [catMenuOpen, setCatMenuOpen] = useState(false);
  const [windows, setWindows] = useState<WindowStateMap>(() => createInitialWindowState(portfolio.apps));
  const [activeAppId, setActiveAppId] = useState<PortfolioAppId>("about");
  const [zCounter, setZCounter] = useState(20);
  const activeWindow = windows[activeAppId];
  const projectsApp = portfolio.apps.find((app) => app.id === "projects");
  const resumeApp = portfolio.apps.find((app) => app.id === "resume");
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

  const moveWindow = (appId: PortfolioAppId, x: number, y: number) => {
    setWindows((currentWindows) => ({
      ...currentWindows,
      [appId]: {
        ...currentWindows[appId],
        x,
        y,
      },
    }));
  };

  return (
    <main className="relative h-svh w-screen overflow-hidden bg-[#f5f5f7]" aria-label="Developer portfolio macOS desktop">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] bg-[#272729]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.04),transparent_22%,transparent_78%,rgba(0,0,0,0.04))]" />

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

      <section className="absolute right-5 top-16 z-10 grid gap-5" aria-label="Desktop files">
        <DesktopFile label={`${resumeApp?.shortTitle ?? "Resume"}.pdf`} icon={FileText} onClick={() => bringToFront("resume")} />
        <DesktopFile label={projectsApp?.shortTitle ?? "Projects"} icon={Folder} onClick={() => bringToFront("projects")} />
      </section>

      <section className="absolute inset-x-0 bottom-[86px] top-[30px] z-20" aria-label="Open portfolio windows">
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
              onMove={(x, y) => moveWindow(app.id, x, y)}
            >
              <AppWindowContent appId={app.id} presentation="mac" />
            </MacWindow>
          );
        })}
      </section>

      <Dock activeAppId={activeAppId} onOpenApp={bringToFront} windows={windows} />
    </main>
  );
}

function DesktopFile({
  icon: Icon,
  label,
  onClick,
}: {
  icon: typeof FileText;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="grid w-24 place-items-center gap-2 bg-transparent text-white focus-visible:outline-none"
      onClick={onClick}
    >
      <Icon size={36} />
      <span className="max-w-24 overflow-hidden text-ellipsis whitespace-nowrap rounded-md px-1.5 py-0.5 text-center text-xs font-semibold hover:bg-[#0066cc]">
        {label}
      </span>
    </button>
  );
}
