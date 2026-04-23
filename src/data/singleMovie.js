import popular from "../mocks/MOVIE/Popular.json";
import topRated from "../mocks/MOVIE/Top Rated.json";

const TMDB = "https://image.tmdb.org/t/p/original";

export const sliderSingleMovie = popular.filter((m) => m.backdrop_path).slice(0, 4).map((m) => ({
  logo: "/moviesLogo.svg",
  background: `${TMDB}${m.backdrop_path}`,
  desc: m.overview,
  link: `/movies/${m.title.replace(/\s+/g, "-")}`,
  info: "#",
  type: "hero",
  title: m.title,
}));

export const similarSingleMovie = topRated.slice(0, 10).map((m) => ({
  path: `${TMDB}${m.poster_path}`,
  title: m.title,
  overview: m.overview,
  vote: m.vote_average,
  year: m.release_date?.split("-")[0],
  type: "Similares",
  cat: "movies",
}));

export const similarSingleMovie2 = popular.slice(0, 10).map((m) => ({
  path: `${TMDB}${m.poster_path}`,
  title: m.title,
  overview: m.overview,
  vote: m.vote_average,
  year: m.release_date?.split("-")[0],
  type: "More Like This",
  cat: "movies",
}));
