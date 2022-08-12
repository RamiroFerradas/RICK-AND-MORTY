import React from "react";
import { useDispatch } from "react-redux";
import { filterByCreated, setCurrentPage } from "../../redux/actions";

export default function FiltradoCreacion() {
  let dispatch = useDispatch();

  const handlerFilterByCreated = (e) => {
    e.preventDefault();
    dispatch(filterByCreated(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div>
      <label>Type of created: </label>
      <select onChange={(e) => handlerFilterByCreated(e)}>
        <option value="all">All</option>
        <option value="existing">Api</option>
        <option value="created">Created</option>
      </select>
    </div>
  );
}
