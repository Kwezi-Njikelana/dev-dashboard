import { useState, type FormEvent } from "react";
import { useWeather } from "../hooks/useWeather";
import { CardError, CardSkeleton, TerminalCard } from "./TerminalCard";
import { describeWeatherCode } from "../lib/format";

export function WeatherCard() {
  const [cityInput, setCityInput] = useState("");
  const [city, setCity] = useState<string | undefined>(undefined);
  const state = useWeather(city);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (cityInput.trim()) setCity(cityInput.trim());
  }

  return (
    <TerminalCard
      path="~/weather"
      action={
        <form onSubmit={handleSubmit} className="flex gap-1">
          <input
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            placeholder="city"
            className="w-20 rounded bg-raised px-2 py-0.5 text-xs text-parchment placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-phosphor"
          />
        </form>
      }
    >
      {state.status === "loading" && <CardSkeleton lines={3} />}
      {state.status === "error" && <CardError message={state.message} />}
      {state.status === "ready" && (
        <div className="flex flex-1 items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted">{state.data.place}</p>
            <p className="font-display text-3xl text-phosphor-bright">
              {Math.round(state.data.temperature)}&deg;C
            </p>
            <p className="text-sm text-muted">{describeWeatherCode(state.data.weathercode).label}</p>
          </div>
          <div className="text-right">
            <span className="text-3xl">{describeWeatherCode(state.data.weathercode).glyph}</span>
            <p className="mt-1 text-xs text-muted">wind {Math.round(state.data.windspeed)} km/h</p>
          </div>
        </div>
      )}
    </TerminalCard>
  );
}
