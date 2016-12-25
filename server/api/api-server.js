module.exports = function(app) {
    app.get('/api/', function(req, res) {
      res.send('Hello from the api');
      //res.render('index', { title: 'index' });
    });

    app.get('/api/user', function(req, res) {
      res.send('Hello from the api');
      //res.render('index', { title: 'index' });
    });
}
