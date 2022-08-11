const initialState = {
  characters: [],
  allCharacters: [],
  page: 1,
  loading: true,
  episodes: [],
  details: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_CHARACTERS":
      return {
        ...state,
        characters: action.payload,
        allCharacters: action.payload,
        page: 1,
        loading: false,
      };

    case "GET_EPISODES":
      return {
        ...state,
        episodes: action.payload,
        page: 1,
      };
    case "CHARACTER_DETAILS":
      return {
        ...state,
        details: action.payload,
      };

    case "SET_CURRENT_PAGE":
      return {
        ...state,
        page: action.payload,
        laoding: false,
      };

    case "SET_LOADING":
      const estadoDelestado = state.loading;
      if (estadoDelestado === true) {
        return {
          ...state,
          loading: false,
          page: 1,
        };
      } else {
        return {
          ...state,
          page: 1,
          loading: true,
        };
      }

    default:
      return state;
  }
}
