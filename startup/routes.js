const express = require('express');
const temperatureRoute = require('../routes/temperature');
const userRoute = require('../routes/user');
const authRoute = require('../routes/auth')
const error = require('../middleware/error');
const cors = require('cors')
const path = require("path");

module.exports = function(app) {
  app.use(express.json());
  app.use(express.urlencoded({extended:true}));
  app.use("/images", express.static(path.join(__dirname, "./public/images")));
  app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://bestgarden.herokuapp.com/');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
  });
  app.use(cors({
    origin: '*'
}));
  app.use("/api/auth", authRoute);
  app.use("/api/users", userRoute);
  app.use("/api/posts", postRoute);
  app.use("/api/conversations", conversationRoute);
  app.use("/api/messages", messageRoute);

}