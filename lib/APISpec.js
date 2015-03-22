
var expect = require("expect.js");

describe('APISpec', function(){

    this.timeout(10000);

    beforeEach(function(done){

        done();

    });


    it('.logout()', function(done){

        var API = require('./API');

        API.login()
        .then(function(token){
            return API.logout(token);
        })
        .then(function(token){

            expect(token)
                .to.be(undefined);

        })
        .then(done)
        .catch(done);

    });

    it('.searchForFile()', function(done){

        var API = require('./API');

        API.login()
        .then(function(token){
            return API.searchForFile(token, 'en', __dirname + "/../examples/videoviewdemo.mp4");
        })
        .then(function(results){

            expect(results.length)
                .to.be(0);

        })
        .then(done)
        .catch(done);

    });

    it('.searchAny()', function(done){

        var API = require('./API');

        API.login()
        .then(function(token){
            return API.searchAny(token, 'eng', { imdbid : '1254207' });
        })
        .then(function(results){
            expect(results.length)
                .to.be(1);

        })
        .then(done)
        .catch(done);

    });

    it('.searchForTag()', function(done){

        var API = require('./API');

        API.login()
        .then(function(token){
            return API.searchForTag(token, 'eng', 'big_buck_bunny');
        })
        .then(function(results){

            expect(results.length)
                .to.be(1);

        })
        .then(done)
        .catch(done);

    });
});