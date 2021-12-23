import { SET_SOCKET } from "./socketType";

const initialSocketState = {
	socket:null
}
const socketReducer = (state = initialSocketState , action)=>{
	switch (action.type) {
		case SET_SOCKET: return({
			socket:action.payload
		})
		default:return state;
	}
}
export default socketReducer;