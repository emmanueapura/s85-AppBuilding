const express = require('express');
const userController = require('../controllers/user.js');
const router = express.Router();
const {verify} = require('../auth')


router.post("/register",userController.registerUser);
router.post("/login",userController.logInUser);
router.get("/details", verify, userController.getDetails);


module.exports = router;