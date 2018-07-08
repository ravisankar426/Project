const mongoose=require('mongoose');
const {config}=require('../config');
const jwt=require('jsonwebtoken');


var UserSchema=new mongoose.Schema({
    UserId:{
        type:String,
        unique:true,
        minlength:4
    },
    Password:{
        type:String,
        minlength:6
    },
    tokens:[{
        access:{
            type:String,
            required:true
        },
        token:{
            type:String,
            required:true
        }
    }]
});

UserSchema.methods.generateAuthToken=function(){
    var user=this;
    var access='auth';
    var token=jwt.sign({_id:user._id.toHexString(),access},'secret').toString();
    user.tokens=user.tokens.concat([{access,token}]);
    return user.save().then((doc)=>{
        return doc;
    });
}

var UserModel=mongoose.model('Users',UserSchema);

function getUserModel(user){
    var userModel=new UserModel({
        UserId:user.UserId,
        Password:user.Password
    });
    return userModel;
}

module.exports={
    UserModel,
    getUserModel
}