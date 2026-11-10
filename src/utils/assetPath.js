// Utility to prepend Vite's BASE_URL for public assets (images, videos)
// Ensures assets work seamlessly on localhost, Vercel (/), and GitHub Pages (/JuthikabyMomita/)
export function getAssetUrl(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  return `${cleanBase}${cleanPath}`;
}
