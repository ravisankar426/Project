var {config}=require('../config');
var exceptionModel=require('./exception-model');
var db=require('../data-layer/db-connect');

function getDBUrl(){
    var dbUrl=`mongodb://${config.dbconfig.errorsDB.hostName}:${config.dbconfig.errorsDB.portNo}/${config.dbconfig.errorsDB.dbName}`;
    return dbUrl;
}

function writeToDB(err){
    var exception=exceptionModel.getException(err);
    var dbUrl=getDBUrl();
    db.create(exception,dbUrl);
}

function getExceptions(){    
    var exception=exceptionModel.exceptionModel;
    var dbUrl=getDBUrl();
    return new Promise((resolve,reject)=>{
        db.get(exception,dbUrl).then((doc)=>{
            resolve(doc);
        },
        (err)=>{
            console.log(`Error while fetching errors - ${err}`);
                reject(err);
        });
    });
}

module.exports={
    writeToDB,
    getExceptions
}