let express = require('express');
let app = express();
let router = require('./api/api-server');

app.use('/api', router);

app.get('/', function(req, res) {
    res.send('Hello world');
});

let server = app.listen(3000, function() {
    console.log('Express is listening to http://localhost:3000');
});

module.exports = server;
