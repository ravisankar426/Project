var {config}=require('../config');
var UserModel=require('./user-model');
var db=require('../data-layer/db-connect');
const errhandler=require('../error-handler');

function getDBUrl(){
    var dbUrl=`mongodb://${config.dbconfig.projectDB.hostName}:${config.dbconfig.projectDB.portNo}/${config.dbconfig.projectDB.dbName}`;
    return dbUrl;
}

var user={
    UserId:'Uppu',
    Password:'password'
};

function CreateUser(user){
    var user=UserModel.getUserModel(user);
    var dbUrl=getDBUrl();
    db.create(user,dbUrl).then((doc)=>{
        console.log(doc);
    },
    (err)=>{
        errhandler.logException(err);
    });
}

CreateUser(user);
