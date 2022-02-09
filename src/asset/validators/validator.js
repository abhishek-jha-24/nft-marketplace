const Joi = require("joi");

const baseAsset = Joi.object({
	assetUrl: Joi.string().uri().required(),
	category: Joi.string().lowercase().required(),
	assetName: Joi.string().min(2).max(19).required(),
	assetMime:Joi.string().required(),
	description: Joi.string(),
	private: Joi.boolean(),
	properties: Joi.array().items(
		Joi.object({
			name: Joi.string().required(),
			value: Joi.string().required(),
		})
	),
	stats: Joi.array().items(
		Joi.object({
			name: Joi.string().required(),
			value: Joi.number().required(),
			max: Joi.number().required(),
		})
	),
	levels: Joi.array().items(
		Joi.object({
			name: Joi.string().required(),
			value: Joi.number().required(),
			max: Joi.number().required(),
		})
	),
});

const assetValidator = Joi.object({
	ownerId: Joi.string().required(),
	asset:baseAsset
});

const updateAssetValidator = Joi.object({
	ownerId : Joi.string().required(),
	_id:Joi.string().required(),
	asset:baseAsset
});

const deleteAssetValidator = Joi.object({
		ownerId:Joi.string().required(),
		assetId:Joi.string().required()
});

const getUsersAssetsValidator = Joi.object({
	ownerId:Joi.string().required(),
});

const getAssetByIdValidator = Joi.object({
	id:Joi.string().required(),
});
// getUsersAssetsValidator
module.exports = { assetValidator , getUsersAssetsValidator,updateAssetValidator,deleteAssetValidator , getAssetByIdValidator} ;
