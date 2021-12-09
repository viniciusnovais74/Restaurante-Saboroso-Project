var conn = require('./db');
let path = require('path');

module.exports = {
    getMenus() {

        return new Promise((resolve, reject) => {
            conn.query(`
            SELECT * FROM tb_menus ORDER BY title
                `, (err, result) => {
                if (err) {
                    reject(err);

                }

                resolve(result);
            })
        })
    },
    save(fields, files){

        return new Promise((resolve, reject)=>{

            fields.photo = path.parse((files.photo.path).base)

            conn.query(`
            INSERT INTO tb_menus( title, description, price, photo)
            VALUES (?,?,?,?)
            `, [ 
                fields.title,
                fields.description,
                fields.price,
                `images/${files.photo.name}`
            ], (err, results)=>{
                if(err){
                    reject(err);
                } else {
                    resolve(results);
                }
            })

        })
    }
}