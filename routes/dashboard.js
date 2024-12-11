const express = require('express')
const router = express.Router()
const db = require('../database/db')

router.get('/dashboard', (req, res)=>{
    res.render('dashboard.ejs')
})

// //calcula valor total de produtos por empresa
// router.get('/totalProdutos/:id_empresa', (req, res)=>{
//     const id_empresa = req.params.id_empresa
    
//     const query = 
// })

module.exports = router