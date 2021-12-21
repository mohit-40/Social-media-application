import { combineReducers } from "redux";
import cartReducer from "./Cart/cartReducer"
import userReducer from "./User/userReducer"
import {persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"

const persistConfig = {
	key:'root',
	storage, 
	whitelist:["user","cart"]
}

const rootReducer = combineReducers({
	cart : cartReducer,
	user: userReducer

})

export default persistReducer( persistConfig ,rootReducer);