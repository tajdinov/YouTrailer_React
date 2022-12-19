import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";

import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../Context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

const Movie = ({ item }) => {
  const key = process.env.REACT_APP_IMDB_API_KEY;
  const trailerUrl = `https://api.themoviedb.org/3/movie/${item?.id}/videos?api_key=${key}&language=en-US`;
  const [like, setLike] = useState(false);
  const [trailers, setTrailers] = useState([]);
  const [trailer, setTrailer] = useState([]);
  const [saved, setSaved] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = UserAuth();

  useEffect(() => {
    axios.get(trailerUrl).then((response) => {
      setTrailers(response.data.results);
    });
  }, [trailerUrl]);

  useEffect(() => {
    const trailer = trailers[Math.floor(Math.random() * trailers.length)];
    setTrailer(trailer);
  }, [trailers]);

  const movieId = doc(db, "users", `${user?.email}`);

  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      await updateDoc(movieId, {
        savedShows: arrayUnion({
          id: item.id,
          title: item.title,
          img: item.backdrop_path,
          release: item.release_date,
          overview: item.overview,
        }),
      });
    } else {
      alert("Please log in");
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-black bg-opacity-90"
              aria-hidden="true"
            />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className=" mx-auto w-full max-w-4xl  overflow-hidden text-left align-middle transition-all transform bg-black/80 shadow-2xl rounded-2xl border-2 border-white/20 text-white">
                  <div className=" w-full h-[550px] text-white">
                    <div className=" w-full h-full">
                      <div className=" absolute w-full h-[550px] bg-gradient-to-r from-black"></div>

                      <img
                        className=" w-full h-full object-cover rounded"
                        src={`https://image.tmdb.org/t/p/original/${item?.backdrop_path}`}
                        alt={item?.title}
                      />
                      <div className=" absolute w-full top-[1%] p-4 md:p-8">
                        <h1 className=" text-xl md:text-2xl font-bold">
                          {item?.title}
                        </h1>

                        <p className=" text-gray-400 text-sm pb-1">
                          Released: {item?.release_date}
                        </p>

                        <p className=" w-full pr-10 pt-2 text-white">
                          {item?.overview}
                        </p>
                        <p onClick={saveShow}>
                          {like ? (
                            <FaHeart className="absolute top-[-75px] right-20 text-gray-300 cursor-pointer" />
                          ) : (
                            <FaRegHeart className="absolute top-[-75px] right-20 text-gray-300 cursor-pointer" />
                          )}
                        </p>
                        <iframe
                          className="mt-6 object-cover rounded border-2 border-white/10"
                          src={`https://www.youtube.com/embed/${trailer?.key}`}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <div className=" w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
        {item?.backdrop_path ? (
          <img
            className=" w-full h-auto block"
            src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
            alt={item?.title}
          />
        ) : (
          <img
            className=" w-full h-auto block"
            src={
              "https://assets.nflxext.com/ffe/siteui/vlv3/ac9aedf1-a687-4c5d-965c-2fc3eac84aea/4e484bac-d17b-44ce-a3d2-8d7ec842ec29/AU-en-20221206-popsignuptwoweeks-perspective_alpha_website_large.jpg"
            }
            alt={item?.title}
          />
        )}

        <div className=" absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white duration-500">
          <p
            className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center"
            onClick={openModal}
          >
            {item?.title}
          </p>
          <p onClick={saveShow}>
            {like ? (
              <FaHeart className="absolute top-4 left-4 text-gray-300" />
            ) : (
              <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
            )}
          </p>
        </div>
      </div>
    </>
  );
};

export default Movie;
