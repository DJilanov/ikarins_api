// used as container for the main constants of the back-end
(function() {
    var config = {
        // official db
        dbAddress: 'mongodb://ikarinsadmin:ikarins1221@ds137540.mlab.com:37540/ikarins',
        // user for the website
        adminUser: 'ikarins-admin',
        adminPassword: 'ikarins1221',
        // used for the back-end
        dbUser: 'ikarinsadmin',
        dbPassword: 'ikarins1221'
    };
    // exporting function of the config object
    function getConfig() {
        return config;
    }

    module.exports = {
        getConfig: getConfig
    };
}());
