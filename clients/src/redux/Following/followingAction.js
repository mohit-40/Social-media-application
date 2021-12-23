import { FOLLOW, UNFOLLOW, UPDATE_FOLLOWING } from "./followingType";

export const follow=(userId)=>({
	type:FOLLOW,
	payload: userId
})
export const unfollow=(userId)=>({
	type:UNFOLLOW,
	payload : userId
})
export const updateFollowing=(followings)=>({
	type:UPDATE_FOLLOWING,
	payload : followings
})

