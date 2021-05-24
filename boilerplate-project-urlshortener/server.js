require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

mongoose.connect(
  process.env.DB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function(error) {
    if (error) return console.log(error);
    console.log("connection ready: " + mongoose.connection.readyState);
  }
);

const Schema = mongoose.Schema;

const urlSchema = new Schema({
  original_url: { type: String },
  short_url: { type: String }
});

const UrlEntry= mongoose.model("Url", urlSchema);

app.post("/api/shorturl", async function(req, res) {
  var originalUrl = req.body.url;
  var shortUrl = sha1(originalUrl).slice(0, 9);
  if(!validUrl.isWebUri(originalUrl)){
    res.json({
      error: 'invalid url'
    });
  } else {
    try{
      var foundOne = await UrlEntry.findOne({original_url: originalUrl});
      if(foundOne){
        res.json({
          original_url: foundOne.original_url,
          short_url: foundOne.short_url
        });
      } else {
        UrlEntry.create({
          original_url: originalUrl,
          short_url: shortUrl
        }, function(err, data){
          if(err) return console.log(err);
          res.json({
            original_url: data.original_url,
            short_url: data.short_url
          });
        });
      }
    } catch(err){
      console.error(err)
      res.status(500).json("server error...")
    }
  }
});
 
app.get('/api/shorturl/:short_url?', async function (req, res){
  try{
    const UrlParams = await UrlEntry.findOne({
      short_url: req.params.short_url
    });
    if(UrlParams) {
      return res.redirect(UrlParams.original_url);
    } else {
      return res.json('No Url Found');
    }
  } catch (err) {
    console.log(err);
    res.json('Server Error...');
  };
});