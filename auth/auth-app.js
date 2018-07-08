const express=require('express');
const bodyParser=require('body-parser');
const config=require('../config').config;


var app=new express();
var port=process.env.port || config.authServer.port;

app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.post('/SignIn',(req,res)=>{
    res.send(JSON.stringify(req.body));
});


app.listen(port,()=>{
    console.log(`server started at port - ${port}`);
});