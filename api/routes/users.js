const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const {verifyTokenAndAdmin, verifyToken,  verifyTokenAndAuthorization } =require("./verifyToken")

// update a user 
router.put("/:id",verifyTokenAndAuthorization, async (req, res) => {
 
		try {
			if (req.body.password) {
				const salt = await bcrypt.genSalt(saltRounds);
				req.body.password = await bcrypt.hash(req.body.password, salt);
			}
			const user = await User.findByIdAndUpdate({ _id: req.body.userId }, { $set: req.body }, { new: true, upsert: false });
			res.status(200).json("User is Updated Successfully");
		} catch (err) {
			res.status(404).json(err.message);
		}

});
// delete a user 

router.delete("/:id",verifyTokenAndAuthorization, async (req, res) => { 
		try {
			await User.findByIdAndDelete({ _id: req.params.id });
			res.status(200).json("User is delete Sucessfully");
		} catch (err) {
			res.status(404).json(err.message);
		} 
})

// get a user 
router.get("/", verifyToken ,async (req, res) => {
	const username=req.query.username;
	const userId=req.query.userId;
	try {
		const user = username ? await User.findOne({username: username}) :await User.findById(userId);
		!user && res.status(404).json("No such user found");
		user && res.status(200).json(user);

	} catch (err) {
		res.status(500).json(err.message);
	}
})

// follow a user 
router.put("/:userId/:id/follow",verifyTokenAndAuthorization, async (req, res) => {
	try {
		const user = await User.findById(req.params.userId);
		const currentUser = await User.findById(req.params.id);
		if (req.params.id !== req.params.userId) {
			if (!user.followers.includes(req.params.id)) {
				await user.updateOne({ $push: { followers: req.params.id } });
				await currentUser.updateOne({ $push: { followings: req.params.userId } });
				res.status(200).json("User has been followed");
			} else {
				res.status(400).json("alredy following this user");
			}
		} else {
			res.status(400).json("can't follow yourself");
		}
	} catch (err) {
		res.status(404).json(err.message);
	}
})


// unfollow a user 

router.put("/:userId/:id/unfollow",verifyTokenAndAuthorization, async (req, res) => {
	try {
		const user = await User.findById(req.params.userId);
		const currentUser = await User.findById(req.params.id);
		if (req.params.id !== req.params.userId) {
			if (user.followers.includes(req.params.id)) {
				await user.updateOne({ $pull: { followers: req.params.id } });
				await currentUser.updateOne({ $pull: { followings: req.params.userId } });
				res.status(200).json("Successfully unfollow the asshole");
			} else {
				res.status(400).json("not following this user");
			}
		} else {
			res.status(400).json("cant unfollow yourself");
		}
	} catch (err) {
		res.status(404).json(err.message);
	}
})
// get the followings
router.get("/followings/:userId", verifyToken ,async (req,res)=>{
	try {
		const user= await User.findById(req.params.userId)
		const followings= user.followings
		res.status(200).json(followings)
	} catch (error) {
		res.status(404).json(error.message)
	}
})
// get the followers
router.get("/followers/:userId",verifyToken ,async (req,res)=>{
	try {
		const user= await User.findById(req.params.userId)
		const followers= user.followers
		res.status(200).json(followers)
	} catch (error) {
		res.status(404).json(error.message)
	}
})

//get all users
router.get("/allUsers/", verifyToken ,async (req,res)=>{
	try {
		const allUsers=await User.find()
		const uid=allUsers.map( (u) => ({_id: u._id,  name: u.name, username: u.username}));
		res.status(200).json(uid)
	} catch (error) {
		res.status(500).json(error.message)
	}
})


module.exports = router;