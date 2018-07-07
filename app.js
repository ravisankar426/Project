const express=require('express');
const errhandler=require('./error-handler').handleException;
const fs=require('fs');
const config=require('./config').config;
const hbs=require('hbs');
const bodyParser=require('body-parser');
const path=require('path');
const Client=require('node-rest-client').Client;
const userRepository=require('./user/user-repository');

var app=new express();
var port=process.env.port || config.appserver.port;
app.set('view engine','hbs');
app.use(express.static(path.join(__dirname,'views')));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

var client=new Client();
var headers = {  
  "Content-Type": "application-json"
}
var httpArgs = {  
  "headers": headers
}

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
    userRepository.GetUsers(filterParams).then((doc)=>{
        var result={users:JSON.parse(doc)};
        res.render('users',result);
    },
    (err)=>{
        errhandler(err,req,res);
    });
});

app.get('/NewUser',(req,res)=>{
    res.render('NewUser');
});

app.post('/CreateUser',(req,res)=>{
    userRepository.CreateUser(req.body).then((doc)=>{
        res.send(doc);
    },
    (err)=>{
        errhandler(err,req,res);
        res.send('error');
    });    
});

app.listen(port,()=>{
    console.log(`server started at port - ${port}`);
});