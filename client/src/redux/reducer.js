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

    case "SEARCH_CHARACTER":
      let unCharacter = state.allCharacters.filter((ele) =>
        ele.name.toLowerCase().includes(action.payload.toLowerCase())
      );

      return {
        ...state,
        characters: unCharacter,
        page: 1,
      };

    case "CHARACTER_DETAILS":
      return {
        ...state,
        details: action.payload,
      };

    case "FILTER_BY_EPISODES":
      let filt = state.allCharacters.filter((ele) => {
        if (action.payload === "all") {
          return state.allCharacters;
        } else {
          return ele.episodes.includes(action.payload);
        }
      });
      return {
        ...state,
        characters: filt,
        loading: false,
        page: 1,
      };

    case "ORDER_AZ":
      let currentCharacters = [...state.allCharacters];
      if (action.payload === "derfault") {
        return {
          ...state,
          characters: currentCharacters,
          page: 1,
        };
      }
      const aux = [...state.characters];
      if (action.payload === "asc") {
        aux.sort((obj1, obj2) => {
          if (obj1.name < obj2.name) {
            return -1;
          } else {
            return 1;
          }
        });
        currentCharacters = aux;
      }
      if (action.payload === "dsc") {
        aux.sort((obj1, obj2) => {
          if (obj1.name < obj2.name) {
            return 1;
          } else {
            return -1;
          }
        });
        currentCharacters = aux;
      }
      return {
        ...state,
        characters: currentCharacters,
      };

    case "FILTER_BY_CREATED":
      const createdFilter =
        action.payload === "created"
          ? state.allCharacters.filter((ele) => ele.createdInDb)
          : state.allCharacters.filter((ele) => !ele.createdInDb);

      return {
        ...state,
        characters: createdFilter,
        loading: false,
        page: 1,
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
    case "RECARGAR":
      return {
        ...state,
        characters: [state.allCharacters],
        page: 1,
      };

    case "CLEAN_CACHE":
      return {
        ...state,
        details: [],
        page: 1,
      };
    default:
      return state;
  }
}
