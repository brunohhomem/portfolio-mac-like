import { ArrowLeft } from "lucide-react";
import { usePreferences } from "../../context/PreferencesContext";
import { IOSExperience } from "./IOSExperience";

export function IPhonePreview({ onExit }: { onExit: () => void }) {
  const { portfolio } = usePreferences();

  return (
    <main className="relative grid h-svh w-screen place-items-center overflow-hidden bg-black px-5 pb-5 pt-20" aria-label="iPhone portfolio preview">
      <button
        type="button"
        className="absolute left-4 top-4 z-20 inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/15 bg-[#1d1d1f]/90 px-4 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(0,0,0,0.3)] active:scale-95"
        onClick={onExit}
      >
        <ArrowLeft size={18} />
        <span>{portfolio.desktop.desktopLabel}</span>
      </button>
      <div
        className="aspect-[375/667] overflow-hidden rounded-lg border border-white/15 shadow-[0_18px_48px_rgba(0,0,0,0.42)]"
        style={{ width: "min(375px, calc(100vw - 40px), calc(56.22svh - 57px))" }}
      >
        <IOSExperience className="h-full w-full" />
      </div>
    </main>
  );
}
