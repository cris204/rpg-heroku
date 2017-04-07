var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { head: "RPG",
                        title: 'Servicios',
                        Unlock: "desbloquear un personaje: http://localhost:3000/unlock/(id del jugador)?character_id=(id del character)",
                        Stats: "modificar los stats de un character: http://localhost:3000/stats/(id del jugador)?character_id=(id del character)&statToIncrease=(stat a subir)",
                        Team : "ver o modificar el team: http://localhost:3000/team/(id del jugador)?c1=(id del character)&c2=(id del character)&c3=(id del character) puedes cambiar un solo character o los 3 al mismo tiempo",
                        Character : "mirar los stats bases de un character: http://localhost:3000/character/(id del character) ",
                        Battle: 'batalla, saber ganador y perdedor:  http://localhost:3000/battle/(id primer jugador - id segundo jugador)?score1=(score del jugador 1 en esta partida)&score2=(score del jugador 2 en esta partida) los ids van separados por un "-"'});
});

module.exports = router;
