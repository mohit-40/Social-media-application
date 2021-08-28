const router = require("express").Router();
const { findById } = require("../models/Post");
const Post=require('../models/Post');

// create a post 
router.post("/",async (req,res)=>{
	try {
		const newPost=await new Post(req.body);
		const post=await newPost.save()
		res.status(200).send(post);
	} catch(error) {
		res.status(404).send(error.message);
	}
})
// update a post 
router.put("/:id",async (req,res)=>{
	try {
		const post =await Post.findById({_id: req.params.id});
		if(req.body.userId==post.userId){
			await post.updateOne({$set:req.body});
			res.status(200).send(post);
		}else {
			res.status(403).send("can not update others post");
		}
	} catch(error) {
		res.status(500).send(error.message);
	}
})
// get a post 
router.get("/:id",async (req,res)=>{
	try {
		const post = await Post.findById({_id:req.params.id});
		res.status(200).send(post);
	} catch(error) {
		res.status(500).send(error.message);
	}
})
// delete a post 
router.delete("/:id",async (req,res)=>{
	try {
		const post= await Post.findById({_id:req.params.id});
		if(req.body.userId===post.userId){
			await post.delete();
			res.status(200).send("post deleted successfully");
		}else{
			res.status(400).send("can't delete other user post ");
		}
	} catch(error) {
		res.status(500).send(error.message);
	}
})

// get timeline post 
router.get("/",async (req,res)=>{
	try {
		const posts=await Post.find({userId:req.body.userId});
		res.status(200).send(posts);
	} catch(error) {
		res.status(500).send(error.message);
	}
})
// like a  post 
router.put("/:id/like",async (req,res)=>{
	try {
		const post= await Post.findById({_id:req.params.id});
		if(!post.like.includes(req.body.userId)){
			await post.update({$push:{like:req.body.userId}});

			// TODO: add this post to user.likedPost
			
			res.status(200).send("you successfully like the post");
		}else{
			res.status(400).send("you alredy like the post");
		}
	} catch(error) {
		res.status(500).send(error.message);
	}
})
//unlike a  post 
router.put("/:id/unlike",async (req,res)=>{
	try {
		const post= await Post.findById({_id:req.params.id});
		if(post.like.includes(req.body.userId)){
			await post.update({$pull:{like:req.body.userId}});

			// TODO: remove this post to user.likedPost
			
			res.status(200).send("you successfully unlike the post");
		}else{
			res.status(400).send("you donot like this post");
		}
	} catch(error) {
		res.status(500).send(error.message);
	}
})



module.exports = router;