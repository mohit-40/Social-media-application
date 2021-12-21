import { LOGIN_FAIL, LOGIN_START, LOGIN_SUCCESS ,LOGOUT_FAIL, LOGOUT_START, LOGOUT_SUCCESS } from "./userType"
const initialUserState={
	currentUser:null,
	isLoading:false,
	error:false
}

const userReducer=(state=initialUserState , action)=>{
	switch (action.type) {
		case LOGIN_START: return {
			...state,
			currentUser:null,
			isLoading:true,
			error:false

		}
		case LOGIN_SUCCESS: return {
			...state,
			currentUser: action.payload,			
			isLoading:false,
			error: false
		}
		case LOGIN_FAIL: return {
			...state,
			currentUser:null,
			isLoading:false,
			error:true
		}

		
		case LOGOUT_START: return {
			...state,
			isLoading:true,
			error:false
		}
		case LOGOUT_SUCCESS: return {
			...state,
			currentUser: null,			
			isLoading:false,
			error: false
		}
		case LOGOUT_FAIL: return {
			...state,
			isLoading:false,
			error:true
		}
		default: return state	
	}
}

export default userReducer