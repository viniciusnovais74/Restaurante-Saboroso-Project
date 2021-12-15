
const conn = require("./db")

module.exports = {

    render(req, res, error) {
        res.render("admin/login", {
            body: req.body,
            error
        })
    },

    login(email, password) {

        return new Promise((resolve, reject) => {

            conn.query(`
                SELECT * FROM tb_users WHERE email = ?
            `, [

                email

            ],
                (err, results) => {

                    if (err) {

                        reject(err);

                    } else {

                        if (!results.length > 0) {

                            reject("Usuario ou senha incorretos")

                        } else {

                            let row = results[0]

                            if (row.password !== password) {

                                reject("Usuario ou senhas incorretos")

                            } else {

                                resolve(row);

                            }

                        }
                    }
                })
        })
    },

    getUsers() {

        return new Promise((resolve, reject) => {

            conn.query(`
                SELECT * FROM tb_users ORDER BY name
            `, (err, result) => {

                if (err) {

                    reject(err);

                }

                resolve(result);

            });

        });

    },

    save(fields) {

        return new Promise((resolve, reject) => {

            let query, params = [
                fields.name,
                fields.email,

            ];

            if (parseInt(fields.id) > 0) {

                params.push(fields.id);

                query = `
                    UPDATE tb_users
                    SET name = ?,
                        email = ?
                    WHERE id = ?
                `;

            } else {

                query = ` 
                    INSERT INTO tb_users( name, email, password)
                    VALUES (?, ?, ?)
                `;

                params.push(fields.password);
            }

            conn.query(query, params, (err, results) => {

                if (err) {

                    reject(err);

                } else {

                    resolve(results);

                }

            });

        });

    },

    delete(id) {

        return new Promise((resolve, reject) => {

            conn.query(`
                DELETE FROM tb_users WHERE id = ?
            `, [
                id
            ], (err, results) => {

                if (err) {
                    reject(err)
                } else {
                    resolve(results);
                }

            });

        });

    },
    changePassword(req) {

        return new Promise((s, r) => {

            if (!req.fields.password) {
                r('Preencha  a Senha.');
            } else if (req.fields.password !== req.fields.passwordConfirm) {
                r('As senhas não são iguais');
            } else {

                conn.query(`
                    UPDATE tb_users SET password = ? WHERE id = ?`,
                    [
                        req.fields.password,
                        req.fields.id
                    ], (err, result) => {

                        if (err) {
                        
                            r(err.message);
                        
                        } else {
                        
                            s(result)
                        
                        }
                    
                    });

            }
        })
    }
}