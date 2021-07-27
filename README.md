# GSG-Webhosting
This repo will create a simple express based webserver you can use on any system with nodeJS installed.  

## Install
Clone this repo
Check if NodeJS & npm are installed    
run `npm i`  
rename .env.example to .env  
run node ./index.js  

## .env
environment - You can choose `build` or `dev`.  
log - You can choose `true` or `false` this will log all requests.  
maxlogsize - The size of the logfile (Rotating logfile).  
maxlogage - The time when the logfile should rotate.  
enablehttps - You can choose `true` or `false` this will enable HTTPS, you´ll need a certificate and privat key.  
behindproxy - You can choose `0` or `1`, use 1 if you are behind cloudflare or apache/nginx proxy.  
enableplugins - You can choose `true` or `false` this will load plugins if you need a REST Backend.  
enableblocking - You can choose `true` or `false` this will prevent file acces to the files listed in `block.list` (example: /index.html)  
webport - The webserver port this app should lisen to.  

## Plugins
For more informations about plugins see https://github.com/EBG-PW/EBG-API-Plugins/blob/master/README.md  

## SSL / HTTPS
You need a certificate and privat key.  
Put those 2 files into the ssl folder with the name `cert.cert` and `cert.key`.  
Edit .env to enable https.  

## To-DO
- Add HTTPS support.  
