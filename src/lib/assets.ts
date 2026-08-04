/** Prefix public asset paths with Astro `base` (needed for GitHub Pages). */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL || "/";
  const normalized = path.replace(/^\/+/, "");
  const withSlash = base.endsWith("/") ? base : `${base}/`;
  return `${withSlash}${normalized}`;
}
