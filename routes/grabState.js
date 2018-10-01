var express = require('express');
var mysql = require("mysql");
var mysqlConfig = require("./mysql.conf");
var router = express.Router();

router.post('/', function(req, res, next) {
  var connection = mysql.createConnection(mysqlConfig.config);
  var params = req.body;
  console.log(JSON.stringify(params));
  var account = params.account;
  var state = params.state;
  var code = params.code;
  var version = params.version;
  var message = params.message ? message : '';
  var time = new Date(params.time);
  var year = time.getFullYear();
  var month = time.getMonth() + 1;
  var day = time.getDate();
  var hour = time.getHours();
  var min = time.getMinutes();
  var sec = time.getSeconds();
  var events = 'grab';

  var queryString = `Insert into events \
    (account, state, year, month, day, hour, min, sec, event, code, version, message) \
    values ('${account}', ${state}, ${year}, ${month}, ${day}, ${hour}, ${min}, ${sec}, '${events}', ${code}, '${version}', '${message}')`;

  connection.query(queryString, function (err, results) {
      if (err) {
        console.log(err.message)
        res.json({
          'status': 'fail',
          'code': '1',
          'message': 'Error for recording',
          'data': null
        });
        return;
      } else {
        res.json({
          'status': 'success',
          'code': '0',
          'message': '',
          'data': null
        });
      }
  });
  connection.end();
});

module.exports = router;
