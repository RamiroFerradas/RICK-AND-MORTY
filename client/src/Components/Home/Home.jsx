import React from "react";
import { useEffect } from "react";
import {
  getCharacters,
  setCurrentPage,
  getEpisodes,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import NavBar from "../../NavBar/NavBar";
import Paginado from "../Paginado/Paginado";
import Loading from "../Loading/Loading";
import { useState } from "react";

export default function Home() {
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  let allCharactersFiltrados = useSelector((state) => state.allCharacters);
  const characters = useSelector((state) => state.characters);

  let page = useSelector((state) => state.page);

  let [characterPerPage, setcharacterPerPage] = useState(12);
  const indexOfLastChar = page * characterPerPage; //2 * 12
  const indexOfFirstChar = indexOfLastChar - characterPerPage; //24 - 12 = 12
  const currentCharacters = allCharactersFiltrados.slice(
    indexOfFirstChar,
    indexOfLastChar
  ); //12 - 24

  useEffect(() => {
    dispatch(getCharacters());
    dispatch(getEpisodes());
  }, [dispatch]);

  // function handleChangeRange(e) {
  //   setcharacterPerPage(e.target.value);
  // }

  function handleSelect(e) {
    setcharacterPerPage(e.target.value);
  }

  return !loading ? (
    <div>
      <NavBar />
      <div></div>
      <div>
        <label> Pages</label>
        <select onChange={(e) => handleSelect(e)}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
      </div>
      {/* <input type="range" max="50" onChange={(e) => handleChangeRange(e)} />; */}
      <Paginado allCharacters={allCharactersFiltrados.length} />
      {currentCharacters &&
        currentCharacters.map((ele) => {
          return (
            <div key={ele.id}>
              <Link to={`/character/${ele.id}`}>
                <Card
                  name={ele.name}
                  image={ele.image}
                  origin={ele.origin}
                  species={ele.species}
                  episodes={ele.episodes}
                />
              </Link>
            </div>
          );
        })}
      {/* <div>
        <Paginado allCharacters={allCharactersFiltrados.length} />
      </div> */}
      ;
    </div>
  ) : (
    <Loading />
  );
}
