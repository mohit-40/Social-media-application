import { combineReducers } from "redux";
import userReducer from "./User/userReducer"
import followingReducer from "./Following/followingReducer"
import socketReducer from "./Socket/socketReducer"
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ["user"]
}

const rootReducer = combineReducers({
	user: userReducer,
	following: followingReducer,
	socket: socketReducer
})

export default persistReducer(persistConfig, rootReducer);