const mongoose=require('mongoose')

const ConversationScheme= new mongoose.schema({
	members:{
		type:Array
	},
},{timestamps:true}) 

module.exports= mongoose.model("Conversation",ConversationSchema)
