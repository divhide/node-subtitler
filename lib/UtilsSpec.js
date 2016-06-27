
var expect = require("expect.js");

describe('indexSpec', function(){


    beforeEach(function(done){

        done();

    });


    it('.getOpenSubtitlesLanguage()', function(done){

        var Utils = require('./Utils');

        var lang = Utils.getOpenSubtitlesLanguage('pob');
        expect(lang).to.be('pob');

        lang = Utils.getOpenSubtitlesLanguage('pt-BR');
        expect(lang).to.be('pob');

        done();
    });

    it('.getOpenSubtitlesLanguage() es_ES', function(done){

        var Utils = require('./Utils');

        var lang = Utils.getOpenSubtitlesLanguage('es_ES');
        expect(lang).to.be('spa');

        done();
    });

    it('.getOpenSubtitlesLanguage .UTF-8', function(done){
        var Utils = require('./Utils');

        var lang = Utils.getOpenSubtitlesLanguage('es_ES.UTF-8');
        expect(lang).to.be('spa');

        done();
    });

});
