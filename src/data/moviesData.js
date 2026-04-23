import nowPlaying from "../mocks/MOVIE/Now Playing.json";
import popular from "../mocks/MOVIE/Popular.json";
import topRated from "../mocks/MOVIE/Top Rated.json";
import upcoming from "../mocks/MOVIE/Upcoming.json";

const TMDB = "https://image.tmdb.org/t/p/original";

const toCard = (m, type) => ({
  path: `${TMDB}${m.poster_path}`,
  background: `${TMDB}${m.backdrop_path}`,
  title: m.title,
  overview: m.overview,
  vote: m.vote_average,
  type,
  cat: "movies",
});

// Slider hero data
export const sliderMovies = popular.slice(0, 5).map((m) => ({
  background: `${TMDB}${m.backdrop_path}`,
  desc: m.overview,
  title: m.title,
  link: `/movies/${m.title.replace(/\s+/g, "-")}`,
  trailerUrl: "https://www.youtube.com/embed/mc6UA37uqXg",
  vote: m.vote_average,
  year: m.release_date?.split("-")[0],
}));

// Section rows
export const inTendMovies = nowPlaying.map((m) => toCard(m, "Now Playing"));
export const actionMovies = popular.map((m) => toCard(m, "Popular"));
export const topRatedMovies = topRated.map((m) => toCard(m, "Top Rated"));
export const upcomingMovies = upcoming.map((m) => toCard(m, "Upcoming"));

// aliases used in Movies.jsx
export const disnyOriginalsMovies = topRated.map((m) => toCard(m, "Top Rated"));
export const animationMovies = upcoming.map((m) => toCard(m, "Upcoming"));
export const docuseriesMovies = nowPlaying.map((m) => toCard(m, "Now Playing"));
export const childrenMovies = popular.map((m) => toCard(m, "Popular"));
