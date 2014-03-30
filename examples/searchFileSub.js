var opensubtitles = require("../Index.js");

opensubtitles.api.on("login", function(token){
    console.log("login:" + token);
});

opensubtitles.api.on("search", function(results){
    console.log("results:" + results);
});

opensubtitles.api.login()
    .done(
        function(token){
            
            var file = "D:\\Videos\\Filmes\\Desenhos Animados\\Cars 2 (2011) DVDRip XviD-MAXSPEED\\Cars 2 (2011) DVDRip XviD-MAXSPEED www.3xforum.ro.avi"
            opensubtitles.api.searchForFile(token, "eng", file).done(
                function(results){
                    
                    opensubtitles.downloader.download(file, results, 1, null);
                    
                    opensubtitles.api.logout(token);
                }
            );
        }
    );

