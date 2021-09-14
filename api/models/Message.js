const mongoose =require('mongoose');

const MessageSchema = new mongoose.Schema({
	conversationId:{
		type:String
	},
	senderId:{
		type:String
	},
	messageText:{
		type:String
	},
},{timestamps:true});

module.exports = mongoose.model("Message",MessageSchema)

