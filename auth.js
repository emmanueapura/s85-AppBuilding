const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

module.exports.createAccessToken = (user)=> {
	const data = {
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	}

	// sign is used to generate or sign a token based on the secret key provided and the payload provided.
	return jwt.sign(data, process.env.JWT_SECRET_KEY, {});
}


// Verification of token:
module.exports.verify = (req, res, next) => {

	// let us contain the token in a variable:
	let token = req.headers.authorization;

	if(typeof token === "undefined"){
		return res.send({
			auth: "Failed. No Token"
		});
	}else{
		// remove the first 7 characters("Bearer ")
		token = token.slice(7, token.length);

		// jwt has the verify method that will verify thhe provided token using the secret key

		jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
			if(err){
				return res.status(403).send({
					auth:"Failed",
					message: "Action Forbidden"
				})
			}else {

				req.user = decodedToken;
				req.id=req.user.id;
				next();
			}
		})

	}
}

module.exports.isLoggedIn =(req,res,next)=>{
	if(req.user){
		next();
	}
	else{
		return res.sendStatus(401);
	}
}


// We will creating a middleware for handling our errors:
module.exports.errorHandler = (err, req, res, next) => {
	// Error logging
	console.error(err);

	const statusCode = err.status || 500;

	const errorMessage = err.message || 'Internal Server Error';

	res.status(statusCode).json({
		error: {
			message: errorMessage,
			errorCode : err.code || 'SERVER_ERROR',
			details: err.details || null
		}
	})
}