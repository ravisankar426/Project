const mongoose=require('mongoose');
var {config}=require('../config');

mongoose.Promise=global.Promise;

function connect(dbUrl){
    mongoose.connect(dbUrl);
}


function create(model,dbUrl){  
    connect(dbUrl);
    return new Promise((resolve,reject)=>{
        model.save()
        .then((doc)=>{ 
            resolve(doc);       
        })
        .catch((err)=>{
            console.log(`db connect error - ${err}`);
            reject(err);
        });
    });
}

function get(model,dbUrl,filterParams){
    connect(dbUrl);
    return new Promise((resolve,reject)=>{
        model.find(filterParams,(err,docs)=>{
            if(err){
                console.log(`Error while fetching errors - ${err}`);
                reject(err);
            }
            else{
                resolve(JSON.stringify(docs));
            }
        });
    });
}

module.exports={
    create,
    get
}