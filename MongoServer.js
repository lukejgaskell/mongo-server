
var MongoServer = function () {

}

MongoServer.prototype.init = function (app, mongoose, modelsDir) {

    var fs = require('fs');
    var Controller = require('./controller');
    var Repository = require('./repository');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');

    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    fs.readdir(modelsDir, function (err, items) {
        for (var i = 0; i < items.length; i++) {
            var name = items[i].substring(0, items[i].length - 3);
            var model = require(modelsDir + '/' + items[i]);
            var repository = new Repository(name, model);
            var controller = new Controller(name, repository, app);
        }
    });

}

module.exports = new MongoServer();