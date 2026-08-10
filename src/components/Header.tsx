import { useEffect, useState } from "react";

export function Header() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time = now.toLocaleTimeString("en-US", { hour12: false });
  const date = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="mb-8 flex flex-col items-start justify-between gap-4 border-b border-phosphor-dim/30 pb-6 sm:flex-row sm:items-end">
      <div>
        <p className="mb-1 text-xs tracking-[0.3em] text-muted">SYSTEM STATUS </p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-phosphor-bright sm:text-4xl">
          dev dashboard
        </h1>
        <p className="mt-1 text-sm text-muted">{date}</p>
      </div>
      <div className="font-display text-3xl text-phosphor sm:text-4xl">
        {time}
        <span className="animate-blink">_</span>
      </div>
    </header>
  );
}
