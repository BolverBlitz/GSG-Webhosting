const express = require('express');
const { expressCspHeader, INLINE, NONE, SELF } = require('express-csp-header');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const rootpath = path.join(__dirname, '../');
const bodyParser = require('body-parser');
const rfs = require('rotating-file-stream')
let api;

const middlewares = require('./middlewares');
if(process.env.enableplugins === "true"){
  api = require('./api');
}


const app = express();
app.set('trust proxy', process.env.behindproxy);

if(process.env.environment === "dev"){
  if(process.env.log === "true"){
    const accessLogStream = rfs.createStream(`${rootpath}access-dev.log`, {
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
    const accessLogStream = rfs.createStream(`${rootpath}access.log`, {
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

app.use('/', express.static(`${rootpath}www-public`));

if(process.env.enableplugins === "true"){
  app.use('/api/v1', api);
}

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
