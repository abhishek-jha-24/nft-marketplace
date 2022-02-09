const Asset = require("./models/asset.model.js");
const User = require("../user/models/user.model.js");
const AssetProperties = require("./models/asset_properties.model.js");
const {
  assetValidator,
  getUsersAssetsValidator,
  updateAssetValidator,
  deleteAssetValidator,
  getAssetByIdValidator,
} = require("./validators/validator");
const apiResponse = require("../user/helpers/apiResponse");

const Web3 = require('web3');
const abi=require('../build/contracts/assetContract').abi;
const address=require('../build/contracts/assetContract').address;
const HDWalletProvider = require('@truffle/hdwallet-provider');
const address1='0xccdb17b8eF68ffFdbCA4bf4AB6B765e41d61733A';
const privateKey1="c244b6e8ae351e71fa353515c55a4e0be82fb5bf7186c18419f89421805f74b7";

// const init = async() => {
//  const provider = new  HDWalletProvider(
//    privateKey1,
//    'https://ropsten.infura.io/v3/8d012749a8ae4ca1a238b25053109ffe'
//  );
//  const web3 = new Web3(provider);
//  const accounts= await web3.eth.getAccounts();
//  const contract = new web3.eth.Contract(abi,address);

//  //Sending transactions from parent account to secondary account
//  let parameters = {
//   from:address1,
//   to:0x391C924EC2dC3454CEc9C79d9f381ab43BF31aDc,
//   value:web3.utils.toWei('1','ether')
//  }
// var assetCreateReceipt=await contract.methods.assetCreate("lion","vivek","lion is the king of the jungle",1).send({from: address1});
// console.log(assetCreateReceipt);

// // var burnTokenReceipt=await contract.methods.burnToken(4).send({from: address1});
// // console.log(burnTokenReceipt);
//  };
// init();


const handlerError = (res, err) => {
  if (err.isJoi) {
    console.log(err.details);
    return apiResponse.validationErrorWithData(res, "Validation Error", {
      details: err.details.map((detail) => ({ message: detail.message })),
    });
  }
  return apiResponse.ErrorResponse(res, "Internal Server Error");
};



const categoryType = {
	art:0,
	music:1,
	domain_names:2,
	sports:3,
	virtual_Worlds:4,
	trading_Cards:5,
	collectibles:6,
	gifs:7,
	memes:8
}

const createAsset = async (req, res, next) => {
  try {
      const init = async(assetName,createrName,description,category) => {
      console.log(assetName,createrName,description,category);
      const provider = new  HDWalletProvider(
        privateKey1,
        'https://ropsten.infura.io/v3/8d012749a8ae4ca1a238b25053109ffe'
      );
      const web3 = new Web3(provider);
      const accounts= await web3.eth.getAccounts();
      const contract = new web3.eth.Contract(abi,address);
     
      //Sending transactions from parent account to secondary account
      let parameters = {
       from:address1,
       to:0x391C924EC2dC3454CEc9C79d9f381ab43BF31aDc,
       value:web3.utils.toWei('1','ether')
      }
     var assetCreateReceipt=await contract.methods.assetCreate(assetName,createrName,description,category).send({from: address1});
     return (assetCreateReceipt.events.Transfer.returnValues.tokenId);
     
    // return assetCreateReceipt;
    //  var burnTokenReceipt=await contract.methods.burnToken(5).send({from: address1});
    //  console.log(burnTokenReceipt);

    // const data = await contract.methods.ownerOf(6).call();
    // console.log(data);
      }; 
    const data = await assetValidator.validateAsync(req.body);
    console.log(data);
    const assetData = data.asset;
    const user = await User.findOne({account_address:[ data.ownerId ]});
    const categoryId = categoryType[assetData.category];
    const tokenId = await init(assetData.assetName,user.username,assetData.description,categoryId);
    // const tokenId = '123';
    const contractAddress = '0x42b67365D11fFf9ACDE7b5d6202689F15BEEF275';
    const asset = new Asset({...(data.asset),category:categoryId,ownerId:user._id,chainInfo:{contract:contractAddress,token:tokenId,chain:'Ethereum'}});
    const assetRef = await asset.save();
    console.log(assetRef);
    const assetProps = new AssetProperties({
      assetId: assetRef._id,
      properties: data.asset.properties,
      stats: data.asset.stats,
      levels: data.assetlevels,
    });
    const assetPropsRef = await assetProps.save();
    assetRef.meta = assetPropsRef._id;
    await assetRef.save();
    const obj = assetRef.toObject();
    obj.ownerId = user.account_address;
    return apiResponse.successResponseWithData(
      res,
      "Asset created sucessfully !..",
      obj
    );
  } catch (err) {
    console.log(err);
    return handlerError(res, err);
  }
};


const updateAsset = async (req,res,next) => {
    
  try{
      const init = async() => {
      const provider = new  HDWalletProvider(
        privateKey1,
        'https://ropsten.infura.io/v3/8d012749a8ae4ca1a238b25053109ffe'
      );
      const web3 = new Web3(provider);
      const accounts= await web3.eth.getAccounts();
      const contract = new web3.eth.Contract(abi,address);
     
      //Sending transactions from parent account to secondary account
      let parameters = {
       from:address1,
       to:0x391C924EC2dC3454CEc9C79d9f381ab43BF31aDc,
       value:web3.utils.toWei('1','ether')
      }
      // var assetCreateReceipt=await contract.methods.assetCreate("lion","vivek","lion is the king of the jungle",8).send({from: address1});
      // console.log(assetCreateReceipt);
     
    //  var burnTokenReceipt=await contract.methods.burnToken(5).send({from: address1});
    //  console.log(burnTokenReceipt);
        
    const data = await contract.methods.ownerOf(1).call();
    console.log(data);
 };
    await init();
      const data = await updateAssetValidator.validateAsync(req.body);
      const updatedAsset = await Asset.findByIdAndUpdate(data.assetId,data.asset,{new:true}); 
      return apiResponse.successResponseWithData(res,"Updated Sucessfully",updatedAsset);
      // const asset =  
  }catch(err){
    console.log(err);
    return handlerError(res,err);
  }

}

const deleteAsset = async (req,res,next) => {
  try{
      const init = async(tokenId) => {
      const provider = new  HDWalletProvider(
        privateKey1,
        'https://ropsten.infura.io/v3/8d012749a8ae4ca1a238b25053109ffe'
      );
      const web3 = new Web3(provider);
      const accounts= await web3.eth.getAccounts();
      const contract = new web3.eth.Contract(abi,address);
     
      //Sending transactions from parent account to secondary account
      let parameters = {
       from:address1,
       to:0x391C924EC2dC3454CEc9C79d9f381ab43BF31aDc,
       value:web3.utils.toWei('1','ether')
      }
     // var assetCreateReceipt=await contract.methods.assetCreate("lion","vivek","lion is the king of the jungle",1).send({from: address1});
     // console.log(assetCreateReceipt);
     
     var burnTokenReceipt=await contract.methods.burnToken(tokenId).send({from: address1});
     console.log(burnTokenReceipt);

    // const data = await contract.methods.ownerOf(tokenId).call();
    // console.log(data);
      }; 
     const data = await deleteAssetValidator.validateAsync(req.body);
	const user = await User.findOne({account_address:[data.ownerId]});
	if(!user)throw Error("User not found");
	const asset = await Asset.findById(data.assetId);
	const tokenId = asset.chainInfo.token;
       await init(tokenId);   
      await asset.remove();
      return apiResponse.successResponse(res,"Deleted Sucessfully");
  }catch(err){
    console.log(err);
    return handlerError(res,err);
  }

}

const getAllAssets = async (req, res, next) => {
  try {
    const assets = await Asset.find({}).populate("meta").populate('ownerId','account_address');
    return apiResponse.successResponseWithData(res, "Success", assets);
  } catch (err) {
    console.log(err);
    return apiResponse.ErrorResponse(res, "Internal Server Error");
  }
};

const getUsersAssets = async (req, res, next) => {
  try {
    const data = await getUsersAssetsValidator.validateAsync(req.params);
    const user = await User.findOne({account_address:[ data.ownerId ]});
    console.log(user);
    const assets = await Asset.find({ ownerId: user._id}).populate('meta').populate('ownerId','account_address');
    return apiResponse.successResponseWithData(res, "Success", assets);
  } catch (err) {
    console.log(err);
    return handlerError(res, err);
  }
};

const getAssetById = async (req,res,next) => {
  try{
    const data = await getAssetByIdValidator.validateAsync(req.params);
    const asset = await Asset.findById(data.id).populate('meta');
    return apiResponse.successResponseWithData(res,"Success",asset);
  }catch(err){
      console.log(err);
      return handlerError(res,err);
  }
}

module.exports = {
  createAsset,
  getAllAssets,
  getUsersAssets,
  updateAsset,
  deleteAsset,
  getAssetById,
};
