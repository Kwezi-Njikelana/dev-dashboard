const WEATHER_CODES: Record<number, { label: string; glyph: string }> = {
  0: { label: "clear sky", glyph: "\u2600" },
  1: { label: "mostly clear", glyph: "\u2600" },
  2: { label: "partly cloudy", glyph: "\u26C5" },
  3: { label: "overcast", glyph: "\u2601" },
  45: { label: "fog", glyph: "\u2592" },
  48: { label: "icy fog", glyph: "\u2592" },
  51: { label: "light drizzle", glyph: "\u2602" },
  53: { label: "drizzle", glyph: "\u2602" },
  55: { label: "heavy drizzle", glyph: "\u2602" },
  61: { label: "light rain", glyph: "\u2602" },
  63: { label: "rain", glyph: "\u2602" },
  65: { label: "heavy rain", glyph: "\u2602" },
  71: { label: "light snow", glyph: "\u2744" },
  73: { label: "snow", glyph: "\u2744" },
  75: { label: "heavy snow", glyph: "\u2744" },
  80: { label: "rain showers", glyph: "\u2602" },
  81: { label: "rain showers", glyph: "\u2602" },
  82: { label: "violent showers", glyph: "\u2602" },
  95: { label: "thunderstorm", glyph: "\u26A1" },
  96: { label: "storm w/ hail", glyph: "\u26A1" },
  99: { label: "storm w/ hail", glyph: "\u26A1" },
};

export function describeWeatherCode(code: number) {
  return WEATHER_CODES[code] ?? { label: "unknown", glyph: "?" };
}

export function formatJoinDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
}

export function compactNumber(n: number) {
  return new Intl.NumberFormat("en-US", { notation: "compact" }).format(n);
}
