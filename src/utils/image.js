const TMDB_BASE = "https://image.tmdb.org/t/p/original";

// If path is already a full URL, return as-is. Otherwise prepend TMDB base.
export const getImageUrl = (path) => {
  if (!path) return "/placeholder.png";
  if (path.startsWith("http")) return path;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${TMDB_BASE}${clean}`;
};
