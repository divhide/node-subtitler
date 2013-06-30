#!/usr/bin/env node

var process = require("child_process");

var childProcess = process.spawn("java");

if( !childProcess.pid )
    // java needed to compute the movie hash
    throw Error("Error: java was not found");