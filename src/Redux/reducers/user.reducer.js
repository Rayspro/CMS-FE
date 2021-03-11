import {
  AUTH_ERROR,
  LOGIN_COMPLETE,
  INIT_AUTH,
  SET_DEFAULT,
  SET_USER,
  LOGOUT,
} from "../type";

const initailState = {
  name: "",
  email: "",
  avatar: "",
  login: false,
  loading: false,
  err: false,
  errMsg: "",
};

function user(state = initailState, action) {
  const { type, payload } = action;
  switch (type) {
    case INIT_AUTH:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_COMPLETE:
      return {
        ...state,
        login: true,
        loading: false,
      };
    case AUTH_ERROR:
      return {
        ...state,
        err: true,
        errMsg: payload.msg,
        loading: false,
      };
    case LOGOUT:
      return {
        ...state,
        ...initailState,
      };
    case SET_DEFAULT:
      return {
        ...initailState,
      };
    case SET_USER:
      return {
        ...state,
        name: payload.name,
        email: payload.email,
        avatar: payload.avatar,
      };
    default:
      return state;
  }
}

export default user;
