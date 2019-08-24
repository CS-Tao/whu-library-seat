var express = require('express');
var mysql = require("mysql");
var mysqlConfig = require("./mysql.conf");
var router = express.Router();

router.get('/', function (req, res, next) {
  var connection = mysql.createConnection(mysqlConfig.config);
  var now = new Date()

  var queryString = `SELECT year, month, day, count(*) as 'count' FROM events where (year=${now.getFullYear()} || year=${now.getFullYear() - 1}) || (year=${now.getFullYear() - 1} && month <= ${now.getMonth() + 1}) || (year=${now.getFullYear() - 1} && month=${now.getMonth() + 1} && day <= ${now.getDate()}) group by year, month, day;`;

  connection.query(queryString, (err, results) => {
    if (err) {
      console.log(err.message)
      res.json([]);
      return;
    } else {
      let data = Object()
      results.forEach(element => {
        data[new Date(element.year, element.month - 1, element.day).getTime().toString().substring(0, 10)] = element.count
      });
      res.json(data);
    }
  });
  connection.end();
});

module.exports = router;
