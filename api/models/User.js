const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "Username required"],
		min: 3,
		max: 20,
		unique: true
	},
	name:{
		type:String,
		required: [true, "Username required"],
	},
	email: {
		type: String,
		trim: true,
		lowercase: true,
		unique: true,
		required: [true, "Email required"],
	},
	password: {
		type: String,
		required: [true, "Password required"],
		min: 8
	},
	profilePicture: {
		type: String,
		default: ""
	},
	coverPicture: {
		type: String,
		default: ""
	},
	followers: {
		type: Array,
		default: []
	},
	followings: {
		type: Array,
		default: []
	},
	isAdmin: {
		type: Boolean,
		default: false
	},
	desc:{
		type:String,
		max:50
	},
	live:{
		type:String,
		max:50
	},
	from:{
		type:String,
		max:50
	},
	work:{
		type:String,
		max:15
	},
	school:{
		type:String,
		max:15
	},
	relationship:{
		type:Number,
		enum:[1,2,3]
	}
} ,{timestamps:true});   //whenever update it will update timestamp



module.exports= mongoose.model("User",UserSchema);