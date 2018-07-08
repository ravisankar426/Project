var {config}=require('../config');
var UserModel=require('./user-model');
var db=require('../data-layer/db-connect');
const errhandler=require('../error-handler');

function getDBUrl(){
    var dbUrl=`mongodb://${config.dbconfig.projectDB.hostName}:${config.dbconfig.projectDB.portNo}/${config.dbconfig.projectDB.dbName}`;
    return dbUrl;
}

function CreateUser(user){
    var result;
    var user=UserModel.getUserModel(user);
    var dbUrl=getDBUrl();
    return new Promise((resolve,reject)=>{
        db.create(user,dbUrl)
        .then((user)=>{
            return user.generateAuthToken();
        })
        .then((userWithToken)=>{
            resolve(userWithToken);
        })
        .catch((err)=>{
            console.log(`user repository error - ${err}`);
            reject(err);
        })
    });   
}

function GetUsers(fiterParams){
    var user=UserModel.UserModel;
    var dbUrl=getDBUrl();
    return new Promise((resolve,reject)=>{
        db.get(user,dbUrl,fiterParams)
        .then((doc)=>{
            resolve(doc);
        })
        .catch((err)=>{
            reject(err);
        });
    });
}

module.exports={
    CreateUser,
    GetUsers
}
