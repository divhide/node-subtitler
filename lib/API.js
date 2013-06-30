
var fs = require("fs"),
    xml = require('xml-mapping'),
    Request = require('request'),
    Mustache = require("mustache"),
    Deferred = require('Deferred'),
    utils = require('./Utils.js');

opensubtitlesAPI = {}
opensubtitlesAPI.API_URL = "http://api.opensubtitles.org/xml-rpc";


/*
 * Makes a login request to the API
 *
 * @return{Deferred} with login token as argument
 */
opensubtitlesAPI.login = function(){

    var dfd = new Deferred();
    
    utils._getLoginPostData()
        .done(
            function(postData){
                
                utils.request(opensubtitlesAPI.API_URL, postData)
                    .done(
                        function(response){
                            
                            var token = utils.parseXmlLoginResult(response);
                            
                            // resolve with token
                            dfd.resolve(token);
                            
                        });
            });
    
    return dfd.promise();
};





/*
 * Makes a search Request
 *
 * @return{Deferred} with login token as argument
 */
opensubtitlesAPI.search = function(token, lang, query){

    var dfd = new Deferred();
    
    utils._getSearchPostData(token, lang, query)
        .done(
            function(postData){
                utils.request(opensubtitlesAPI.API_URL, postData)
                    .done(
                        function(response){
                           
                            results = utils.parseXmlSearchResult(response);
                            
                            // resolve with token
                            dfd.resolve(results);
                            
                        });
            });
    
    return dfd.promise();
};

/*
 * Makes a search Request
 *
 * @return{Deferred} with login token as argument
 */
opensubtitlesAPI.searchForFile = function(token, lang, file){

    //TODO
    var dfd = new Deferred(),
        fileSize = 0,
        fileHash = "";
    
    fs.stat(
        file,
        function(err, fd){
            
            fileSize = fd.size;
            
            require("./Hasher.js")(file)
                .done(
                    function(hash){
                        fileHash = hash;
                        
                        utils._getSearchFilePostData(token, lang, fileHash, fileSize)
                            .done(
                                function(postData){
                                    utils.request(opensubtitlesAPI.API_URL, postData)
                                        .done(
                                            function(response){
                                     
                                                results = utils.parseXmlSearchResult(response);
                                                
                                                // resolve with token
                                                dfd.resolve(results);
                                                
                                            });
                                });
                        
                        
                    }
                );
            
        });
    
    
    return dfd.promise();
    
};


/*
 * Makes a search Request
 *
 * @return{Deferred} when request is made
 */
opensubtitlesAPI.logout = function(token){

    var dfd = new Deferred();
    
    utils._getLogoutPostData(token)
        .done(
            function(postData){
                utils.request(opensubtitlesAPI.API_URL, postData)
                    .done(
                        function(response){
                           
                            // resolve with token
                            dfd.resolve(results);
                            
                        });
            });
    
    return dfd.promise();
};


module.exports = opensubtitlesAPI;