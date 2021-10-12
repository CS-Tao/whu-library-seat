var express = require('express');
var mysql = require("mysql");
var md5 = require('js-md5');
var mysqlConfig = require("./mysql.conf");
var router = express.Router();

router.get('/', function(req, res, next) {
  var connection = mysql.createConnection(mysqlConfig.config);

  var queryString = `select * from (select * from events where code !=12 order by id desc limit 200) as temp order by id asc;`;

  connection.query(queryString, (err, results) => {
      if (err) {
        console.error(err.message)
        res.json([]);
        return;
      } else {
        for (let i = 0; i< results.length; i++) {
          results[i].account = md5(results[i].account + process.env.ENCRYPT_KEY || '')
          if (results[i].githubId) {
            results[i].githubId = md5(results[i].githubId + process.env.ENCRYPT_KEY || '')
          }
        }
        res.json(results);
      }
  });
  connection.end();
});

module.exports = router;
