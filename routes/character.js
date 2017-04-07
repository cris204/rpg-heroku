var express = require('express');
var router = express.Router();
  var pg = require('pg');
  var url = require("url");
/* GET users listing. */

var config = {
  user: 'neythggc', //env var: PGUSER
  database: 'neythggc', //env var: PGDATABASE
  password: 'SxB8mbKS7G_LukO8regsFmmwd1CUfeff', //env var: PGPASSWORD
  host: 'stampy.db.elephantsql.com', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
};

  var client = new pg.Client(config);
router.get('/:user_id?', function(req, res, next) {
  var client = new pg.Client(config);
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
