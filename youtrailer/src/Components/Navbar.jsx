import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../Context/AuthContext";
import { BsSearch } from "react-icons/bs";

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const [search, setSearch] = useState("");

  const searchWord = search;

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      await navigate("/SearchResults");
      closeModal();
      console.log(search);
    } catch (error) {
      console.log(error);
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  // const toggleSerch =

  return (
    <div className=" flex items-center justify-between p-4 z-[100] w-full absolute">
      <Link to="/">
        <h1 className=" text-red-600 text-4xl font-extrabold cursor-pointer">
          YOUTRAILER
        </h1>
      </Link>
      <div>
        {/* <Link to="searchResults"> */}
        <BsSearch
          className=" text-white cursor-pointer"
          type="button"
          onClick={openModal}
        />
        {/* </Link> */}
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                  <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-black/40 shadow-xl rounded-2xl border-2 border-white/40 text-white">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6"
                    >
                      Search
                    </Dialog.Title>
                    <div className="">
                      <form
                        onSubmit={handleSearch}
                        className=" w-full flex flex-col py-4"
                      >
                        <input
                          onChange={(e) => setSearch(e.target.value)}
                          className=" p-3 my-2 bg-gray-700
                          bg-transparent rounded border-2 
                         border-white/60 text-white focus:outline-none"
                          type="text"
                          placeholder="Movie Name"
                        ></input>
                        <button className=" mt-2 py-2 my-6 focus:outline-none text-white bg-red-600 rounded hover:bg-red-800 ">
                          Search
                        </button>
                      </form>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
      {user?.email ? (
        <div>
          <Link to="/account">
            <button className=" text-white pr-4">Account</button>
          </Link>
          <button
            onClick={handleLogout}
            className=" bg-red-600 px-6 py-2 rounded cursor-pointer text-white hover:bg-red-800"
          >
            Log Out
          </button>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button className=" text-white pr-4">Log In</button>
          </Link>
          <Link to="signup">
            <button className=" bg-red-600 px-6 py-2 rounded cursor-pointer text-white hover:bg-red-800">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default function Search({ search }) {
  return <Navbar search={{ search }} />;
}
