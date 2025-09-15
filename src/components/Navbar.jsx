import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { RiTvFill } from "react-icons/ri";
import { PiFilmReelLight } from "react-icons/pi";
import { FaStar } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // if scrolled more than 50px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = () => {
    setIsSearchMode((prev) => !prev);
  };

  return (
    <div>
      {/* Fixed Navbar */}
      <div
        className={`fixed  top-0 left-0 w-full z-50 ${
          isScrolled ? "bg-[#19191a] shadow-2xl" : "bg-transparent"
        }  px-[10%] py-6 text-white`}
      >
        <div className="flex items-center gap-y-[1rem] flex-wrap lg:flex-nowrap justify-between">
          {/* Left Side */}
          <ul className="flex items-center text-sm  md:text-base   font-semibold gap-4">
            <li className="w-[4rem] md:w-[6rem]">
              <img
                className="object-contain w-full"
                src="/disneyHeaderLogo.svg"
                alt="Logo"
              />
            </li>
            {/* HOME  */}
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
            {/* Series  */}

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

            {/* Movies */}
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

            {/* Originals */}
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

          {/* Right Side */}
          <ul className="flex font-semibold xl:w-[60%] text-sm md:text-base   justify-end items-center gap-6">
            {/* Search */}
            <li className="flex  xl:w-[44%] justify-end items-center gap-2">
              {isSearchMode ? (
                <SearchBar setIsSearchMode={setIsSearchMode} />
              ) : (
                <button
                  onClick={handleSearch}
                  className=" flex  items-center gap-2 text-lg  "
                >
                  <FaSearch />
                  <Link>Search</Link>
                </button>
              )}
            </li>
            <li className="flex items-center gap-2">
              <span className="  text-xl ">
                <FaPlus />
              </span>
              <Link>My List</Link>
            </li>
            <li>
              <img
                className="w-9 h-9 object-cover "
                src="/profilePhoto.svg"
                alt=""
              />
            </li>
          </ul>
        </div>
      </div>

      {/* Padding for content so it doesn’t go under fixed navbar */}
    </div>
  );
};

export default Navbar;
