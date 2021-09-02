const router = require("express").Router();
const { findById } = require("../models/Post");
const Post=require('../models/Post');
const User=require('../models/User');

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
			res.status(400).send("can not update others post");
		}
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
// like/unlike a  post 
router.put("/:id/like",async (req,res)=>{
	try {
		const post= await Post.findById({_id:req.params.id});
		if(!post.like.includes(req.body.userId)){
			await post.update({$push:{like:req.body.userId}});
			// TODO: add this post to user.likedPost
			
			res.status(200).send("you successfully like the post");
		}else{
			await post.update({$pull:{like:req.body.userId}});
			// TODO: remove this post to user.likedPost
			
			res.status(200).send("you successfully unlike the post");
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

// get timeline post 
router.get("/timeline/all",async (req,res)=>{
	try {
		const currentUser = await User.findById(req.body.userId);
		const userPost= await Post.find({ userId: currentUser._id });
		console.log(userPost);
		const friendPost = await Promise.all(
		  currentUser.following.map((friendId) => Post.find({ userId: friendId }))
		)
		res.status(200).json(userPost.concat(...friendPost));
	  } catch (err) {
		res.status(500).send(err.message);
	  }
})


module.exports = router;