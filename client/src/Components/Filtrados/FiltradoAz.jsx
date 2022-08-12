import React from "react";
import { useDispatch, useSelector, useState } from "react-redux";
import orderAz, { setCurrentPage } from "../../redux/actions";

export default function FiltradoAz({ setOrder }) {
  let dispatch = useDispatch();

  const handleSort = (e) => {
    e.preventDefault(e);
    dispatch(orderAz(e.target.value));
    dispatch(setCurrentPage(1));

    setOrder(`Ordenado${e.target.value}`);
  };

  return (
    <div>
      <label>Order A-Z: </label>
      <select onChange={(e) => handleSort(e)}>
        <option value="default">Default</option>
        <option value="asc">A-Z</option>
        <option value="dsc">Z-A</option>
      </select>
    </div>
  );
}
