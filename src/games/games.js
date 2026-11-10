// Collects every .html file dropped in src/games/ (served at /jocuri).
import { buildGames } from "../lib/games.js";

export const games = buildGames(
  import.meta.glob("./*.html", { query: "?raw", import: "default", eager: true }),
);
