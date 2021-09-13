const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');
const saltRounds = 10;
// update a user 
router.put("/:id", async (req, res) => {
	console.log(req.body.userId);
	console.log(req.params.id);
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

//get friend 
router.get("/friends/:userId", async (req, res) => {
	try {
		const user = await User.findById(req.params.userId);
		const friends = await Promise.all(
		user.following.map((friendId) => {
		  return User.findById(friendId);
		})
	  );
	  let friendList = [];
	  friends.map((friend) => {
		const { _id, username, profilePicture } = friend;
		friendList.push({ _id, username, profilePicture });
	  });
	  res.status(200).json(friendList)
	} catch (err) {
	  res.status(500).json(err);
	}
  });

// follow a user 
router.put("/:id/follow", async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		const currentUser = await User.findById(req.body.userId);
		if (req.body.userId !== req.params.id) {
			if (!user.follower.includes(req.body.userId)) {
				await user.updateOne({ $push: { follower: req.body.userId } });
				await currentUser.updateOne({ $push: { following: req.params.id } });
				res.status(200).json("User has been followed");
			}
			else {
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
			if (user.follower.includes(req.body.userId)) {
				await user.updateOne({ $pull: { follower: req.body.userId } });
				await currentUser.updateOne({ $pull: { following: req.params.id } });
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

module.exports = router;