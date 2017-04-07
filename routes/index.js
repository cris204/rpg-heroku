var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { head: "RPG",
                        title: 'Servicios',
                        id: "los user id son 10 y 11, los character id son del 1 al 5 estan desbloqueados los 3 primeros"
                        Unlock: "desbloquear un personaje: https://rpg-master-op.herokuapp.com/(id del jugador)?character_id=(id del character)",
                        Stats: "modificar los stats de un character: https://rpg-master-op.herokuapp.com/(id del jugador)?character_id=(id del character)&statToIncrease=(stat a subir)",
                        Team : "ver o modificar el team: https://rpg-master-op.herokuapp.com/(id del jugador)?c1=(id del character)&c2=(id del character)&c3=(id del character) puedes cambiar un solo character o los 3 al mismo tiempo",
                        Character : "mirar los stats bases de un character: https://rpg-master-op.herokuapp.com/(id del character) ",
                        Battle: 'batalla, saber ganador y perdedor:  https://rpg-master-op.herokuapp.com/(id primer jugador - id segundo jugador)?score1=(score del jugador 1 en esta partida)&score2=(score del jugador 2 en esta partida) los ids van separados por un "-"'});
});

module.exports = router;
