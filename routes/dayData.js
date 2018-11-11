var express = require('express');
var mysql = require("mysql");
var mysqlConfig = require("./mysql.conf");
var router = express.Router();

router.get('/', function(req, res, next) {
  var connection = mysql.createConnection(mysqlConfig.config);

  var queryString = `select hour, code, avg(count) as avg from (SELECT year, month, day, hour, code, count(*) as 'count' FROM events where (code=4 || code=6) group by hour, day, month, year, code) temp group by hour, code;`;

  connection.query(queryString, (err, results) => {
      if (err) {
        console.log(err.message)
        res.json([]);
        return;
      } else {
        res.json(results);
      }
  });
  connection.end();
});

module.exports = router;
