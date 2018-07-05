const mongoose=require('mongoose');
var {config}=require('../config');

mongoose.Promise=global.Promise;
var mongooseConnectUrl=`mongodb://localhost:27017/${config.dbconfig.projectdb}`;
console.log(mongooseConnectUrl);
mongoose.connect(mongooseConnectUrl);

var userSchema=mongoose.Schema({
    UserId:{
        type:String,
        unique:true,
        minlength:4
    },
    Password:{
        type:String,
        minlength:6
    }
});

var User=mongoose.model('Users',userSchema);

var newUser=new User({
    UserId:'Ravi',
    Password:'password'
});

newUser.save().then((doc)=>{
    console.log(doc);
},
(e)=>{
    console.log('error');
    errhandler.logException(e);
});

//mongoose.connection.close();



