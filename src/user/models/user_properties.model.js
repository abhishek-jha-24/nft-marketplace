const mongoose = require("mongoose");
const Schema = mongoose.Schema; 


const userPropertiesSchema = new mongoose.Schema({
	_id : {type:Schema.Types.ObjectId,ref:"users"}
	
},{timestamps:true});


module.exports = mongoose.model("users_Properties",userPropertiesSchema)
