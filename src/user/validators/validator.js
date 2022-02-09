const Joi = require("joi");
 
const baseuser = Joi.object({
	username: Joi.string().min(2).max(29),
	account_address: Joi.array().required(),
	user_type: Joi.string().allow('').optional(),
	bio: Joi.string().allow('').optional(),
	email_address:Joi.string().allow('').optional(),
	bg_img_url:Joi.string(),
	profile_pic_url:Joi.string(),
	is_verified: Joi.boolean(),
	is_deleted: Joi.boolean()
	

});


module.exports = {  baseuser} ;
