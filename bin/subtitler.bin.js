#!/usr/bin/env node

var _ = require('lodash'),
    opensubtitles = require("../index.js"),
    fs = require("fs");


/*
 * Parse Arguments
 *
 */
var ap = require('argparser')
            .nonvals("download")
            .defaults({
               lang : "eng",
               n: 1
            })
            .err(function(e) {
               console.log(e);
               console.error("[usage]\n\t", "subtitler", "<file|query> -lang eng|pob|... --n numberOfSubtitles --download");
               process.exit(0);
             })
            .parse();


/*
 * Application
 *
 */
APP = function(apObject){

  // to be set
  this.logintoken = null;

  this.text = ap.arg(0);
  this.lang = ap.opt("lang");
  this.n = ap.opt("n");
  this.download = ap.opt("download");
  this.isFile = false;

  //If is search or file?
  var file = null;
  if( fs.existsSync(this.text) ) { 
      this.download = true;
      this.isFile = true;
  }

  this.bindOpensubtitlesEvents();

};


APP.prototype = {

  
  bindOpensubtitlesEvents: function(){

      var scope = this;

      opensubtitles.api.on(
        "search",
        function(results){

          (function(){
              this.onSearch(results);
          }).call(scope);
 
        });

      opensubtitles.api.on(
        "error",
        function(e){

          (function(){
              this.onError(e);
          }).call(scope);
 
        });

      // Event onDownloaded
      opensubtitles.downloader.on(
          "downloaded",
          function(data){

            (function(){
              this.onDownloaded(data);
            }).call(scope);
             
          });

      // Event onDownloaded
      opensubtitles.downloader.on(
          "downloading",
          function(data){

            (function(){
              this.onDownloading(data);
            }).call(scope);
             
          });

  },


  onSearch: function(){

    console.log("Search results", this.n, "of #", results.length);
           
    for(var i=0; (i<this.n && i<results.length); i++){
       var sub = results[i];
       console.log("------------------------");
       console.log(sub.SubAddDate, " ", sub.MovieReleaseName);
    }

    if( this.download ) {

       // download subtitles
       opensubtitles.downloader.download(
                        results, 
                        this.n,
                        this.isFile ? this.text : null
                    );
    }

  },

  onDownloading: function(data){

     console.log("...Downloading ");
     
  },

  onDownloaded: function(data){

     console.log("...Downloaded ", data.url, " -> ", data.file);
     console.log("------------------------");
             
     opensubtitles.api.logout(this.logintoken);

  },

  onError: function(e){
    
    console.log("Oops. An error has occurred. Please try again...");
    process.exit();

  },

  run: function(){

    var scope = this;
    opensubtitles.api.login()
    .done(
        function(logintoken){
            
            (function(){
              
              this.logintoken = logintoken;
            
              console.log("Searching...");
          
              if(this.isFile)
                  opensubtitles.api.searchForFile(logintoken, this.lang, this.text);
              else
                  opensubtitles.api.search(logintoken, this.lang, this.text);

            }).call(scope);

            
            
        }
    );

  }

};



new APP().run();