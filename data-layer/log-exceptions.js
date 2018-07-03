const mongoose=require('mongoose');
var config=require('../config').config;

mongoose.Promise=global.Promise;
mongoose.connect(`mongodb://localhost:27017/${config.dbconfig.errorlogdb}`);

var error=mongoose.model('errors',{
    error:{
        type:String
    }
});

function writeToDB(err){
    var exception=new error({
        error:err
    });
    exception.save().then((doc)=>{
    },
    (e)=>{
        console.log(`Error while saving exception - ${e}`);
    });
}

module.exports={
    writeToDB
}