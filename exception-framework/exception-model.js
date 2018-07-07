const mongoose=require('mongoose');

var exceptionSchema=mongoose.Schema({
    error:{
        type:String
    },
    stack:{
        type:String
    }
});

var exceptionModel=mongoose.model('errors',exceptionSchema);

function getException(err){
    var exception=new exceptionModel({
        error:err,
        stack:err.stack
    });
    return exception;
}

module.exports={
    exceptionModel,
    getException
}
