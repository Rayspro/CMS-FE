import { START_CAT, GET_CAT } from "../type";
import axios from "axios";
import { SERVER_ENDPOINT } from "../../server.config";

export const getAllPost = () => async (dispatch) => {
  try {
    dispatch({
      type: START_CAT,
    });

    let res = await axios.get(`${SERVER_ENDPOINT}/post/getCategory`);
    dispatch({
      type: GET_CAT,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
