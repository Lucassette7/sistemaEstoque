const express = require('express')
const router = express.Router()
const db = require('../database/db')

router.get('/dashboard', (req, res)=>{
    res.render('dashboard.ejs')
})

router.get('/populaDatatable/:id_empresa', (req, res)=>{
    const id_empresa = req.params.id_empresa

    const query = 'SELECT * FROM produto WHERE id_empresa = ?'

    db.query(query, [id_empresa], (erro, results)=>{
        if(erro){
            return res.status(404).json('Erro')
        }
        if(results.length > 0){
            return res.json({data: results})
        }
    })
})

module.exports = router