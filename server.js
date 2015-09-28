var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var shortid = require('shortid');
//DB Setup

var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');
var mongodbUri = 'mongodb://bayampuser:password@ds051543.mongolab.com:51543/bayampdb';
var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };
var mongooseUri = uriUtil.formatMongoose(mongodbUri);
mongoose.connect(mongooseUri, options);

var conn = mongoose.connection;
//Connection Error
conn.on('error', console.error.bind(console, 'connection error:'));

conn.once('open', function() {
  // Wait for the database connection to establish, then start the app.

  //Schema model
  //var models=require('./app/models');
  var BayAmpEngineer = require('./app/models/engineer.js');

//  var BayAmpEngineer = mongoose.model('./app/models/engineer.js','EngineerSchema');

  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());

  var port = process.env.PORT || 8080;

  var router = express.Router();

  //MiddleWare console log
  router.use(function(req,res,next){

    console.log("Working in Background, Please wait patiently....");
    next();
  });


  // API Home
  router.get('/',function(req,res){

    var response = {
      "WelcomeMessage" : "Welcome to BayAmp Technologies RESTFul API"
    };

    res.status(200).send(response);

  });


  router.post('/create',function(req,res){

    var newEngineer = new BayAmpEngineer();
    newEngineer.name = req.body.name;
    Uniqueid = shortid.generate();
    newEngineer.id=Uniqueid;

console.log(newEngineer);

    newEngineer.save(function(err){
      if(err)
      throw err;

      res.status(201).json({
        "message" : "Successfully Created,Your Unique ID is "+Uniqueid+" Remember It"
      });

    });

  });

  router.get('/engineers',function(req,res){

    var query = BayAmpEngineer.find().select('-_id -__v');

    query.exec(function(err,engineers){
      if(err)
      throw err;

      res.status(200).json(engineers);

    });

  });

  router.get('/engineers/:id',function(req,res){

    var engineerID=req.params.id;
    var query = BayAmpEngineer.findOne({'id':engineerID}).select('-_id -__v');

    query.exec(function(err,engineers){
      if(err)
      throw err;

      if(engineers){
        res.status(200).json(engineers);
      }
      else {
        res.status(204).send();
      }

    });


  });

  router.put('/update/:id',function(req,res){

    var response = {
      "message" : "Successfully Updated "+req.body.name+ " details"
    };

    var updateEngineer = new BayAmpEngineer();
    updateEngineer.name = req.body.name;
    updateEngineer.id=req.params.id;

    console.log(req.params.id);
    var query = BayAmpEngineer.findOne({'id':updateEngineer.id});

    query.exec(function(err,doc){

      doc.name = req.body.name;

      doc.save(function(err){
        if(err)
        throw err;

        res.status(200).json(response);

      });

    })

  })

  router.delete('/delete/:id',function(req,res){

    var response = {
      "message" : "Successfully Deleted "+req.body.name+ " details"
    };

    var updateEngineer = new BayAmpEngineer();
    updateEngineer.name = req.body.name;
    updateEngineer.id=req.params.id;

    console.log(req.params.id);
    var query = BayAmpEngineer.findOne({'id':updateEngineer.id});

    query.exec(function(err,doc){

      doc.remove();
      res.status(200).json(response);
    })

  })


  router.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
    next();
  });

  //404 Handler
  router.use(function(req, res, next) {

    var response = {

      "message" : 'Sorry cant find that Endpoint!,\
      Supported Endpoints are :\
      /bayamp/create/\
      /bayamp/update/\
      /bayamp/delete/\
      /bayamp/engineers/id\
      /bayamp/engineers',

    }
    res.status(404).json(response);

  });

  app.get('/',function(req,res){

    var response = {
      "WelcomeMessage" : "Heroku Deployed BayAmp App"
    };

    res.status(200).send(response);
  })
  //Default API route
  app.use('/bayamp',router);
  app.listen(port);


  console.log("Welcome to BayAmp RESTFul API,Server Started");
});
