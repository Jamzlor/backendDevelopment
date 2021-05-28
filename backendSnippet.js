// JSON file construct
// all key value pair must use double quotation marks
// author, description, license, version is all important information to add in JSON file. 
// all dependencies are to be set up in an object within the JSON object.
{
	"name": "fcc-learn-npm-package-json",
  "author": "James Lo",
  "keywords":["freecodecamp", "keywords", "SEO"],
  "license" : "MIT",
  "version":"1.0.0",
	"description": "a project that does something awesome",
	"dependencies": {
		"express": "^4.14.0"
	},
	"main": "server.js",
	"scripts": {
		"start": "node server.js"
	},
	"repository": {
		"type": "git",
		"url": "https://idontknow/todo.git"
	}	
}
// version is set up as such
// "package": "MAJOR.MINOR.PATCH"
// Major version increments are changes that are made to the program with no backward-compatibility. which means the previous version of codes will not runll
// Minor version increments are changes that are made to the program with backward compatible.
// Patch version increments are bug fixes with backwards-compatibility.
// ~ prefix to version allow npm to update it to any new PATCH release;
// ^ prefix to version allow npm to update it to any new MINOR release;

var express = require('express');
var app = express();
// this is how to create an express app object, which comes with a set of express app METHODS.
//Express app MEHTODS follows a re particular set to syntax.

app.METHOD(PATH, HANDLER);
//METHOD = http method in lowercase
//PATH = relative path on the server. (it can be string or even a regular expression);
//HANDLER = is a function that Express calls when the route is matched.

//HANDLER takes the form of this syntax:

function(req, res){
  res.method();
};

app.get('/', function(req, res){
  res.send('Response String');
});

// GET is used to request data from a specified resource.
// GET is one of the most common HTTP methods.
// POST is used to send data to a server to create/update a resource.
// POST is one of the most common HTTP methods.

res.sendFile(path)

// res.sendFile(path), this will respond to a request with a file, and the path has to be an absolute path and to get that use 

absolutePath = __dirname + relativePath/File.ext;

app.get('/', function(req, res){
  res.sendFile(__dirname + 'relativePath/File.ext');
});

// static assets are static files such as stylesheets, js files and images. express.static() is a built-in middleware function in express that helps serves such files.

app.use('/public', function(req, res){
	express.static(__dirname + '/public');
});

//express.static(PATH), PATH is required to be an absolute path.

// While an HTML server serves HTML, an API serves data. A REST (REpresentational State Transfer) API allows data exchange in a simple way, without the need for clients to know any detail about the server. 
// Client do need to know where the resource is (the URL).

app.get('/', function(req, res){
	res.json({"message":"Hello json"});
});

//.env file is a hidden file that is used to pass environment variables to your application. the file is secret so no one can access it but you.
//useful for storing sensitive date, such as API keys from external services or your database URI
//environment variables are accessible form the app as process.env.VAR_NAME, it is a global Node object. By convention, the variable names are all uppercase and seperated by underscores between words.
//when declaring environment variables, that cannot be any spaces.

VAR_NAME=value

//Middleware functions are functions that take 3 arguments.

middleware_function(req, res, next){
	res.METHOD('SOMETHING HERE');
	next();
}

// Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.

// Middleware functions can perform the following tasks:

// Execute any code.
// Make changes to the request and the response objects.
// End the request-response cycle.
// Call the next middleware function in the stack.

//it can also be chained with other handlers.

app.get('/now', function(req, res, next){
	req.time = new Date().toString();
	next();
 }, function(req, res){
   res.json({"time" : req.time})
 });

//route parameters is a way for clients to communicate with the server on what information is requested
//req.params is an object where the captured value are stored. 
//route parameters are named segments of the URL, delimited by slashes(/).

route_path: '/user/:userId/book/:bookId'
actual_request_URL: '/user/546/book/6754'
req.params: {userId: '546', bookId: '6754'}

//Query parameter is another common way to get input from clients, called a query string, which is delimited by a question mark(?), and includes field=value couples.
//each query couple is seperated by an ampersand(&).
//Express will then parse the data from the quey string and populate the req.query object for later access.
//some special characters are not allowed in a query string, such as the percentage sign(%)

route_path: '/library'
actual_request_URL: '/library?userId=546&bookId=6754'
req.query: {userId: '546', bookId: '6754'}

//besides GET, another common HTTP verb is POST, which is the default method used to send client data with HTML forms. 
// POST is used to send data to create new items in the database.
// in POST requests, the data doesn't appear in the URL, and instead hidden in the request body, which is also called a payload. 
// inorder to access the body, a middleware called body-parser must be installed before hand either through adding it manually in json or through npm. 
// the it has to be required on the top of the code to access the request body. The middleware is bodyParser.urlencoded({extended: false})); 
// extended=false is a configuration option that tells the parser to use the classic encoding.


//MongoDB
//MongoDB is a database program that is document-oriented, classified as a noSQL database program, meaning it uses JSON-like documents to store data.
//a record in MongoDB is a document, which is a data structure composed of field and value pairs. similar to JSON object.
//a replica set is a group of MongoDB servers that maintain the same data set, probiding redundancy and increasing data availability.
//to populate a collection, just input the records directly into a database with db.inventory.insertMany([arrayOfObject]).
//to select all documents, use db.inventory.find({}) method, NOTE: passing in an empty object will return all the records.
//using .pretty after .find will return a collection that is more readable.
//if instead of an empty object is passed to .find(), the method will find all records that fulfill that argument.
//db.collection.find(<query document>, <projection document>). this method will return only the fields that are specified to be return. <field>: 1 includes a field and <field>: 0 excludes.
//Schema defines the shape of the documents within a collection. a template of how the document is structured.
//schemas are building blocks for models, and models allows you to create instances of your objects, which are the documents.
//in real serverst the interaction with the databse happen in handler functions.

//Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node. js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.

//to create a model, a schema is required, each schema maps to a MongoDB collection, and it defines the shape of the documents within that collection.

const Schema = mongoose.Schema; //this is not necessary but will make the code more readable.

//three types of data type validations.
name : String
name : {type: String}
name : {type: String, required: true}//this one is preferred.

//contrusting a schema
const personSchema = new Schema({ // if Schema is not assigned to a variable, it will be mongoose.Schema instead.
    name : {type : String, required : true},
	age : Number,
	favoriteFood : [String]
});

//Creating a Person model from the schema
const Person = mongoose.model("Person", personSchema);

//filling a model with an array of document instance use Model.create(<array>, callback())

const createManyPeople = (arrayOfPeople, done) => {
	Person.create(arrayOfPeople, function(err, people){
	  if (err) return console.log(err);
	  done(null, people);
	});
  };

//find all instances fulfilling the query object use find(<queryObject>, callback());

const findPeopleByName = (personName, done) => {
	Person.find({name: personName}, function(err, person){
	  if (err) return console.log(err);
	  done(null, person);
	});
  };

//find the first matching instance use findOne(<queryObject>, callback());

const findOneByFood = (food, done) => {
	Person.findOne({favoriteFoods: food}, function(err, data){
	  if (err) return console.log(err);
	  done(null, data);
	});
  };

//every document that is added to the model will have an id (_id) automatically generated. find an item by id with findById(<id>, callback());

const findPersonById = (personId, done) => {
	Person.findById({_id: personId}, function(err, person){
	  if (err) return console.log(err);
	  done(null, person);
	});
  };

//in order to update a document, first find the document with one of the methods above, then within the callback(err, data), using data as found document.
//edit the document then use data.save(callback()) with another callback to complete the udpate.

const findEditThenSave = (personId, done) => {
	const foodToAdd = "hamburger";
	Person.findById(personId, function(err, person){
	  if (err) return console.log(err);
	  person.favoriteFoods.push(foodToAdd);
	  person.save(function(err, updatedPerson){
		if (err) return console.log(err);
		done(null, updatedPerson);
	  });
	});
  };

//Recent versions of Mongoose have methods to simplify documents updating.
//findAndUpdate() / findOneAndUpdate(), are update methods in Mongoose that simplifies the udpate of documents.

//findAndUpdate(<queryDocument>, <changeOfDocument>, {new: true}, callback()); 

//the 3rd argument {new: true} will return a new document after udpating whereas by default, findAndUpdate() will not return a new documents after executing.

const findAndUpdate = (personName, done) => {
	const ageToSet = 20;
	Person.findOneAndUpdate({name: personName}, {age: ageToSet},{new: true}, function (err, updatedPerson){
	  if (err) return console.log(err);
	  done(null, updatedPerson);
	});
  };

//to remove a document, findByIdAndRemove(<queryId>, callback()); will find the matching document by id and remove it from the Model;

const removeById = (personId, done) => {
	Person.findByIdAndRemove(personId, function(err, data){
	  if(err) return console.log(err);
	  done(null, data);
	})
  };

//to remove more than one match, use Model.deleteMany(<queryObject>, callback());

const removeManyPeople = (done) => {
	const nameToRemove = "Mary";
	Person.deleteMany({name: nameToRemove}, function(err, data){
	  if (err) return console.log(err);
	  done(null, data);
	})
  };

//for all the methods above, if callback() is not specified as the second argument, the method is not executed, instead stored for later use.
//this is useful for chaining multiple methods and executed in order with .exec(callback()); as the end of the chain. 
  
const queryChain = (done) => {
	const foodToSearch = "burrito";
	Person.find({favoriteFoods: foodToSearch})
	  .sort({name: 1})
	  .limit(2)
	  .select({age: 0})
	  .exec(function(err, data){
		if(err) return console.log(err);
		done(null, data);
	  });
  };