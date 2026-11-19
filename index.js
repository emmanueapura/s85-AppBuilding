const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();
const workoutRoutes = require('./routes/workouts.js')
const userRoutes = require('./routes/users.js')


const app = express();

// MongoDB connection
mongoose.connect("mongodb+srv://admin:admin1234@b645-apura.2qffo5g.mongodb.net/FitnessApp");

let db = mongoose.connection


db.on("err", ()=> console.log("Connection to the db failed"));
db.once("open", ()=> console.log("Connection to the MongoDB Atlas succeed"))

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extented:true}));

//Routes Middleware
app.use("/workouts", workoutRoutes);
app.use("/users", userRoutes);


if(require.main === module){
	app.listen(process.env.PORT || 4000, () => {
	    console.log(`API is now online on port ${ process.env.PORT || 4000 }`)
	});
}


module.exports = {app,mongoose};