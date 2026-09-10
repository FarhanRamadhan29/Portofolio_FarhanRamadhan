function BrowserFrame({ label, children, className = "" }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-ink/10 bg-surface ${className}`}
    >
      <div className="flex items-center gap-4 border-b border-ink/10 bg-ink/[0.03] px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        </div>
        {label ? (
          <div className="min-w-0 flex-1 truncate rounded-md bg-ink/[0.05] px-3 py-1 text-center text-xs text-ink/35">
            {label}
          </div>
        ) : null}
      </div>

      <div className="relative aspect-[16/10] w-full">{children}</div>
    </div>
  );
}

export default BrowserFrame;
