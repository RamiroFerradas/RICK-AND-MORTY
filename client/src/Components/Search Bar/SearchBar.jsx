import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { searchCharacter } from "../../redux/actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const characters = useSelector((state) => state.characters);
  const [name, setName] = useState("");

  let handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e, name);
    dispatch(searchCharacter(name));
    e.target.reset();
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
