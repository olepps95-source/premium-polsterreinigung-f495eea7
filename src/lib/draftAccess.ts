// Draft pages are shown only on development / Lovable preview hosts.
// Default is deny: any other host (reinwerk-service.de, *.lovable.app publish URL, Vercel) gets the 404.
const PREVIEW_HOST_PATTERNS = [
  /^localhost$/,
  /^127\.0\.0\.1$/,
  /^id-preview(-\d+)?--[a-z0-9-]+\.lovable\.app$/,
  /^[a-z0-9-]+\.lovableproject\.com$/,
];

export function isDraftHost(hostname: string): boolean {
  return PREVIEW_HOST_PATTERNS.some((re) => re.test(hostname.toLowerCase()));
}

export const DRAFTS_ENABLED =
  import.meta.env.DEV || (typeof window !== "undefined" && isDraftHost(window.location.hostname));
