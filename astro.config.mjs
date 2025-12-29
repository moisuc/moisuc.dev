import { defineConfig } from "astro/config";
// Also can be @astrojs/vercel/static
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";

export default defineConfig({
  // Also can be 'static' or 'hybrid'
  integrations: [tailwind()],
  site: "https://moisuc.dev",
  output: "server",
  adapter: vercel(),
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ro"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
