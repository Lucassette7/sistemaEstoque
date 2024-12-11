const express = require('express');
const app = express();
const session = require('express-session');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');
const router = express.Router();
const db = require('./database/db')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views')); // Define o diretório de views
app.use(express.static('public')); // Serve arquivos estáticos da pasta 'public'
app.use('/public', express.static(path.join(__dirname, 'public')));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());



app.use(cookieParser());




//rotas 
//login
const login = require('./routes/login')
app.use('/', login)

//dashboard
const dashboard = require('./routes/dashboard')
app.use('/', dashboard)

//produtos
const produtos = require('./routes/produtos')
app.use('/', produtos)

//fornecedores
const fornecedores = require('./routes/fornecedores')
app.use('/', fornecedores)

//entrada
const entrada = require('./routes/entrada')
app.use(entrada)



const porta = process.env.PORT
app.listen(porta || 3001, (erro)=>{
    if(erro){
        console.log('Erro ao conectar na porta')
    }
    else{
        console.log(`Conectado a porta ${porta}` || console.log('Conectado a porta 3000'))
    }
})