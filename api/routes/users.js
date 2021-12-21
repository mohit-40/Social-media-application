const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const {verifyTokenAndAdmin, verifyToken,  verifyTokenAndAuthorization } =require("./verifyToken")

// update a user 
router.put("/:id", async (req, res) => {

	if (req.params.id === req.body.userId||req.body.isAdmin) {
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
	}
	else {
		res.status(404).json("can't update others account");
	}
});
// delete a user 

router.delete("/:id", async (req, res) => {
	if (req.params.id === req.body.userId ||req.body.isAdmin ) {
		try {
			await User.findByIdAndDelete({ _id: req.params.id });
			res.status(200).json("User is delete Sucessfully");
		} catch (err) {
			res.status(404).json(err.message);
		}
	}
	else {
		res.status(404).json("Can't delte other User");
	}
})

// get a user 
router.get("/", async (req, res) => {
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
router.put("/:id/follow", async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		const currentUser = await User.findById(req.body.userId);
		if (req.body.userId !== req.params.id) {
			if (!user.followers.includes(req.body.userId)) {
				await user.updateOne({ $push: { followers: req.body.userId } });
				await currentUser.updateOne({ $push: { followings: req.params.id } });
				res.status(200).json("User has been followed");
			} else {
				res.status(200).json("alredy following this user");
			}
		} else {
			res.status(400).json("can't follow yourself");
		}
	} catch (err) {
		res.status(404).json(err.message);
	}
})


// unfollow a user 

router.put("/:id/unfollow", async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		const currentUser = await User.findById(req.body.userId);
		if (req.body.userId !== req.params.id) {
			if (user.followers.includes(req.body.userId)) {
				await user.updateOne({ $pull: { followers: req.body.userId } });
				await currentUser.updateOne({ $pull: { followings: req.params.id } });
				res.status(200).json("Successfully unfollow the asshole");
			} else {
				res.status(200).json("not following this user");
			}
		} else {
			res.status(400).json("cant unfollow yourself");
		}
	} catch (err) {
		res.status(404).json(err.message);
	}
})
// get the followings
router.get("/followings/:userId",async (req,res)=>{
	try {
		const user= await User.findById(req.params.userId)
		const followings= await Promise.all(
			user.followings.map((followingId)=>{
				return ( User.findById(followingId) )
			})
		)
		res.status(200).json(followings)
	} catch (error) {
		res.status(404).json(error.message)
	}
})
// get the followers
router.get("/followers/:userId",async (req,res)=>{
	try {
		const user= await User.findById(req.params.userId)
		const followers= await Promise.all(
			user.followers.map((followingId)=>{
				return ( User.findById(followingId) )
			})
		)
		res.status(200).json(followers)
	} catch (error) {
		res.status(404).json(error.message)
	}
})

//get all users
router.get("/allUsers/", async (req,res)=>{
	try {
		const allUsers=await User.find({})
		res.status(200).json(allUsers)
	} catch (error) {
		res.status(500).json(error.message)
	}
})


module.exports = router;