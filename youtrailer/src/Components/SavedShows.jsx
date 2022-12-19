import React, { Fragment, useState, useEffect } from "react";

// import axios from "axios";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { UserAuth } from "../Context/AuthContext";
import { db } from "../firebase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { AiOutlineClose } from "react-icons/ai";

const SavedShows = () => {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();
  // const key = process.env.REACT_APP_IMDB_API_KEY;

  // const [itemId, setItemId] = useState("");
  // const trailerUrl = `https://api.themoviedb.org/3/movie/${itemId}/videos?api_key=${key}&language=en-US`;
  // const [trailers, setTrailers] = useState([]);
  // const [trailer, setTrailer] = useState([]);
  // const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedShows);
    });
  }, [user?.email]);

  // useEffect(() => {
  //   axios.get(trailerUrl).then((response) => {
  //     setTrailers(response.data.results);
  //   });
  // }, []);

  // useEffect(() => {
  //   const trailer = trailers[Math.floor(Math.random() * trailers.length)];
  //   setTrailer(trailer);
  // }, [trailers]);

  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  // function closeModal() {
  //   setIsOpen(false);
  // }

  // function openModal() {
  //   setIsOpen(true);
  // }

  const movieRef = doc(db, "users", `${user?.email}`);
  const deleteShow = async (passedId) => {
    try {
      const result = movies.filter((item) => item.id !== passedId);
      await updateDoc(movieRef, {
        savedShows: result,
      });
    } catch (error) {
      console.timeLog(error);
    }
  };

  return (
    <>
      <h2 className=" text-white font-bold md:text-xl p-4">My Shows</h2>
      <div className=" relative flex items-center group">
        <MdChevronLeft
          onClick={slideLeft}
          className=" bg-white left-0 ml-4 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block duration-500"
          size={40}
        />
        <div
          id={"slider"}
          className=" w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies.map((item, id) => (
            <div
              key={id}
              className=" w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block relative p-2"
            >
              <img
                className=" w-full h-auto block"
                src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                alt={item?.title}
              />
              <div className=" absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white duration-500">
                <p
                  className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center cursor-default h-full text-center"
                  // onClick={openModal}
                >
                  {item?.title}
                </p>
                <p
                  onClick={() => deleteShow(item.id)}
                  className=" absolute text-gray-300 top-4 right-4"
                >
                  <AiOutlineClose className=" cursor-pointer" />
                </p>
              </div>
            </div>
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className=" bg-white right-0 mr-4 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block duration-500"
          size={40}
        />
      </div>
    </>
  );
};

export default SavedShows;
