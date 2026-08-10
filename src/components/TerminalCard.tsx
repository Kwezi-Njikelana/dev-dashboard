import type { ReactNode } from "react";

interface TerminalCardProps {
  path: string;
  className?: string;
  children: ReactNode;
  action?: ReactNode;
}

export function TerminalCard({ path, className = "", children, action }: TerminalCardProps) {
  return (
    <section
      className={`flex flex-col rounded-md border border-phosphor-dim/40 bg-panel/80 shadow-glow ${className}`}
    >
      <header className="flex items-center justify-between border-b border-phosphor-dim/30 px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-phosphor-dim/70" />
          <span className="h-2 w-2 rounded-full bg-phosphor-dim/50" />
          <span className="h-2 w-2 rounded-full bg-phosphor-dim/30" />
          <span className="ml-2 text-xs tracking-wide text-muted">{path}</span>
        </div>
        {action}
      </header>
      <div className="flex flex-1 flex-col p-4">{children}</div>
    </section>
  );
}

export function CardSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="animate-pulse space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="h-3 rounded bg-raised" style={{ width: `${70 - i * 12}%` }} />
      ))}
    </div>
  );
}

export function CardError({ message }: { message: string }) {
  return (
    <p className="text-sm text-neg">
      <span className="text-neg/70">error:</span> {message}
    </p>
  );
}
