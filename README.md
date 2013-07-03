
# Node.js Opensubtitles Client

## Install

## Command line

```shell
subtitler <file> -lang eng|pob|... -n numberOfSubtitlesToDownload
```

Download subtitles for a file, automatically naming the subtitle file to be the 
same as the movie.

```shell
subtitler Cars.avi -lang eng
``` 

Search for subtiles (limit 5):

```shell
subtitler Cars -lang eng -n 5
``` 

Search and download to the current directory the first 5 subtitles:

```shell
subtitler Cars -lang eng -n 5 --download
``` 


