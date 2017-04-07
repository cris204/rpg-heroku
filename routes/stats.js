var express = require('express');
var router = express.Router();
  var pg = require('pg');
  var url = require("url");
  var query=require("pg-query");
/* GET users listing. */

var config = {
  user: 'postgres', //env var: PGUSER
  database: 'rpg', //env var: PGDATABASE
  password: 'cris0717', //env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
};


var client = new pg.Client();

/* GET home page. */
router.get('/:user_id?', function(req, res, next) {
    var client = new pg.Client();
    var query = url.parse(req.url,true).query;
    id = req.params.user_id;
    var statToIncrease = req.query.statToIncrease;
    var pointsToAdd = 1;
    var character_Id=req.query.character;
    var stat="";
      client.connect(function (err, client, done) {
        if (err){
          return console.log("error en la conexion");
        }
    if(id){

        if(character_Id){

          if(statToIncrease){


client.query('SELECT * FROM "playercharacter" WHERE player_id = $1 AND character_id = $2',[id,character_Id], function (err, result){
  if (err){
          return console.error('error runnning query', err);
        }
        var points=0;
        if(result.rows[0]!=null){
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            switch (statToIncrease) { // yolooooooooo 4:55 am

            case "health_points":
              points = +result.rows[0].health_points + +pointsToAdd;
              stat="health_points";
              client.query('UPDATE playercharacter SET health_points= $1 WHERE player_id = $2 AND character_id = $3;',[points,id,character_Id], function (err, result){

                if (err){
                  return console.error('error runnning query', err);
                }

                res.send(" stat update");
              });
              break;
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            case "attack_points":
              points = +result.rows[0].attack_points + +pointsToAdd;
              stat= "attack_points";
              client.query('UPDATE playercharacter SET attack_points = $1 WHERE player_id = $2 AND character_id = $3;',[points,id,character_Id], function (err, result){

                if (err){
                  return console.error('error runnning query', err);
                }

                res.send(" stat update");
              });
              break;
                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            case "defense_points":
              points = +result.rows[0].defense_points + +pointsToAdd;
              stat="defense_points";
              client.query('UPDATE playercharacter SET defense_points = $1 WHERE player_id = $2 AND character_id = $3;',[points,id,character_Id], function (err, result){

                if (err){
                  return console.error('error runnning query', err);
                }

                res.send(" stat update");
              });
              break;
                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            case "sp_attack_points":
              points = +result.rows[0].sp_attack_points + +pointsToAdd;
              stat="sp_attack_points";
              client.query('UPDATE playercharacter SET sp_attack_points = $1 WHERE player_id = $2 AND character_id = $3;',[points,id,character_Id], function (err, result){

                if (err){
                  return console.error('error runnning query', err);
                }
                var stat=result.rows[0];
                res.send(" stat update");
              });
              break;
                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            case "sp_defense_points":
              points = +result.rows[0].sp_defense_points + +pointsToAdd;
              stat="sp_defense_points";
              client.query('UPDATE playercharacter SET sp_defense_points = $1 WHERE player_id = $2 AND character_id = $3;',[points,id,character_Id], function (err, result){

                if (err){
                  return console.error('error runnning query', err);
                }
                var stat=result.rows[0];
                res.send(" stat update");
              });
              break;
                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            default:
                res.send('This is not an stat!');
            }



          }else {
              res.send('pon un id valido');
          }

      });
    }else {
      res.send("inserte que stat quiere mejorar ");
    }
    }else{
        res.send("pon un character id ");
    }

  }else {
      res.send("mejorar stats");
  }
  });
});

module.exports = router;
