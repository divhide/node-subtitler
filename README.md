# NPM Opensubtitles package


## Install

After have installed node.js, run the following:

```shell
npm install opensubtitles-client -g
```

## Command line

```shell
subtitler <file> -lang eng|pob|... -n numberOfSubtitlesToDownload
```

Check the languages table on <a href="https://github.com/aetheon/node-opensubtitles-client/blob/master/langs.dump.txt">here</a>. Examples:

```js
-lang por //Portuguese
-lang pob //Brazilian
-lang eng //English
-lang fre //French
-lang spa //Spanish
```

Download subtitles for a file, automatically naming the subtitle file to be the 
same as the movie.

```shell
subtitler Cars.avi -lang eng
``` 

Search for subtitles (limit 5):

```shell
subtitler Cars -lang eng -n 5
``` 

Search and download to the current directory the first 5 subtitles:

```shell
subtitler Cars -lang eng -n 5 --download
``` 

## Javascript API:

Login - get the login token from the opensubtitle service

```js
opensubtitles.api.login()
	.done(function(token){
		// got the auth token
	});
```

Search - search for subtitles

```js
opensubtitles.api.search(token, lang, text)
	.done(
		functions(results){
			//got the search results
		}
	);
```

Search - search subtitles for a movie file

```js
opensubtitles.api.searchForFile(login, lang, movieFilePath);
	.done(
		functions(results){
			//got the search results
		}
	);
```

Logout - opensubtitles session logout ( please be nice! )

```js
opensubtitles.api.logout(login);	
```

Events

```js
opensubtitles.api.on("login", functions(token){});
opensubtitles.api.on("search", functions(results){});
opensubtitles.api.on("error", functions(e){});

opensubtitles.downloader.on("downloading", function(info){});
opensubtitles.downloader.on("downloaded", function(info){});
```


Checkout my blogpost on:
<a href="http://blog.divhide.com/2013/07/is-downloading-subtitles-painfull.html">http://blog.divhide.com/2013/07/is-downloading-subtitles-painfull.html</a>

<small>
<p>Visit <a href="http://site.divhide.com">www.divhide.com</a> for more informations, contacts and news about Web Development.</p>

<p>See other blog posts at <a href="http://blog.divhide.com">blog.divhide.com</a>.</p>
</small>

