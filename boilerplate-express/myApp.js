var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use('/', function(req, res, next){
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.use(bodyParser.urlencoded({ extended: false}));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html');
});

app.use('/public', express.static(__dirname + '/public'));

app.get('/json', function(req, res){
  res.json((process.env.MESSAGE_STYLE === "uppercase") ? {"message": "HELLO JSON"}: {"message": "Hello json"});
});

app.get('/now', function(req, res, next){
   req.time = new Date().toString();
   next();
}, function(req, res){
  res.json({"time" : req.time})
});

app.get("/:words/echo", (req, res) => {
  var words = req.params.words;
  res.json({echo: words});
});

app.get('/name', function(req, res){
  var firstName = req.query.first;
  var lastName = req.query.last;
  console.log(firstName + ' ' + lastName);
  res.json({
    name: `${firstName} ${lastName}`
  });
});
app.post('/name', (req, res) => {
  var firstName = req.body.first;
  var lastName = req.body.last;
  console.log(firstName + ' ' + lastName);
  res.json({name: `${firstName} ${lastName}`});
});




 module.exports = app;
