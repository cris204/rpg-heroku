var express = require('express');
var router = express.Router();

var url = require("url");
var bodyparser = require ("body-parser");
var app = express();
app.use(bodyparser.json());
app.use (bodyparser.urlencoded({extended:true}));
var pg = require ('pg');


var config = {
  user: 'postgres', //env var: PGUSER
  database: 'rpg', //env var: PGDATABASE
  password: 'cris0717', //env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};


/* GET home page. */
router.get('/:user_id?', function(req, res, next) {
  var client = new pg.Client();

  client.connect(function (err, client, done) {
    if (err){
      return console.log("error en la conexion");
    }
  var query = url.parse(req.url,true).query;
    var character_id = req.query.character_id;
  var user_id = req.params.user_id;

  
  if(user_id)
  {
    if(character_id){

      client.query('SELECT "base_health", "base_attack", "base_defense", "base_sp_attack", "base_sp_defense" FROM "character" WHERE "character_id" = $1 ', [character_id], function (err, result){
        if (err){
          return console.error('error runnning query', err);
        }
        if (result.rows[0] == null)
        {
          res.send("No ha introducido un id válido, porfavor revise nuevamnte los IDs válidos");
        }else {


        client.query('INSERT INTO playercharacter (player_id, character_id, health_points, attack_points, defense_points, sp_attack_points, sp_defense_points) VALUES ($1,$2,$3,$4,$5,$6,$7) ON CONFLICT (player_id, character_id) DO NOTHING;', [user_id,character_id, result.rows[0].base_health,result.rows[0].base_attack,result.rows[0].base_defense,result.rows[0].base_sp_attack,result.rows[0].base_sp_defense], function (err, data){
          if (err){
            return console.error('error runnning query', err);
          }
          if (data.rows[0] != null)//organizar el if
          {
            res.send("Usted ya tiene un persoanje con este ID, ingrese un ID que aún no tenga en su lista.")
          }else{
          res.send("Ha incluido un nuevo personaje a su lista.")
        }
        });

      }
     });
    }
    else {
      client.query('SELECT * FROM "character"',  function (err, data){
        if (err){
          return console.error('error runnning query', err);
        }
        res.send(data.rows);
      });
    }
  }
  else {
    res.send("Ha ingresado a desbloquear un perosnaje")
    return;
  }
});
});

function do_unlock(){
  router.post('/:character_id?', function(req, res, next) {
    //ENTREGAR EL PERSONAJE DESBLOQUEADO
    client.query('INSERT INTO user_character (user_id,item_id, amount) VALUES ($1,$2,1)', [character_id], function (err, data){
      if (err){
        return console.error('error runnning query', err);
      }
      if (data.rows[0] == null)
      {
        res.send("Ha ingresado un ID inexistenete para un personaje. IDs disponibles: 11, 12, 13.")
        return;
      }
    });
  });
}


module.exports = router;
