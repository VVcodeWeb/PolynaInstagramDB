const path = require('path')
const express = require('express')
const hbs = require('hbs')
require('./db/mongoose')
const app = express()

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(path.join(__dirname, '../public')))

hbs.registerPartials(partialsPath)
app.get('',(req, res) =>{
    res.render("index")
})
console.log(process.env.MONGODB)

module.exports = app