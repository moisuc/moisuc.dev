// Collects every .html file dropped in src/games/ and exposes it as a game.
const files = import.meta.glob("./*.html", {
  query: "?raw",
  import: "default",
  eager: true,
});

const slugify = (s) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const games = Object.entries(files)
  .map(([path, html]) => {
    const name = path.replace(/^\.\//, "").replace(/\.html$/, "");
    const title = html.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim() || name;
    return { slug: slugify(name), title, html };
  })
  .sort((a, b) => a.title.localeCompare(b.title, "ro"));
