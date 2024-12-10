const express = require('express')
const router = express.Router()
const db = require('../database/db')
const axios = require('axios')
router.get('/fornecedores',(req, res)=>{
    res.render('fornecedores.ejs')
})



// Api para coletar dados com o cep
router.get('/dadosCep/:cep', (req, res)=>{
    const cep = req.params.cep
    
    const api = `http://viacep.com.br/ws/${cep}/json/`

    axios.get(api).then((response)=>{
        if(response){
            const dados = response.data
            return res.json(dados)
            
        }
    })
})


//inserir dados do fornecedor
router.post('/inserirFornecedor', (req, res)=>{
    const {id_empresa, nome, cnpj, email, fone, cep, estado, cidade, bairro, rua, numero} = req.body


    const query = 'INSERT INTO fornecedor (id_empresa, nome, cnpj, email, telefone, cep, estado, cidade, bairro, rua, numero) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'

    db.query(query, [id_empresa, nome, cnpj, email, fone, cep, estado, cidade, bairro, rua, numero], (erro, results)=>{
        if(erro){
            return res.json({success: false})
        }
        if(results.affectedRows > 0){
            return res.json({success: true})
        }
    })
})



//popula datatable
router.get('/dadosFornecedor/:id_empresa',(req, res)=>{
    const id_empresa = req.params.id_empresa

    const query = 'SELECT * FROM view_fornecedor WHERE id_empresa = ?'

    db.query(query, [id_empresa],(erro, results)=>{
        if(erro){
            return res.json({success: false})
        }
        if(results.length > 0){
            return res.json({data: results})
        }
    })
})

module.exports = router