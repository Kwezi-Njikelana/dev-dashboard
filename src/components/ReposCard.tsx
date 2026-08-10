import type { FetchState, GithubRepo, GithubUser } from "../types";
import { CardError, CardSkeleton, TerminalCard } from "./TerminalCard";
import { compactNumber } from "../lib/format";

interface GithubBundle {
  user: GithubUser;
  topRepos: GithubRepo[];
  languages: { name: string; count: number; percent: number }[];
}

export function ReposCard({ state }: { state: FetchState<GithubBundle> }) {
  return (
    <TerminalCard path="~/repos ">
      {state.status === "loading" && <CardSkeleton lines={5} />}
      {state.status === "error" && <CardError message={state.message} />}
      {state.status === "ready" && (
        <ul className="space-y-3">
          {state.data.topRepos.length === 0 && (
            <p className="text-sm text-muted">no public repositories yet.</p>
          )}
          {state.data.topRepos.map((repo) => (
            <li key={repo.id}>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-parchment hover:text-phosphor-bright hover:underline"
              >
                {repo.name}
              </a>
              {repo.description && (
                <p className="truncate text-xs text-muted">{repo.description}</p>
              )}
              <div className="mt-0.5 flex gap-4 text-xs text-phosphor-dim">
                <span>&#9733; {compactNumber(repo.stargazers_count)}</span>
                <span>&#8916; {compactNumber(repo.forks_count)}</span>
                {repo.language && <span className="text-muted">{repo.language}</span>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </TerminalCard>
  );
}
