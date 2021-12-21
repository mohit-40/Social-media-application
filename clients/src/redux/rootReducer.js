import { combineReducers } from "redux"; 
import userReducer from "./User/userReducer"
import {persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"

const persistConfig = {
	key:'root',
	storage, 
	whitelist:["user" ]
}

const rootReducer = combineReducers({ 
	user: userReducer

})

export default persistReducer( persistConfig ,rootReducer);