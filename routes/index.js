var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { head: "RPG",
                        title: 'Servicios',
                        UserGold: "Oro del usuario: http://localhost:3000/users/ (el id del usuario)",
                        invenotry: "inventario :http://localhost:3000/inventory/(el id del usuario) ",
                        item : "usar item::http://localhost:3000/inventory/(el id del usuario)?amount=(cantidad de items usados o conseguidos)&item_id=(id del item) ",
                    purchases: 'Comprar:  http://localhost:3000/purchases/(id del usuario))?item=(id del item)'});
});

module.exports = router;
