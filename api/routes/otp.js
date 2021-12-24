const router=require('express').Router();
const Otp = require("../models/Otp");
const {sendMail} = require('./function/sendMail');

//gernerte otp and send to email
router.get("/gernate/:email" , async(req,res) =>{
	//body null
	try {
		// gernating otp 
		var digits = '0123456789';
    	let OTP = '';
    	for (let i = 0; i < 4; i++ ) { OTP += digits[Math.floor(Math.random() * 10)]; }
		//otp gernated
		//saving in db
		const newOtp = await new Otp({email: req.params.email , otp: OTP })
		await newOtp.save();
		//saved in db
		//sending to email using nodemailer
		const functionRes= await sendMail(req.params.email , OTP);
		if(functionRes===true) { res.status(200).json(`otp send to the email ${req.params.email}`) }
		else{ res.status(400).json(functionRes) }
		//send to email
    }
	catch(error) {
		res.status(400).json(error.message);
	}
})
//verify otp 
router.get("/verify",async(req,res)=>{
	//body => otp , email
	try {
		const otpDetail= await Otp.findOne( { email : req.body.email });
		const otp = otpDetail.otp;
		if(otp===req.body.otp) { res.status(200).json(true) }
		else {res.status(400).json(false) }
	} catch(error) {
		res.status(404).json("error.message");
	}
})

module.exports=router;