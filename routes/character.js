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
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};


router.get('/:user_id?', function(req, res, next) {
  var client = new pg.Client(config);
  var query = url.parse(req.url,true).query;
  id = req.params.user_id;

  client.connect(function (err, client, done) {
    if (err){
      return console.log("error en la conexion");
    }

        client.query('SELECT "character_id", "health_points", "attack_points", "defense_points", "sp_attack_points", "sp_defense_points" FROM "playercharacter" WHERE "player_id" = $1 AND "character_id" = $2', [id, query.character_id], function (err, result){
        if (err){
          return console.error('error runnning query', err);
        }
      res.send(result.rows);
        });



  });
});

module.exports = router;
