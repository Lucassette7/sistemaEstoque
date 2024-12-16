const express = require('express')
const router = express.Router()
const db = require('../database/db')

router.get('/dashboard', (req, res)=>{
    res.render('dashboard.ejs')
})

// popula datatable
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

// edita produto
router.put('/editaProduto/:id', (req, res)=>{
    const id = req.params.id
    const {produto, marca, cor, valor, descricao, medida, quantidade} = req.body

    const query = 'UPDATE produto SET produto = ?, marca = ?, cor = ?, valor = ?, descricao = ?, medida = ?, quantidade = ? WHERE id_produto = ?'

    db.query(query, [produto, marca, cor, valor, descricao, medida, quantidade, id], (erro, results)=>{
        if(erro){
            return res.json({success: false})
        }
        if(results.affectedRows > 0){
            return res.json({success: true})
        }
    })
})


//valores para o grafico de coluna que mais tem produtos
router.get('/graficoBarra/:id', (req, res)=>{
    const id = req.params.id

    const query = 'SELECT * FROM produto  WHERE id_empresa = ? ORDER BY quantidade DESC limit 4'

    db.query(query, [id], (erro, results)=>{
        if(erro){
            return res.status(404)
        }
        if(results.length > 0){
            return res.json(results)
        }
    })
})


// valores grafico com os produtos que menos tem em estoque
router.get('/graficoBarraMin/:id', (req, res)=>{
    const id = req.params.id

    const query = 'SELECT * FROM produto WHERE id_empresa = ? ORDER BY quantidade ASC limit 4'

    db.query(query, [id], (erro, results)=>{
        if(erro){
            return res.status(404)
        }
        if(results.length > 0){
            return res.json(results)
        }
    })
})

module.exports = router