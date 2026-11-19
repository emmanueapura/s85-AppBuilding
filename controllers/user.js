const express = require('express')
const User = require('../models/User.js')
const auth = require('../auth')
const {errorHandler} = require('../auth')
const bcrypt = require('bcrypt');



module.exports.registerUser = (req,res) =>{

	if (!req.body.email.includes("@") || !req.body.email.includes(".com")){
		return res.status(400).send({error: "Email invalid"});
	}
	else if (req.body.password.length < 8) {
		return res.status(400).send({error: "Password must be atleast 8 characters"});


	} else {

		let newUser = new User({
			email : req.body.email,
            // 10 is the value provided as the number of "salt" rounds that the bcrypt algorithm will run in order to encrypt the password
			password : bcrypt.hashSync(req.body.password, 10)
		})

		return newUser.save()
		.then((result) => res.status(201).send({message: "Registered Successfully"}))
		.catch(error => errorHandler(error, req, res));

	}
}


module.exports.logInUser=(req,res)=>{
	if(!req.body.email.includes("@") || !req.body.email.includes(".com")){
        return res.status(400).send({error:"Invalid email"});
    }
    

    return User.findOne({email: req.body.email}).then(result =>{
    	if (!result){
    		return res.status(404).send({message: "Email not found"});
    	}
    	else{
    		const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);
    		if(isPasswordCorrect){
    			return res.status(200).send({ access : auth.createAccessToken(result)});
    		}
    		else{
    			return res.status(401).send({error: "Email and password do not match"});
    		}
    	}
    }).catch(error => errorHandler(error, req, res))
}

module.exports.getDetails = (req,res) =>{
	return User.findById(req.user.id)
    .then(user => {
        if(user){
            user.password = "";
            return res.status(200).send(user);
        }
        else
            return res.status(404).send({error: "User not found"});
        
    })
    .catch(error => errorHandler(error, req, res))
}