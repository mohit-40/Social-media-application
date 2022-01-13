import { REGISTER_FAIL, REGISTER_START, REGISTER_SUCCESS } from "./userType"; 
import { publicRequest } from "../../requestMethod";

export const registerStart=()=>({
	type:REGISTER_START
})
export const registerSuccess=(userId)=>({
	type:REGISTER_SUCCESS,
	payload: userId
})

export const registerFail=()=>({
	type:REGISTER_FAIL
	
})

export const register=(userDetail)=>{
	return async(dispatch)=>{
		await dispatch(registerStart());
		try {
			const res= await publicRequest.post("/auth/register",userDetail);
			const user =res.data;  
			localStorage.setItem("accessToken",user.accessToken);
			localStorage.setItem("refreshToken",user.refreshToken);
			dispatch(registerSuccess(user._id));
		} catch (error) {
			dispatch(registerFail())
		}
	}
}
