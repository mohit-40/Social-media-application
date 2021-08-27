const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "Username required"],
		min: 3,
		max: 20,
		unique: true
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
	follower: {
		type: Array,
		default: []
	},
	following: {
		type: Array,
		default: []
	},
	isAdmin: {
		type: Boolean,
		default: false
	}
} ,{timestamps:true});   //whenever update it will update timestamp



module.exports= mongoose.model("User",UserSchema);