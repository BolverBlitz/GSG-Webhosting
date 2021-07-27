require('dotenv').config();
const app = require('./src/app');

if(process.env.enablehttps === "true"){
  const https = require('https');
  const fs = require('fs');

  const httpsServer = https.createServer({
    key: fs.readFileSync(`${__dirname}/ssl/cert.key`),
    cert: fs.readFileSync(`${__dirname}/ssl/cert.cert`),
  }, app);

  const port = process.env.webport || 443;
  httpsServer.listen(port, () => {
    console.log(`[A] Listening on port: ${port} - \x1b[36mHTTPS\x1b[0m`);
  });
}else{
  const http = require('http');

  const httpServer = http.createServer(app);

  const port = process.env.webport || 80;
  httpServer.listen(port, () => {
    console.log(`[A] Listening on port: ${port} - \x1b[36mHTTP\x1b[0m`);
  });
}