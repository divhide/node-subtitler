var opensubtitles = require("../Index.js");

opensubtitles.api.login()
    .done(
        function(token){
            
            opensubtitles.api.search(token, "all", "Ice Age").done(
                function(results){
                    console.log(results);
                    
                    client.logout(token);
                }
            );
            
            
        }
    );

