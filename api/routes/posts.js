const router = require("express").Router();
const { findById } = require("../models/Post");
const Post = require('../models/Post');
const User = require('../models/User');
const {verifyTokenAndAdmin, verifyToken,  verifyTokenAndAuthorization } =require("./function/verifyToken")

// create a post 
router.post("/:id",verifyTokenAndAuthorization,async (req, res) => {
	try {
		const newPost = await new Post(req.body);
		const post = await newPost.save() 
		res.status(200).json(post);
	} catch (error) {
		res.status(404).json(error.message);
	}
})
// update a post 
router.put("/:id",verifyTokenAndAuthorization,async (req, res) => {
	try {
		const post = await Post.findById({ _id: req.params.id });
		if (req.body.userId == post.userId) {
			await post.updateOne({ $set: req.body });
			res.status(200).json(post);
		} else {
			res.status(400).json("can not update others post");
		}
	} catch (error) {
		res.status(500).json(error.message);
	}
})
// delete a post 
router.delete("/:pid/:id", verifyTokenAndAuthorization ,async (req, res) => {
	try {
		const post = await Post.findById({ _id: req.params.pid });
		if (req.params.id === post.userId) {
			await post.delete();
			res.status(200).json("post deleted successfully");
		} else {
			res.status(400).json("can't delete other user post");
		}
	} catch (error) {
		res.status(500).json(error.message);
	}
})
// like/unlike a  post 
router.put("/:id/like",verifyToken , async (req, res) => {
	try {
		const post = await Post.findById({ _id: req.params.id });
		if (!post.like.includes(req.body.userId)) {
			await post.update({ $push: { like: req.body.userId } });
			// TODO: add this post to user.likedPost

			res.status(200).json("you successfully like the post");
		} else {
			await post.update({ $pull: { like: req.body.userId } });
			// TODO: remove this post to user.likedPost

			res.status(200).json("you successfully unlike the post");
		}
	} catch (error) {
		res.status(500).json(error.message);
	}
})

// get a post 
router.get("/:id",verifyToken ,  async (req, res) => {
	try {
		const post = await Post.findById({ _id: req.params.id });
		res.status(200).json(post);
	} catch (error) {
		res.status(500).json(error.message);
	}
})

// get timeline post 
router.get("/timeline/:id",verifyTokenAndAuthorization , async (req, res) => {
	try {
		const currentUser = await User.findById(req.params.id);
		const userPost = await Post.find({ userId: currentUser._id });
		const friendPost = await Promise.all(
			currentUser.followings.map((friendId) => Post.find({ userId: friendId }))
		)
		res.status(200).json(userPost.concat(...friendPost));
	} catch (err) {
		res.status(500).json(err.message);
	}
})
// get user all  post 
router.get("/profile/:username", verifyToken , async (req, res) => {
	try {
		const currentUser = await User.findOne({ username: req.params.username });
		const userPost = await Post.find({ userId: currentUser._id });
		res.status(200).json(userPost);
	} catch (err) {
		res.status(500).json(err.message);
	}
})

module.exports = router;