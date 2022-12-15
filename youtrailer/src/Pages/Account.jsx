import React from "react";
import SavedShows from "../Components/SavedShows";

const Account = () => {
  return (
    <>
      <div className=" w-full text-white">
        <img
          className="  w-full h-[400px] object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/ac9aedf1-a687-4c5d-965c-2fc3eac84aea/4e484bac-d17b-44ce-a3d2-8d7ec842ec29/AU-en-20221206-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="background"
        />
        <div className=" bg-black/60 fixed top-0 left-0 w-full h-[550px]"></div>
        <div className=" absolute top-[20%] p-4 md:p-8">
          <h1 className=" text-3xl md:text-5xl font-bold">My Shows</h1>
        </div>
      </div>
      <SavedShows />
    </>
  );
};

export default Account;
