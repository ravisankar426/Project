const mongoose=require('mongoose');
var {config}=require('../config');


mongoose.Promise=global.Promise;
mongoose.connect(`mongodb://localhost:27017/${config.dbconfig.errorlogdb}`);

var error=mongoose.model('errors',{
    error:{
        type:String
    },
    stack:{
        type:String
    }
});

function writeToDB(err){
    var exception=new error({
        error:err,
        stack:err.stack
    });
    exception.save().then((doc)=>{
    },
    (e)=>{
        console.log(`Error while saving exception - ${e}`);
    });
}

function getExceptions(){    
    return new Promise((resolve,reject)=>{
        error.find({},(err,docs)=>{
            if(err){
                console.log(`Error while fetching errors - ${err}`);
                reject(err);
            }
            else{
                resolve(JSON.stringify(docs));
            }
        });
    });
}

module.exports={
    writeToDB,
    getExceptions
}