const express = require("express")
const router = express.Router()
const db = require('../database/db')
const { emit } = require("pdfkit")


router.get('/',(req, res)=>{
    res.render('login.ejs')
}) 


//cadastrar



//logar

router.post('/logar', async(req, res) => {
    const { email, senha } = req.body;
    

    const query = 'SELECT email, id_empresa, senha FROM empresa WHERE email = ? AND senha = ?';

    db.query(query, [email, senha], (erro, results) => {
        if (erro) {
            return res.status(400).send('Erro ao logar');
        }

        if (results.length > 0) {
            return res.json({ success: true });  // A senha e o email estão corretos
        } else {
            return res.json({ success: false });  // Email ou senha incorretos
        }
    });
});

//COLETA ID EMPRESA PARA TRANSFORMAR EM SESSION
router.get('/id_empresa/:email', (req, res)=>{
    const email = req.params.email
    

    const query = 'SELECT id_empresa FROM empresa WHERE email = ?'

    db.query(query, [email], (erro, results)=>{
        if(erro){
            return res.json('erro')
        }
        if(results.length > 0){
            return res.json(results)
        }
    })
})


module.exports = router