const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');
const saltRounds = 10;
// update a user 
router.put("/:id", async (req, res) => {
	console.log(req.body.userId);
	console.log(req.params.id);
	if (req.params.id === req.body.userId) {
		try {
			if (req.body.password) {
				const salt = await bcrypt.genSalt(saltRounds);
				req.body.password = await bcrypt.hash(req.body.password, salt);
			}
			const user = await User.findByIdAndUpdate({ _id: req.body.userId }, { $set: req.body }, { new: true, upsert: false });
			res.status(200).send("User is Updated Successfully");
		} catch (err) {
			res.status(404).send(err.message);
		}
	}
	else {
		res.status(404).send("can't update others account");
	}
});
// delete a user 

router.delete("/:id", async (req, res) => {
	if (req.params.id === req.body.userId) {
		try {
			await User.findByIdAndDelete({ _id: req.params.id });
			res.status(200).send("User is delete Sucessfully");
		} catch (err) {
			res.status(404).send(err.message);
		}
	}
	else {
		res.status(404).send("Can't delte other User");
	}
})

// get a user 
router.get("/:id", async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		!user && res.status(404).json("No such user found");
		user && res.status(200).send(user);

	} catch (err) {
		res.status(500).send(err.message);
	}
})

// follow a user 
router.put("/:id/follow", async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		const currentUser = await User.findById(req.body.userId);
		if (req.body.userId !== req.params.id) {
			if (!user.follower.includes(req.body.userId)) {
				await user.updateOne({ $push: { follower: req.body.userId } });
				await currentUser.updateOne({ $push: { following: req.params.id } });
				res.status(200).send("USER HAS BEEN FOLLOWED");
			} else {
				res.status(200).send("alredy following this user");
			}
		} else {
			res.status(400).send("cant follow yourself");
		}
	} catch (err) {
		res.status(404).send(err.message);
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
				res.status(200).send("Successfully unfollow the asshole");
			} else {
				res.status(200).send("not following this user");
			}
		} else {
			res.status(400).send("cant unfollow yourself");
		}
	} catch (err) {
		res.status(404).send(err.message);
	}
})

module.exports = router;