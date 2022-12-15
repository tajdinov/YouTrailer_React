import axios from "axios";
import React, { useEffect, useState } from "react";
import Movie from "../Components/Movie";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import requests from "../request";
import Search from "../Components/Navbar";

const SearchResults = ({ item }) => {
  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const searchWord = <Search />;
  // const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    axios.get(requests.requestTitle + searchWord).then((response) => {
      setSearchResults(response.data.results);
    });
  }, []);
  console.log(searchResults);

  return (
    <>
      <>
        <h2 className=" text-white font-bold md:text-xl p-4 pt-20">
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
