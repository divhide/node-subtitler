
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

    it('.search()', function(done){

        var API = require('./API');

        API.login()
        .then(function(token){
            return API.search(token, 'eng', { imdbid : '1254207' });
        })
        .then(function(results){
            expect(results.length)
                .to.be(1);

        })
        .then(done)
        .catch(done);

    });

    it('.searchForTitle()', function(done){

        var API = require('./API');

        API.login()
        .then(function(token){
            return API.searchForTitle(token, 'eng', 'Guardians of the Galaxy (2014)');
        })
        .then(function(results){

            expect(results.length)
                .to.be.greaterThan(1);

        })
        .then(done)
        .catch(done);

    });

    it('.searchForTag()', function(done){

        var API = require('./API');

        API.login()
        .then(function(token){
            return API.searchForTag(token, 'eng', 'horror');
        })
        .then(function(results){

            expect(results.length > 0)
                .to.be(true);

        })
        .then(done)
        .catch(done);

    });
});