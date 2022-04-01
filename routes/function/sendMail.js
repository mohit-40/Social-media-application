const nodemailer = require("nodemailer");


const sendMail=async(email,otp)=>{
	try {
		// let testAccount = await nodemailer.createTestAccount(); 
		let transporter =  nodemailer.createTransport({
		host: "smtp.gmail.com",
		//   host: "smtp.ethereal.email", 
		//   port: 587,
		//   secure: false,  
		  service: 'gmail',
		  auth: {
			// user: testAccount.user, 
			// pass: testAccount.pass, 
			user: process.env.EMAIL, 
			pass: process.env.PASSWORD, 
		  },
		});  
		let info = await transporter.sendMail({
			from: process.env.EMAIL,  
			to: email,  
			subject: "OTP to register on socialify",
			text: "hello", 
			html:	"<b>Welcome to socialify</b>. Your OTP is " +otp +".It is valid only for 30 second.",
		  });   
		// return ({status : true, error:"", link : nodemailer.getTestMessageUrl(info)});
		return ({status : true, error:"", link : "email send successfully"});
	} catch(error) {
		return ({status : false, error : error, link : "error occur" })
	}
}


module.exports = {sendMail}