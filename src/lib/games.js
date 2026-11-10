// Turns an import.meta.glob result of raw .html files into a sorted game list.
const slugify = (s) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export function buildGames(files) {
  return Object.entries(files)
    .map(([path, html]) => {
      const name = path.split("/").pop().replace(/\.html$/, "");
      const title = html.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim() || name;
      const description =
        html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i)?.[1]?.trim() || "";
      return { slug: slugify(name), title, description, html };
    })
    .sort((a, b) => a.title.localeCompare(b.title, "ro"));
}
