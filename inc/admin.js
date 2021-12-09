const conn = require("./db");
const menus = require("./menus");

module.exports = {

    dashboard() {
        return Promise((resolve, reject) => {
            connect.query(`
        SELECT
        (SELECT COUNT(*) FROM tb_contacts) AS nrcontacts,

        (SELECT COUNT(*) FROM tb_menus) AS nrmenus,

        (SELECT COUNT(*) FROM tb_reservations) AS nrreservations,

        (SELECT COUNT(*) FROM tb_users) AS nrusers;
            
        `, (err, results) => {
                if (err) {
                    reject(err);

                } else {
                    resolve(results[0]);
                }
            })
        })
    },

    getParams(req, params) {
        return Object.assign({}, {
            menus: req.menus,
            user: req.session.user
        })
    },

    getMenus(req) {
        return [{
            text: "Tela Inicia",
            href: "/admin",
            icon: "home",
            active: false
        }, {
            text: "Menu",
            href: "/admin/menus",
            icon: "home",
            active: false
        }, {
            text: "Tela Inicia",
            href: "/admin",
            icon: "home",
            active: false
        }, {
            text: "Tela Inicia",
            href: "/admin",
            icon: "home",
            active: false
        },
        ];

        menus.map(menus => {
            if (menus.href === `/admin${req.url}`) menus.active = true;

        });
        return munu
    }

}