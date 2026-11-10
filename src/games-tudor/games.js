// Collects every .html file dropped in src/games-tudor/ (served at /jocuri-tudor).
import { buildGames } from "../lib/games.js";

export const games = buildGames(
  import.meta.glob("./*.html", { query: "?raw", import: "default", eager: true }),
);
