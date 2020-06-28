const path = require('path')
const express = require('express')
const hbs = require('hbs')
require('./db/mongoose')
const accountRouter = require('./router/accountsRouter')
const bodyParser = require('body-parser')

const app = express()

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, '../public')))
app.use(accountRouter)

app.get('', (req, res) => {
    res.render("index")
})

app.get('/addaccount', (req, res) => {
    res.render('addAccount')
})
app.get('/database', (req, res) => {
    res.render('viewDB')
})

module.exports = app