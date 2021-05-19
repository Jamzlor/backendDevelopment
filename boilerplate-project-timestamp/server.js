// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

//if the api endpoint is reached without an input of date string or unix timestamp, the program will produce the current timestamp and date in utc format
app.get('/api', (req, res) =>{
  res.json({"unix": Date.now(), "utc":Date()});
});

//when an input is specified
app.get('/api/:date_string?', (req, res) =>{
  var date_string = req.params.date_string;
  if(!date_string.includes('-')){ //if the date_string includes '-', means its a iso 8601 date format
    var timeStamp = parseInt(date_string);
    res.json({
      "unix":timeStamp,
      "utc": new Date(timeStamp).toUTCString()
    });
  } else {
    var dateObject = new Date(date_string);
    if(dateObject.toString() === "Invalid Date"){
      res.json({"error": "Invalid Date"});
    } else {
      res.json({
        "unix": dateObject.valueOf(),
        "utc": dateObject.toUTCString()
      })
    }
  }
});