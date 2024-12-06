const express = require("express")
const router = express.Router()
const db = require('../database/db')

router.get('/',(req, res)=>{
    res.render('login.ejs')
}) 



router.post('/salvarCadastro', (req, res)=>{
    const {nome, telefone, email, cnpj, senha} = req.body

    const query = 'INSERT INTO empresa (nome_empresa, cnpj, email, telefone, senha) VALUES (?, ?, ?, ?, ?)'

    db.query(query, [nome, cnpj, email, telefone, senha], (erro, results)=>{
        if(erro){
            return res.status(404).json({success: false})
        }
        if(results.affectedRows > 0){
            return res.json({success: true})
        }
    })
})

module.exports = router