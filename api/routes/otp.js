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
		console.log(OTP) 


		//saving in db
		const newOtp = await new Otp({email: req.params.email , otp: OTP })
		await newOtp.save();

		//sending to email using nodemailer
		const functionRes= await sendMail(req.params.email , OTP);
		if(functionRes.status===true) { res.status(200).json(functionRes.link) }
		else{ res.status(400).json(functionRes.error) }
    }
	catch(error) {
		res.status(400).json(error.message);
	}
})
//verify otp 
router.post("/verify",async(req,res)=>{
	//body => otp , email
	try {
		const otpDetail= await Otp.findOne({ email : req.body.email }); 
		const otp = otpDetail.otp;
		if(otp===req.body.otp) { res.status(200).json("otp matched") } 
		else {res.status(400).json("otp do not match") }
	} catch(error) {
		res.status(404).json(error.message);
	}
})

module.exports=router;