import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { searchCharacter, setCurrentPage } from "../../redux/actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  let handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchCharacter(name));
    e.target.reset();
    setCurrentPage(1);
  };

  let handleInputChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setName(e.target.value.toLowerCase());
  };
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          placeholder="Search character..."
          type="text"
          onChange={(e) => handleInputChange(e)}
          autoComplete="on"
        />
      </form>
    </div>
  );
}
