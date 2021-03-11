import { combineReducers } from 'redux';
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import post from "./post.reducer";
import user from "./user.reducer";
import categoey from "./categoey.reduces";

const persistConfig = {
	key:'root-RMS',
	storage
}

const rootReduce= combineReducers({
	post,
	user,
	categoey
});

const persistedReducer = persistReducer(persistConfig,rootReduce)

export default persistedReducer;