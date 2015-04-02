
var fs = require("fs"),
    xml = require('xml-mapping'),
    Request = require('request'),
    Mustache = require("mustache"),
    Q = require('q'),
    languages = require('./LanguagesAliases');


var _getFile = function(filename) {

    var dfd = Q.defer();

    fs.readFile(
        filename,
        "utf8",
        function (err, data) {
            dfd.resolve(data);
        });

    return dfd.promise;
};


exports._getLoginPostData = function(){

    return _getFile(__dirname + '/../requests/login.xml')
    .then(function(requestData){
        return requestData;
    });

};

exports._getSearchFilePostData = function(token, lang, moviehash, moviebytesize){

    return _getFile(__dirname + '/../requests/searchFile.xml')
    .then(function(requestData){

        var postData = Mustache.render(requestData, { token: token, lang: lang, moviehash: moviehash, moviebytesize: moviebytesize });
        return postData;

    });

};

exports._getSearchPostData = function(token, lang, params){

    return _getFile(__dirname + '/../requests/search.xml')
    .then(function(requestData){
		var transformedParams = [];
		
		for (var paramName in params) {
			if (params.hasOwnProperty(paramName)) {
				transformedParams.push({
					'key' : paramName,
					'value' : params[paramName]
				});
			}
		}

        var postData = Mustache.render(requestData, { token: token, lang: lang, params : transformedParams });
        return postData;
    });

};

exports._getLogoutPostData = function(token){

    return _getFile(__dirname + '/../requests/logout.xml')
    .then(function(requestData){
        var postData = Mustache.render(requestData, { token: token });
        return postData;
    });

};


exports.request = function(url, postData){

    var dfd = Q.defer();
    Request.post(
        {
            url:url,
            body: postData
        },
        function (error, response, body) {

            if(!error){
                dfd.resolve(body);
            }
            else {
                dfd.reject(error);
            }

        });

    return dfd.promise;
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

           results.push(result);
        }
    );

    return results;

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
