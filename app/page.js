"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Collection from "@/components/Collection";
import Carousel from "@/components/Crousal";
import AnimeCard from "@/components/Trending";
import MoreAnime from "@/components/MoreAnime";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { useLanguage } from "@/components/useLanguage";
import Button from "@/components/Button";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const videoRef = useRef(null);
  const carouselRef = useRef(null);
  const collectionRef = useRef(null);
  const moreAnimeRef = useRef(null);
  const [trendingAnime, setTrendingAnime] = useState([]);

  // Use the custom hook to manage language preference
  const { useJapanese } = useLanguage();

  useEffect(() => {
    // Scroll to top on page load or refresh
    window.scrollTo(0, 0);

    // Video animation
    gsap.fromTo(
      videoRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 2,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: videoRef.current,
          start: "top center+=100",
        },
      }
    );

    // Carousel animation
    gsap.fromTo(
      carouselRef.current,
      { x: "-100%", opacity: 0 },
      {
        x: "0%",
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: carouselRef.current,
          start: "top center+=100",
        },
      }
    );

    // Collection animation
    gsap.fromTo(
      collectionRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: collectionRef.current,
          start: "top center+=100",
        },
      }
    );

    // Fetch trending anime
    fetch("https://api.jikan.moe/v4/seasons/now")
      .then((response) => response.json())
      .then((data) => {
        setTrendingAnime(data.data.slice(0, 10)); // Limiting to 10 anime for example
      })
      .catch((error) => console.error("Error fetching trending anime:", error));
  }, []);

  return (
    <>
      <div className="-m-[5rem] mx-auto overflow-hidden relative shadow-[0_20px_80px_#888] pointer-events-none 2xl:w-screen 2xl:max-w-none">
        <video
          ref={videoRef}
          src="/main_page.mp4"
          className="object-cover object-center min-h-[75vh] w-full"
          autoPlay
          loop
          muted
        ></video>
      </div>
      <div className="container mx-auto px-10 space-y-32 pb-20">
        <div ref={carouselRef}>
          <Carousel />
        </div>
        <div ref={collectionRef}>
          <Collection />
        </div>
      </div>
      <div>
        <div>
          <div>
            <div className="relative flex flex-col md:flex-row justify-between items-center mx-4 md:mx-8 my-8 md:my-16 group">
              <div className="relative mb-6 md:mb-0">
                <h1 className="text-3xl md:text-4xl font-bold text-white tracking-widest">
                  Trending
                  <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 text-transparent bg-clip-text ml-2 md:ml-4 animate-gradient text-shadow-xl">
                    Anime
                  </span>
                </h1>
                <div className="absolute -bottom-3 left-0 w-1/3 h-1 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600"></div>
              </div>

              <Button
                href="/airing"
              >
                <span className="mr-2 font-medium text-sm md:text-base">
                  Discover More
                </span>
              </Button>
            </div>

            <div className="flex flex-wrap justify-center items-center">
              {trendingAnime.map((anime) => (
                <div key={anime.mal_id} className="m-4">
                  <AnimeCard
                    mal_id={anime.mal_id}
                    name={
                      useJapanese
                        ? anime.title
                        : anime.title_english || anime.title
                    }
                    imageUrl={anime.images.jpg.image_url}
                    year={new Date(anime.aired.from).getFullYear()}
                    genre={anime.genres[0]?.name || "N/A"}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div ref={moreAnimeRef}>
        <MoreAnime />
      </div>

      <div className="flex justify-center items-center py-20 bg-gradient-to-b from-transparent to-slate-800/20">
        <Button href="/seasonsdetails">
          <span className="mr-3 font-medium tracking-wide">
            DISCOVER ALL SEASONS
          </span>
        </Button>
      </div>
    </>
  );
}
