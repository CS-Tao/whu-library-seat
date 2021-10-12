var express = require('express');
var mysql = require("mysql");
var mysqlConfig = require("./mysql.conf");
var router = express.Router();

router.get('/', function(req, res, next) {
  var connection = mysql.createConnection(mysqlConfig.config);

  var queryString = `SELECT account FROM events where code=4 group by account;`;

  connection.query(queryString, (err, results) => {
      if (err) {
        console.error(err.message)
        res.json([]);
        return;
      } else {
        res.json(results.filter(each => each.account.length > 8).map(({ account }) => ({account: account.slice(0, 8) + '*****'})));
      }
  });
  connection.end();
});

module.exports = router;
