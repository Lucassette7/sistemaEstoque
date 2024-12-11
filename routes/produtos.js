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
    const {id_fornecedor, categoria, marca, produto, cor, valor, descricao, medida} = req.body
    console.log(id_empresa)
    console.log(categoria)
    console.log(marca)
    console.log(produto)
    console.log(cor)
    console.log(valor)
    console.log(descricao)
    console.log(id_fornecedor)


    const query = 'SELECT * FROM categoria WHERE categoria = ? and id_empresa = ?'

    db.query(query, [categoria, id_empresa], (erro, results)=>{
        if(erro){
            return res.json('erro')
        }
        if(results.length > 0){
            const id_categoria = results[0].id_categoria
            
            const query2 = 'INSERT INTO produto (id_categoria, id_empresa, id_fornecedor, produto, marca, cor, valor, descricao,  medida) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
            db.query(query2, [id_categoria, id_empresa, id_fornecedor, produto, marca, cor, valor, descricao,  medida], (erro, results)=>{
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

//popula fornecedor
router.get('/populaFornecedor/:id_empresa', (req, res)=>{
    const id_empresa = req.params.id_empresa

    const query = 'SELECT id_fornecedor, nome FROM fornecedor WHERE id_empresa = ?'

    db.query(query, [id_empresa], (erro, results)=>{
        if(erro){
            return res.status(404).json({success: false})
        }
        if(results.length > 0){
            return res.json(results)
        }
    })

})
module.exports = router