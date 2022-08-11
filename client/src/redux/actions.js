import axios from "axios";

export function getCharacters() {
  return async function (dispatch) {
    var json = await axios("http://localhost:3001/characters");
    return dispatch({
      type: "GET_CHARACTERS",
      payload: json.data,
    });
  };
}
export function getEpisodes() {
  return async function (dispatch) {
    var json = await axios("http://localhost:3001/episodes");
    return dispatch({
      type: "GET_EPISODES",
      payload: json.data,
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
      let json = await axios(`http://localhost:3001/character/${id}`);
      console.log(json.data[0], "soy jsonn");
      return dispatch({
        type: "CHARACTER_DETAILS",
        payload: json.data[0],
      });
    } catch (error) {
      alert("NO SE ENCONTRO CHARACTER CON ESE ID");
      console.log(error.message);
    }
  };
}

export function setCurrentPage(payload) {
  return {
    type: "SET_CURRENT_PAGE",
    payload: payload,
  };
}
