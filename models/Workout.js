const mongoose = require('mongoose');

const workoutSchema= new mongoose.Schema({
	userId:{
		type: String,
		required: [true, "User ID required"]
	},
	name:{ 
		type:String,
		required: [true, "Required name of the workout"]
	},
	duration:{
		type: String,
		required: [true, "Required Duration of the workout"]
	},
	status:{
		type: String,
		default: "pending"
	},
	dateAdded :{
		type: Date,
		default : Date.now
	}
})

module.exports= mongoose.model("workout", workoutSchema);