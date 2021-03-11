import axios from "axios";
import { SERVER_ENDPOINT } from "../../server.config";
import {
  LOGIN_COMPLETE,
  INIT_AUTH,
  AUTH_ERROR,
  SET_DEFAULT,
  SET_USER,
  LOGOUT,
} from "../type";

export const varifyGUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: INIT_AUTH,
    });
    const res = await axios.post(`${SERVER_ENDPOINT}/auth/gLogin`, {
      tokenId: id,
    });
    await localStorage.setItem("token", res.data.token);
    dispatch({
      type: LOGIN_COMPLETE,
    });
  } catch (err) {
    if (!!err.response) {
      dispatch({
        type: AUTH_ERROR,
        payload: { msg: err.response.data.msg },
      });
    }
  }
};

export const initNormalLogin = (email, password) => async (dispatch) => {
  const header = {
    headers: {
      device: "web",
    },
  };
  try {
    dispatch({
      type: INIT_AUTH,
    });
    const res = await axios.post(
      `${SERVER_ENDPOINT}/auth/Login`,
      {
        email: email,
        password: password,
      },
      header
    );
    await localStorage.setItem("token", res.data.token);
    dispatch({
      type: LOGIN_COMPLETE,
    });
  } catch (err) {
    if (!!err.response) {
      dispatch({
        type: AUTH_ERROR,
        payload: { msg: err.response.data.msg },
      });
    }
  }
};

export const register = () => async (dispatch) => {
  localStorage.clear();
  dispatch({
    type: LOGOUT,
  });
};

export const logout = () => async (dispatch) => {
  localStorage.clear();
  dispatch({
    type: LOGOUT,
  });
};

export const defaultSet = () => async (dispatch) => {
  dispatch({
    type: SET_DEFAULT,
  });
};

export const getUser = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  const res = await axios(`${SERVER_ENDPOINT}/auth/getUser`, {
    headers: { token: token },
  });
  dispatch({
    type: SET_USER,
    payload: res.data,
  });
};
