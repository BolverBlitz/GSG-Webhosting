# GSG-Webhosting
This repo will create a simple express based webserver you can use on any system with nodeJS installed.  

## Install
Clone this repo
Check if NodeJS & npm are installed    
run `npm i`  
run node ./index.js  

## .env
environment - You can choose `build` or `dev`.  
log - You can choose `true` or `false` this will log all requests.  
maxlogsize - The size of the logfile (Rotating logfile).  
maxlogage - The time when the logfile should rotate.  
behindproxy - You can choose `0` or `1`, use 1 if you are behind cloudflare or apache/nginx proxy.  
enableplugins - You can choose `true` or `false` this will load plugins if you need a REST Backend.  
webport - The webserver port this app should lisen to.  

## To-DO
- Add HTTPS support.  