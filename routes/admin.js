var express = require("express");
var router = express.Router();
var users = require('./../inc/users');
var admin = require('./../inc/admin');
var menus = require('./../inc/menus');
var emails = require('./../inc/emails');
var reservations = require('./../inc/reservation');
var moment = require('moment');
const contacts = require("./../inc/contacts");

moment.locale("pt-BR");

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

    res.render("admin/index", admin.getParams(req));

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

    contacts.getContacts().then(data => {

        res.render("admin/contacts", admin.getParams(req, {
            data
        }));

    })

});

router.delete("/contacts/:id", function (req, res, next) {

    contacts.delete(req.params.id).then(results => {
        res.send(results);
    }).catch(err => {
        res.send(err);
    })


})

//Email page
router.get('/emails', function (req, res, next) {

    emails.getEmails().then(data => {

        res.render("admin/emails", admin.getParams(req, {

            data

        }));

    })

});

router.delete('/emails/:id', function (req, res, next) {

    emails.delete(req.params.id).then(results => {
        res.send(results);
    }).catch(err => {
        res.send(err);
    })

})

//Menus page
router.get('/menus', function (req, res, next) {

    menus.getMenus().then(data => {

        res.render("admin/menus", admin.getParams(req, { data }));

    });

});
router.post('/menus', function (req, res, next) {

    menus.save(req.fields, req.files).then(results => {

        res.send(results);

    }).catch(err => {

        res.send(err);

    });

});

router.delete("/menus/:id", function (req, res, next) {

    menus.delete(req.params.id).then(results => {

        res.send(results);

    }).catch(err => {
        res.send(err);
    });

});

//Reservation page
router.get('/reservations', function (req, res, next) {

    let start = (req.query.start) ? req.query.start : moment().subtract(1, 'year').format('YYYY-MM-DD')
    let end = (req.query.end) ? req.query.end : moment().format('YYYY-MM-DD')

    reservations.getReservations(req).then(pag => {

        res.render("admin/reservations", admin.getParams(req, {
            date: {
                start,
                end,
            },
            data: pag.data,
            moment,
            links: pag.links
        }));
    })



});
router.get('/reservations/chart', function (req,res,next) {

    req.query.start = (req.query.start) ? req.query.start : moment().subtract(1, 'year').format('YYYY-MM-DD')
    req.query.end = (req.query.end) ? req.query.end : moment().format('YYYY-MM-DD');

    reservations.chart(req).then(chartData=>{
       
        res.send(chartData);
    
    })
    
})

router.post('/reservations', function (req, res, next) {

    reservations.save(req.fields, req.files).then(results => {

        res.send(results);

    }).catch(err => {

        res.send(err);

    });

});

router.delete("/reservations/:id", function (req, res, next) {

    reservations.delete(req.params.id).then(results => {

        res.send(results);

    }).catch(err => {

        res.send(err);

    });

});

//Users page
router.get('/users', function (req, res, next) {

    users.getUsers().then(data => {

        res.render("admin/users", admin.getParams(req, {
            data
        }));

    });


});

router.post('/users', function (req, res, next) {

    users.save(req.fields).then(results => {

        res.send(results);

    }).catch(err => {

        res.send(err);

    });

});

router.delete('/users/:id', function (req, res, next) {

    users.delete(req.params.id).then(results => {

        res.send(results);

    }).catch(err => {

        res.send({
            error: err
        });

    });

});

router.post("/users/password-change", function (req, res, next) {

    users.changePassword(req).then(results => {

        res.send(results);

    }).catch(err => {

        res.send(err);

    });

});

module.exports = router;