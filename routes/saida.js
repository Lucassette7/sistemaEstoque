const express = require('express')
const router = express.Router()
const db = require('../database/db')

router.get('/saida', (req, res)=>{
    res.render('saida.ejs')
})


//popula produtos
router.get('/populaDados/:id_empresa', (req, res)=>{
    const id_empresa = req.params.id_empresa

    const query = 'SELECT produto FROM produto WHERE id_empresa = ?'

    db.query(query, [id_empresa], (erro, results)=>{
        if(erro){
            return res.status(404)
        }
        if(results.length > 0){
            return res.json(results)
        }
    })
})

// registra saida
router.post('/registraSaida', (req, res)=>{
    const {produto, quantidade, id_empresa} = req.body
    
    const query1 = 'SELECT id_produto FROM produto WHERE produto = ? and id_empresa = ?'

    db.query(query1, [produto, id_empresa], (erro, results)=>{
        if(erro){
            console.log('erro query1')
        }
        if(results.length > 0){
            const id_produto = results[0].id_produto
            
            const query2 = 'INSERT INTO saida (id_produto, id_empresa, quantidade) VALUES (?, ?, ?)'

            db.query(query2, [id_produto, id_empresa, quantidade], (erro, results)=>{
                if(erro){
                    console.log('erro query2')
                }
                if(results.affectedRows > 0){
                    const query3 = 'SELECT * FROM produto WHERE id_produto = ?'

                    db.query(query3, [id_produto], (erro, results)=>{
                        if(erro){
                            console.log('erro query3')
                        }
                        if(results.length > 0){
                            const quantidadeBanco = results[0].quantidade
                            const quantidadeNumero = Number(quantidade)
                            if(quantidadeBanco >= quantidadeNumero){
                                const subtracao = (quantidadeBanco-quantidadeNumero)
                            
                                const query4 = 'UPDATE produto SET quantidade = ? WHERE id_produto = ? and id_empresa = ?'
    
                                db.query(query4, [subtracao, id_produto, id_empresa], (erro, results)=>{
                                    if(erro){
                                        console.log('erro query4')
                                    }
                                    if(results.affectedRows > 0){
                                        return res.json({success: true})
                                    }
                                })
                            }
                            else{
                                return res.json({success: false})
                            }

                        }
                    })
                }
            })
        }
    })
})













module.exports = router