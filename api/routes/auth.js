const router=require('express').Router();
const User=require('../models/User');
const bcrypt=require('bcrypt');
const saltRounds=10;

//!/* ------------------------------ register user ----------------------------- */
router.post("/register",async (req,res)=>{
	try{
		const salt = await bcrypt.genSalt(saltRounds);
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		const newUser= await new User({
			username:req.body.username,
			email:req.body.email,
			password:hashPassword
		});
		const user=await newUser.save();
		res.status(200).json("User Registered");
	} catch(err){
		res.status(404).json(err.message);
	}
})


//! /* ------------------------------- login user ------------------------------- */

router.post("/login", async (req, res) => {
	try {
	  const user = await User.findOne({ email: req.body.email });
	  !user && res.status(404).json("user not found");
  
	  const validPassword = await bcrypt.compare(req.body.password, user.password)
	  !validPassword && res.status(400).json("NOT A VALID Password");
	  const  {password, ...other } = user._doc;
	  res.status(200).json(other)
	} catch (err) {
	  res.status(500).json(err.message)
	}
  });


//!/* --------------------------------- module export --------------------------------- */
module.exports = router;