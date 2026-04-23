import popularMovies from "../mocks/MOVIE/Popular.json";
import topRatedMovies from "../mocks/MOVIE/Top Rated.json";
import topRatedSeries from "../mocks/TV SERIES/Top Rated.json";
import onTheAir from "../mocks/TV SERIES/On The Air.json";

const TMDB = "https://image.tmdb.org/t/p/original";

const withBackdrop = (arr) => arr.filter((x) => x.backdrop_path);

export const sliderOriginal = withBackdrop(topRatedSeries).slice(0, 4).map((s) => ({
  background: `${TMDB}${s.backdrop_path}`,
  desc: s.overview,
  title: s.name,
  link: `/series/${s.name.replace(/\s+/g, "-")}`,
  trailerUrl: "https://www.youtube.com/embed/mc6UA37uqXg",
  vote: s.vote_average,
  year: s.first_air_date?.split("-")[0],
}));

export const seriesOrignal = topRatedSeries.map((s) => ({
  path: `${TMDB}${s.poster_path}`,
  title: s.name,
  overview: s.overview,
  vote: s.vote_average,
  type: "Top Rated Series",
  cat: "series",
}));

export const moviesOriginal = popularMovies.map((m) => ({
  path: `${TMDB}${m.poster_path}`,
  title: m.title,
  overview: m.overview,
  vote: m.vote_average,
  type: "Popular Movies",
  cat: "movies",
}));

export const shortsOriginal = onTheAir.map((s) => ({
  path: `${TMDB}${s.poster_path}`,
  title: s.name,
  overview: s.overview,
  vote: s.vote_average,
  type: "On The Air",
  cat: "series",
}));

export const topRatedMoviesOriginal = topRatedMovies.map((m) => ({
  path: `${TMDB}${m.poster_path}`,
  title: m.title,
  overview: m.overview,
  vote: m.vote_average,
  type: "Top Rated Movies",
  cat: "movies",
}));
