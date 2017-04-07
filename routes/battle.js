var express = require('express');
var router = express.Router();

var url = require("url");
var bodyparser = require ("body-parser");
var app = express();
app.use(bodyparser.json());
app.use (bodyparser.urlencoded({extended:true}));
var pg = require ('pg');

var item_id;
var user_list = [];
var winner_id;
var losser_id;
var amount_valid_id=0;

var config = {
  user: 'postgres', //env var: PGUSER
  database: 'rpg', //env var: PGDATABASE
  password: 'cris0717', //env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT

};

var client = new pg.Client();


/* GET home page. */
router.get('/:users_id?', function(req, res, next) {
  var users_id = req.params.users_id;
  var query = url.parse (req.url, true).query;
  var score1 = query.score1;
  var score2 = query.score2;
  var query_data=[];
  client = new pg.Client();
  client.connect (function (err, client, done){
    if (err){return console.error('error runnning query', err);}
    if(users_id)
    {
      user_list[0] = users_id.split('-')[0]
      user_list[1] = users_id.split('-')[1]

      client.query('SELECT count (1) FROM leaderboard WHERE "player_id" in ($1, $2)', [user_list[0], user_list[1]], function (err, result){
        if (err){return console.error('error runnning query', err);}

        if(result.rows[0]["count"] == 2)
        {
          if((query.score1 && query.score2))
          {
            compare_scores(score1,score2, user_list);
            for (var i = 0; i <= 1; i++) {

                client.query('UPDATE leaderboard SET score = score + $1 WHERE player_id = $2', [(i == 0) ? 10 : -10,(i == 0) ? winner_id : losser_id], function (err, result){
                  if (err){return console.error('error runnning query', err);}
                });
            }
            client.query('SELECT * FROM leaderboard ORDER BY score DESC', function (err, result){
              if (err){return console.error('error runnning query', err);}
              var leaderboard=""
              for (var i = 0; i < result.rows.length; i++) {
                leaderboard += (JSON.stringify(result.rows[i]) +'</br>')
              }
              res.send("El usuario: " + winner_id + " es el ganador." +'</br>'+"El usuario : " + losser_id + " es el perdedor." +'</br>'+"Score global:" +'</br>'+'</br>'+leaderboard)
            });
          }
          else{
            res.send("introduce el score de los jugadores para determinar el resultado de la partida")
          }
        }
        else{
        //hacer un split para separar a varibale ne los dos ids que se necesitan.
        res.send("verifica los id")
        return;
        }
      });
    }
    else{
      res.send("Ingrese dos ids y su puntaje en la partida para emepzar")
    }
  });

});

function compare_scores(score1, score2, user_list)
{
  if(score1 > score2)
  {
    winner_id = user_list[0]
    losser_id = user_list[1]
  }
  else{
    winner_id = user_list[1]
    losser_id = user_list[0]
  }
}

module.exports = router;
