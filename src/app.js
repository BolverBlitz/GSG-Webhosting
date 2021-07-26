const express = require('express');
const { expressCspHeader, INLINE, NONE, SELF } = require('express-csp-header');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const rootpath = path.join(__dirname, '../');
const bodyParser = require('body-parser');
const rfs = require('rotating-file-stream')
const middlewares = require('./middlewares');
let api, cP;

if(process.env.enableplugins === "true"){
  api = require('./api');
}

if(process.env.enableblocking === "true"){
  cP = require('./checkPath');
}


const app = express();
app.set('trust proxy', process.env.behindproxy);

if(process.env.environment === "dev"){
  if(process.env.log === "true"){
    const accessLogStream = rfs.createStream(`access-dev.log`, {
      size: process.env.maxlogsize,  
      interval: process.env.maxlogage, 
      compress: "gzip"
    });
    app.use(morgan('dev', { stream: accessLogStream }))
  }else{
    app.use(morgan('dev'));
  }
}else{
  if(process.env.log === "true"){
    const accessLogStream = rfs.createStream(`access.log`, {
      size: process.env.maxlogsize,  
      interval: process.env.maxlogage, 
      compress: "gzip"
    });
    app.use(morgan('combined', { stream: accessLogStream }))
  }
}

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(expressCspHeader({
  directives: {
      'default-src': [SELF],
      'script-src': [SELF, INLINE],
      'style-src': [SELF, INLINE],
      'img-src': [SELF, INLINE],
      'worker-src': [NONE],
      'block-all-mixed-content': true
  }
}));
app.use(bodyParser.urlencoded({ extended: false }))

if(process.env.enableblocking === "true"){
  app.use(function notFound(req, res, next) {
    if(!cP.checkPath(req.url)){
      next();
    }else{
      res.status(403);
      const error = new Error(`Access denied - ${req.originalUrl}`);
      next(error);
    }
  });
}

app.use('/', express.static(`${rootpath}www-public`));

if(process.env.enableplugins === "true"){
  app.use('/api/v1', api);
}

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
