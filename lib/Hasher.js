var fs = require("fs"),
    Deferred = require('Deferred'),
    process = require('child_process');
    
/*
 * Get Hash from file
 *
 */
function getHash(filename){
    
    var dfd = new Deferred(),
        stdout = "";
    
    var child = process.spawn(
        "java", 
        ["-jar", "bin/opensubtitle-hasher.jar", filename],
        {
            stdio: ['pipe', 'pipe', 'pipe']
        }
    );
    child.stdout.on('data', function(data) {
        data = data.toString(); 
        if(!stdout) stdout = data;
    });
    
    child.on('close', function (code) {
        dfd.resolve(stdout);
    });
    
    return dfd.promise();
};


module.exports = getHash;