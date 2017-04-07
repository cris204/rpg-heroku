var express = require('express');
var router = express.Router();
  var pg = require('pg');
  var url = require("url");
/* GET users listing. */

var config = {
  user: 'postgres', //env var: PGUSER
  database: 'rpg', //env var: PGDATABASE
  password: 'cris0717', //env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432 ||3000, //env var: PGPORT
};

  var client = new pg.Client();
router.get('/:user_id?', function(req, res, next) {
  var client = new pg.Client();
  var query = url.parse(req.url,true).query;
  char_id = req.params.user_id;

  client.connect(function (err, client, done) {
    if (err){
      return console.log("error en la conexion");
    }
    if(char_id){
            client.query('SELECT * FROM "character" WHERE "character_id" = $1  ', [char_id], function (err, result){
            if (err){
              return console.error('error runnning query', err);
            }
            if(result.rows[0]!=null){
          res.send(result.rows);
        }else{
          res.send("ingrese un id valido")
        }
    });


    }else {
      res.send("ingrese un character id para ver los stats")
    }
  });
});

module.exports = router;
