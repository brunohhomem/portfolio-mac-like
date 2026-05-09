import { BatteryFull, ChevronLeft, Home, Wifi } from "lucide-react";
import { useState } from "react";
import type { PortfolioApp, PortfolioAppId } from "../../data/portfolio";
import { usePreferences } from "../../context/PreferencesContext";
import { useClock } from "../../hooks/useClock";
import { cn } from "../../lib/cn";
import { AppWindowContent } from "../apps/AppWindowContent";
import { appIcons } from "../icons";

export function IOSExperience({ framed }: { framed: boolean }) {
  const { portfolio } = usePreferences();
  const [openAppId, setOpenAppId] = useState<PortfolioAppId | null>(null);
  const app = openAppId ? portfolio.apps.find((item) => item.id === openAppId) : undefined;

  if (framed) {
    return (
      <section
        className="relative aspect-[360/744] rounded-[46px] border border-[#d7d7dc] bg-[#f8f8fa] shadow-[3px_5px_30px_rgba(0,0,0,0.22)]"
        style={{ width: "min(360px, calc(100vw - 40px), calc((100svh - 24px) * 360 / 744))" }}
        aria-label="White iPhone 5s portfolio mockup"
      >
        <div className="absolute left-1/2 top-[6%] size-2 -translate-x-16 rounded-full bg-[#1d1d1f]/80" aria-hidden="true" />
        <div className="absolute left-1/2 top-[7.7%] h-1.5 w-16 -translate-x-1/2 rounded-full bg-[#1d1d1f]/85" aria-hidden="true" />
        <div className="absolute left-[8.3%] top-[16.9%] h-[71.5%] w-[83.4%] overflow-hidden">
          <IOSScreen app={app} onCloseApp={() => setOpenAppId(null)} onOpenApp={setOpenAppId} rounded="rounded-[4px]" />
        </div>
        <div className="absolute bottom-[5.2%] left-1/2 grid size-12 -translate-x-1/2 place-items-center rounded-full border border-[#d0d0d4] bg-[#fafafc]">
          <span className="size-5 rounded-md border border-[#bfc0c5]" aria-hidden="true" />
        </div>
      </section>
    );
  }

  return (
    <section className="h-svh w-screen overflow-hidden" aria-label="iOS portfolio">
      <IOSScreen app={app} onCloseApp={() => setOpenAppId(null)} onOpenApp={setOpenAppId} rounded="rounded-none" />
    </section>
  );
}

function IOSScreen({
  app,
  onCloseApp,
  onOpenApp,
  rounded,
}: {
  app: PortfolioApp | undefined;
  onCloseApp: () => void;
  onOpenApp: (appId: PortfolioAppId) => void;
  rounded: string;
}) {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden bg-[radial-gradient(ellipse_at_18%_20%,rgba(63,210,245,0.9),transparent_40%),radial-gradient(ellipse_at_90%_10%,rgba(255,151,83,0.75),transparent_42%),linear-gradient(160deg,#12406d_0%,#4b4f9c_48%,#111a34_100%)] text-white",
        rounded,
      )}
    >
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
  const pageApps = portfolio.apps.filter((app) => !["contact", "resume"].includes(app.id));
  const dockApps = portfolio.apps.filter((app) => ["contact", "resume"].includes(app.id));

  return (
    <div className="relative z-10 grid min-h-[calc(100%_-_25px)] grid-rows-[1fr_auto_auto] gap-4 p-5">
      <div className="grid grid-cols-3 content-start gap-x-3 gap-y-6">
        {pageApps.map((app) => (
          <IOSIconButton app={app} key={app.id} onOpenApp={onOpenApp} />
        ))}
      </div>
      <div className="flex items-center gap-3 rounded-lg border border-white/20 bg-black/25 p-3 text-white">
        <div className="grid size-11 place-items-center rounded-[10px] bg-[#1d1d1f] text-sm font-semibold">
          {portfolio.profile.initials}
        </div>
        <div className="min-w-0">
          <p className="m-0 truncate text-base font-semibold">{portfolio.profile.name}</p>
          <span className="block truncate text-xs">{portfolio.profile.role}</span>
        </div>
      </div>
      <nav className="grid min-h-24 grid-cols-2 gap-4 rounded-lg border border-white/30 bg-white/25 p-4 backdrop-blur" aria-label="iOS dock">
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
    <button type="button" className="grid min-w-0 place-items-center gap-2 bg-transparent p-0 text-center text-white" onClick={() => onOpenApp(app.id)}>
      <span
        className={cn(
          "relative grid place-items-center overflow-hidden rounded-[14px] border border-white/50 bg-[linear-gradient(180deg,rgba(255,255,255,0.74)_0%,rgba(255,255,255,0.18)_38%,transparent_39%),linear-gradient(145deg,#0066cc,#1d1d1f)] text-white shadow-[0_9px_16px_rgba(0,0,0,0.32)] after:absolute after:left-2 after:top-1.5 after:h-5 after:w-11 after:rounded-[12px_12px_18px_18px] after:bg-[linear-gradient(180deg,rgba(255,255,255,0.64),rgba(255,255,255,0.08))]",
          dock ? "size-[58px]" : "size-[62px]",
        )}
      >
        <Icon className="relative z-10" size={dock ? 27 : 30} />
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
          className="inline-flex min-h-8 items-center gap-0.5 rounded-lg border border-black/20 bg-black/10 px-1.5 text-xs font-semibold active:scale-95"
          onClick={onClose}
        >
          <ChevronLeft size={18} />
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
