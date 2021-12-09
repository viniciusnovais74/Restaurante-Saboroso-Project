const menus = require("./menus");

module.exports = {

    getMenus() {
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