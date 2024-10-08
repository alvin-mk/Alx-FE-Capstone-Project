// src/components/SearchBar.jsx
import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim() !== "") {
      onSearch(searchInput);
      setSearchInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mb-5">
      <div className="relative">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full p-3 border rounded-lg"
          placeholder="Enter city name"
        />
        <button
          type="submit"
          className="absolute right-0 top-0 h-full px-5 bg-blue-600 text-white rounded-r-lg"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
