import { createStore } from 'redux'
import rootReducer from "./rootReducer";
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';

import {persistStore} from "redux-persist"


const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
const persistor = persistStore(store)
export { store , persistor}	
