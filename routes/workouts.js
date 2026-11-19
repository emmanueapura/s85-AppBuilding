const express= require('express');
const workoutController = require('../controllers/workout.js');
const {verify} = require('../auth')

const router = express.Router();
router.post("/addWorkout",verify,workoutController.addWorkOut);
router.get("/getMyWorkouts",verify,workoutController.getMyWorkouts)

module.exports = router;