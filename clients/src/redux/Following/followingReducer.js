import { FOLLOW, UNFOLLOW, UPDATE_FOLLOWING } from "./followingType";

const followingInitialState= {
	usersId:[]
}
const followingReducer = (state = followingInitialState , action)=>{
	switch (action.type) {
		case FOLLOW:return({
			usersId: [...state.usersId , action.payload]
		})
		case UNFOLLOW : return({
			usersId: state.usersId.filter((uid)=> uid !== action.payload)
		})
		case UPDATE_FOLLOWING : return({
			usersId: action.payload
		})
		default : return state
	}
}
export default followingReducer;
