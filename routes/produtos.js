const express = require('express')
const router = express.Router()
const db = require('../database/db')

router.get('/produtos', (req, res)=>{
    res.render('produtos.ejs')
})

//CADASTRA CATEGORIA
router.post('/cadastraCategoria/:categoria/:id_empresa',(req, res)=>{
    const categoria = req.params.categoria
    const id_empresa = req.params.id_empresa
    
    const query = 'INSERT INTO categoria (categoria, id_empresa) VALUES (?, ?)'

    db.query(query, [categoria, id_empresa], (erro, results)=>{
        if(erro){
            return res.status(400).json('Erro')
        }
        if(results.affectedRows > 0){
            return res.json({success: true})
        }
    })
})


//POPULA CATEGORIA
router.get('/populaCategoria/:id_empresa', (req, res)=>{
    const id_empresa = req.params.id_empresa
    
    const query = 'SELECT * FROM categoria WHERE id_empresa = ?'

    db.query(query,[id_empresa],(erro, results)=>{
        if(erro){
            return res.json('erro')
        }
        if(results.length > 0){
            return res.json(results)
        }
    })
})


//ADICIONA PRODUTO
router.post('/adicionaProduto/:id_empresa', (req, res)=>{
    const id_empresa = req.params.id_empresa
    const {categoria, marca, produto, cor, valor, descricao} = req.body


    const query = 'SELECT * FROM categoria WHERE categoria = ? and id_empresa = ?'

    db.query(query, [categoria, id_empresa], (erro, results)=>{
        if(erro){
            return res.json('erro')
        }
        if(results.length > 0){
            const id_categoria = results[0].id_categoria
            
            const query2 = 'INSERT INTO produto (id_categoria, id_empresa, produto, marca, cor, valor, descricao) VALUES (?, ?, ?, ?, ?, ?, ?)'
            db.query(query2, [id_categoria, id_empresa, produto, marca, cor, valor, descricao], (erro, results)=>{
                if(erro){
                    return res.json('erro')
                }
                if(results.affectedRows > 0){
                    return res.json({success: true})
                }
                else{
                    return res.json({success: false})
                }
            })
        }
    })
})
module.exports = router