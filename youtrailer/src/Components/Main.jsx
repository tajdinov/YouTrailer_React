import React, { useEffect, useState } from "react";
import requests from "../request";
import axios from "axios";

const Main = () => {
  const [movies, setMovies] = useState("");
  const [movie, setMovie] = useState([]);
  // const movie = movies[Math.floor(Math.random() * movies.length)];

  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results);
    });
  }, []);

  useEffect(() => {
    const movie = movies[Math.floor(Math.random() * movies.length)];
    setMovie(movie);
  }, [movies]);

  const [showMore, setShowMore] = useState(false);

  // const text = movie?.overview;

  // function threeDots(e) {
  //   e.preventDefault();
  //   setShowMore(!showMore);
  // }

  const threeDots = async (e) => {
    e.preventDefault();
    console.log(showMore);
    setShowMore(!showMore);
  };

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num);
    } else {
      return str;
    }
  };

  return (
    <div className=" w-full h-[550px] text-white">
      <div className=" w-full h-full">
        <div className=" absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
        <img
          className=" w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title}
        />
        <div className=" absolute w-full top-[20%] p-4 md:p-8">
          <h1 className=" text-3xl md:text-5xl font-bold">{movie?.title}</h1>
          <div className=" my-4">
            <button className=" border bg-gray-300 text-black border-gray-300 py-2 px-5">
              Play
            </button>
            <button className=" border  text-white border-gray-300 py-2 px-5 ml-4">
              Watch Later
            </button>
          </div>
          <p className=" text-gray-400 text-sm">
            Released: {movie?.release_date}
          </p>
          <p className=" w-full md:max-w-[70%] lg:max-w-[35%] text-gray-400">
            {/* {truncateString(movie?.overview, 150) + "..."} */}
            {showMore
              ? `${movie?.overview}`
              : `${truncateString(`${movie?.overview}`, 100)}` + `...`}
          </p>
          <button className=" text-[0.6rem]" onClick={threeDots}>
            {showMore ? "less" : "...more"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
