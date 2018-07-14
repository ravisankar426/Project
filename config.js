var appServerPort=3000;
var excpServerPort=4000;
var authServerPort=5000;
var dbPortNo=27017;
var dbHostName='localhost';
var appHostName='localhost';
var authHostName='localhost';

var config={
    appserver:{
        port:appServerPort,
        appBaseUri: `http://${appHostName}:${appServerPort}/`
    },
    exceptionserver:{
        port: excpServerPort,
        excpBaseUri: `http://${appHostName}:${excpServerPort}/`
    },
    authServer:{
        port:authServerPort,
        authBaseUri:`http://${authHostName}:${authServerPort}/`
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
    },
    secretKey:'zaqwsxcderfvbgt',
    crypto:{
        keyLength: 512,
        hashAlg: 'sha512',
        rounds: 10000,
    }
}

module.exports={
    config
}