import airingToday from "../mocks/TV SERIES/Airing Today.json";
import onTheAir from "../mocks/TV SERIES/On The Air.json";
import popular from "../mocks/TV SERIES/Popular.json";
import topRated from "../mocks/TV SERIES/Top Rated.json";

const TMDB = "https://image.tmdb.org/t/p/original";

const toCard = (s, type) => ({
  path: `${TMDB}${s.poster_path}`,
  background: `${TMDB}${s.backdrop_path}`,
  title: s.name,
  overview: s.overview,
  vote: s.vote_average,
  type,
  cat: "series",
});

// Slider hero data — pick entries with a backdrop
const withBackdrop = (arr) => arr.filter((s) => s.backdrop_path);

export const sliderSeries = withBackdrop(popular).slice(0, 5).map((s) => ({
  background: `${TMDB}${s.backdrop_path}`,
  desc: s.overview,
  title: s.name,
  link: `/series/${s.name.replace(/\s+/g, "-")}`,
  trailerUrl: "https://www.youtube.com/embed/mc6UA37uqXg",
  vote: s.vote_average,
  year: s.first_air_date?.split("-")[0],
}));

// Section rows
export const inTendSeries = popular.map((s) => toCard(s, "Popular"));
export const disnyOriginalsSeries = topRated.map((s) => toCard(s, "Top Rated"));
export const actionSeries = onTheAir.map((s) => toCard(s, "On The Air"));
export const animationSeries = topRated.map((s) => toCard(s, "Top Rated"));
export const docuseriesSeries = airingToday.map((s) => toCard(s, "Airing Today"));
export const childrenSeries = popular.map((s) => toCard(s, "Popular"));
