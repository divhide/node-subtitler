var opensubtitles = require("../index.js");

opensubtitles.api.login()
    .done(
        function(token){
            
            var file = "D:\\Videos\\Filmes\\Desenhos Animados\\Cars 2 (2011) DVDRip XviD-MAXSPEED\\Cars 2 (2011) DVDRip XviD-MAXSPEED www.3xforum.ro.avi"
            opensubtitles.api.searchForFile(token, "eng", file).done(
                function(results){
                    
                    opensubtitles.download(file, results, 1, null);
                    
                    opensubtitles.api.logout(token);
                }
            );
        }
    );

