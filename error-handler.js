var Client=require('node-rest-client').Client;
var {config}=require('./config');

var client=new Client();

function handleException(e,req,res){
    logException(e);
    sendCustomExceptionResponse(e,res);
}

function sendCustomExceptionResponse(e,res){    
    var response=getCustomExceptionResponse('',e,res);    
    res.json(response);
}

function logException(e){
    var args={
        data:e,
        headers:{ "Content-Type": "application/json" }
    }

    client.post(`${config.exceptionserver.excpBaseUri}logException`,args,(data,response)=>{        
    });
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
    handleException,
    logException
}