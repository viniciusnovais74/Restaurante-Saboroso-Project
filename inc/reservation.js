var conn = require('./db');
module.exports = {

    render(req, res, error, success) {

        res.render('reservation', {
            title: 'Reservas  - Restaurante Saboroso',
            background: 'images/img_bg_2.jpg',
            h1: 'Reserve uma Mesa!',
            body: req.body,
            error,
            success
        });

    },
    save(fields) {

        return new Promise((resolve, reject) => {

            let date = fields.date.split('/');

            date = date[];

            conn.query(`
        INSERT INTO tb_reservations (name, email, people, date, time) VALUES(?, ?, ?, ?, ?);
        `, [
                fields.name,
                fields.email,
                fields.people,
                fields.date,
                fields.time
            ], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
}