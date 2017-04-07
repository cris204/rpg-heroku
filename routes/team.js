var express = require('express');
var router = express.Router();

var url = require("url");
var bodyparser = require ("body-parser");
var app = express();
app.use(bodyparser.json());
app.use (bodyparser.urlencoded({extended:true}));
var pg = require ('pg');

var item_id;

var config = {
  user: 'postgres',
  database: 'rpg',
  password: 'cris0717',
  host: 'localhost',
  port: 5432,
};
var client = new pg.Client(config);

/* GET home page. */
router.get('/:user_id?', function(req, res, next) {
  var client = new pg.Client(config);
  var query = url.parse(req.url,true).query;
  var  id = req.params.user_id;
  var c1=query.c1 ||0;
  var c2=query.c2 ||0;
  var c3=query.c3 ||0;
  var team;
  var team_ids=[];
  client.connect(function (err, client, done) {
    if (err){return console.log("error en la conexion");}

    if(id){

      client.query('SELECT * FROM "team" WHERE "player_id" = $1', [id], function (err, result){ //organizar inner join depronto
        if (err){return console.error('error runnning query', err);}

        if(result.rows[0]!=null){

          team_ids[0]=result.rows[0]["character_id_1"];
          team_ids[1]=result.rows[0]["character_id_2"];
          team_ids[2]=result.rows[0]["character_id_3"];

          if(c1 || c2 || c3){
            (c1 != 0) ? c1=c1 : c1=team_ids[0];
            (c2 != 0) ? c2=c2 : c2=team_ids[1];
            (c3 != 0) ? c3=c3 : c3=team_ids[2];

            if((c1 == c2) || (c2 == c3) || (c1 == c3))
            {
              res.send("no puedes repetir personaje")
            }
            else{
            client.query('SELECT * FROM "playercharacter" WHERE player_id = $1 AND character_id = $2 AND character_id !=$3 AND character_id !=$4 OR player_id = $1 AND character_id = $3 AND character_id !=$2 AND character_id !=$4 OR player_id = $1 AND character_id = $4 AND character_id !=$3 AND character_id !=$2',[id,c1,c2,c3], function (err, resultr){
                if (err){
                        return console.error('error runnning query', err);
                      }

                      if(resultr.rows[0]==null){
                      res.send("usted no tiene este personaje actualmente o ya lo esta usando");
                      }else{

                          if(resultr.rows[0]!=null&&resultr.rows[1]!=null&&resultr.rows[2]!=null){
                               client.query('UPDATE "team" SET character_id_1 = $1, character_id_2 = $2, character_id_3 = $3 WHERE player_id = $4',[c1,c2,c3,id],function(err,data){
                                  if (err){return console.error('error runnning query', err);}

                                  client.query('SELECT * FROM "team" WHERE "player_id" = $1', [id], function (err, result){ //organizar inner join depronto
                                    if (err){return console.error('error runnning query', err);}

                                    res.send("Este es su nuevo equipo:"+ "</br>" + JSON.stringify(result.rows));
                                  });
                                });
                      }else{
                          res.send("verifique los character id");
                      }
                  }
              });
            }
          }
          else{
            team = JSON.stringify(result.rows[0])
            client.query('SELECT * FROM "playercharacter" WHERE "player_id" = $1', [id], function (err, result){
              if (err){return console.error('error runnning query', err);}
              var inventory = JSON.stringify(result.rows)
            res.send("Este es tu equipo: " + '<br>' + '<br>' + team + '<br>' + '<br>' + "Estos son todos los personajes disponibles (actales incluidos)." + '<br>'+ "No puede repetir prsonajes:" + '<br>'+ '<br>'+ inventory );
            });
          }
        }
      else {
      res.send("Ingrese un id válido");
      }
      });
    }
    else{
      res.send("Ingrese un id para exponer un team.");
    }
  });
});


module.exports = router;
