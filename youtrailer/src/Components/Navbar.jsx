import React from "react";

import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../Context/AuthContext";
import { BsSearch } from "react-icons/bs";

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" flex items-center justify-between p-4 z-[100] w-full absolute">
      <Link to="/">
        <h1 className=" text-red-600 text-3xl font-extrabold cursor-pointer shadow-lg">
          YOUTRAILER
        </h1>
      </Link>

      {user?.email ? (
        <div>
          <Link to="searchResults">
            <button className=" absolute top-7 right-[200px] pr-6">
              <BsSearch className=" text-white cursor-pointer" type="button" />
            </button>
          </Link>
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
          <Link to="searchResults">
            <BsSearch className=" text-white cursor-pointer" type="button" />
          </Link>
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
