import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getEpisodes } from "../../redux/actions";
import { useDispatch } from "react-redux";
import styles from "../Create Character/CreateCharacter.module.css";
import { useNavigate } from "react-router-dom";
import { createCharacter } from "../../redux/actions";
export default function CreateCharacter() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [input, setInput] = useState({
    name: "",
    image: "",
    origin: "",
    species: "",
    episodes: [],
  });

  useEffect(() => {
    dispatch(getEpisodes());
  }, [dispatch]);

  const allEpisodes = useSelector((state) => state.episodes);
  console.log(allEpisodes, "soy episodes");

  const handlerFirstSelect = (e) => {
    if (input.episodes.length <= 1) {
      setInput({
        ...input,
        episodes: [e.target.value],
      });
    } else if (e.target.value === input.episodes[1]) {
      setInput({
        ...input,
        episodes: [e.target.value],
      });
    } else {
      setInput({
        ...input,
        episodes: [e.target.value, input.episodes[1]],
      });
    }
  };

  const handlerSecondSelect = (e) => {
    if (input.episodes.length === 0) {
      alert("Primero debes de escoger tu primer episodio");
      e.target.value = "DEFAULT";
      return;
    }
    if (e.target.value === "removeepisodes") {
      setInput({
        ...input,
        episodes: [input.episodes[0]],
      });
    } else if (e.target.value === input.episodes[0]) {
      setInput({
        ...input,
        episodes: [input.episodes[0]],
      });
    } else {
      setInput({
        ...input,
        episodes: [input.episodes[0], e.target.value],
      });
    }
  };
  const [errors, setErrors] = useState({});
  const [disabledButton, setDisabledButton] = useState(true);
  useEffect(() => {
    // console.log(errors, "soy el errors");
    if (
      input.name === "" ||
      /[1-9]/.test(input.name) ||
      /[\s]/.test(input.name) ||
      /[^\w\s]/.test(input.name) ||
      input.origin.length < 1 ||
      input.species.length < 1 ||
      input.episodes.length < 1
    ) {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
  }, [errors, input, setDisabledButton]);

  const handlerCreateCharacter = (e) => {
    e.preventDefault();
    // console.log(input);
    dispatch(createCharacter({ ...input, name: input.name.toLowerCase() }));
    alert("Tu character ha sido creado exitosamente");
    setInput({
      name: "",
      image: "",
      origin: "",
      speciess: "",
      episodes: [],
    });
    setTimeout(() => {
      navigate("/home");
    }, 900);
  };

  const handlerChange = (e) => {
    console.log(e.target.value);
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form action="">
      <div>
        <h1>Crea tu personaje !</h1>
      </div>
      <div>
        <label>Name: </label>
        <input
          // required
          type="text"
          name="name"
          value={input.name}
          placeholder="Name..."
          onChange={(e) => handlerChange(e)}
          className={styles.inputsForm}
          autoComplete="off"
        />
      </div>
      <div>
        <label>Origin: </label>
        <input
          // required
          type="text"
          name="origin"
          value={input.origin}
          placeholder="Name..."
          onChange={(e) => handlerChange(e)}
          className={styles.inputsForm}
          autoComplete="off"
        />
      </div>
      <div>
        <label>Species: </label>
        <input
          // required
          type="text"
          name="species"
          value={input.species}
          placeholder="Name..."
          onChange={(e) => handlerChange(e)}
          className={styles.inputsForm}
          autoComplete="off"
        />
      </div>
      <div>
        <label>Episode 1: </label>

        <select
          defaultValue={"DEFAULT"}
          onChange={(e) => handlerFirstSelect(e)}
        >
          <option value="DEFAULT">Select</option>
          {allEpisodes &&
            allEpisodes.map((ep) => {
              return (
                <option key={ep.name} value={ep.id}>
                  {ep.name}
                </option>
              );
            })}
        </select>
      </div>
      <div>
        <label>Episode 2: </label>

        <select
          defaultValue={"DEFAULT"}
          onChange={(e) => handlerSecondSelect(e)}
        >
          <option value="DEFAULT">Select</option>
          <option value="removeType">Remove second episode</option>
          {allEpisodes &&
            allEpisodes.map((ep) => {
              return (
                <option key={ep.name} value={ep.id}>
                  {ep.name}
                </option>
              );
            })}
        </select>
      </div>
      <div>
        <label>Image: </label>
        <input
          // required
          type="text"
          name="image"
          value={input.image}
          placeholder="Name..."
          onChange={(e) => handlerChange(e)}
          className={styles.inputsForm}
          autoComplete="off"
        />
      </div>
      <div>
        <button
          disabled={disabledButton}
          type="submit"
          onClick={(e) => handlerCreateCharacter(e)}
          className="buttonCrear"
        >
          Crear
        </button>
      </div>
    </form>
  );
}
