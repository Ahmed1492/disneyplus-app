import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaHeart, FaTrash } from "react-icons/fa";
import { getImageUrl } from "../utils/image";

const Favorites = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("dToken");
    if (!token) {
      navigate("/login");
      return;
    }

    // Get favorites from localStorage
    const savedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(savedFavorites);
  }, [navigate]);

  const removeFavorite = (itemToRemove) => {
    const updatedFavorites = favorites.filter(
      (item) => item.title !== itemToRemove.title
    );
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <>
      <div className="min-h-screen bg-[#121214]">
        <Navbar />
        <div className="pt-24 px-[5%] md:px-[10%] pb-12">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <FaHeart className="text-[#02E7F5] text-4xl" />
              <h1 className="text-4xl font-bold text-white">My Favorites</h1>
            </div>

            {/* Favorites Grid */}
            {favorites.length === 0 ? (
              <div className="text-center py-20">
                <FaHeart className="text-gray-600 text-6xl mx-auto mb-4" />
                <h2 className="text-2xl text-gray-400 mb-4">
                  No favorites yet
                </h2>
                <p className="text-gray-500 mb-8">
                  Start adding movies and series to your favorites!
                </p>
                <Link
                  to="/"
                  className="bg-[#02E7F5] text-black px-8 py-3 rounded-md font-semibold hover:bg-[#01c5d1] transition-colors inline-block"
                >
                  Browse Content
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {favorites.map((item, index) => (
                  <div
                    key={index}
                    className="relative group cursor-pointer"
                  >
                    <Link
                      to={`/${item.cat || "movies"}/${item.title.replace(
                        /\s+/g,
                        "-"
                      )}`}
                    >
                      <img
                        src={getImageUrl(item.path)}
                        alt={item.title}
                        className="w-full h-full rounded-md object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 rounded-md flex items-center justify-center">
                        <p className="text-white font-semibold text-center px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {item.title}
                        </p>
                      </div>
                    </Link>
                    <button
                      onClick={() => removeFavorite(item)}
                      className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-700"
                    >
                      <FaTrash className="text-sm" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Favorites;
