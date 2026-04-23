import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const links = [
    { label: "Home", to: "/" },
    { label: "Movies", to: "/movie" },
    { label: "Series", to: "/series" },
    { label: "Originals", to: "/originals" },
    { label: "Favorites", to: "/favorites" },
  ];

  const legal = [
    "Privacy Policy",
    "Subscription Agreement",
    "Help",
    "Compatible Devices",
    "About Disney+",
    "Personalized Advertising",
  ];

  return (
    <footer className="bg-[#090B13] text-white pt-16 pb-8 border-t border-white/5">
      <div className="px-[5%] md:px-[10%]">
        {/* top row */}
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-12">
          {/* brand */}
          <div className="flex flex-col gap-5">
            <img src="/disneyHeaderLogo.svg" alt="Disney+" className="w-28 object-contain" />
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
              Stream exclusive Disney+ Originals, movies, series, and more — all in one place.
            </p>
            {/* socials */}
            <div className="flex items-center gap-4">
              {[FaFacebook, FaTwitter, FaInstagram, FaYoutube].map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#02E7F5] hover:border-[#02E7F5] transition-colors"
                >
                  <Icon className="text-sm" />
                </button>
              ))}
            </div>
          </div>

          {/* nav links */}
          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-1">Navigate</p>
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* legal links */}
          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-1">Legal</p>
            {legal.map((l) => (
              <span key={l} className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer">
                {l}
              </span>
            ))}
          </div>

          {/* newsletter */}
          <div className="flex flex-col gap-3 max-w-xs">
            <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-1">Stay Updated</p>
            <p className="text-gray-400 text-sm">Get notified about new releases and exclusives.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-[#02E7F5] transition-colors"
              />
              <button className="bg-[#02E7F5] text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-white transition-colors flex-shrink-0">
                Go
              </button>
            </div>
          </div>
        </div>

        {/* divider */}
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} Disney. All rights reserved.</p>
          <p className="text-gray-500 font-medium">Built by <span className="text-[#02E7F5]">Ahmed Mohamed</span></p>
          <p className="max-w-md text-center md:text-right leading-relaxed">
            Disney+ is a paid subscription service. Content subject to availability.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
