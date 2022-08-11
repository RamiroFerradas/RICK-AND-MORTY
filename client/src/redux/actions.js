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

export function setCurrentPage(payload) {
  return {
    type: "SET_CURRENT_PAGE",
    payload: payload,
  };
}
