import { useEffect, useState } from "react";
import type { FetchState, WeatherData } from "../types";

const FALLBACK_CITY = "Cape Town";


export function useWeather(cityOverride?: string) {
  const [state, setState] = useState<FetchState<WeatherData>>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading" });

    async function fetchByCoords(lat: number, lon: number, place: string) {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
      );
      if (!res.ok) throw new Error("weather feed is unavailable");
      const json = await res.json();
      const cw = json.current_weather;
      return {
        temperature: cw.temperature,
        windspeed: cw.windspeed,
        weathercode: cw.weathercode,
        isDay: cw.is_day === 1,
        place,
      } satisfies WeatherData;
    }

    async function fetchByCityName(city: string) {
      const geo = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
      );
      const geoJson = await geo.json();
      const match = geoJson.results?.[0];
      if (!match) throw new Error(`couldn't locate "${city}"`);
      return fetchByCoords(match.latitude, match.longitude, `${match.name}, ${match.country_code}`);
    }

    async function run() {
      try {
        if (cityOverride) {
          const data = await fetchByCityName(cityOverride);
          if (!cancelled) setState({ status: "ready", data });
          return;
        }

        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            async (pos) => {
              try {
                const data = await fetchByCoords(
                  pos.coords.latitude,
                  pos.coords.longitude,
                  "your location"
                );
                if (!cancelled) setState({ status: "ready", data });
              } catch (err) {
                if (!cancelled) fallback(err);
              }
            },
            () => fallback(),
            { timeout: 4000 }
          );
        } else {
          fallback();
        }
      } catch (err) {
        if (!cancelled) fallback(err);
      }
    }

    async function fallback(_err?: unknown) {
      try {
        const data = await fetchByCityName(FALLBACK_CITY);
        if (!cancelled) setState({ status: "ready", data });
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
  }, [cityOverride]);

  return state;
}
