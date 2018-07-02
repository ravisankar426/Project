const express=require('express');


var app=new express();
var port=process.env.port || 3000;


app.get('/',(req,res,next)=>{
    res.send('Welcome to my Project...!!!');
});





app.listen(port,()=>{
    console.log(`server started at port - ${port}`);
});