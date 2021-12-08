var conn = require('./../inc/db');
var menus = require('./../inc/menus');
var reserva = require('./../inc/reservation');
var express = require('express');
var router = express.Router();

/* GET home page. */


router.get('/', function (req, res, next) {

  conn.query(`
    SELECT * FROM tb_menus ORDER BY title
  `, (err, results) => {
    if (err) {
      console.log(err);
    }
    res.render('index', {
      title: 'Restaurante Saboroso!',
      menus: results,
      inicio: true
    });

  })

});

router.get('/contacts', function (req, res, next) {

  res.render('contact', {
    title: 'Contato - Restaurante Saboroso',
    background: 'images/img_bg_3.jpg',
    h1: 'Diga um oi!'
  });

})

router.get('/menus', function (req, res, next) {

  menus.getMenus().then(result => {
    res.render('menu', {
      title: 'Menus - Restaurante Saboroso',
      background: 'images/img_bg_1.jpg',
      h1: 'Saboreie nosso menu!',
      menus: result
    });
  })



})

router.get('/reservations', function (req, res, next) {

  reserva.render(res, req);

})

router.post('/reservations', function (req, res, next) {

  if (!req.body.name) {
    reserva.render(res, req, "Digite o nome");
  } else if (!req.body.email) {
    reserva.render(res, req, "Digite o Email");
  } else if (!req.body.people) {
    reserva.render(res, req, "Selecione o numero de pessoas");
  } else if (!req.body.date) {
    reserva.render(res, req, "Selecione a data");
  } else if (!req.body.time) {
    reserva.render(res, req, "Selecione a hora");
  } else {
    reserva.save(req.body).then(results => {
    
      reserva.render(req, res, null, "Reserva realizada com sucesso")
    
    }).catch(err => {

      reserva.render(req, res, err);
    
    })
  
  }

})

router.get('/services', function (req, res, next) {

  res.render('services', {
    title: 'Serviços - Restaurante Saboroso',
    background: 'images/img_bg_1.jpg',
    h1: 'É um prazer poder servir!'
  });

})

module.exports = router;