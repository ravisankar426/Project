const express=require('express');
const errhandler=require('./error-handler').handleException;
const config=require('./config').config;
const hbs=require('hbs');
const bodyParser=require('body-parser');
const path=require('path');
const Client=require('node-rest-client').Client;
const userRepository=require('./user/user-repository');
const _=require('lodash');
const jwt=require('jsonwebtoken');

var app=new express();
var port=process.env.port || config.appserver.port;
app.set('view engine','hbs');
app.use(express.static(path.join(__dirname,'views')));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,x-auth");
    res.header("Access-Control-Allow-Methods", "PUT,GET,POST,DELETE,PATCH");
    next();
  });

var client=new Client();
var headers = {  
  "Content-Type": "application-json"
}
var httpArgs = {  
  "headers": headers
}

var authenticate=(req,res,next)=>{
    var token=req.header('x-auth');
    try{
        jwt.verify(token,config.secretKey);
        next();
    }catch(e){
        errhandler(e,req,res);
    }
};

//app.use(authenticate);

app.get('/',(req,res)=>{         
    res.render('index',{
        WebSiteName:'Project'
    });
});

app.get('/error',(req,res)=>{ 
    fs.readFile('/invalid-file',(err,data)=>{
        if(err){
            return errhandler(err,req,res);
        }
        res.send('This is error page');
    }); 
});

app.get('/errors',(req,res)=>{
    var url=`${config.exceptionserver.excpBaseUri}errors`;
    client.get(url,httpArgs,(data,response)=>{    
         res.render('errors',data);
    });
});

app.get('/users',(req,res)=>{
    var filterParams={};
    userRepository.GetUsers(filterParams)
    .then((doc)=>{
        var result={users:JSON.parse(doc)};
        res.render('users',result);
    })
    .catch((err)=>{
        errhandler(err,req,res);
    });
});

app.get('/NewUser',(req,res)=>{
    res.render('NewUser');
});

app.post('/CreateUser',(req,res)=>{
    userRepository.CreateUser(req.body)
    .then((user)=>{
        res
        .status(200)
        .header({'x-auth':user.tokens[0].token})        
        .send({UserId:user.UserId,Password:user.Password,Token:user.tokens[0].token});
    })
    .catch((err)=>{
        errhandler(err,req,res);
    });    
});

app.listen(port,()=>{
    console.log(`server started at port - ${port}`);
});

process.on('uncaughtException',(err)=>{
    errhandler(err);
})