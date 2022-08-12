import React from "react";
import { useEffect } from "react";
import filterEpisodes, {
  getCharacters,
  setCurrentPage,
  getEpisodes,
  cleanCache,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import NavBar from "../../NavBar/NavBar";
import Paginado from "../Paginado/Paginado";
import Loading from "../Loading/Loading";
import { useState } from "react";
import Filtrados from "../Filtrados/Filtrados";
import orderAz from "../../redux/actions";

export default function Home() {
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const [order, setOrder] = useState("");

  let allCharactersFiltrados = useSelector((state) => state.characters);
  // const characters = useSelector((state) => state.characters);

  let page = useSelector((state) => state.page);

  let [characterPerPage, setcharacterPerPage] = useState(12);
  const indexOfLastChar = page * characterPerPage; //2 * 12
  const indexOfFirstChar = indexOfLastChar - characterPerPage; //24 - 12 = 12
  const currentCharacters = allCharactersFiltrados.slice(
    indexOfFirstChar,
    indexOfLastChar
  ); //12 - 24

  useEffect(() => {
    // dispatch(cleanCache());
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
          <option value="50">50</option>
        </select>
      </div>
      {/* <input type="range" max="50" onChange={(e) => handleChangeRange(e)} />; */}
      <div>
        <Paginado allCharacters={allCharactersFiltrados.length} />
      </div>
      <div>
        <Filtrados setOrder={setOrder} />
      </div>
      {currentCharacters &&
        currentCharacters.map((ele) => {
          return (
            <div key={ele.id}>
              <Link to={`/character/${ele.id}`}>
                <Card
                  name={ele.name[0].toUpperCase() + ele.name.slice(1)}
                  image={ele.image}
                  origin={ele.origin[0].toUpperCase() + ele.origin.slice(1)}
                  species={ele.species[0].toUpperCase() + ele.species.slice(1)}
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
