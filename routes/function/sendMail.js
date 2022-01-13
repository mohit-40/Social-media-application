const nodemailer = require("nodemailer");


const sendMail=async(email,otp)=>{
	try {
		let testAccount = await nodemailer.createTestAccount(); 
		let transporter = nodemailer.createTransport({
		  host: "smtp.ethereal.email",
		  port: 587,
		  secure: false,  
		  auth: {
			user: testAccount.user, 
			pass: testAccount.pass, 
		  },
		}); 
		let info = await transporter.sendMail({
			from: "socialify@gmail.com",  
			to: email,  
			subject: "OTP to register on socialify",
			text: "hello", 
			html:	"<b>Welcome to socialify</b>. Your OTP is " +otp +".It is valid only for 30 second.",
		  });

		console.log("Message sent: %s", info.messageId);
		console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

		return ({status : true, error:"", link : nodemailer.getTestMessageUrl(info)});
	} catch(error) {
		return ({status : true, error : error, link : "" })
	}
}


module.exports = {sendMail}