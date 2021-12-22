const router=require('express').Router();
const Message=require('../models/Message');
const {verifyTokenAndAdmin, verifyToken,  verifyTokenAndAuthorization } =require("./verifyToken")

//create a conversation message
router.post("/:id", verifyTokenAndAuthorization ,async (req,res)=>{
	try {
		const newMessage= await new Message(req.body)
		const savedMessage=await newMessage.save()
		res.status(200).send(savedMessage)
	} catch (error) {
		res.status(500).json(error)
	}
})
//get the conversation message
router.get("/:conversationId/:id",verifyTokenAndAuthorization ,async (req,res)=>{
	try {
		const allMessage=await Message.find({conversationId:req.params.conversationId})
		res.status(200).json(allMessage)
	} catch (error) {
		res.status(500).json(error)
	}
})

module.exports=router