const express=require('express');
const bodyParser=require('body-parser');
const config=require('../config').config;
const authRepository=require('./auth-repository');
const errhandler=require('../error-handler').handleException;
const _=require('lodash');

var app=new express();
var port=process.env.port || config.authServer.port;

app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,x-auth");
    res.header("Access-Control-Allow-Methods", "PUT,GET,POST,DELETE,PATCH");
    next();
  });

app.post('/SignIn',(req,res)=>{
    authRepository.ValidateLogin(req.body)
    .then((user)=>{        
        if(!user){
            res
            .status(200)
            .header({'x-auth':null})        
            .send(null);
        }
        else{
            res
            .status(200)
            .header({'x-auth':user.tokens[0].token})        
            .send({UserId:user.UserId,Password:user.Password,Token:user.tokens[0].token});
        }
    })
    .catch((err)=>{
        errhandler(err,req,res);
    });   
});


app.listen(port,()=>{
    console.log(`server started at port - ${port}`);
});