var express = require('express');
var router = express.Router();

var url = require("url");
var bodyparser = require ("body-parser");
var app = express();
app.use(bodyparser.json());
app.use (bodyparser.urlencoded({extended:true}));
var pg = require ('pg');

var item_id;

/*var config = {
  user: 'postgres',
  database: 'rpg',
  password: 'cris0717',
  host: 'localhost',
  port: 5432,
};*/
var client = new pg.Client();

/* GET home page. */
router.get('/:user_id?', function(req, res, next) {
  var client = new pg.Client();
  var query = url.parse(req.url,true).query;
  var  user_id = req.params.user_id;
  var c1=query.c1 || 0;
  var c2=query.c2 || 0;
  var c3=query.c3 || 0;
  var team;
  var team_ids=[];
  client.connect(function (err, client, done) {
    if (err){return console.log("error en la conexion");}
    if(user_id){
      client.query('SELECT * FROM "team" WHERE "player_id" = $1', [user_id], function (err, result){ //organizar inner join depronto
        if (err){return console.error('error runnning query', err);}
        if(result.rows[0]!=null){
          team_ids[0]=result.rows[0]["character_id_1"];
          team_ids[1]=result.rows[0]["character_id_2"];
          team_ids[2]=result.rows[0]["character_id_3"];
          if(c1 || c2 || c3){
            (c1 != 0) ? c1=c1 : c1=team_ids[0];
            (c2 != 0) ? c2=c2 : c2=team_ids[1];
            (c3 != 0) ? c3=c3 : c3=team_ids[2];
            console.log(c1 + c2 + c3);
            if((c1 == c2) || (c2 == c3) || (c1 == c3))
            {
              res.send("Tiene algun pesonaje duplicado y no eso no esta permitido. Revise nuevamente su equipo")
            }
            else{
              client.query('UPDATE "team" SET character_id_1 = $1, character_id_2 = $2, character_id_3 = $3 WHERE player_id = $4',[c1,c2,c3,user_id],function(err,data){
                if (err){return console.error('error runnning query', err);}
                res.send("Este es su nuevo equipo:"+ "</br>" + JSON.stringify(result.rows));
              });
            }
          }
          else{
            team = JSON.stringify(result.rows[0])
            client.query('SELECT * FROM "playercharacter" WHERE "player_id" = $1', [user_id], function (err, result){
              if (err){return console.error('error runnning query', err);}
              var inventory = JSON.stringify(result.rows)
            res.send("Este es su equipo actual: " + '<br>' + '<br>' + team + '<br>' + '<br>' + "Estos osn todos sus personajes disponibles (actales incluidos)." + '<br>'+ "No puede repetir prsonajes para armas su equipo:" + '<br>'+ '<br>'+ inventory );
            });
          }
        }
      else {
      res.send("Ingrese un user_id válido");
      }
      });
    }
    else{
      res.send("Ingrese un user_id para exponer un team.");
    }
  });
});

router.post('/:user_id?/change', function(req, res, next) {
  //dar las opciones de equipos que tenga
});


module.exports = router;
