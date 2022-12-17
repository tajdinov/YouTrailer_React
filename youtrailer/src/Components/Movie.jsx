import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../Context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

const Movie = ({ item }) => {
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = UserAuth();

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
            <div className="fixed inset-0 bg-black bg-opacity-70" />
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
                <Dialog.Panel className="w-full max-w-4xl p-6 overflow-hidden text-left align-middle transition-all transform bg-black/40 shadow-xl rounded-2xl border-2 border-white/40 text-white">
                  <div className=" w-full h-[550px] text-white">
                    <div className=" w-full h-full">
                      <div className=" absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
                      <img
                        className=" w-full h-full object-cover rounded"
                        src={`https://image.tmdb.org/t/p/original/${item?.backdrop_path}`}
                        alt={item?.title}
                      />
                      <div className=" absolute w-full top-[20%] p-4 md:p-8">
                        <h1 className=" text-xl md:text-2xl font-bold">
                          {item?.title}
                        </h1>
                        <div className=" my-4">
                          <button className=" border bg-gray-300 text-black border-gray-300 py-2 px-5">
                            Play Trailer
                          </button>
                        </div>
                        <p className=" text-gray-400 text-sm">
                          Released: {item?.release_date}
                        </p>
                        <p className=" w-full md:max-w-[70%] lg:max-w-[35%] text-gray-400">
                          {/* {truncateString(item?.overview, 150) + "..."} */}$
                          {item?.overview}
                        </p>
                        <p onClick={saveShow}>
                          {like ? (
                            <FaHeart className="absolute top-[-75px] right-20 text-gray-300 cursor-pointer" />
                          ) : (
                            <FaRegHeart className="absolute top-[-75px] right-20 text-gray-300 cursor-pointer" />
                          )}
                        </p>
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
