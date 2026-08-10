import { useCallback, useEffect, useState } from "react";
import type { FetchState } from "../types";
import { CardError, CardSkeleton, TerminalCard } from "./TerminalCard";

/**
 * GitHub's own /zen endpoint returns a random line of design philosophy
 * as plain text. No key, no rate-limit concerns for occasional calls.
 * docs: https://docs.github.com/en/rest/meta/meta#get-github-zen
 */
export function ZenCard() {
  const [state, setState] = useState<FetchState<string>>({ status: "loading" });

  const load = useCallback(() => {
    setState({ status: "loading" });
    fetch("https://api.github.com/zen")
      .then((res) => {
        if (!res.ok) throw new Error("the oracle is unavailable");
        return res.text();
      })
      .then((text) => setState({ status: "ready", data: text }))
      .catch((err) =>
        setState({ status: "error", message: err instanceof Error ? err.message : "unknown error" })
      );
  }, []);

  useEffect(() => load(), [load]);

  return (
    <TerminalCard
      path="~/github --zen"
      action={
        <button
          onClick={load}
          className="rounded border border-phosphor-dim/50 px-2 py-0.5 text-xs text-phosphor hover:border-phosphor hover:text-phosphor-bright"
        >
          reroll
        </button>
      }
    >
      {state.status === "loading" && <CardSkeleton lines={2} />}
      {state.status === "error" && <CardError message={state.message} />}
      {state.status === "ready" && (
        <p className="flex-1 text-lg italic leading-relaxed text-parchment">
          &ldquo;{state.data}&rdquo;
        </p>
      )}
    </TerminalCard>
  );
}
