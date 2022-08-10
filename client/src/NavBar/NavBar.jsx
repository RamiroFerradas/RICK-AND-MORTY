import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../Components/Search Bar/SearchBar";

export default function NavBar() {
  return (
    <>
      <Link to={"/home"}>
        <button>HOME</button>
      </Link>
      <Link to={"/create"}>
        <button>CREATE CHARACTER</button>
      </Link>
      <Link to={"/about"}>
        <button>ABOUT</button>
      </Link>
      <SearchBar />
    </>
  );
}
