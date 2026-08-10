import { useEffect, useState } from "react";
import type { FetchState, GithubRepo, GithubUser } from "../types";

interface GithubBundle {
  user: GithubUser;
  topRepos: GithubRepo[];
  languages: { name: string; count: number; percent: number }[];
}

/**
 * Pulls a public profile straight from the GitHub REST API
 */
export function useGithubProfile(username: string) {
  const [state, setState] = useState<FetchState<GithubBundle>>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading" });

    async function run() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`),
        ]);

        if (!userRes.ok) throw new Error(`no account found for "${username}"`);
        if (!reposRes.ok) throw new Error("could not load repositories");

        const user: GithubUser = await userRes.json();
        const repos: GithubRepo[] = await reposRes.json();

        const owned = repos.filter((r) => !r.fork);

        const topRepos = [...owned]
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 5);

        const languageCounts = new Map<string, number>();
        owned.forEach((repo) => {
          if (!repo.language) return;
          languageCounts.set(repo.language, (languageCounts.get(repo.language) ?? 0) + 1);
        });

        const totalTagged = [...languageCounts.values()].reduce((a, b) => a + b, 0) || 1;
        const languages = [...languageCounts.entries()]
          .map(([name, count]) => ({ name, count, percent: Math.round((count / totalTagged) * 100) }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 6);

        if (!cancelled) setState({ status: "ready", data: { user, topRepos, languages } });
      } catch (err) {
        if (!cancelled) {
          setState({
            status: "error",
            message: err instanceof Error ? err.message : "something went wrong",
          });
        }
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [username]);

  return state;
}
