'use strict';

const express = require('express'),
      app     = express();

process.env.NODE_ENV = process.env.NODE_ENV || 'development'; // SET DEFAULT ENVIRONMENT
require(__dirname + '/_config/express')(app, express); // EXPRESS SETTINGS
