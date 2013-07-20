var fs = require("fs"),
    Deferred = require('Deferred'),
    process = require('child_process'),
    events = require( 'events');;
    

function Hash(){};
//inherit from EventEmitter
require('util').inherits(Hash, events.EventEmitter);


/*
 * Get Hash from file
 *
 */
Hash.prototype.getHash = function(filename){
    
    var scope = this,
        dfd = new Deferred(),
        stdout = "";
    
    var child = process.spawn(
        "java", 
        ["-jar", __dirname + "/../bin/opensubtitle-hasher.jar", filename],
        {
            stdio: ['pipe', 'pipe', 'pipe']
        }
    );
    child.stdout.on('data', function(data) {
        data = data.toString(); 
        if(!stdout) stdout = data;
    });
    
    child.on('close', function (code) {
        scope.emit.call(scope, "hash", stdout);
        dfd.resolve(stdout);
    });
    
    return dfd.promise();
};


module.exports = new Hash();