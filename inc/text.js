return new Promise((resolve, reject) => {

    conn.query(`
        SELECT * FROM tb_users WHERE email = ?
    `, [

        email
    
    ], (err, results) => {
        if (err) {
            reject(err);
        } else {

            if (!results.length > 0){
                reject("Usuario ou senha incorretos")

            } else {

                let row= results[0]
                if(row.password !== password){

                    reject("Usuario ou senhas incorretos")

                } else {
                
                    resolve(row);
                
                }
        
            }
        }
    })
})