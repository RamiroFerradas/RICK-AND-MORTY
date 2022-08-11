import React from "react";
import { setCurrentPage } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

export default function Paginado({ allCharacters }) {
  let dispatch = useDispatch();

  let currentPage = useSelector((state) => state.page);
  let pageNumbers = [];
  let [characterPerPage, setcharacterPerPage] = useState(12);
  let totalPages = Math.ceil(allCharacters / characterPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <button
        disabled={currentPage - 1 === 0}
        onClick={() => dispatch(setCurrentPage(currentPage - 1))}
      >
        PREV
      </button>
      {pageNumbers?.map((num) => {
        return (
          <button
            key={num}
            className={currentPage === num ? "btnActive" : "btnPagination"}
            onClick={() => dispatch(setCurrentPage(num))}
          >
            {num}
          </button>
        );
      })}
      <button
        disabled={currentPage === totalPages}
        onClick={() => dispatch(setCurrentPage(currentPage + 1))}
      >
        NEXT
      </button>
    </nav>
  );
}
