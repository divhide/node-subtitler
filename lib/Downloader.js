var http = require('http'),
    path = require("path"),
    url = require("url"),
    fs = require("fs"),
    zlib = require('zlib');


function download(movieFile, results, limit, onCompleted){
 
    if(!results.length || !limit) {
        if(onCompleted) onCompleted();
        return;
    }
    
    // absoule file on movieFile
    movieFile = path.resolve(movieFile);
    var movieExtension = path.extname(movieFile);
    
    //
    var dirname = path.dirname(movieFile);
    var subtitleResult = results.pop();
    var subtitleToDownload = subtitleResult["SubDownloadLink"];
    
    var downloadFileName = url.parse(subtitleToDownload).pathname;
    downloadFileName = dirname + path.sep + path.basename(movieFile, movieExtension) + ".srt";
    
    console.log("Downloading: " + downloadFileName);
    
    var request = http.get(subtitleToDownload, function(response) {
        
        dest = fs.createWriteStream(downloadFileName);
        response
          .pipe(zlib.createGunzip())
          .pipe(dest);
      
        response.on("end", function() {
            //fs.unlink(file);
            download(movieFile, results, --limit, onCompleted);
        });
        
    });
    
}


module.exports = download;

