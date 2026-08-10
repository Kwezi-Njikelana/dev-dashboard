import type { FetchState, GithubRepo, GithubUser } from "../types";
import { CardError, CardSkeleton, TerminalCard } from "./TerminalCard";

interface GithubBundle {
  user: GithubUser;
  topRepos: GithubRepo[];
  languages: { name: string; count: number; percent: number }[];
}

export function LanguagesCard({ state }: { state: FetchState<GithubBundle> }) {
  return (
    <TerminalCard path="~/repos --language-stats">
      {state.status === "loading" && <CardSkeleton lines={5} />}
      {state.status === "error" && <CardError message={state.message} />}
      {state.status === "ready" && (
        <div className="flex flex-1 flex-col justify-center gap-3">
          {state.data.languages.length === 0 && (
            <p className="text-sm text-muted">no language data detected.</p>
          )}
          {state.data.languages.map((lang) => (
            <div key={lang.name}>
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-parchment">{lang.name}</span>
                <span className="text-phosphor-dim">{lang.percent}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-raised">
                <div
                  className="h-1.5 rounded-full bg-phosphor transition-all duration-700"
                  style={{ width: `${lang.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </TerminalCard>
  );
}
