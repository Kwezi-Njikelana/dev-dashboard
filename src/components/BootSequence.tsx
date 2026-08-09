import { useEffect, useState } from "react";

const LINES = [
  "> booting dashboard.sh",
  "> connecting to api.github.com ... ok",
  "> connecting to api.open-meteo.com ... ok",
  "> rendering widgets",
];

interface BootSequenceProps {
  onDone: () => void;
}

export function BootSequence({ onDone }: BootSequenceProps) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [skippable, setSkippable] = useState(false);

  useEffect(() => {
    if (visibleLines >= LINES.length) {
      const t = setTimeout(onDone, 350);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setVisibleLines((v) => v + 1), 220);
    return () => clearTimeout(t);
  }, [visibleLines, onDone]);

  useEffect(() => {
    const t = setTimeout(() => setSkippable(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-ink px-6"
      onClick={() => skippable && onDone()}
      role="button"
      aria-label="Skip intro"
    >
      <div className="w-full max-w-lg font-mono text-sm text-phosphor sm:text-base">
        {LINES.slice(0, visibleLines).map((line, i) => (
          <p key={i} className="mb-1 opacity-90">
            {line}
          </p>
        ))}
        <span className="inline-block h-4 w-2 animate-blink bg-phosphor align-middle" />
      </div>
    </div>
  );
}
