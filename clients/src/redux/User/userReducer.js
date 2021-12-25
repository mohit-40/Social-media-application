import { LOGIN_FAIL, LOGIN_START, LOGIN_SUCCESS ,LOGOUT_FAIL, LOGOUT_START, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_START, REGISTER_SUCCESS } from "./userType"
const initialUserState={
	currentUserId: null,
	isLoading:false,
	error:false
}

const userReducer=(state=initialUserState , action)=>{
	switch (action.type) {
		case REGISTER_START: 
		case LOGIN_START: return {
			...state,
			currentUserId:null,
			isLoading:true,
			error:false
		}
		case REGISTER_SUCCESS: 
		case LOGIN_SUCCESS: return {
			...state,
			currentUserId: action.payload,			
			isLoading:false,
			error: false
		}
		case REGISTER_FAIL: 
		case LOGIN_FAIL: return {
			...state,
			currentUserId:null,
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
			currentUserId: null,			
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