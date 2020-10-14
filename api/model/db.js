var mongooes = require('mongoose');
require('dotenv').config()


var db_url = process.env.dbURL;

mongooes.connect(db_url, { dbName: 'users', useNewUrlParser: true,useFindAndModify:true,useUnifiedTopology:true });

mongooes.connection.on('connected', function() {
    console.log("Mongoose is now Connected at: " + db_url);
});
mongooes.connection.on('disconnected', function() {
    console.log("Mongoose is now disconnected:");
});
mongooes.connection.on('Error', function(err) {
    console.log("Error while connecting: " + err);
});

function gracefulShutdown(msg, callback) {
    mongooes.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
}

// For app termination
process.on('SIGINT', function() {
    gracefulShutdown('App termination (SIGINT)', function() {
        process.exit(0);
    });
});

//  If Server is already Running..
process.on('uncaughtException', function(err) {
    if (err.errno === 'EADDRINUSE') {
        console.clear()
        console.log('Server already running.. ');

    } else {
        console.log("server will not start due to ", err);
    }
    process.exit(1);
});


// BRING IN YOUR SCHEMAS & MODELS
require('./user.schema');
