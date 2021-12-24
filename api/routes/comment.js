const router=require('express').Router();
const Comment=require('../models/Comment');
const {verifyTokenAndAdmin, verifyToken,  verifyTokenAndAuthorization } = require("./verifyToken")

//get the comment
router.get("/:pid" , verifyToken ,async(req,res) =>{
	try {
		const comment = await Comment.find({postId:req.params.pid});
		res.status(200).json(comment);		
	} catch(error) {
		res.status(400).json(error.message);
	}
})
//create comment
router.post("/:pid",verifyToken,async(req,res)=>{
	try {
		const newComment = await new Comment(req.body);
		const comment=await newComment.save();
		res.status(200).json(comment);
	} catch(error) {
		res.status(400).json(error.message);
	}
})
//delete
router.delete("/:cid/:id",verifyTokenAndAuthorization,async(req,res)=>{
	try {
		console.log("in delete api")
		await Comment.findByIdAndDelete(req.params.cid);
		res.status(200).json("comment deleted")
	} catch(error) {
		res.status(400).json(error.message);
	}
})

module.exports=router
