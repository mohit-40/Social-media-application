const mongoose= require('mongoose');

const OtpSchema=new mongoose.Schema({
	email:{type:String , required : true , lowercase: true },
	otp: {type:String ,required : true },
	expire_at: {type: Date, default: Date.now, expires: 30 } 
},{timestamps:true});


module.exports=mongoose.model("Otp",OtpSchema)