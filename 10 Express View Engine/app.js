const express = require('express')
const exlay = require('express-ejs-layouts')
const app = express()
const port = 3000

app.set('view engine','ejs')
app.use(exlay)

app.get('/',  (req, res) => {
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
    res.send('404')
})

app.listen(port, () => {
    console.log('Server is now running...')
})