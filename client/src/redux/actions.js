import axios from "axios";

export function getCharacters() {
  return async function (dispatch) {
    var json = (await axios("http://localhost:3001/characters")).data;
    return dispatch({
      type: "GET_CHARACTERS",
      payload: json,
    });
  };
}
export function getEpisodes() {
  return async function (dispatch) {
    var json = (await axios("http://localhost:3001/episodes")).data;
    return dispatch({
      type: "GET_EPISODES",
      payload: json,
    });
  };
}

export function createCharacter(payload) {
  return async function (dispatch) {
    try {
      let json = axios.post(`http://localhost:3001/character`, payload);
      return json;
    } catch (error) {
      console.log(error.message, "Error en el post");
    }
  };
}

export function characterDetails(id) {
  return async function (dispatch) {
    try {
      let json = (await axios(`http://localhost:3001/character/${id}`)).data;

      return dispatch({
        type: "CHARACTER_DETAILS",
        payload: json[0],
      });
    } catch (error) {
      alert("NO SE ENCONTRO CHARACTER CON ESE ID");
      console.log(error.message, "error en el details");
    }
  };
}

export function searchCharacter(name) {
  return async function (dispatch) {
    try {
      console.log("soy try de actions");
      return dispatch({
        type: "SEARCH_CHARACTER",
        payload: name,
      });
    } catch (error) {
      console.log(error.message, "error en el search");
      return alert("No existe el personaje");
    }
  };
}

//filtrados
export default function filterEpisodes(payload) {
  try {
    return {
      type: "FILTER_BY_EPISODES",
      payload,
    };
  } catch (error) {
    error(error, "error en el filter");
  }
}

export function filterByCreated(payload) {
  return {
    type: "FILTER_BY_CREATED",
    payload,
  };
}

export function orderAz(payload) {
  return {
    type: "ORDER_AZ",
    payload,
  };
}

export function setCurrentPage(payload) {
  return {
    type: "SET_CURRENT_PAGE",
    payload: payload,
  };
}

export function cleanCache() {
  return {
    type: "CLEAN_CACHE",
  };
}

export function recargarHome() {
  return {
    type: "RECARGA",
  };
}
