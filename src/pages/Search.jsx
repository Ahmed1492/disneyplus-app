import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { FaSearch, FaStar, FaHeart, FaCheck, FaFire, FaTv, FaFilm } from "react-icons/fa";
import { MdOutlineHd } from "react-icons/md";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// ── All mock data ──────────────────────────────────────────────
import nowPlaying   from "../mocks/MOVIE/Now Playing.json";
import popularM     from "../mocks/MOVIE/Popular.json";
import topRatedM    from "../mocks/MOVIE/Top Rated.json";
import upcomingM    from "../mocks/MOVIE/Upcoming.json";
import airingToday  from "../mocks/TV SERIES/Airing Today.json";
import onTheAir     from "../mocks/TV SERIES/On The Air.json";
import popularS     from "../mocks/TV SERIES/Popular.json";
import topRatedS    from "../mocks/TV SERIES/Top Rated.json";

const TMDB = "https://image.tmdb.org/t/p/original";

const ALL_MOVIES = [...nowPlaying, ...popularM, ...topRatedM, ...upcomingM]
  .filter((m, i, arr) => arr.findIndex(x => x.id === m.id) === i) // dedupe
  .map(m => ({
    id: m.id,
    title: m.title,
    overview: m.overview,
    poster: `${TMDB}${m.poster_path}`,
    backdrop: `${TMDB}${m.backdrop_path}`,
    vote: m.vote_average,
    year: m.release_date?.split("-")[0],
    cat: "movies",
    type: "Movie",
  }));

const ALL_SERIES = [...popularS, ...topRatedS, ...onTheAir, ...airingToday]
  .filter((s, i, arr) => arr.findIndex(x => x.id === s.id) === i)
  .map(s => ({
    id: s.id,
    title: s.name,
    overview: s.overview,
    poster: `${TMDB}${s.poster_path}`,
    backdrop: `${TMDB}${s.backdrop_path}`,
    vote: s.vote_average,
    year: s.first_air_date?.split("-")[0],
    cat: "series",
    type: "TV Series",
  }));

const ALL_CONTENT = [...ALL_MOVIES, ...ALL_SERIES];

// ── Trending (top rated by vote) ──────────────────────────────
const TRENDING = [...ALL_CONTENT]
  .sort((a, b) => b.vote - a.vote)
  .slice(0, 12);

// ── Card ──────────────────────────────────────────────────────
const ResultCard = ({ item }) => {
  const [added, setAdded] = useState(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    return !!favs.find(f => f.title === item.title);
  });

  const toggleFav = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    const already = favs.find(f => f.title === item.title);
    if (already) {
      localStorage.setItem("favorites", JSON.stringify(favs.filter(f => f.title !== item.title)));
      setAdded(false);
    } else {
      favs.push({ path: item.poster, title: item.title, cat: item.cat });
      localStorage.setItem("favorites", JSON.stringify(favs));
      setAdded(true);
    }
  };

  const ratingColor = item.vote >= 7 ? "text-green-400" : item.vote >= 5 ? "text-yellow-400" : "text-red-400";
  const link = `/${item.cat}/${item.title?.replace(/\s+/g, "-")}`;

  return (
    <Link to={link} className="group relative flex-shrink-0">
      <div className="relative aspect-[2/3] overflow-hidden rounded-2xl ring-1 ring-white/10 group-hover:ring-[#02E7F5]/60 transition-all duration-500 shadow-xl group-hover:shadow-2xl group-hover:shadow-[#02E7F5]/20 group-hover:scale-105 group-hover:-translate-y-2">
        {/* poster */}
        <img
          src={item.poster}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={e => { e.target.src = "https://via.placeholder.com/300x450/1a1d29/02E7F5?text=No+Image"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* type badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold border border-white/10">
          {item.cat === "movies" ? <FaFilm className="text-[#02E7F5]" /> : <FaTv className="text-purple-400" />}
          <span className="text-white">{item.type}</span>
        </div>

        {/* rating */}
        {item.vote > 0 && (
          <div className={`absolute top-3 right-10 flex items-center gap-1 bg-black/80 backdrop-blur-md px-2 py-1 rounded-full text-xs font-bold ${ratingColor}`}>
            <FaStar className="text-[9px]" /> {Number(item.vote).toFixed(1)}
          </div>
        )}

        {/* fav */}
        <button
          onClick={toggleFav}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg ${
            added ? "bg-[#02E7F5] text-black" : "bg-black/70 backdrop-blur-md text-white hover:bg-[#02E7F5] hover:text-black"
          }`}
        >
          {added ? <FaCheck className="text-xs" /> : <FaHeart className="text-xs" />}
        </button>

        {/* hover info */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded text-xs text-white font-semibold w-fit mb-2">
            <MdOutlineHd className="text-base" /> HD
          </div>
          <button className="w-full bg-white text-black py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#02E7F5] transition-all duration-300">
            Watch Now
          </button>
        </div>
      </div>

      {/* title + year */}
      <div className="mt-3 px-1">
        <p className="text-white font-semibold text-sm truncate group-hover:text-[#02E7F5] transition-colors">{item.title}</p>
        <p className="text-gray-500 text-xs mt-0.5">{item.year}</p>
      </div>
    </Link>
  );
};

// ── Section header ─────────────────────────────────────────────
const SectionHeader = ({ icon: Icon, title, count }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-1.5 h-8 bg-gradient-to-b from-[#02E7F5] to-purple-500 rounded-full shadow-lg shadow-[#02E7F5]/50" />
    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
      <Icon className="text-[#02E7F5]" /> {title}
    </h2>
    {count !== undefined && (
      <span className="ml-2 px-3 py-0.5 bg-[#02E7F5]/10 border border-[#02E7F5]/30 rounded-full text-[#02E7F5] text-sm font-semibold">
        {count} results
      </span>
    )}
  </div>
);

// ── Main Search Page ───────────────────────────────────────────
const ITEMS_PER_PAGE = 18;

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get("q") || "");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);

  const query = searchParams.get("q") || "";

  // Reset to page 1 when query or filter changes
  useEffect(() => { setPage(1); }, [query, filter]);

  // Scroll to top on page change
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [page]);

  const handleInput = (e) => {
    const val = e.target.value;
    setInputValue(val);
    if (val.trim()) {
      setSearchParams({ q: val.trim() });
    } else {
      setSearchParams({});
    }
  };

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return ALL_CONTENT.filter(item =>
      item.title?.toLowerCase().includes(q) ||
      item.overview?.toLowerCase().includes(q)
    );
  }, [query]);

  const filtered = useMemo(() => {
    if (filter === "movies") return results.filter(r => r.cat === "movies");
    if (filter === "series") return results.filter(r => r.cat === "series");
    return results;
  }, [results, filter]);

  const totalPages  = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated   = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const movieResults  = results.filter(r => r.cat === "movies");
  const seriesResults = results.filter(r => r.cat === "series");

  const filters = [
    { key: "all",    label: "All",    count: results.length },
    { key: "movies", label: "Movies", count: movieResults.length },
    { key: "series", label: "Series", count: seriesResults.length },
  ];

  // Build page numbers with ellipsis
  const getPageNumbers = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages = [];
    if (page <= 4) {
      pages.push(1, 2, 3, 4, 5, "...", totalPages);
    } else if (page >= totalPages - 3) {
      pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
    }
    return pages;
  };

  return (
    <div className="min-h-screen bg-[#0f1014] text-white">
      <Navbar />

      <div className="pt-28 pb-20 px-[5%] md:px-[10%]">

        {/* ── Search Input ── */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#02E7F5]/20 to-purple-500/20 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center bg-white/5 backdrop-blur-xl border border-white/10 focus-within:border-[#02E7F5]/50 rounded-2xl px-6 py-4 transition-all duration-300">
              <FaSearch className="text-[#02E7F5] text-xl flex-shrink-0 mr-4" />
              <input
                autoFocus
                value={inputValue}
                onChange={handleInput}
                placeholder="Search movies, series, originals..."
                className="flex-1 bg-transparent outline-none text-white text-lg placeholder-gray-500"
              />
              {inputValue && (
                <button
                  onClick={() => { setInputValue(""); setSearchParams({}); }}
                  className="text-gray-400 hover:text-white transition-colors ml-3 text-sm"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Results ── */}
        {query ? (
          <>
            {/* Filter tabs */}
            <div className="flex items-center gap-3 mb-8 flex-wrap">
              {filters.map(f => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    filter === f.key
                      ? "bg-[#02E7F5] text-black shadow-lg shadow-[#02E7F5]/30"
                      : "bg-white/5 border border-white/10 text-gray-300 hover:border-[#02E7F5]/50 hover:text-white"
                  }`}
                >
                  {f.label} {f.count > 0 && <span className="ml-1 opacity-70">({f.count})</span>}
                </button>
              ))}
            </div>

            {filtered.length > 0 ? (
              <>
                {/* Header + page info */}
                <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                  <SectionHeader
                    icon={FaSearch}
                    title={`Results for "${query}"`}
                    count={filtered.length}
                  />
                  <p className="text-gray-400 text-sm">
                    Page <span className="text-white font-semibold">{page}</span> of{" "}
                    <span className="text-white font-semibold">{totalPages}</span>
                    <span className="ml-2 text-gray-500">
                      ({(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length})
                    </span>
                  </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 mb-12">
                  {paginated.map(item => (
                    <ResultCard key={`${item.cat}-${item.id}`} item={item} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPage={setPage}
                    getPageNumbers={getPageNumbers}
                  />
                )}
              </>
            ) : (
              <div className="text-center py-24">
                <div className="text-8xl mb-6">🔍</div>
                <h3 className="text-2xl font-bold text-white mb-3">No results found</h3>
                <p className="text-gray-400 mb-8">
                  We couldn't find anything matching <span className="text-[#02E7F5] font-semibold">"{query}"</span>
                </p>
                <p className="text-gray-500 text-sm">Try different keywords or browse trending content below</p>
              </div>
            )}
          </>
        ) : (
          /* ── Trending (no query) ── */
          <>
            <SectionHeader icon={FaFire} title="Trending Now" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {TRENDING.map(item => (
                <ResultCard key={`${item.cat}-${item.id}`} item={item} />
              ))}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

// ── Pagination Component ───────────────────────────────────────
const Pagination = ({ page, totalPages, onPage, getPageNumbers }) => (
  <div className="flex items-center justify-center gap-2 flex-wrap">
    {/* Prev */}
    <button
      onClick={() => onPage(p => p - 1)}
      disabled={page === 1}
      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-[#02E7F5]/50 hover:bg-[#02E7F5]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 text-sm font-semibold"
    >
      ← Prev
    </button>

    {/* Page numbers */}
    <div className="flex items-center gap-1.5">
      {getPageNumbers().map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="w-10 h-10 flex items-center justify-center text-gray-500 text-sm">
            ···
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPage(p)}
            className={`w-10 h-10 rounded-xl text-sm font-bold transition-all duration-300 ${
              page === p
                ? "bg-gradient-to-br from-[#02E7F5] to-[#037AEB] text-black shadow-lg shadow-[#02E7F5]/40 scale-110"
                : "bg-white/5 border border-white/10 text-gray-300 hover:border-[#02E7F5]/50 hover:text-white hover:bg-[#02E7F5]/10"
            }`}
          >
            {p}
          </button>
        )
      )}
    </div>

    {/* Next */}
    <button
      onClick={() => onPage(p => p + 1)}
      disabled={page === totalPages}
      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-[#02E7F5]/50 hover:bg-[#02E7F5]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 text-sm font-semibold"
    >
      Next →
    </button>
  </div>
);

export default Search;
