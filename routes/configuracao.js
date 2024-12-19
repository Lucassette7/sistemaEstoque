const express = require('express')
const router = express.Router()
const db = require('../database/db')

router.get('/configuracao', (req, res)=>{
    res.render('configuracao.ejs')
})


//salva mudanças 
router.put('/salvaMudancas/:valor/:id_empresa', (req,res)=>{
    const valor = req.params.valor
    const id_empresa = req.params.id_empresa
    console.log(valor)
    console.log(id_empresa)

    const query = 'UPDATE configuracao SET alerta_produto = ? WHERE id_empresa = ?'

    db.query(query, [valor, id_empresa], (erro, results)=>{
        if(erro){
            console.log('erro query')
        }
        if(results.affectedRows > 0){
            res.send({success: true})
        }
    })
})

//verifica se o alerta produto esta ativado
router.get('/verificaAlerta/:id_empresa',(req,res)=>{
    const id_empresa = req.params.id_empresa

    const query = 'SELECT alerta_produto FROM configuracao WHERE id_empresa = ?'

    db.query(query, [id_empresa], (erro,results)=>{
        if(erro){
            console.log('erro query')
        }
        if(results.length > 0){
            res.json(results)
        }
    })
})

//verifica o botao check
router.get('/verificaAlertaBotao/:id_empresa',(req,res)=>{
    const id_empresa = req.params.id_empresa
    
    const query = 'SELECT alerta_produto FROM configuracao WHERE id_empresa = ?'

    db.query(query, [id_empresa], (erro,results)=>{
        if(erro){
            console.log('erro query')
        }
        if(results.length > 0){
            res.json(results)
        }
    })
})














module.exports = router