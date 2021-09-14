//jshint esversion:6 
//!/* ---------------------------- include pakage --------------------------- */
const express=require("express");
const app=express();
const mongoose=require('mongoose');
const helmet=require('helmet');	
const morgan=require('morgan');
const dotenv=require('dotenv');
dotenv.config();

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const conversationRoute= require("./routes/conversations")
const messageRoute = require("./routes/messages")
const port= process.env.PORT || 8800;

//! /* -------------------------------- mongoose -------------------------------- */
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.once('open', function() {
	console.log("we are connected to the MongoDb");
});

//! /* ------------------------------- middleware ------------------------------- */
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

//! /* ---------------------------------- api route --------------------------------- */



app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations",conversationRoute)
app.use("/api/messages",messageRoute)

//! /* --------------------------------- listen server --------------------------------- */
app.listen(port,()=>{
	console.log("server running on port "+port);
});