/**
 * @server Used to declare the server and set all back-end functionallity
 */

// call the packages we need
const express = require('express'); // call express
// we set the multer
const multer  = require('multer');
const fs = require('fs');
const config = require('./config').getConfig();
const bodyParser = require('body-parser');
// here we declare all functions we use for the standart user interface
const cache = require('./cache');
const dbFinder = require('./dbFinder');
// we connect to the db using the credentials and fetch the db localy
dbFinder.connectDb();
dbFinder.setCache(cache);
// define our app using express
const app = express();
// this will let us get nv.PORT || 8080;        // set our port
const port = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API
// =============================================================================
const router = express.Router(); // get an instance of the express Router
// START THE SERVER
// =============================================================================
app.listen(port);
app.use(bodyParser());

// CORS header security off.
// TODO: !!!!IMPORTANT!!!! When we have specific domain we MUST enable it!
app.all('/*', function(req, res, next) {
    // we allow everyone to make calls ( we can easy block it to single domain where it is deployed )
    res.header("Access-Control-Allow-Origin", "*");
    // allow all methods
    // TODO: OPTIONS is not implemented to return all options. Do it!
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    // allow the request for the scripts
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    // we call the real root
    next();
});
// when we call from the fetcher service we return the products
app.get('/api/pages', function(req, res) {
    dbFinder.fetchAllPages(req, res);
});

console.log('Server is UP at ' + port);
