import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaHome, FaStar, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { RiTvFill } from "react-icons/ri";
import { PiFilmReelLight } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = () => setIsSearchMode((prev) => !prev);

  return (
    <div>
      {/* Fixed Navbar */}
      <div
        className={`fixed top-0 left-0 w-full z-50 ${
          isScrolled ? "bg-[#19191a] shadow-2xl" : "bg-transparent"
        } px-[5%] md:px-[10%] py-4 text-white`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className=" flex items-center gap-[3rem]">
            <div className="flex items-center gap-4">
              <img
                className="w-[5rem] md:w-[6rem] object-contain"
                src="/disneyHeaderLogo.svg"
                alt="Logo"
              />
            </div>

            {/* Desktop Links */}
            <ul className="hidden lg:flex items-center text-sm md:text-base font-semibold gap-6">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `flex items-center gap-2 ${
                      isActive ? "text-[#02E7F5]" : "text-white"
                    }`
                  }
                >
                  <FaHome />
                  <span>Home</span>
                </NavLink>
              </li>
              <NavLink
                to="/series"
                className={({ isActive }) =>
                  `flex items-center gap-2 ${
                    isActive ? "text-[#02E7F5]" : "text-white"
                  }`
                }
              >
                <RiTvFill />
                <span>Series</span>
              </NavLink>
              <NavLink
                to="/movie"
                className={({ isActive }) =>
                  `flex items-center gap-2 ${
                    isActive ? "text-[#02E7F5]" : "text-white"
                  }`
                }
              >
                <PiFilmReelLight />
                <span>Movies</span>
              </NavLink>
              <NavLink
                to="/originals"
                className={({ isActive }) =>
                  `flex items-center gap-2 ${
                    isActive ? "text-[#02E7F5]" : "text-white"
                  }`
                }
              >
                <FaStar />
                <span>Originals</span>
              </NavLink>
            </ul>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-6">
            {/* Search */}
            <div className="hidden md:flex items-center">
              {isSearchMode ? (
                <SearchBar setIsSearchMode={setIsSearchMode} />
              ) : (
                <button
                  onClick={handleSearch}
                  className="flex items-center gap-2 text-lg"
                >
                  <FaSearch />
                  <span>Search</span>
                </button>
              )}
            </div>

            {/* My List */}
            <div className="hidden md:flex items-center gap-2 font-semibold">
              <FaPlus className="text-xl" />
              <Link>My List</Link>
            </div>

            {/* Profile */}
            <img
              className="hidden md:block w-9 h-9 object-cover rounded-full"
              src="/profilePhoto.svg"
              alt="profile"
            />

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden text-2xl"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 bg-[#19191a] rounded-md shadow-md p-4 flex flex-col gap-4">
            <NavLink
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2"
            >
              <FaHome />
              Home
            </NavLink>
            <NavLink
              to="/series"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2"
            >
              <RiTvFill />
              Series
            </NavLink>
            <NavLink
              to="/movie"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2"
            >
              <PiFilmReelLight />
              Movies
            </NavLink>
            <NavLink
              to="/originals"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2"
            >
              <FaStar />
              Originals
            </NavLink>
            <div className="flex items-center gap-2">
              <FaPlus />
              <Link>My List</Link>
            </div>
            <button
              onClick={handleSearch}
              className="flex items-center gap-2 text-lg"
            >
              <FaSearch />
              Search
            </button>
            <img
              className="w-9 h-9 object-cover rounded-full"
              src="/profilePhoto.svg"
              alt="profile"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
