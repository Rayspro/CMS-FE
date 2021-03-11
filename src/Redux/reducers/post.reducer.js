import { START_POST, GET_POST, CLEAR_POST, GET_ALL_POST } from "../type";

const initailState = {
  post: [],
  loading: false,
};

function post(state = initailState, action) {
  const { type, payload } = action;
  switch (type) {
    case START_POST:
      return {
        ...state,
        loading: true,
      };
    case GET_POST:
      return {
        ...state,
        post: [...payload],
        loading: false,
      };
    case GET_ALL_POST:
      return {
        ...state,
        post: [...payload],
        loading: false,
      };
    case CLEAR_POST: {
      return initailState;
    }
    default:
      return state;
  }
}

export default post;
