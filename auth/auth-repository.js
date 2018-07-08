const {config}=require('../config');
const UserModel=require('../user/user-model');
const db=require('../data-layer/db-connect');
const errhandler=require('../error-handler');
const _=require('lodash');
const jwt=require('jsonwebtoken');

function getDBUrl(){
    var dbUrl=`mongodb://${config.dbconfig.projectDB.hostName}:${config.dbconfig.projectDB.portNo}/${config.dbconfig.projectDB.dbName}`;
    return dbUrl;
}

var user={
    UserId:'Ravi',
    Password:'password'
};

function ValidateLogin(user){
    var filterParams={UserId:user.UserId,Password:user.Password};
    var userModel=UserModel.UserModel;
    var dbUrl=getDBUrl();
    return new Promise((resolve,reject)=>{
        db.get(userModel,dbUrl,filterParams)
        .then((doc)=>{
            resolve(doc);
            return doc;
        },
        (err)=>{
            reject(err);
            return err;
        })
        .then((doc)=>{
            var validUser=JSON.parse(doc)[0];
            if(validUser){
                var validUser=_.pick(validUser,['UserId','Password']);
                console.log(validUser);
            }
        },
        (err)=>{
            console.log(error);
        });
    });
}

var token=jwt.sign(user,'secret');
console.log(token);

var decoded=jwt.verify(token,'secret');
console.log(decoded);

//ValidateLogin(user);

module.exports={
    ValidateLogin
}


