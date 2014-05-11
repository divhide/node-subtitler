
var fs = require("fs"),
    xml = require('xml-mapping'),
    Request = require('request'),
    Mustache = require("mustache"),
    Deferred = require('Deferred'),
    languages = require('./LanguagesAliases'),
    fuzzyset = require('fuzzyset.js');


exports._getFile = function(filename) {
    var dfd = new Deferred();
    fs.readFile(
        filename, 
        "utf8",
        function (err, data) {
            dfd.resolve(data);
        });
    
    return dfd.promise();
};


exports._getLoginPostData = function(){

    var dfd = new Deferred();
    this._getFile(__dirname + '/../requests/login.xml')
        .done(
            function(requestData){
                dfd.resolve(requestData);
            });
    
    return dfd.promise();
};


exports._getSearchPostData = function(token, lang, query){

    var dfd = new Deferred();
    this._getFile(__dirname + '/../requests/search.xml')
        .done(
            function(requestData){
                
                var postData = Mustache.render(requestData, { token: token, query: query, lang: lang });
                dfd.resolve(postData);
            });
    
    return dfd.promise();
};

exports._getSearchFilePostData = function(token, lang, moviehash, moviebytesize){

    var dfd = new Deferred();
    this._getFile(__dirname + '/../requests/searchFile.xml')
        .done(
            function(requestData){
                
                var postData = Mustache.render(requestData, { token: token, lang: lang, moviehash: moviehash, moviebytesize: moviebytesize });
                dfd.resolve(postData);
            });
    
    return dfd.promise();
};


exports._getLogoutPostData = function(token){

    var dfd = new Deferred();
    this._getFile(__dirname + '/../requests/logout.xml')
        .done(
            function(requestData){
                
                var postData = Mustache.render(requestData, { token: token });
                dfd.resolve(postData);
            });
    
    return dfd.promise();
};


exports.request = function(url, postData){

    var dfd = new Deferred();
    Request.post(
        { 
            url:url, 
            body: postData
        },
        function (error, response, body) {
            dfd.resolve(body);
        });
    
    return dfd.promise();
};


exports.parseXmlLoginResult = function(xmlResult){
    var loginJson = xml.load(xmlResult);
    /* jshint -W069 */
    var loginRequestArray = loginJson["methodResponse"]["params"]["param"]["value"]["struct"]["member"];
    
    var token = loginRequestArray[0]["value"]["string"]["$t"];  
    
    return token;
};


exports.parseXmlSearchResult = function(xmlResult){
  
    var loginJson = xml.load(xmlResult),
        /* jshint -W069 */
        resultsXml = loginJson["methodResponse"]["params"]["param"]["value"]["struct"]["member"][1]["value"]["array"]["data"]["value"],
        results = [];

    // when the result is only one
    if(!(resultsXml instanceof Array)) resultsXml = [resultsXml];

    resultsXml.forEach(
        function(elem){
           var resultXmlInfo = elem["struct"]["member"],
               result = {};
            
            resultXmlInfo.forEach(
                function(dict){
                    try { 
                        result[dict["name"]["$t"]] = dict["value"]["string"]["$t"]; 
                    } catch(e) {}
                });
            
            processSearchResult(result);

            results.push(result);
        }
    );

    return results;
    
};

processSearchResult = function (result) {

    // add SubDownloadsCntInt to the result, which is SubDownloadsCnt parsed as a number
    result.SubDownloadsCntInt = parseInt(result.SubDownloadsCnt);
    if (isNaN(result.SubDownloadsCntInt)) {
        result.SubDownloadsCntInt = 0;
    }
};

/**
 * Compute the matching score of each result with the real movie name.
 *
 * This function adds a field `MatchingScore` to each result, which is a double value
 * between 0 and 1, where 1 is a perfect match
 */
exports.processSearchResults = function (movieName, results) {

    fuzzy = FuzzySet();
    fuzzy.add(movieName);

    for (var i=0; i<results.length; i++) {

        sub = results[i];

        // Compute the score with the movie name or the subtitle filename
        if (sub.MovieReleaseName) {
            score = fuzzy.get(sub.MovieReleaseName);
        } else if (sub.SubFileName) {
            score = fuzzy.get(sub.SubFileName);
        } else {
            score = null;
        }
        
        // Extract the score result from its object
        if (score === null) {
            score = 0;
        } else {
            score = score[0][0];
        }

        results[i].MatchingScore = score;
    }
};


exports.getBiggestFile = function(directory){

    var files = fs.readdirSync(directory) || [];
    files.sort(function(a, b) {
       return fs.statSync(directory + a).size < fs.statSync(directory + b).size;
    });

    if(!files.length) return null;

    return directory + files[0];

};

exports.getOpenSubtitlesLanguage = function(lang){
    lang = lang || "";
    lang = lang.toLowerCase();
    return languages[lang] || lang;
};
