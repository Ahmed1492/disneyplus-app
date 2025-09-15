import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ setIsSearchMode }) => {
  return (
    <div className="bg-[#101116] flex justify-between items-center  w-full py-[6px] rounded-md px-2">
      <div className="flex items-center gap-3">
        <FaSearch />

        <input className="bg-transparent self-start outline-none" type="text" />
      </div>

      <button onClick={() => setIsSearchMode(false)}>X</button>
    </div>
  );
};

export default SearchBar;
