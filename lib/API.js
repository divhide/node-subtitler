
var fs          = require("fs"),
    xml         = require('xml-mapping'),
    Request     = require('request'),
    Mustache    = require("mustache"),
    Q           = require('q'),
    utils       = require('./Utils.js'),
    events      = require( 'events' );

/**
 *
 * Opensubtitles API Url
 *
 * @type {String}
 *
 */
var API_URL = "http://api.opensubtitles.org/xml-rpc";

/**
 *
 * The Opensubtitles API client
 * @class
 *
 */
function API(){}

//inherit from EventEmitter
require('util').inherits(API, events.EventEmitter);

/*
 *
 * Makes a login request to the API
 *
 * @return {Promise}
 *
 */
API.prototype.login = function(){

    var scope = this;

    scope.emit("beforeLogin");

    return utils._getLoginPostData()
    .then(function(postData){
        return utils.request(API_URL, postData);
    })
    .then(function(response){

        var token = null;

        try{
            token = utils.parseXmlLoginResult(response);
            scope.emit.call(scope, "login", token);
        }catch(e){
            scope.emit.call(scope, "error", e);
        }

        return token;

    });

};

/*
 * Makes a search Request
 *
 * @return {Promise}
 *
 */
API.prototype.search = function(token, lang, query){

    var scope = this;

    // get language
    lang = utils.getOpenSubtitlesLanguage(lang);

    return utils._getSearchPostData(token, lang, query)
    .then(function(postData){
        return utils.request(API_URL, postData);
    })
    .then(function(response){

        try{
            results = utils.parseXmlSearchResult(response);
        }catch(e){
            results = [];
        }

        scope.emit.call(scope, "search", results);

        return results;

    });
};

/*
 * Makes a search Request
 *
 * @return {Promise}
 *
 */
API.prototype.searchForFile = function(token, lang, file){

    // get language
    lang = utils.getOpenSubtitlesLanguage(lang);

    //TODO
    var scope = this,
        dfd = Q.defer(),
        fileSize = 0,
        fileHash = "";

    fs.stat(
        file,
        function(err, fd){

            fileSize = fd.size;

            require("./Hasher.js").getHash(file)
            .then(function(hash){

                fileHash = hash;

                return utils._getSearchFilePostData(token, lang, fileHash, fileSize);

            })
            .then(function(postData){
                return utils.request(API_URL, postData);
            })
            .then(function(){
                 try{
                    results = utils.parseXmlSearchResult(response);
                }catch(e){
                    results = [];
                }

                scope.emit.call(scope, "search", results);

                dfd.resolve(results);

            })
            .catch(function(e){
                dfd.reject(e);
            });

        });


    return dfd.promise;

};


/*
 *
 * Logout API call
 *
 * @return {Promise}
 *
 */
API.prototype.logout = function(token){

    return utils._getLogoutPostData(token)
        .then(function(postData){
            return utils.request(API_URL, postData);
        })
        .then(function(){
            return undefined;
        });

};

//module return new instance of the API
module.exports = new API();
