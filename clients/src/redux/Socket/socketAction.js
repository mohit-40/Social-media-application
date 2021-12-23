import { SET_SOCKET } from "./socketType"

export const setSocket = (socket)=>({
	type:SET_SOCKET,
	payload:socket
})
