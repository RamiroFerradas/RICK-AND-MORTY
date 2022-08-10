import React from "react";
import { useEffect } from "react";
import { getCharacters } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import NavBar from "../../NavBar/NavBar";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCharacters());
  }, [dispatch]);

  const allCharacters = useSelector((state) => state.characters);

  return (
    <div>
      <NavBar />
      {allCharacters &&
        allCharacters.map((ele) => {
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
    </div>
  );
}
