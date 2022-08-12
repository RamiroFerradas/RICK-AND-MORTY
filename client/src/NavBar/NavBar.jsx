import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import SearchBar from "../Components/Search Bar/SearchBar";
import { recargarHome, setCurrentPage } from "../redux/actions";

export default function NavBar() {
  const dispatch = useDispatch();
  const [order, setOrder] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(recargarHome());
    setCurrentPage(1);
    setOrder(`Ordenado${e}`);
  };
  return (
    <>
      <button onClick={(e) => handleClick(e)}>HOME</button>

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
