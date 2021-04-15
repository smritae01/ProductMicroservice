//jshint esversion:6

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/microModel'), //created model loading here
  bodyParser = require('body-parser');

  mongoose.Promise = global.Promise;
  const url = 'mongodb://127.0.0.1:27017/productsDB';
  mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

  const db = mongoose.connection
  db.once('open', _ => {
    console.log('Database connected:', url)
  })

  db.on('error', err => {
    console.error('connection error:', err)
  })

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/microRoutes'); //importing route
routes(app); //register the route

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('Products RESTful API server started on: ' + port);
