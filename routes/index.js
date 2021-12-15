var conn = require('./../inc/db');
var menus = require('./../inc/menus');
var reserva = require('./../inc/reservation');
var contato = require('../inc/contacts');
var express = require('express');
const emails = require('../inc/emails');
var router = express.Router();

/* GET home page. */


/* Pagina para Usuarios Comuns*/
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

router.get('/contacts', function (req, res, next) {

  contato.render(req, res);


})

router.post('/contacts', function (req, res, next) {

  if (!req.body.name) {
    contato.render(req, res, "Digite o nome");
  } else if (!req.body.email) {
    contato.render(req, res, "Digite o e-mail");
  } else if (!req.body.message) {
    contato.render(req, res, "Digite a mensagem");
  } else {
    contato.save(req.body).then(results => {
      req.body = {};
      contato.render(req, res, null, "Contato enviado com sucesso!")
      console.log(req.body);
    }).catch(err => {
      contato.render(req, res, err.message);
    });

  }

})

router.get('/services', function (req, res, next) {

  res.render('services', {
    title: 'Serviços - Restaurante Saboroso',
    background: 'images/img_bg_1.jpg',
    h1: 'É um prazer poder servir!'
  });

})

router.get('/reservations', function (req, res, next) {

  reserva.render(req, res);

})

router.post('/reservations', function (req, res, next) {

  if (!req.body.name) {
    reserva.render(req, res, "Digite o nome");

  } else if (!req.body.email) {

    reserva.render(req, res, "Digite o Email");

  } else if (!req.body.people) {

    reserva.render(req, res, "Selecione o numero de pessoas");

  } else if (!req.body.date) {

    reserva.render(req, res, "Selecione a data");

  } else if (!req.body.time) {

    reserva.render(req, res, "Selecione a hora");

  } else {

    reserva.save(req.body).then(results => {

      req.body = {};

      reserva.render(req, res, null, "Reserva realizada com sucesso")

    }).catch(err => {

      reserva.render(req, res, err.message);

    })

  }

})
router.post("/subscribe", function (req, res, next) {
  
  emails.save(req).then(result => {
  
    res.send(result);
  
  }).catch(err => {
  
    res.send(err);
  
  });


})

module.exports = router;