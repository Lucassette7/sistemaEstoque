const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'estoque',
    password: ''
})

db.connect(erro =>{
    if(erro){
        console.log('erro ao conectar')
    }
    else{
        console.log('Conectado com sucesso')
    }
})

module.exports = db