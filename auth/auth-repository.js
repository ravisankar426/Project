const {config}=require('../config');
const UserModel=require('../user/user-model');
const db=require('../data-layer/db-connect');
const errhandler=require('../error-handler');
const _=require('lodash');
const jwt=require('jsonwebtoken');
const crypto=require('crypto');

function getDBUrl(){
    var dbUrl=`mongodb://${config.dbconfig.projectDB.hostName}:${config.dbconfig.projectDB.portNo}/${config.dbconfig.projectDB.dbName}`;
    return dbUrl;
}

var user={
    UserId:'Ravi',
    Password:'password'
};

function ValidateLogin(user){
    var filterParams={UserId:user.UserId};
    var userModel=UserModel.UserModel;
    var dbUrl=getDBUrl();
    return new Promise((resolve,reject)=>{
        db.get(userModel,dbUrl,filterParams)
        .then((doc)=>{            
            if(isPasswordCorrect(user.Password,doc)){
                var access='auth';
                doc=JSON.parse(doc)[0]; 
                doc=UserModel.getUserModel(doc);
                var token=jwt.sign({_id:doc._id.toHexString(),access},config.secretKey).toString();
                doc.tokens=doc.tokens.concat([{access,token}]);  
                return doc;
            }
        })
        .then((userWithToken)=>{
            return resolve(userWithToken);
        })
        .catch((e)=>{
            reject(e);
        });
    });
}

var isPasswordCorrect=function(givenPassword,user) { 
    user=JSON.parse(user)[0];
    
    let testPbkdf2 = crypto.pbkdf2Sync(
        givenPassword,
        user.PasswordSalt,
        config.crypto.rounds,
        config.crypto.keyLength,
        config.crypto.hashAlg
    ).toString('hex');

    return testPbkdf2 === user.Password
}

module.exports={
    ValidateLogin
}


