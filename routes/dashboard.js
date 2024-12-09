const express = require('express')
const router = express.Router()
const db = require('../database/db')

router.get('/dashboard', (req, res)=>{
    res.render('dashboard.ejs')
})

module.exports = router