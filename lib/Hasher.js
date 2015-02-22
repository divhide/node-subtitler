var fs = require("fs"),
    Buffer = require('buffer').Buffer,
    Q = require('q'),
    Long = require('long');


function Hash(){}


/**
 *
 * Get the file descriptor
 *
 * @param  {String} filename
 * @return {Promise}
 *
 */
var getFileDescriptor = function(filename){

    var dfd = Q.defer();

    fs.open(filename, 'r', function(status, fd) {

        fs.stat(filename, function(err, stats){

            dfd.resolve({
                fd: fd,
                size: stats.size
            });

        });

    });

    return dfd.promise;

};


/**
 * Sums every long that is in the chunk
 *
 * @param  {fd} fd
 * @param  {Number} start
 * @param  {Number} length
 * @return {Promise}
 *
 */
var longSumChunk = function(fd, start, length){

    var dfd = Q.defer();

    /// Read the buffer
    var buffer = new Buffer(length);
    fs.read(fd, buffer, 0, length, start, function(err, num) {

        if(err){ dfd.resolve(new Long()); }

        /// get the number of bytes readed
        buffer = buffer.slice(0, num);

        /// sum the
        var hNumber = new Long();
        for(var i=0; i<buffer.length; i+=8){

           var low = buffer.readUInt32LE(i, true);
           var high = buffer.readUInt32LE(i+4, true);

           var n = new Long(low, high);
           hNumber = hNumber.add(n);
        }


        dfd.resolve(hNumber);

    });

    return dfd.promise;

};

/*
 * Get Hash from file
 *
 */
Hash.prototype.getHash = function(filename){

    var HASH_CHUNK_SIZE = 64 * 1024;

    return getFileDescriptor(filename)
    .then(function(file){

        var fd = file.fd,
            size = file.size,
            head = null;
            start = null;

        if(size<HASH_CHUNK_SIZE){
            HASH_CHUNK_SIZE = file.size;
        }

        /// get the head
        return longSumChunk(fd, 0, HASH_CHUNK_SIZE)
        .then(function(headSum){

            var startSum = size-HASH_CHUNK_SIZE;
            if(startSum < 0){
               startSum = 0;
            }

            head = headSum;
            start = startSum;

           return startSum;

        })
        .then(function(){
            return longSumChunk(fd, start, HASH_CHUNK_SIZE);
        })
        .then(function(tail){

            // sum all values
            var sum = head
                    .add(tail)
                    .add(new Long(size));

            // convert value to unsigned
            var sumHex = sum.toUnsigned().toString(16);

            return sumHex;

        });

    });

};


module.exports = new Hash();