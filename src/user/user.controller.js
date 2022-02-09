const user = require("./models/user.model.js");
// const userProperties = require("./models/user_properties.model.js");
const {
  userValidator,
  updateuserValidator,
  deleteuserValidator,
  getuserByIdValidator,
  baseuser,
} = require("./validators/validator");
const apiResponse = require("../user/helpers/apiResponse");





const handlerError = (res, err) => {
  if (err.isJoi) {
    console.log(err.details);
    return apiResponse.validationErrorWithData(res, "Validation Error", {
      details: err.details.map((detail) => ({ message: detail.message })),
    });
  }
  return apiResponse.ErrorResponse(res, "Internal Server Error");
};



const createUser = async (req, res, next) => {
  try {
      
  
    const data = await baseuser.validateAsync(req.body);
    const uniqueUser=await user.findOne({account_address:data.account_address});
    if(uniqueUser){
      throw Error("account with this address already exists!");
    }
    const User = new user({...(data)});
    const userRef = await User.save();
    // console.log(userRef);
    // const userProps = new userProperties({
    //   userId: userRef._id
    // });
    // const userPropsRef = await userProps.save();
    // userRef.meta = userPropsRef._id;
    // await userRef.save();
    return apiResponse.successResponseWithData(
      res,
      "user created sucessfully !..",
      userRef
    );
  } catch (err) {
    console.log(err);
    return handlerError(res, err);
  }
};


const updateUser = async (req,res,next) => {
    
  try{

      
      const data = await baseuser.validateAsync(req.body);

      const updateduser = await user.findOneAndUpdate({account_address:data.account_address},data,{new:true}) 
      return apiResponse.successResponseWithData(res,"Updated Sucessfully",updateduser);
      
  }catch(err){
    console.log(err);
    return handlerError(res,err);
  }

}

const deleteUser = async (req,res,next) => {
  try{
      
    const account_address = req.params.id;
      await user.findOneAndRemove({account_address});
      return apiResponse.successResponse(res,"Deleted Sucessfully");
  }catch(err){
    console.log(err);
    return handlerError(res,err);
  }

}





const getUserById = async (req,res,next) => {
  try{
    const account_address = req.params.id;
    const User = await user.findOne({account_address})
    return apiResponse.successResponseWithData(res,"Success",User);
  }catch(err){
      console.log(err);
      return handlerError(res,err);
  }
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
};
