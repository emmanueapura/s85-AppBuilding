const mongoose = require('mongoose')


const userSchema=new mongoose.Schema({
	email:{
		type: String,
		required: [true,"Required Email of the user"]
	},
	password:{
		type:String,
		required: [true, "Required Password of the user"]
	},
	isAdmin:{
		type: Boolean,
		default : false
	}
})

module.exports= mongoose.model("User", userSchema);