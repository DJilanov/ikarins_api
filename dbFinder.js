/**
 * @dbFinder Used to search in the db
 */
(function() {
    // we use it for creation of new object ids
    var ObjectId = require('mongodb').ObjectID;
    var mongoose = require('mongoose');
    var config = require('./config').getConfig();
    // database arrays
    var categories = [];

    /**
     * @setCache set the cache as local variable
     * @cache {Object} The cache object
     */
    function setCache(cacheModule) {
        cache = cacheModule;
    }

    /**
     * @fetchAllPages it returns all pages with their data
     * @req {Object} The query from the front-end
     * @res {Object} The res to the front-end
     */
    function fetchAllPages(req, res) {
        var response = {
            pages: cache.getPages(),
            pagesData: cache.getPagesData()
        }
        res.json(response);
    }
    /**
     * @connectDb Used to make the connection to the Database
     */
    function connectDb() {
        // we cache the product list when we open the back-end for faster working speed
        mongoose.connection.on('connected', function() {
            console.log('[dbConnector]Mongoose default connection open');
            mongoose.connection.db.collection('pages', function(err, collection) {
                collection.find().toArray(function(err, pages) {
                    cache.setPages(pages);
                });
            });
            mongoose.connection.db.collection('pagesData', function(err, collection) {
                collection.find().toArray(function(err, pages) {
                    cache.setPagesData(pages);
                });
            });
        });

        // If the connection throws an error
        mongoose.connection.on('error', function(err) {
            console.log('[dbConnector]Mongoose default connection error: ' + err);
        });

        // When the connection is disconnected
        mongoose.connection.on('disconnected', function() {
            console.log('[dbConnector]Mongoose default connection disconnected');
        });

        // If the Node process ends, close the Mongoose connection
        process.on('SIGINT', function() {
            mongoose.connection.close(function() {
                console.log('[dbConnector]Mongoose default connection disconnected through app termination');
                process.exit(0);
            });
        });
        // get database
        mongoose.connect(config.dbAddress);
    }

    module.exports = {
        setCache: setCache,
        connectDb: connectDb,
        fetchAllPages: fetchAllPages
    };
}());
