var express = require('express');
var mysql = require("mysql");
var mysqlConfig = require("./mysql.conf");
var router = express.Router();

router.get('/', function (req, res, next) {
  var connection = mysql.createConnection(mysqlConfig.config);
  var now = new Date()

  var queryString = `SELECT year, month, day, count(*) as 'count' FROM events where (code = 6 && (year=${now.getFullYear()} || year=${now.getFullYear() - 1}) || (year=${now.getFullYear() - 1} && month <= ${now.getMonth() + 1}) || (year=${now.getFullYear() - 1} && month=${now.getMonth() + 1} && day <= ${now.getDate()})) group by year, month, day;`;

  var serverDownTimeList = [
    {
      begin: new Date(2019, 7 - 1, 8).getTime(),
      end: new Date(2020, 1 - 1, 5).getTime()
    }
  ]

  connection.query(queryString, (err, results) => {
    if (err) {
      console.log(err.message)
      res.json([]);
      return;
    } else {
      let data = Object()
      results.forEach(element => {
        // 服务器宕机时间补充
        serverDownTimeList.forEach(serverDownTime => {
          for (var downDay = serverDownTime.begin; downDay < serverDownTime.end; downDay+=86400000) {
            data[new Date(downDay).getTime().toString().substring(0, 10)] = 1
          }
        })
        data[new Date(element.year, element.month - 1, element.day).getTime().toString().substring(0, 10)] = element.count
      });
      res.json(data);
    }
  });
  connection.end();
});

module.exports = router;
