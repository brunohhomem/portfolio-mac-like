import { ArrowLeft } from "lucide-react";
import { portfolio } from "../../data/portfolio";
import { IOSExperience } from "./IOSExperience";

export function IPhonePreview({ onExit }: { onExit: () => void }) {
  return (
    <main className="relative grid h-svh w-screen place-items-center overflow-hidden bg-black" aria-label="iPhone portfolio preview">
      <button
        type="button"
        className="absolute left-6 top-6 z-10 inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white active:scale-95"
        onClick={onExit}
      >
        <ArrowLeft size={18} />
        <span>{portfolio.desktop.desktopLabel}</span>
      </button>
      <IOSExperience framed />
    </main>
  );
}
