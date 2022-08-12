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
  const allCharacters = useSelector((state) => state.characters);

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
  /** VALIDACIONES **/

  function validate(input) {
    let errors = {};
    //name
    if (
      allCharacters.find(
        (char) => char.name.toUpperCase() === input.name.toUpperCase()
      )
    )
      errors.name = "Ya existe un character con este nombre, escoge otro!";
    if (!input.name) errors.name = "Tu character necesita un nombre!";
    if (/[1-9]/.test(input.name))
      errors.name = "El nombre de tu character no puede contener numeros";
    if (/[^\w\s]/.test(input.name))
      errors.name =
        "El nombre de tu character no puede contener caracteres especiales";
    //origin
    if (!input.origin) errors.origin = "Tu character necesita un origin!";
    if (/[1-9]/.test(input.origin))
      errors.origin = "El origin de tu character no puede contener numeros";
    if (/[^\w\s]/.test(input.origin))
      errors.origin =
        "El origin de tu character no puede contener caracteres especiales";
    //species
    if (!input.species) errors.species = "Tu character necesita una species!";
    if (/[1-9]/.test(input.species))
      errors.species = "La species de tu character no puede contener numeros";
    if (/[^\w\s]/.test(input.species))
      errors.species =
        "La species de tu character no puede contener caracteres especiales";
    //image
    if (!/\.(jpg|png|gif)$/i.test(input.image))
      errors.image = "La url que intentas colocar no es valida";

    return errors;
  }

  const [errors, setErrors] = useState({});
  const [disabledButton, setDisabledButton] = useState(true);
  useEffect(() => {
    // console.log(errors, "soy el errors");
    if (
      input.name === "" ||
      /[1-9]/.test(input.name) ||
      // /[\s]/.test(input.name) ||
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
      origin: "",
      species: "",
      image: "",
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
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  return (
    <form>
      <div>
        <h1>Crea tu personaje !</h1>
      </div>
      <div>
        <label>Name: </label>
        <input
          type="text"
          name="name"
          value={input.name}
          placeholder="Name..."
          onChange={(e) => handlerChange(e)}
          className={styles.inputsForm}
          autoComplete="on"
        />
      </div>
      <div> {errors.name && <p>{errors.name}</p>}</div>

      <div>
        <label>Origin: </label>
        <input
          type="text"
          name="origin"
          value={input.origin}
          placeholder="Origin..."
          onChange={(e) => handlerChange(e)}
          className={styles.inputsForm}
          autoComplete="off"
        />
      </div>
      <div> {errors.origin && <p>{errors.origin}</p>}</div>
      <div>
        <label>Species: </label>
        <input
          type="text"
          name="species"
          value={input.species}
          placeholder="Species..."
          onChange={(e) => handlerChange(e)}
          className={styles.inputsForm}
          autoComplete="on"
        />
      </div>
      <div> {errors.species && <p>{errors.species}</p>}</div>
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
          placeholder="Url image..."
          onChange={(e) => handlerChange(e)}
          className={styles.inputsForm}
          autoComplete="off"
        />
      </div>
      <div> {errors.image && <p>{errors.image}</p>}</div>
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
