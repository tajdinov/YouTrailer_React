import axios from "axios";
import React, { useEffect, useState } from "react";
import Movie from "../Components/Movie";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import requests from "../request";

const SearchResults = ({ item }) => {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  // const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      axios.get(requests.requestTitle + search).then((response) => {
        setSearchResults(response.data.results);
      });
      console.log(search);
      console.log(searchResults);
    } catch {
      console.log(error);
    }
  };

  return (
    <>
      <>
        <div className=" w-full text-white">
          <img
            className="  w-full h-[400px] object-cover"
            src="https://assets.nflxext.com/ffe/siteui/vlv3/ac9aedf1-a687-4c5d-965c-2fc3eac84aea/4e484bac-d17b-44ce-a3d2-8d7ec842ec29/AU-en-20221206-popsignuptwoweeks-perspective_alpha_website_large.jpg"
            alt="background"
          />
          <div className=" bg-black/60 fixed top-0 left-0 w-full h-[550px]"></div>
          <div className=" absolute top-[10%] p-4 md:p-8">
            <h1 className=" text-3xl md:text-5xl font-bold">Search</h1>
          </div>
          <div className=" absolute top-[7%] p-4 md:p-8 w-full px-4 py-24 z-50">
            <div className=" max-w-[550px] mx-auto bg-black/75 text-white rounded">
              <form
                onSubmit={handleSubmit}
                className=" w-full flex flex-col p-4"
              >
                <input
                  onChange={(e) => setSearch(e.target.value)}
                  className=" p-3 my-2 bg-gray-700
                          bg-transparent rounded border-2 
                         border-white/60 text-white focus:outline-none"
                  type="text"
                  placeholder="Movie Name"
                />
                <button className=" py-2 my-4 focus:outline-none text-white bg-red-600 rounded hover:bg-red-800 ">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
        <h2 className=" text-white font-bold md:text-xl p-4 pt-6">
          Search Results
        </h2>

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
            {searchResults.map((item, id) => (
              <Movie key={id} item={item} />
            ))}
          </div>
          <MdChevronRight
            onClick={slideRight}
            className=" bg-white right-0 mr-4 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block duration-500"
            size={40}
          />
        </div>
      </>
    </>
  );
};

export default SearchResults;
