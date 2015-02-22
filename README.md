
[![Divhide](http://blog.divhide.com/assets/images/divhide_192px.png)](http://divhide.com/)

# NPM Opensubtitles package

 [![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=NYVPSL7GBYD6A&lc=US&item_name=Oscar%20Brito&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted)
[![Build Status](https://travis-ci.org/aetheon/node-opensubtitles-client.png?branch=master)](https://travis-ci.org/aetheon/node-opensubtitles-client)
[![NPM version](https://badge.fury.io/js/opensubtitles-client.svg)](http://badge.fury.io/js/opensubtitles-client)

---

## Install

After have installed node.js, run the following:

```shell
npm install opensubtitles-client -g
```

## Command line

```shell
subtitler <file|directory|seachText>
	--lang eng|pob|...
	-n <numberOfSubtitlesToDownload>
	--download
	--retries <numberOfRetries>
	--retryIn <secondsToRetry>
```
> if a file or directory is provided -- download is activated by default

> if free text  is provided -- performs a query into opensubtitles with it!

> --lang The language to search ( be sure to check <a href="https://github.com/aetheon/node-opensubtitles-client/blob/master/langs.dump.txt">here</a> )

> -n specifies the number of subtitles to list or download if (--download is specified)

> --download Flag to download the results. The downloaded result will have the same same as the file if it can, working well with TV players, etc...

> --retries The number of retries in API error

> --retryIn The seconds to wait before the next retry


### Languages

```js
//Portuguese
-lang por

//Brazilian
-lang pob

//English
-lang eng

 //French
-lang fre

//Spanish
-lang spa
```

Check the languages table on <a href="https://github.com/aetheon/node-opensubtitles-client/blob/master/langs.dump.txt">here</a>.
Or the languages aliases on <a href="https://github.com/aetheon/node-opensubtitles-client/blob/master/lib/LanguagesAliases.js">here</a>.



### Examples

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



## Contribute

Pull requests are welcome but please make sure the the linting and unit tests are working before you
do that. Also adding unit tests will increase the acceptance of the pull request by 10000%!

``` bash

grunt dev

```


## Authors

**Oscar Brito**

+ [github/aetheon](https://github.com/aetheon)
+ [twitter/aetheon](http://twitter.com/aetheon)
