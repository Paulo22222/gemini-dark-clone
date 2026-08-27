export function Header() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between bg-transparent px-4 py-3">
      <span className="px-3 py-1.5 text-[17px] text-muted-foreground">
        J.A.R.V.I.S
      </span>

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
