"use client";
import Link from "next/link";
import { FaSearch, FaRegTimesCircle, FaBars, FaTimes, FaHome, FaInfoCircle, FaCalendarAlt, FaUserAlt } from "react-icons/fa";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  let [search, setSearch] = useState("");
  let [searchResults, setSearchResults] = useState([]);
  let [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (search.length === 0) {
      setSearchResults([]);
      return;
    }

    const time = setTimeout(() => {
      fetch(`https://api.jikan.moe/v4/anime?q=${search}&limit=8`)
        .then((res) => res.json())
        .then((data) => {
          setSearchResults(data?.data);
        });
    }, 300);

    return () => {
      clearTimeout(time);
    };
  }, [search]);

  const handleClearSearch = () => {
    setSearch("");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div>
        <nav
          className="text-gray-300 backdrop-blur-md flex justify-between items-center px-4 py-2 relative z-10 bg-gradient-to-b from-[#121212]/60 via-[#121212]/40 to-transparent from-[30%]"
        >
          <div className="rounded-full overflow-hidden size-24 invert">
            <Link href="/">
              <img src="/logo.png" type="img/ico" alt="Logo" />
            </Link>
          </div>
          <ul className="gap-4 items-center hidden md:flex">
            <Link href="/">
              <li className="hover:text-white">Home</li>
            </Link>
            <Link href="/about">
              <li className="hover:text-white">About</li>
            </Link>
            <li>
              <Link href="/upcoming" className="hover:text-white">Upcoming</Link>
            </li>
            <li>
              <Link href="/top_chars" className="hover:text-white">Top Characters</Link>
            </li>
            <li className="bg-gray-200/25 flex items-center justify-center px-2 rounded-full gap-1 relative">
              <FaSearch />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="bg-transparent text-white p-2 outline-none"
                title="Type Slowly, it's a free API 💀"
              />
              {searchResults?.length > 0 && (
                <button onClick={handleClearSearch}>
                  <FaRegTimesCircle />
                </button>
              )}
              <div
                className="absolute top-12 divide-yellow-400 divide-y-2 left-0 z-20 bg-[#121212]/80 backdrop-blur-lg rounded-lg shadow-lg w-[300px] flex flex-col gap-2 max-h-96 overflow-y-auto"
                id="search-results"
                onBlur={() => setSearch("")}
              >
                {searchResults?.map((result) => (
                  <Link
                    key={result.mal_id}
                    href={`/anime/${result.mal_id}`}
                    className="text-white hover:text-gray-300 flex gap-3 items-center transition-colors duration-100 p-2"
                  >
                    <img
                      src={result.images.webp.small_image_url}
                      alt=""
                      className="rounded-md"
                    />
                    {result.title}
                  </Link>
                ))}
                {searchResults.length > 0 && (
                  <Link
                    href={`/browse/${search}`}
                    className="py-2 text-yellow-400 bg-slate-800 text-center text-lg"
                  >
                    See More Results
                  </Link>
                )}
              </div>
            </li>
          </ul>
          <div className="flex gap-4 items-center">
            <Link href="/signup" className="hidden sm:block font-semibold px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-800/50 transition-colors duration-300">
              Sign Up
            </Link>
            <Link href="/login" className="hidden sm:block font-semibold px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-800/50 transition-colors duration-300">
              Log In
            </Link>
            <Link href="https://mangadom.vercel.app" target="_blank" rel="noopener noreferrer" className="hidden md:block font-semibold px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition-colors duration-300 text-white shadow-lg transform hover:scale-105 hover:rotate-1 active:scale-95 active:rotate-0">
              Mangadom
            </Link>
          </div>
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
          >
            {menuOpen ? <FaTimes size={24}  className="text-yellow-300" /> : <FaBars size={24} className="text-yellow-300"  />}
          </button>
        </nav>
        <div
          className={`${
            menuOpen ? "h-[420px]" : "h-0 overflow-hidden"
          } transition-all duration-300 md:hidden `}
        >
          <ul className="flex flex-col items-center gap-4 p-4">
            <div className="flex justify-center gap-8 w-full">
              <Link href="/">
                <li className="hover:text-white flex items-center gap-2"><FaHome /></li>
              </Link>
              <Link href="/about">
                <li className="hover:text-white flex items-center gap-2"><FaInfoCircle /></li>
              </Link>
              <Link href="/upcoming">
                <li className="hover:text-white flex items-center gap-2"><FaCalendarAlt /></li>
              </Link>
              <Link href="/top_chars">
                <li className="hover:text-white flex items-center gap-2"><FaUserAlt /></li>
              </Link>
            </div>
            <li className="bg-gray-200/25 flex items-center justify-center px-2 rounded-full gap-1 relative w-full max-w-44">
              <FaSearch />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="bg-transparent text-white p-2 outline-none w-full"
                title="Type Slowly, it's a free API 💀"
              />
              {searchResults?.length > 0 && (
                <button onClick={handleClearSearch}>
                  <FaRegTimesCircle />
                </button>
              )}
              <div
                className="absolute top-12 divide-yellow-400 divide-y-2 left-0 z-40 bg-[#121212]/80 backdrop-blur-lg rounded-lg shadow-lg w-[300px] flex flex-col gap-2 max-h-96 overflow-y-auto"
                id="search-results"
                onBlur={() => setSearch("")}
              >
                {searchResults?.map((result) => (
                  <Link
                    key={result.mal_id}
                    href={`/anime/${result.mal_id}`}
                    className="text-white hover:text-gray-300 flex gap-3 items-center transition-colors duration-100 p-2"
                  >
                    <img
                      src={result.images.webp.small_image_url}
                      alt=""
                      className="rounded-md"
                    />
                    {result.title}
                  </Link>
                ))}
                {searchResults.length > 0 && (
                  <Link
                    href={`/browse/${search}`}
                    className="py-2 text-yellow-400 bg-slate-800 text-center text-lg"
                  >
                    See More Results
                  </Link>
                )}
              </div>
            </li>
            <Link href="/signup" className="font-semibold px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-800/50 transition-colors duration-300">
              Sign Up
            </Link>
            <Link href="/login" className="font-semibold px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-800/50 transition-colors duration-300">
              Log In
            </Link>
            <Link href="https://mangadom.vercel.app" target="_blank" rel="noopener noreferrer" className="font-semibold px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition-colors duration-300 text-white shadow-lg transform hover:scale-105 hover:rotate-1 active:scale-95 active:rotate-0">
              Mangadom
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
