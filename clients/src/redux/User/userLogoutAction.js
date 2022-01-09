import { LOGOUT_FAIL, LOGOUT_START, LOGOUT_SUCCESS } from "./userType";
import {userRequest} from "../../requestMethod"

export const logoutStart=()=>({
	type:LOGOUT_START
})
export const logoutSuccess=()=>({
	type:LOGOUT_SUCCESS
})

export const logoutFail=()=>({
	type:LOGOUT_FAIL	
})

export const logout=(userId )=>{
	return async(dispatch)=>{
		await dispatch(logoutStart());
		try {
			const refreshToken = localStorage.getItem("refreshToken")
			await userRequest.post(`/auth/logout/${userId}`,{refreshToken : refreshToken});
			localStorage.removeItem("accessToken")
			localStorage.removeItem("refreshToken")
			dispatch(logoutSuccess());
			// dispatch(clearRedux())
			
		} catch (error) {
			dispatch(logoutFail());
		}
	}
}

