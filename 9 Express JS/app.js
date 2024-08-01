// const http = require('http')
// const fs = require('fs')

// function render(page,res){
//     fs.readFile(page,(err,data)=>{
//         if(err){
//             res.writeHead(404)
//             res.write('Error page not found')
//         }
//         else{
//             res.write(data)
//         }
//         res.end()
//     })
// }

// http.createServer((req, res) => {
//     res.writeHead(200,{
//         'Content-Type' : 'text/html',
//     })
//     const url = req.url
//     if(url === '/about'){
//         render('about.html',res)
//     }
//     else if(url === '/contact'){
//         render('contact.html',res)
//     }
//     else{
//         render('index.html',res)
//     }
// }).listen(3000,() => {
//     console.log('Server is running')
// })

const express = require('express')
const app = express()
const port = 3000

app.get('/',  (req, res) => {
    res.sendFile('index.html', {root: __dirname})
})
app.get('/about',  (req, res) => {
    res.sendFile('about.html', {root: __dirname})
})
app.get('/contact',  (req, res) => {
    res.sendFile('contact.html', {root: __dirname})
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