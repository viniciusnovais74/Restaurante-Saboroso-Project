var express = require("express");
var router = express.Router();
var users = require('./../inc/users');
var admin = require('./../inc/admin');
var menus = require('./../inc/menus');
const { route } = require(".");

//Rotaa Inicial com Mindleware de autenticação
router.use(function (req, res, next) {

    if (['/login'].indexOf(req.url) === -1 && !req.session.user) {
        res.redirect("/admin/login");
    } else {
        next();
    }

});

router.use(function (req, res, next) {

    req.menus = admin.getMenus(req);

    next();

});

//Logout Session
router.get("/logout", function (req, res, next) {

    delete req.session.user;
    res.redirect("/admin/login");
});

//Home page
router.get('/', function (req, res, next) {

    res.render("admin/index", {
        menus: req.menus,
        user: req.session.user
    });
});

//Login page
router.get('/login', function (req, res, next) {

    users.render(req, res, null);

});

//Login Session
router.post("/login", function (req, res, next) {

    if (!req.body.email) {

        users.render(req, res, "Preencha o campo e-mail");

    } else if (!req.body.password) {

        users.render(req, res, "Preencha o campo senha");

    } else {

        users.login(req.body.email, req.body.password).then(user => {


            req.session.user = user;

            res.redirect("/admin");

        }).catch(err => {

            users.render(req, res, err.message || err);

        })

    }

});

//Contacts page
router.get('/contacts', function (req, res, next) {

    res.render("admin/contacts", {

    });
});

//Email page
router.get('/emails', function (req, res, next) {

    res.render("admin/emails", admin.getParams(req));

});

//Menus page
router.get('/menus', function (req, res, next) {

    menus.getMenus().then(data => {
        res.render("admin/menus", admin.getParams(req, { data }));
    })
});
router.post('/menus', function (req, res, next) {
    res.send(req.fields);
});

//Reservation page
router.get('/reservations', function (req, res, next) {

    res.render("admin/reservations", admin.getParams(req, { date: {} }));

});

//Users page
router.get('/users', function (req, res, next) {

    res.render("admin/users", admin.getParams(req));

});

module.exports = router;