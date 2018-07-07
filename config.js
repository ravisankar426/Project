var appServerPort=3000;
var excpServerPort=4000;
var dbHostName='localhost';
var dbPortNo=27017;
var appHostName='localhost';

var config={
    appserver:{
        port:appServerPort,
        appBaseUri: `http://${appHostName}:${appServerPort}/`
    },
    exceptionserver:{
        port: excpServerPort,
        excpBaseUri: `http://${appHostName}:${excpServerPort}/`
    },
    dbconfig:{
        errorsDB:{
            hostName:dbHostName,
            portNo:dbPortNo,
            dbName:'ErrorLogDB'            
        },
        projectDB:{
            hostName:dbHostName,
            portNo:dbPortNo,
            dbName:'ProjectDB'
        }
    }
}

module.exports={
    config
}