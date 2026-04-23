import nowPlaying from "../mocks/MOVIE/Now Playing.json";
import popularMovies from "../mocks/MOVIE/Popular.json";
import topRatedMovies from "../mocks/MOVIE/Top Rated.json";
import upcomingMovies from "../mocks/MOVIE/Upcoming.json";
import popularSeries from "../mocks/TV SERIES/Popular.json";
import topRatedSeries from "../mocks/TV SERIES/Top Rated.json";
import onTheAir from "../mocks/TV SERIES/On The Air.json";
import airingToday from "../mocks/TV SERIES/Airing Today.json";

const TMDB = "https://image.tmdb.org/t/p/original";

const toMovieCard = (m, type) => ({
  path: `${TMDB}${m.poster_path}`,
  background: `${TMDB}${m.backdrop_path}`,
  title: m.title,
  overview: m.overview,
  vote: m.vote_average,
  type,
  cat: "movies",
});

const toSeriesCard = (s, type) => ({
  path: `${TMDB}${s.poster_path}`,
  background: `${TMDB}${s.backdrop_path}`,
  title: s.name,
  overview: s.overview,
  vote: s.vote_average,
  type,
  cat: "series",
});

// Hero slider — use now playing backdrops
export const sliderHome = nowPlaying.filter((m) => m.backdrop_path).slice(0, 4).map((m) => ({
  background: `${TMDB}${m.backdrop_path}`,
  desc: m.overview,
  title: m.title,
  link: `/movies/${m.title.replace(/\s+/g, "-")}`,
  trailerUrl: "https://www.youtube.com/embed/mc6UA37uqXg",
  vote: m.vote_average,
  year: m.release_date?.split("-")[0],
}));

// Section rows — each uses a different mock source
export const inTrendHome = nowPlaying.map((m) => toMovieCard(m, "Now Playing"));
export const disnyOriginalsHome = popularSeries.map((s) => toSeriesCard(s, "Popular Series"));
export const actionHome = popularMovies.map((m) => toMovieCard(m, "Popular Movies"));
export const animationHome = upcomingMovies.map((m) => toMovieCard(m, "Upcoming"));
export const docuseriesHome = onTheAir.map((s) => toSeriesCard(s, "On The Air"));
export const childrenHome = topRatedMovies.map((m) => toMovieCard(m, "Top Rated Movies"));
export const topRatedSeriesHome = topRatedSeries.map((s) => toSeriesCard(s, "Top Rated Series"));
export const airingTodayHome = airingToday.map((s) => toSeriesCard(s, "Airing Today"));
