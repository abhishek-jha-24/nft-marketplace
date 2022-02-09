const mongoose = require("mongoose");
const Schema = mongoose.Schema; 


const assetPropertiesSchema = new mongoose.Schema({
	assetId : {type:Schema.Types.ObjectId,ref:"Assets"},
	properties : [{
		_id: false,
		name:String,
		value:String
	}],
	stats : [{
		_id:false,
		name:String,
		value:Number,
		max:Number,
	}],
	levels : [{
		_id:false,
		name:String,
		value:Number,
		max:Number
	}]
},{timestamps:true});


module.exports = mongoose.model("Assets_Properties",assetPropertiesSchema)
