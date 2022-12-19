import React, { useEffect, useState } from "react";
import requests from "../request";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { UserAuth } from "../Context/AuthContext";

const Main = () => {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState([]);
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();

  const movieId = doc(db, "users", `${user?.email}`);
  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      await updateDoc(movieId, {
        savedShows: arrayUnion({
          id: movie.id,
          title: movie.title,
          img: movie.backdrop_path,
          release: movie.release_date,
          overview: movie.overview,
        }),
      });
    } else {
      alert("Please log in");
    }
  };

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

  const threeDots = async (e) => {
    e.preventDefault();
    console.log(showMore);
    setShowMore(!showMore);
  };

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
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
            <button onClick={saveShow} className="">
              {like ? (
                <FaHeart className="  text-gray-300  text-3xl cursor-pointer" />
              ) : (
                <FaRegHeart className="  text-gray-300  text-3xl cursor-pointer" />
              )}
            </button>
          </div>
          <p className=" text-gray-400 text-sm">
            Released: {movie?.release_date}
          </p>
          <p className=" w-full md:max-w-[70%] lg:max-w-[35%] text-gray-400">
            {showMore
              ? `${movie?.overview}`
              : `${truncateString(`${movie?.overview}`, 100)}`}
          </p>
          <button className=" text-[0.6rem]" onClick={threeDots}>
            {showMore ? "less" : "more"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
