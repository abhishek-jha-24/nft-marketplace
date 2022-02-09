const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
	{
		// ownerId: { type: Schema.Types.ObjectId, ref: "users" },
		username:String,
		account_address: Array,
		user_type: String,
		bio: String,
		email_address:String,
		bg_img_url:String,
		profile_pic_url:String,
		is_deleted: Boolean,
		is_verified:Boolean,
		
		// meta: { type: Schema.Types.ObjectId, ref: "users_Properties" },
		
	},
	{ timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
