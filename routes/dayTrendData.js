var express = require('express');
var mysql = require("mysql");
var mysqlConfig = require("./mysql.conf");
var router = express.Router();

router.get('/', function(req, res, next) {
  var connection = mysql.createConnection(mysqlConfig.config);

  var queryString = `SELECT year, month, day, count(*) as 'count' FROM events group by year, month, day order by year desc, month desc, day desc limit 7;`;

  connection.query(queryString, (err, results) => {
      if (err) {
        console.error(err.message)
        res.json([]);
        return;
      } else {
        res.json(results);
      }
  });
  connection.end();
});

module.exports = router;
