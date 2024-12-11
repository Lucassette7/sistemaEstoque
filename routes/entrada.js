const express = require('express')
const router = express.Router()
const db = require('../database/db')

router.get('/entrada',(req, res)=>{
    res.render('entrada.ejs')
})


//popula produto
router.get('/populaProdutos/:id_empresa',(req, res)=>{
    const id_empresa = req.params.id_empresa

    const query = 'SELECT * FROM produto WHERE id_empresa = ?'

    db.query(query, [id_empresa], (erro, results)=>{
        if(erro){
            return res.status(403).send('Erro no servidor tente novamente mais tarde')
        }
        if(results.length > 0){
            return res.json(results)
        }
    })
})

//popula fornecedor
router.get('/populaFornecedor/:id_empresa', (req, res)=>{
    const id_empresa = req.params.id_empresa

    const query = 'SELECT id_fornecedor, nome FROM fornecedor WHERE id_empresa = ?'

    db.query(query, [id_empresa], (erro, results)=>{
        if(erro){
            return res.status(403).json('erro no servidor tente novamente mais tarde')
        }
        if(results.length > 0){
            return res.json(results)
        }
    })
})

//salva entrada
router.post('/salvarEntrada',(req, res)=>{
    const {produto, quantidade, fornecedor, id_empresa} = req.body

    const query = 'UPDATE produto set quantidade = ? WHERE id_produto = ? and id_empresa = ?'

    db.query(query, [quantidade, produto, id_empresa], (erro, results)=>{
        if(erro){
            return res.status(403).send()
        }
        if(results.affectedRows > 0){
            return res.json({success: true})
        }
    })
})
module.exports = router