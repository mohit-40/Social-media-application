// make axios intance so that no need to pass hearder:authorization again and again 

import axios from "axios";
import { store } from "./redux/store";
import jwtDecode from 'jwt-decode'  


let BASE_URL="http://localhost:8800/api"
if(process.env.NODE_ENV ==="production"){
	BASE_URL = "https://socialifyapp.herokuapp.com/api/";
}
export const publicRequest = axios.create({ baseURL: BASE_URL })
export const userRequest = axios.create({ baseURL: BASE_URL })


// interceptor code 
const refreshToken = async () => {
	try {
		const REFRESH_TOKEN = localStorage.getItem("refreshToken");
		const state = store.getState();
		const currentUserId = state.user.currentUserId;
		const res = await publicRequest.post("/auth/refresh/" + currentUserId, { refreshToken: REFRESH_TOKEN });
		localStorage.setItem("accessToken", res.data.accessToken)
		console.log("accesstoken updated")
		return res.data;
	} catch (err) {
		console.log(err);
	}
};

userRequest.interceptors.request.use(
	async (config) => {
		const ACCESS_TOKEN = localStorage.getItem("accessToken")
		config.headers["authorization"] = "Bearer " + ACCESS_TOKEN;
		
		const decodedToken = await jwtDecode(ACCESS_TOKEN);
		let currentDate = new Date();
		if (decodedToken.exp * 1000 < currentDate.getTime()) {
			const data = await refreshToken();
			config.headers["authorization"] = "Bearer " + data.accessToken;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error)
	}
);
