let express = require('express');
let app = express();
let router = express.Router();

//REST API
router.route('/')
  .get(function(req, res, next) {
    res.send('Hello from the api');
  });

router.route('/user')
  .get(function(req, res, next) {
    res.send('Get users');
  });

module.exports = router;
