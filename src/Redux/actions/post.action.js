import { GET_POST, START_POST } from "../type";
import axios from "axios";
import { SERVER_ENDPOINT } from "../../server.config";

//star cat
export const getAllPost = () => async (dispatch) => {
  try {
    dispatch({
      type: START_POST,
    });
	let res = await axios.get(`${SERVER_ENDPOINT}/post/getAll`)
	dispatch({
		type:GET_POST,
		payload:res.data
	})
  } catch (err) {
    console.log(err);
  }
};
