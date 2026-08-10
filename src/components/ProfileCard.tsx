import type { FetchState, GithubRepo, GithubUser } from "../types";
import { CardError, CardSkeleton, TerminalCard } from "./TerminalCard";
import { compactNumber, formatJoinDate } from "../lib/format";

interface GithubBundle {
  user: GithubUser;
  topRepos: GithubRepo[];
  languages: { name: string; count: number; percent: number }[];
}

interface ProfileCardProps {
  username: string;
  state: FetchState<GithubBundle>;
}

export function ProfileCard({ username, state }: ProfileCardProps) {
  return (
    <TerminalCard path={`~/github/${username}`} className="sm:col-span-2">
      {state.status === "loading" && <CardSkeleton lines={4} />}
      {state.status === "error" && <CardError message={state.message} />}
      {state.status === "ready" && (
        <div className="flex flex-col gap-4 sm:flex-row">
          <img
            src={state.data.user.avatar_url}
            alt={`${state.data.user.login} avatar`}
            className="h-20 w-20 rounded-md border border-phosphor-dim/50 sm:h-24 sm:w-24"
          />
          <div className="flex-1">
            <div className="flex flex-wrap items-baseline gap-2">
              <h2 className="font-display text-xl text-parchment">
                {state.data.user.name ?? state.data.user.login}
              </h2>
              <a
                href={state.data.user.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-phosphor hover:text-phosphor-bright hover:underline"
              >
                @{state.data.user.login}
              </a>
            </div>
            {state.data.user.bio && (
              <p className="mt-1 text-sm text-muted">{state.data.user.bio}</p>
            )}
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <Stat label="repos" value={state.data.user.public_repos} />
              <Stat label="followers" value={state.data.user.followers} />
              <Stat label="following" value={state.data.user.following} />
              <Stat label="joined" value={formatJoinDate(state.data.user.created_at)} raw />
            </div>
          </div>
        </div>
      )}
    </TerminalCard>
  );
}

function Stat({ label, value, raw }: { label: string; value: number | string; raw?: boolean }) {
  return (
    <div>
      <span className="text-phosphor-bright">{raw ? value : compactNumber(value as number)}</span>{" "}
      <span className="text-muted">{label}</span>
    </div>
  );
}
