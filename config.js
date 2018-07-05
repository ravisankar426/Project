var appServerPort=3000;
var excpServerPort=4000;

var config={
    appserver:{
        port:appServerPort
    },
    exceptionserver:{
        port: excpServerPort,
        excpBaseUri: `http://localhost:${excpServerPort}/`
    },
    dbconfig:{
        errorlogdb:'ErrorLogDB',
        projectdb:'ProjectDB'
    }
}

module.exports={
    config
}