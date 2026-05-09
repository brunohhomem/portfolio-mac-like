import { usePreferences } from "../../context/PreferencesContext";
import type { PortfolioAppId } from "../../data/portfolio";
import { cn } from "../../lib/cn";
import { appIcons } from "../icons";
import type { WindowStateMap } from "./windowTypes";

export function Dock({
  activeAppId,
  onOpenApp,
  windows,
}: {
  activeAppId: PortfolioAppId;
  onOpenApp: (appId: PortfolioAppId) => void;
  windows: WindowStateMap;
}) {
  const { portfolio } = usePreferences();

  return (
    <nav
      className="absolute bottom-3 right-1/2 z-40 flex h-[56px] max-w-[min(92vw,465px)] translate-x-1/2 items-center gap-1.5 rounded-[14px] bg-black px-2.5 py-1.5"
      aria-label="Portfolio dock"
    >
      {portfolio.apps.map((app) => {
        const Icon = appIcons[app.icon];
        const isOpen = windows[app.id].open;
        const isActive = activeAppId === app.id && isOpen && !windows[app.id].minimized;

        return (
          <button
            type="button"
            key={app.id}
            className="group relative grid size-[41px] place-items-center rounded-[11px] text-[#1d1d1f] focus-visible:outline-none"
            aria-label={app.dockLabel}
            onClick={() => onOpenApp(app.id)}
          >
            <span
              className={cn(
                "grid size-[41px] place-items-center rounded-[11px] border transition duration-150 group-active:translate-y-[-1.5px] group-active:scale-95",
                isActive
                  ? "translate-y-[-3px] border-[#0066cc] bg-[#0066cc] text-white"
                  : "border-[#e0e0e0] bg-[#f5f5f7] group-hover:translate-y-[-3px] group-hover:border-[#0066cc] group-hover:bg-[#0066cc] group-hover:text-white group-focus-visible:translate-y-[-3px] group-focus-visible:border-[#0066cc] group-focus-visible:bg-[#0066cc] group-focus-visible:text-white",
              )}
            >
              <Icon size={21} />
            </span>
            <span className="pointer-events-none absolute bottom-[51px] left-1/2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md border border-[#e0e0e0] bg-white px-2 py-1 text-xs font-semibold text-[#1d1d1f] opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
              {app.dockLabel}
            </span>
            {isOpen ? <span className="absolute -bottom-1.5 size-1 rounded-full bg-[#0066cc]" aria-hidden="true" /> : null}
          </button>
        );
      })}
    </nav>
  );
}
