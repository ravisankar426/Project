const mongoose=require('mongoose');
var {config}=require('../config');


var userSchema=mongoose.Schema({
    UserId:{
        type:String,
        unique:true,
        minlength:4
    },
    Password:{
        type:String,
        minlength:6
    }
});

var UserModel=mongoose.model('Users',userSchema);

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