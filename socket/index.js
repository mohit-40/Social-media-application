const io= require('socket.io')(8900,{cors:{origin:"http://localhost:3000"}});

let users=[]
const addUser=(userId,socketId)=>{
	!users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
}
const removeUser=(socketId)=>{
	users=users.filter((user)=> user.socketId!==socketId)
}
const getUser=(userId)=> users.find((user)=> user.userId===userId)

io.on("connection",(socket)=>{
	console.log("A New User is connected to socket io")


	socket.on("addUser",(userId)=>{
		console.log("userAdded");
		addUser(userId,socket.id)
		io.emit("getUsers",users)
	})
	socket.on("disconnect",()=>{
		console.log("disconnected and user removed")
		removeUser(socket.id);
		io.emit("getUsers",users)
	})
	socket.on("sendMessage",({body,receiverId})=>{
		console.log(body);
		const receiver = getUser(receiverId); 
		io.to(receiver?.socketId).emit('getMessage',body)
	})

})