import { START_CAT, GET_CAT, CLEAR_CAT } from "../type";

const initailState = {
  categories: [],
  loading: false,
};

function categories(state = initailState, action) {
  const { type, payload } = action;
  switch (type) {
    case START_CAT:
      return {
        ...state,
        loading: true,
      };
    case GET_CAT:
      return {
        ...state,
        categories: [...payload],
        loading: false,
      };
    case CLEAR_CAT: {
      return initailState;
    }
    default:
      return state;
  }
}

export default categories;
