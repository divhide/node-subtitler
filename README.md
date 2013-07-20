# NPM Opensubtitles package

[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=NYVPSL7GBYD6A&lc=US&item_name=Oscar%20Brito&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted)


## Install

After have installed node.js, run the following:

```shell
npm install opensubtitles-client -g
```

## Command line

```shell
subtitler <file|directory|seachText> -lang eng|pob|... -n numberOfSubtitlesToDownload --download
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
subtitler Cars -lang eng --n 5
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

## Integration with rtorrent

After rtorrent download is finish you can automatically use subtitler to download it's subtitles. You just have to 
do the following:

On .rtorrent.rc add:

```
system.method.set_key =event.download.finished,move_complete,"execute=subtitler,$d.get_base_path="
```

This way the _subtitler_ command will receive the downloaded path has argument and will try to download the subtitles.




Checkout my blogpost on:
<a href="http://blog.divhide.com/2013/07/is-downloading-subtitles-painfull.html">http://blog.divhide.com/2013/07/is-downloading-subtitles-painfull.html</a>

<small>
<p>Visit <a href="http://site.divhide.com">www.divhide.com</a> for more informations, contacts and news about Web Development.</p>

<p>See other blog posts at <a href="http://blog.divhide.com">blog.divhide.com</a>.</p>
</small>

