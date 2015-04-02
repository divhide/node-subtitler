var Q = require('q'),
    fs = require("fs"),
    Buffer = require('buffer').Buffer;
    


function Hash(){}

/**
 *
 * Get opensubtitles hash from filename
 * 
 * @param  {String} filename
 * @return
 * 
 */
Hash.prototype.getHash = function(filename) {

    // get file size
    // get first 64kb
    // get last 64kb
    // summup everything

    var chunk_size = 65536;
    var buf_start = new Buffer(chunk_size*2);
    var buf_end = new Buffer(chunk_size*2);
    var file_size = 0;
    var self = this;
    var t_chksum = [];
  
    var sumHex64bits = function(n1, n2) {

        if(n1.length < 16) n1 = padLeft(n1, '0', 16);
        if(n2.length < 16) n2 = padLeft(n2, '0', 16);

        // 1st 32 bits
        var n1_0 = n1.substr(0, 8);
        var n2_0 = n2.substr(0, 8);
        var i_0 = parseInt(n1_0, 16) + parseInt(n2_0, 16);

        // 2nd 32 bits
        var n1_1 = n1.substr(8, 8);
        var n2_1 = n2.substr(8, 8);
        var i_1 = parseInt(n1_1, 16) + parseInt(n2_1, 16);

        // back to hex
        var h_1 = i_1.toString(16);
        
        var i_1_over = 0;
        if(h_1.length > 8) {
            i_1_over = parseInt(h_1.substr(0, h_1.length - 8), 16);
        } else {
            h_1 = padLeft(h_1, '0', 8);
        }

        var h_0 = (i_1_over + i_0).toString(16);

        return h_0 + h_1.substr(-8);

    };

    var padLeft = function(str, c, length) {
        
        while(str.length < length) {
            str = c.toString() + str;
        }
        return str;

    };

    var checksumBuffer = function(buf, length) {

        var checksum = 0, checksum_hex = 0;
        for(var i=0; i<(buf.length/length); i++) {
            checksum_hex = read64LE(buf, i);
            checksum = sumHex64bits(checksum.toString(), checksum_hex).substr(-16);
        }
        
        return checksum;

    };

    var read64LE = function(buffer, offset) {
        
        var ret_64_be = buffer.toString('hex', offset*8, ((offset+1)*8));
        var t = [];
        for(var i=0; i<8; i++) {
            t.push(ret_64_be.substr(i*2, 2));
        }
        t.reverse();
        return t.join('');

    };

    var getBufferChecksum = function(fd, t_buffer){

        var dfd = Q.defer();

        fs.read(fd, t_buffer.buf, 0, chunk_size*2, t_buffer.offset, 
            function(err, bytesRead, buffer) {
                
                if(err) {
                    dfd.reject(err);
                    return;
                }

                dfd.resolve(
                    checksumBuffer(buffer, 16));

        });

        return dfd.promise;
    };
  
    /// calculate the file hash
    var dfd = Q.defer();
    fs.stat(filename, function(err, stat) {

        if(err) {
            dfd.reject(err);
            return;
        }

        file_size = stat.size;
    
        /// add initial t_chksum
        t_chksum.push(file_size.toString(16));

        /// open the file as read-only
        fs.open(filename, 'r', function(err, fd) {

            if(err) {
                dfd.reject(err);
                return;
            }

            var t_buffers = [{ buf:buf_start, offset:0 }, { buf:buf_end, offset:file_size-chunk_size }];

            return getBufferChecksum(fd, { buf:buf_start, offset:0 })
            .then(function(r){
                t_chksum.push(r);
            })
            .then(function(){
                return getBufferChecksum(fd, { buf:buf_end, offset:file_size-chunk_size });
            })
            .then(function(r){
                t_chksum.push(r);
            })
            .then(function(){

                var chksum = sumHex64bits(t_chksum[0], t_chksum[1]);
                chksum = sumHex64bits(chksum, t_chksum[2]);
                chksum = chksum.substr(-16);
                chksum = padLeft(chksum, '0', 16);
                
                dfd.resolve(chksum);

            })
            .catch(dfd.reject);

        });

    });

    return dfd.promise;

};

module.exports = new Hash();