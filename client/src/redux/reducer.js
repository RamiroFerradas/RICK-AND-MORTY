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
      let search = state.allCharacters;
      let unCharacter = search.filter((ele) =>
        ele.name.toLowerCase().includes(action.payload.toLowerCase())
      );
      console.log(unCharacter, "soy reducer");
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

    // case "FILTER_BY_EPISODES":
    //   return {
    //     ...state,

    //     characters: state.allCharacters.filter((ele) => {
    //       console.log(ele.episodes);
    //       if (action.payload === "all") {
    //         return state.allCharacters;
    //       } else {
    //         return ele.episodes.includes(action.payload);
    //       }
    //     }),
    //     loading: false,
    //     page: 1,
    //   };

    case "ORDER_AZ":
      let currentCharacters = [...state.allCharacters];
      if (action.payload === "derfault") {
        let a = [...state.allCharacters];

        currentCharacters = a;
        return {
          ...state,
          characters: a,
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
