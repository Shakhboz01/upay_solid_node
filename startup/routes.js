var cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()
const express = require('express')
const signInRoute = require('../routes/signIn');
const signUpRoute = require('../routes/signUp');
const providersRoute = require('../routes/providers');

module.exports = function(app){
  var corsOptions = {
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200
  }
  app.use(cors(corsOptions));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(express.json());

  app.use("/", signUpRoute);
  app.use("/", signInRoute);
  app.use("/", providersRoute);
}
