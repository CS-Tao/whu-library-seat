var express = require('express');
var mysql = require("mysql");
var mysqlConfig = require("./mysql.conf");
var router = express.Router();

router.get('/', function(req, res, next) {
  var connection = mysql.createConnection(mysqlConfig.config);

  var queryString = `select * from (select * from events where code !=12 order by id desc limit 200) as temp order by id asc;`;

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
