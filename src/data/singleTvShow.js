import popular from "../mocks/TV SERIES/Popular.json";
import topRated from "../mocks/TV SERIES/Top Rated.json";

const TMDB = "https://image.tmdb.org/t/p/original";

export const sliderSingleSeries = popular.filter((s) => s.backdrop_path).slice(0, 4).map((s) => ({
  logo: "/seriesLogo.svg",
  background: `${TMDB}${s.backdrop_path}`,
  desc: s.overview,
  link: `/series/${s.name.replace(/\s+/g, "-")}`,
  info: "#",
  type: "hero",
  title: s.name,
}));

export const similarSingleSeries = topRated.slice(0, 10).map((s) => ({
  path: `${TMDB}${s.poster_path}`,
  title: s.name,
  overview: s.overview,
  vote: s.vote_average,
  year: s.first_air_date?.split("-")[0],
  type: "Similares",
  cat: "series",
}));

export const similarSingleSeries2 = popular.slice(0, 10).map((s) => ({
  path: `${TMDB}${s.poster_path}`,
  title: s.name,
  overview: s.overview,
  vote: s.vote_average,
  year: s.first_air_date?.split("-")[0],
  type: "More Like This",
  cat: "series",
}));
