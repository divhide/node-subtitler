
var expect = require("expect.js");

describe('IndexSpec', function(){


    beforeEach(function(done){

        done();

    });

  
    it('.API.login()', function(done){

        var OpenSubtitles = require('./Index');

        OpenSubtitles.api.login()
            .done(function(token){
            
                expect(token).to.not.be.empty();
                done();  

            });
        
    });

  
});