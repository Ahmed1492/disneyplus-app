import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  FaHome, FaStar, FaSearch, FaBars, FaTimes,
  FaHeart, FaUser, FaSignOutAlt, FaChevronDown,
} from "react-icons/fa";
import { RiTvFill } from "react-icons/ri";
import { PiFilmReelLight } from "react-icons/pi";

const navLinks = [
  { to: "/",          label: "Home",      icon: FaHome },
  { to: "/series",    label: "Series",    icon: RiTvFill },
  { to: "/movie",     label: "Movies",    icon: PiFilmReelLight },
  { to: "/originals", label: "Originals", icon: FaStar },
  { to: "/favorites", label: "My Favorites", icon: FaHeart, requireAuth: true },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const profileRef = useRef(null);

  const [scrolled, setScrolled]         = useState(false);
  const [menuOpen, setMenuOpen]         = useState(false);
  const [searchOpen, setSearchOpen]     = useState(false);
  const [searchQuery, setSearchQuery]   = useState("");
  const [profileOpen, setProfileOpen]   = useState(false);
  const [isLoggedIn, setIsLoggedIn]     = useState(false);

  // scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // auth check
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("dToken"));
  }, [location]);

  // close profile dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // close mobile menu on route change
  useEffect(() => { setMenuOpen(false); setSearchOpen(false); }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("dToken");
    localStorage.removeItem("userData");
    localStorage.removeItem("favorites");
    setIsLoggedIn(false);
    setProfileOpen(false);
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0a0b0f]/95 backdrop-blur-xl shadow-2xl shadow-black/50 border-b border-white/5"
            : "bg-gradient-to-b from-black/70 to-transparent"
        }`}
      >
        <div className="px-[5%] md:px-[10%] py-3 flex items-center justify-between gap-4">

          {/* ── Logo ── */}
          <Link to="/" className="flex-shrink-0 group">
            <img
              src="/disneyHeaderLogo.svg"
              alt="Disney+"
              className="w-20 md:w-24 object-contain transition-all duration-300 group-hover:brightness-125 group-hover:drop-shadow-[0_0_12px_rgba(2,231,245,0.5)]"
            />
          </Link>

          {/* ── Desktop nav links ── */}
          <ul className="hidden lg:flex items-center gap-1 text-sm font-medium">
            {navLinks.map(({ to, label, icon: Icon, requireAuth }) => {
              // Skip auth-required links if not logged in
              if (requireAuth && !isLoggedIn) return null;
              
              return (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === "/"}
                    className={({ isActive }) =>
                      `relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 group ${
                        isActive
                          ? "text-[#02E7F5]"
                          : "text-gray-300 hover:text-white"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon className="text-sm" />
                        <span>{label}</span>
                        {/* active underline */}
                        <span
                          className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-[#02E7F5] transition-all duration-300 ${
                            isActive ? "w-4/5" : "w-0 group-hover:w-1/2 group-hover:bg-white/40"
                          }`}
                        />
                      </>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>

          {/* ── Right side ── */}
          <div className="flex items-center gap-2 md:gap-3">

            {/* Search */}
            <div className="relative hidden md:flex items-center">
              {searchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center gap-2 animate-fade-in">
                  <input
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search titles..."
                    className="bg-white/10 backdrop-blur border border-white/20 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-[#02E7F5] w-52 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <FaTimes />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  <FaSearch className="text-sm" />
                </button>
              )}
            </div>

            {/* Favorites — logged in only */}
            {/* Removed standalone favorites icon since it's now in main nav */}

            {/* Profile dropdown / Login */}
            {isLoggedIn ? (
              <div ref={profileRef} className="hidden md:block relative">
                <button
                  onClick={() => setProfileOpen((p) => !p)}
                  className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-white/10 transition-all duration-200 group"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#02E7F5] to-[#037AEB] flex items-center justify-center text-black font-bold text-xs ring-2 ring-[#02E7F5]/30 group-hover:ring-[#02E7F5]/60 transition-all">
                    <FaUser />
                  </div>
                  <FaChevronDown className={`text-xs text-gray-400 transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`} />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-[#13151c]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden animate-fade-in">
                    <div className="px-4 py-3 border-b border-white/5">
                      <p className="text-white text-sm font-semibold">My Account</p>
                      <p className="text-gray-500 text-xs mt-0.5">Disney+ Member</p>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <FaUser className="text-xs text-[#02E7F5]" /> Profile
                      </Link>
                      <Link
                        to="/favorites"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <FaHeart className="text-xs text-[#02E7F5]" /> Favorites
                      </Link>
                    </div>
                    <div className="border-t border-white/5 py-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-colors"
                      >
                        <FaSignOutAlt className="text-xs" /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:flex items-center gap-2 bg-[#02E7F5] text-black px-5 py-2 rounded-xl font-bold text-sm hover:bg-white transition-all duration-200 shadow-lg shadow-[#02E7F5]/20"
              >
                Sign In
              </Link>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen((p) => !p)}
              className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-white hover:bg-white/10 transition-all"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-[#0a0b0f]/98 backdrop-blur-xl border-t border-white/5 px-[5%] py-4 flex flex-col gap-1">
            {navLinks.map(({ to, label, icon: Icon, requireAuth }) => {
              // Skip auth-required links if not logged in
              if (requireAuth && !isLoggedIn) return null;
              
              return (
                <NavLink
                  key={to}
                  to={to}
                  end={to === "/"}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-[#02E7F5]/10 text-[#02E7F5]"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }`
                  }
                >
                  <Icon className="text-base" /> {label}
                </NavLink>
              );
            })}

            <div className="border-t border-white/5 mt-2 pt-2 flex flex-col gap-1">
              {/* mobile search */}
              <form onSubmit={handleSearch} className="flex items-center gap-2 px-4 py-2">
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-[#02E7F5]"
                />
                <button type="submit" className="text-[#02E7F5]"><FaSearch /></button>
              </form>

              {isLoggedIn ? (
                <>
                  <NavLink to="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-all">
                    <FaUser className="text-[#02E7F5]" /> Profile
                  </NavLink>
                  <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-500/5 transition-all">
                    <FaSignOutAlt /> Sign Out
                  </button>
                </>
              ) : (
                <Link to="/login" onClick={() => setMenuOpen(false)} className="mx-4 mt-1 bg-[#02E7F5] text-black py-3 rounded-xl font-bold text-sm text-center hover:bg-white transition-all">
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
