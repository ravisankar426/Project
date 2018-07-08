const express=require('express');
const bodyparser=require('body-parser');
var config=require('../config').config;
var logger=require('./exception-repository');



var app=new express();
app.use(bodyparser.json());
var port=process.env.port || config.exceptionserver.port;

app.get('/',(req,res)=>{
    res.send('Welcome to exceptions');
});

app.get('/errors',(req,res)=>{
    logger.getExceptions()
    .then((data)=>{
        var result={errors:JSON.parse(data)}
        res.send(result);
    })
    .catch((e)=>{
        console.log(`Error while fetching errors - ${e}`);
        logger.writeToDB(JSON.stringify(req.body));
    });
});

app.post('/logException',(req,res)=>{    
    logger.writeToDB(JSON.stringify(req.body));
    res.send();
});

app.listen(port,()=>{
    console.log(`server started at port - ${port}`);
});