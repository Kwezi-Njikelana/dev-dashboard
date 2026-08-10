import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { BootSequence } from "./components/BootSequence";
import { ProfileCard } from "./components/ProfileCard";
import { ReposCard } from "./components/ReposCard";
import { LanguagesCard } from "./components/LanguagesCard";
import { WeatherCard } from "./components/WeatherCard";
import { ZenCard } from "./components/ZenCard";
import { UsernameField } from "./components/UsernameField";
import { useGithubProfile } from "./hooks/useGithubProfile";

const DEFAULT_USERNAME = "Kwezi-Njikelana";

export default function App() {
  const [booted, setBooted] = useState(false);
  const [username, setUsername] = useState(DEFAULT_USERNAME);
  const githubState = useGithubProfile(username);

  useEffect(() => {
    const seen = sessionStorage.getItem("dashboard-booted");
    if (seen) setBooted(true);
  }, []);

  function finishBoot() {
    sessionStorage.setItem("dashboard-booted", "1");
    setBooted(true);
  }

  if (!booted) {
    return <BootSequence onDone={finishBoot} />;
  }

  return (
    <div className="min-h-screen bg-ink px-4 py-8 sm:px-8 lg:px-16">
      <div className="crt-overlay" />
      <div className="mx-auto max-w-6xl animate-flicker">
        <Header />
        <UsernameField username={username} onChange={setUsername} />

        <main className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ProfileCard username={username} state={githubState} />
          <ReposCard state={githubState} />
          <LanguagesCard state={githubState} />
          <WeatherCard />
          <ZenCard />
        </main>

        <footer className="mt-10 border-t border-phosphor-dim/20 pt-4 text-center text-xs text-muted">
          data via GitHub &amp; Open-Meteo public APIs 
        </footer>
      </div>
    </div>
  );
}
