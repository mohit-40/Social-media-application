const router=require('express').Router()
const { find } = require('../models/Conversation');
const Conversation = require('../models/Conversation');
const {verifyTokenAndAdmin, verifyToken,  verifyTokenAndAuthorization } =require("./function/verifyToken")

//start conversation
router.post("/:id",verifyTokenAndAuthorization, async (req,res)=>{
	try{
		const findConv=await Conversation.find({
			members: { $all: [req.body.senderId, req.body.receiverId] },
		})
		if(findConv.length===0){
			const newConversation= await new Conversation({
				members:[req.body.senderId, req.body.receiverId],
			})
			const savedConversation=await newConversation.save()
			res.status(200).json(savedConversation)
		}
		else{
			res.status(200).json(findConv)
		}
	}
	catch(error){
		res.status(500),json(error)
	}
})


//get conversation
router.get("/:id",verifyTokenAndAuthorization ,async(req,res)=>{
	try {
		const conversation=await Conversation.find({
			members: { $in: [req.params.id] },
		})
		res.status(200).json(conversation)
	} catch (error) {
		res.status(500).json(error)
	}
})

module.exports = router;