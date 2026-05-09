import { BatteryFull, ChevronLeft, Home, Wifi } from "lucide-react";
import { useState } from "react";
import type { PortfolioApp, PortfolioAppId } from "../../data/portfolio";
import { usePreferences } from "../../context/PreferencesContext";
import { useClock } from "../../hooks/useClock";
import { cn } from "../../lib/cn";
import { AppWindowContent } from "../apps/AppWindowContent";
import { appIcons } from "../icons";

export function IOSExperience({ className }: { className?: string } = {}) {
  const { portfolio } = usePreferences();
  const [openAppId, setOpenAppId] = useState<PortfolioAppId | null>(null);
  const app = openAppId ? portfolio.apps.find((item) => item.id === openAppId) : undefined;

  return (
    <section className={cn(className ?? "h-svh w-screen", "overflow-hidden")} aria-label="iOS portfolio">
      <IOSScreen app={app} onCloseApp={() => setOpenAppId(null)} onOpenApp={setOpenAppId} />
    </section>
  );
}

function IOSScreen({
  app,
  onCloseApp,
  onOpenApp,
}: {
  app: PortfolioApp | undefined;
  onCloseApp: () => void;
  onOpenApp: (appId: PortfolioAppId) => void;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[radial-gradient(ellipse_at_18%_20%,rgba(63,210,245,0.9),transparent_40%),radial-gradient(ellipse_at_90%_10%,rgba(255,151,83,0.75),transparent_42%),linear-gradient(160deg,#12406d_0%,#4b4f9c_48%,#111a34_100%)] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.13),rgba(0,0,0,0.16))]" />
      <IOSStatusBar />
      {app ? <IOSAppView app={app} onClose={onCloseApp} /> : <IOSHomeScreen onOpenApp={onOpenApp} />}
    </div>
  );
}

function IOSStatusBar() {
  const clock = useClock();
  const { portfolio } = usePreferences();
  const timeLabel = clock.includes(",") ? clock.split(",").slice(-1)[0].trim() : clock;

  return (
    <header className="relative z-10 grid min-h-[25px] grid-cols-[1fr_auto_1fr] items-center bg-black/30 px-2 text-xs font-semibold text-white">
      <span>{portfolio.profile.handle}</span>
      <strong>{timeLabel}</strong>
      <span className="flex justify-end gap-1">
        <Wifi size={13} />
        <BatteryFull size={14} />
      </span>
    </header>
  );
}

function IOSHomeScreen({ onOpenApp }: { onOpenApp: (appId: PortfolioAppId) => void }) {
  const { portfolio } = usePreferences();

  return (
    <div className="relative z-10 min-h-[calc(100%_-_25px)] p-5">
      <div className="grid grid-cols-3 content-start gap-x-3 gap-y-6">
        {portfolio.apps.map((app) => (
          <IOSIconButton app={app} key={app.id} onOpenApp={onOpenApp} />
        ))}
      </div>
    </div>
  );
}

function IOSIconButton({
  app,
  onOpenApp,
}: {
  app: PortfolioApp;
  onOpenApp: (appId: PortfolioAppId) => void;
}) {
  const Icon = appIcons[app.icon];

  return (
    <button
      type="button"
      className="group grid min-w-0 place-items-center gap-1.5 bg-transparent p-0 text-center text-white"
      onClick={() => onOpenApp(app.id)}
    >
      <span className="grid size-[41px] place-items-center rounded-[11px] border border-[#e0e0e0] bg-[#f5f5f7] text-[#1d1d1f] shadow-[0_5px_10px_rgba(0,0,0,0.24)] transition duration-150 group-hover:translate-y-[-3px] group-hover:border-[#0066cc] group-hover:bg-[#0066cc] group-hover:text-white group-focus-visible:translate-y-[-3px] group-focus-visible:border-[#0066cc] group-focus-visible:bg-[#0066cc] group-focus-visible:text-white group-active:translate-y-[-1.5px] group-active:scale-95">
        <Icon size={21} />
      </span>
      <span className="w-full [overflow-wrap:anywhere] text-xs font-semibold drop-shadow">{app.dockLabel}</span>
    </button>
  );
}

function IOSAppView({ app, onClose }: { app: PortfolioApp; onClose: () => void }) {
  const Icon = appIcons[app.icon];
  const { portfolio } = usePreferences();

  return (
    <article className="absolute inset-x-0 bottom-0 top-[25px] z-20 flex flex-col overflow-hidden bg-[#f5f5f7]">
      <header className="grid h-12 shrink-0 grid-cols-[78px_minmax(0,1fr)_42px] items-center border-b border-black/20 bg-[#0066cc] px-2 text-white">
        <button
          type="button"
          className="inline-flex min-h-5 items-center gap-0.5 rounded-md border border-black/20 bg-black/10 px-1 text-xs font-semibold active:scale-95"
          onClick={onClose}
        >
          <ChevronLeft size={11} />
          <span>{portfolio.ui.homeLabel}</span>
        </button>
        <div className="flex min-w-0 items-center justify-center gap-2">
          <Icon size={17} />
          <strong className="truncate text-sm">{app.shortTitle}</strong>
        </div>
        <Home size={17} className="justify-self-end opacity-80" aria-hidden="true" />
      </header>
      <div className="min-h-0 flex-1 overflow-auto p-3 text-[#1d1d1f]">
        <AppWindowContent appId={app.id} presentation="ios" />
      </div>
    </article>
  );
}
