import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { RiTvFill } from "react-icons/ri";
import { PiFilmReelLight } from "react-icons/pi";
import { FaStar } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // if scrolled more than 50px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div>
      {/* Fixed Navbar */}
      <div
        className={`fixed top-0 left-0 w-full z-50 ${
          isScrolled ? "bg-[#121214] shadow-2xl" : "bg-transparent"
        }  px-[10%] py-6 text-white`}
      >
        <div className="flex items-center justify-between">
          {/* Left Side */}
          <ul className="flex items-center font-semibold gap-7">
            <li className="w-[6rem]">
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
              to="/movies"
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
          <ul className="flex font-semibold items-center gap-6">
            {/* Search */}
            <li className="flex items-center gap-2">
              <span className="  text-xl ">
                <FaSearch />
              </span>
              <Link>Search</Link>
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
