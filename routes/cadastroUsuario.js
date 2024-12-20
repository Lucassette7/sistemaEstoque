const express = require('express');
const router = express.Router();
const db = require('../database/db');

router.get('/cadastroUsuario', (req, res)=>{
    res.render('cadastrarUsuario');
})


//cadastrar usuario
router.post('/salvarCadastro', async (req, res) => {
    const { nome, telefone, email, cnpj, senha, alerta_produto, recebe_email} = req.body;

    const query = 'INSERT INTO empresa (nome_empresa, cnpj, email, telefone, senha) VALUES (?, ?, ?, ?, ?)';
    const query2 = 'SELECT id_empresa FROM empresa WHERE email = ?'
    const query3 = 'INSERT INTO configuracao (id_empresa, alerta_produto, recebe_email) VALUES (?, ?, ?)'

    db.query(query, [nome, cnpj, email, telefone, senha], (erro, results) => {
        if (erro) {
            console.error('Erro ao salvar cadastro:', erro); // Logando o erro no servidor
            return res.status(500).json({ success: false, message: 'Erro ao cadastrar no banco de dados' });
        }
        if (results.affectedRows > 0) {
                res.json({ success: true })
                db.query(query2, [email], (erro, results)=>{
                    if(erro){
                        console.log('erro query2')
                    }
                    if(results.length > 0){
                        const id_empresa = results[0].id_empresa
                        db.query(query3, [id_empresa, alerta_produto, recebe_email], (erro, results)=>{
                            if(erro){
                                console.log('erro query3')
                            }
                            if(results.affectedRows > 0){
                                console.log('inserido com sucesso')
                            }
                        })
                    }
                })
            
        } else {
            return res.status(400).json({ success: false, message: 'Nenhum dado foi inserido' });
        }
    });
});



module.exports = router;