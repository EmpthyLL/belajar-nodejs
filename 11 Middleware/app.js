const express = require('express')
const exlay = require('express-ejs-layouts')
const morgan = require('morgan')
const app = express()
const port = 3000

app.set('view engine','ejs')
app.use(exlay)
app.use(morgan('dev'))
app.use(express.static('public'))
app.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})

const mahasiswa = [
    {
    nama: "Tika",
    umur:21
    },
    {
    nama: "Ira",
    umur:23
    },
    {
    nama: "Jerry",
    umur:19
    }
]
app.get('/',  (req, res) => {
    res.render('index', {layout: 'partial/main',nama:'Howard', title:"Home Page", mahasiswa})
})
app.get('/home',  (req, res) => {
    res.render('index', {layout: 'partial/main',nama:'Howard', title:"Home Page", mahasiswa})
})
app.get('/about',  (req, res) => {
    res.render('about',{layout: 'partial/main',title:"About Page"})
})
app.get('/contact',  (req, res) => {
    res.render('contact',{layout: 'partial/main',title:"Contact Us"})
})
app.get('/product/:id', (req,res) => {
    res.send(`Product ID : ${req.params.id}<br> Category : ${req.query.category}`)
})
app.use('/',  (req, res) => {
    res.status(404)
    res.render('404',{layout: 'partial/main',title:"404 Page Not Found"})
})

app.listen(port, () => {
    console.log('Server is now running...')
}) 