const mongoose=require('mongoose');
const {config}=require('../config');
const jwt=require('jsonwebtoken');
var crypto = require('crypto')

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
    PasswordSalt:{
        type:String
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
    var token=jwt.sign({_id:user._id.toHexString(),access},config.secretKey).toString();
    user.tokens=user.tokens.concat([{access,token}]);
    return user.save().then((doc)=>{
        return doc;
    });
}

var UserModel=mongoose.model('Users',UserSchema);

var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};

var hashPassword=function(password){
    let salt = genRandomString(64);
    let pbkdf2 = crypto.pbkdf2Sync(
        password,
        salt,
        config.crypto.rounds,
        config.crypto.keyLength,
        config.crypto.hashAlg
    ).toString('hex');
    
    return {salt,pbkdf2};
}

function getUserModel(user){
    var passwordData=hashPassword(user.Password);
    var userModel=new UserModel({
        UserId:user.UserId,
        Password:passwordData.pbkdf2,
        PasswordSalt:passwordData.salt        
    });

    return userModel;
}

module.exports={
    UserModel,
    getUserModel
}