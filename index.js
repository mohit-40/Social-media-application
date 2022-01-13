//jshint esversion:6 
//!/* ---------------------------- include pakage --------------------------- */
const dotenv=require('dotenv').config();
const express=require("express");
const app=express();
const mongoose=require('mongoose'); 
const morgan=require('morgan');
const cors = require("cors");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const conversationRoute= require("./routes/conversations");
const messageRoute = require("./routes/messages");
const commentRoute = require("./routes/comment");
const otpRoute = require("./routes/otp");
const port= process.env.PORT || 8800;

//! /* -------------------------------- mongoose -------------------------------- */
mongoose.connect(process.env.MONGO_URL).then(()=> console.log("connected to mongodb")).catch((err) => console.log(err.message));

//! /* ------------------------------- middleware ------------------------------- */
app.use(express.json());
app.use(morgan("common"));
app.use(cors());

//! /* ---------------------------------- api route --------------------------------- */

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations",conversationRoute);
app.use("/api/messages",messageRoute);
app.use("/api/comment",commentRoute);
app.use("/api/otp",otpRoute);
//!/* ----------------------------- setting static ----------------------------- */
if(process.env.NODE_ENV ==="production"){
	const path = require("path");
	app.use(express.static(path.join(__dirname, "/clients/build")));
	
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, '/clients/build', 'index.html'));
	});
}

//! /* --------------------------------- listen server --------------------------------- */
app.listen(port,()=>{
	console.log("server running on port "+port);
});