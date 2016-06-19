
[![Divhide](http://blog.divhide.com/assets/images/divhide_192px.png)](http://divhide.com/)

# Subtitles library / command line

[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=CJCQT6QZCF8NA)
[![Build Status](https://travis-ci.org/divhide/node-subtitler.png?branch=master)](https://travis-ci.org/divhide/node-subtitler/)
[![NPM version](https://badge.fury.io/js/subtitler.svg)](http://badge.fury.io/js/subtitler)

---

## Install

After have installed node.js, run the following:

```shell
npm install subtitler -g
```

## API

### Login - get the login token from the opensubtitle service

```js

var opensubtitles = require("subtitler");

opensubtitles.api.login()
.then(function(token){
	// got the auth token
});
```

### Search

```js

var opensubtitles = require("subtitler");

opensubtitles.api.searchForFile(login, lang, movieFilePath);
.then(functions(results){
	//got the search results
});

opensubtitles.api.searchForTitle(token, lang, text)
.then(functions(results){
	//got the search results
});

opensubtitles.api.searchForTag(token, lang, tag)
.then(functions(results){
	//got the search results
});

opensubtitles.api.search(token, lang, {
	query: "",
	tag: ""
})
.then(functions(results){
	//got the search results
});

```

### Logout - opensubtitles session logout ( please be nice! )

```js

var opensubtitles = require("subtitler");

opensubtitles.api.logout(login);

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

> --lang The language to search. Defaults to `LANG` environment variable.

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

Check the languages table on <a href="https://github.com/divhide/node-subtitler/blob/master/langs.dump.txt">here</a>.
Or the languages aliases on <a href="https://github.com/divhide/node-subtitler/blob/master/lib/LanguagesAliases.js">here</a>.

### Examples

Download subtitles for a file, automatically naming the subtitle file to be the
same as the movie.

```shell
subtitler Cars.avi -lang en_us
LANG=en_us subtitler Cars.avi
```

Search for subtitles (limit 5):

```shell
subtitler Cars -lang eng --n 5
```

Search and download to the current directory the first 5 subtitles:

```shell
subtitler Cars -lang eng -n 5 --download
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
