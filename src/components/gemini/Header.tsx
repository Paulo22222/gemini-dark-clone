import { ChevronDown } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between bg-transparent px-4 py-3">
      <button
        type="button"
        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[17px] text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
      >
        Gemini
        <span className="text-[13px]">2.5 Flash</span>
        <ChevronDown className="size-4" />
      </button>

      <button
        type="button"
        aria-label="Conta"
        className="flex size-8 items-center justify-center rounded-full bg-avatar text-sm font-medium text-avatar-foreground"
      >
        P
      </button>
    </header>
  );
}
