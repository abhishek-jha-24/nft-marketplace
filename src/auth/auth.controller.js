// const User = require("../user/models/user.model");
// const { body,validationResult } = require("express-validator");
// const { sanitizeBody } = require("express-validator");
// const apiResponse = require("../user/helpers/apiResponse");
// var mongoose = require("mongoose");
// mongoose.set("useFindAndModify", false);



// exports.verifyUser = [
// 	function (req, res) {
// 		try {
// 			const account_address = req.params.id;
// 			User.findOne({account_address: account_address}).then((user)=>{
// 				if (user){
// 					return apiResponse.successResponseWithData(res, "Operation success", user);
// 				} else  {
// 					const newUser = new User({
// 			          account_address
// 			        });
// 			        newUser
// 			            .save()
// 			            .then(user => {
// 			            	console.log("new user added and returned")
// 			            	return apiResponse.successResponseWithData(res, "Operation success", user);
// 			            })
// 			            .catch(err => console.log(err));

// 				}
// 			});
// 		} catch (err) {
// 			//throw error in json response with status 500. 
// 			return apiResponse.ErrorResponse(res, err);
// 		}
// 	}
// ];