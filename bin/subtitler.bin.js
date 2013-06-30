#!/usr/bin/env node

var ap = require('argparser')
            .files(0)
            .defaults({
               lang : "eng",
               n: 1
            })
            .err(function(e) {
               console.error("[usage]\n\t", "subtitler", "<file> --lang eng|pob|... --n numberOfSubtitlesToDownload")
             })
            .parse();


var file = ap.arg(0);
var lang = ap.opt("lang");
var n = ap.opt("n");

var opensubtitles = require("../index.js");

opensubtitles.api.login()
    .done(
        function(token){
            
            opensubtitles.api.searchForFile(token, lang, file).done(
                function(results){
                    
                    opensubtitles.download(
                        file, 
                        results, 
                        n
                    );
                    
                    opensubtitles.api.logout(token);
                }
            );
        }
    );


