const conn  = require("./db")

module.exports = {
    getEmails(){

        return new Promise((s,r)=>{
           
            conn.query(`
                SELECT * FROM tb_emails ORDER BY email
            `, (err,resu)=>{

                if(err){
                    r(err);
                } else {
                    s(resu);
                }

            });
        
        });
    },
    
    delete(id){

        return new Promise((s,r)=>{

            conn.query(`
                DELETE FROM tb_emails WHERE id = ?
            `, [
                id
            ], (err,results)=>{

                if(err){
                    r(err);
                } else {
                    s(results);
                }
    
            });

        });

    },
    save(req){

        return new Promise((s,r)=>{
            if(!req.fields.email){
                res.send({
                  error: "Preecha o email"
                });
              } else {
              
                conn.query(`
                  INSERT INTO tb_emails (email) VALUES (?)
                `,[
                  req.fields.email
                ], (err, results)=>{


                    if (err) {
                        r(err)
                    }else{
                        s(results)
                    }
                    s(results)

                });
              
              }
        })
    }

}