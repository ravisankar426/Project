const express=require('express');
const errhandler=require('./error-handler').handleException;
const fs=require('fs');
var config=require('./config').config;



var app=new express();
var port=process.env.port || config.appserver.port;


app.get('/',(req,res,next)=>{
    fs.readFile('/invalidfile',(err,data)=>{
        if(err){
            return errhandler(err,req,res);
        }        
        res.send('Welcome to my Project...!!!');
    });
});



app.listen(port,()=>{
    console.log(`server started at port - ${port}`);
});