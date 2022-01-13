const router=require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds =10;
const jwt=require("jsonwebtoken")
const {gernateAccessToken ,gernateRefreshToken, verifyTokenAndAuthorization } =require("./function/verifyToken")


//register
router.post("/register", async(req,res)=>{
	try{
		console.log(req.body)
		const originalPassword=req.body.password;
		const salt = await bcrypt.genSalt(saltRounds);
		const hashPassword = await bcrypt.hash(req.body.password, salt);
		const newUser=await new User({
			name:req.body.name,
			lastName:req.body.lastName,
			username:req.body.username,
			email:req.body.email,
			password: hashPassword
		})
		const user = await newUser.save();
		
		//gernate jwt
		const accessToken=gernateAccessToken(user)
		const refreshToken=gernateRefreshToken(user)
		await User.findOneAndUpdate({email:req.body.email} , { $push:{ refreshTokenArray: refreshToken } } , {new :true} )
		const  {password, refreshTokenArray ,...others } = user._doc;   

		res.status(200).json({...others, accessToken ,refreshToken });
	}catch(err){
		res.status(404).json(err);
	}
})


//login
router.post('/login',async(req,res)=>{
	try{	
		const user =await User.findOne({email:req.body.email});
		// console.log(user)
		if(!user ){ res.status(404).json('user not found')}
		else{
			const validPassword=await  bcrypt.compare(req.body.password, user.password )
			if(!validPassword) { res.status(404).json('incorrect password');}
			else {
				//gernate jwt
				const accessToken=gernateAccessToken(user)
				const refreshToken=gernateRefreshToken(user)
				await User.findOneAndUpdate({email:req.body.email} , { $push:{ refreshTokenArray: refreshToken } } , {new :true} )

				const  {password, refreshTokenArray , ...others } = user._doc;   
				// res.cookie("accessToken",accessToken);
				// res.cookie("refreshToken",refreshToken);
				res.status(200).json({...others, accessToken ,refreshToken });
			}
		}
	}
	catch(err){
		res.status(404).json(err.message);
	}
})

//refreshToken
router.post("/refresh/:id",async (req,res)=>{
	try {
		const refreshToken=req.body.refreshToken;
		if(!refreshToken) return res.status(400).json("you are not authenticated");
		const user = await User.findById(req.params.id);
		if(!user) return res.status(400).json("user not found")
		const isIncluded=user.refreshTokenArray.includes(refreshToken);
		if(!isIncluded) return res.status(400).json("refresh token is not valid")
		
		
		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET , (err , user) =>{
			if(err) return res.status(400).json(err);
			const newAccessToken=gernateAccessToken(user);
			res.status(200).json({accessToken : newAccessToken})
		})
	} catch (error) {
		res.status(404).json({message:error.message})
	}
})

//logout 
router.post("/logout/:id",verifyTokenAndAuthorization,async(req,res)=>{
	try {
		const refreshToken=req.body.refreshToken; 
		await User.findByIdAndUpdate(req.params.id,{$pull : {refreshTokenArray : refreshToken }});
		res.status(200).json("user is logout");	
	} catch (error) {
		res.status(400).json(error.message)
	}
})

module.exports=router;