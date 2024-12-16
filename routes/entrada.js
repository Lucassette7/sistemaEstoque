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
router.put('/salvarEntrada', (req, res) => {
    const {produto, quantidade, id_empresa, fornecedor} = req.body;  // Desestrutura os dados enviados no body da requisição

    const query = 'UPDATE produto SET quantidade = ? WHERE id_produto = ? and id_empresa = ? and id_fornecedor = ?';  // Query de atualização

    db.query(query, [quantidade, produto, id_empresa, fornecedor], (erro, results) => {
        if (erro) {
            console.log('Erro na execução da query:', erro);  // Log de erro se houver algum problema
            return res.status(500).json({success: false, message: 'Erro ao atualizar o produto.'});
        }
        if (results.affectedRows > 0) {
            console.log('Produto atualizado com sucesso');
            return res.json({success: true});  // Retorna sucesso se a atualização for bem-sucedida
        } else {
            console.log('Nenhum produto encontrado para atualizar');
            return res.status(404).json({success: false, message: 'Produto não encontrado.'});  // Caso não tenha afetado linhas
        }
    });
});



module.exports = router