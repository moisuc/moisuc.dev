import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const { request, cookies, redirect } = context;
  const url = new URL(request.url);

  // Only check on the root path
  if (url.pathname !== "/") {
    return next();
  }

  // Check if user has a language preference cookie
  const preferredLang = cookies.get("preferred_lang")?.value;
  if (preferredLang) {
    // User already made a choice, respect it
    return next();
  }

  // Get Accept-Language header
  const acceptLanguage = request.headers.get("accept-language") || "";

  // Get country from Vercel's geo header (available on Vercel)
  const country = request.headers.get("x-vercel-ip-country") || "";

  // Check if Romanian
  const isRomanian =
    country === "RO" || acceptLanguage.toLowerCase().startsWith("ro");

  if (isRomanian) {
    return redirect("/ro", 302);
  }

  return next();
});
