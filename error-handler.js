const writeException=require('./data-layer/log-exceptions');

function handleException(e,req,res){
    logException(e,req,res);
    sendCustomExceptionResponse(e,res);
}

function sendCustomExceptionResponse(e,res){    
    var response=getCustomExceptionResponse('',e,res);    
    res.json(response);
}


function logException(e,req,res){    
    writeException.writeToDB(e);
}


function getCustomExceptionResponse(message,err,res){
    if(!message)
        message='There is an error while processing the request. Please contact administrator';

    var response={
        errorMessage:message,
        httpStatusCode:500,
        httpStatusMessage:'Internal Server Error'
    }
    return response;    
}


module.exports={
    handleException
}