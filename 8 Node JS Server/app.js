const http = require('http')
const fs = require('fs')

function render(page,res){
    fs.readFile(page,(err,data)=>{
        if(err){
            res.writeHead(404)
            res.write('Error page not found')
        }
        else{
            res.write(data)
        }
        res.end()
    })
}

http.createServer((req, res) => {
    res.writeHead(200,{
        'Content-Type' : 'text/html',
    })
    const url = req.url
    if(url === '/about'){
        render('about.html',res)
    }
    else if(url === '/contact'){
        render('contact.html',res)
    }
    else{
        render('index.html',res)
    }
}).listen(3000,() => {
    console.log('Server is running')
})