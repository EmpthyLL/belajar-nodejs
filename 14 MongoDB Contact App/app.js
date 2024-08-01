const express = require('express')
const exlay = require('express-ejs-layouts')
const {check, body, validationResult} = require('express-validator');
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
var methodOverride = require('method-override')

require('./utility/db')
const {Contact} = require('./model/contact')
const app = express()
const port = 3000

app.set('view engine','ejs')
app.use(exlay)
app.use(express.static('public'))
app.use(express.urlencoded({extends:true}))
app.use(methodOverride('_method'))

app.use(cookieParser('secret'))
app.use(session({
    cookie:{maxAge: 6000},
    secret: 'secret',
    resave: true,
    saveUninitialized:true,
}))
app.use(flash())


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
    Contact.find().then((data) => {
        res.render('contact',{layout: 'partial/main',title:"Contact Us",data, addMsg: req.flash('addMsg'), delMsg: req.flash('delMsg'), editMsg: req.flash('editMsg')})
    })
})
app.get('/contact/add',  (req, res) => {
    res.render('form',{layout: 'partial/main',title:"Add User"})
})
app.post('/contact', [
    body('nama').custom(async (value) => {
        const exist = await Contact.findOne(
            {
                nama:value
            }
        )
        if(exist){
            throw new Error('Nama user sudah terdaftar!')
        }
        return true
    }),
    check('nohp', 'No HP tidak valid!').isMobilePhone('id-ID')
], (req,res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.render('form',{layout: 'partial/main',title:"Add User",errors:result.array()})
    }
    else{
        const newContact = new Contact(
            {
                nama: req.body.nama,
                nohp: req.body.nohp,
                usia: req.body.usia,
                kerja: req.body.kerja ? req.body.kerja : '-',
            }
        )
        newContact.save()
        req.flash('addMsg', 'Data telah ditambahkan!')
        res.redirect('/contact')
    }
})
// app.post('/contact/update', [
//     body('nama').custom(async (value, {req}) => {
//         const exist = await Contact.findOne(
//             {
//                 nama:value
//             }
//         )
//         if(exist && value !== req.body.oldnama){
//             throw new Error('Nama user sudah terdaftar!')
//         }
//         return true
//     }),
//     check('nohp', 'No HP tidak valid!').isMobilePhone('id-ID')
// ], (req,res) => {
//     const result = validationResult(req);
//     if (!result.isEmpty()) {
//         res.render('edit-form',{layout: 'partial/main',title:"Edit Profile",errors:result.array(), data:req.body, id:req.body.id})
//     }
//     else{

//         req.flash('editMsg', 'Data berhasil diubah!')
//         res.redirect('/contact')
//     }
// })
app.put('/contact', [
    body('nama').custom(async (value, {req}) => {
        const exist = await Contact.findOne(
            {
                nama:value
            }
        )
        if(exist && value !== req.body.oldnama){
            throw new Error('Nama user sudah terdaftar!')
        }
        return true
    }),
    check('nohp', 'No HP tidak valid!').isMobilePhone('id-ID')
], (req,res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.render('edit-form',{layout: 'partial/main',title:"Edit Profile",errors:result.array(), data:req.body, id:req.body.key})
    }
    else{
        Contact.find().then(data => {
            const id = Number(req.body.key)
            const user = data[id-1]
            Contact.updateOne(
                {
                    _id : user._id
                },
                {
                    $set:{
                        nama: req.body.nama,
                        nohp: req.body.nohp,
                        usia: req.body.usia,
                        kerja: req.body.kerja,
                    }
                }
            ).then(result => {
                req.flash('editMsg', 'Data berhasil diubah!')
                res.redirect('/contact')
            })
        })
    }
})
// app.get('/contact/delete/:id',  (req, res) => {
//     Contact.find().then((data) => {
//         const id = Number(req.params.id)
//         if(!data[id-1]){
//             res.status(404)
//             res.render('404',{layout: 'partial/main',title:"404 Page Not Found"})
//         }
//         else{
//             const user = data[id-1]
//             Contact.deleteOne(
//                 {
//                     _id : user._id
//                 }
//             ).then(result=>{
//                 req.flash('delMsg', 'Data telah dihapus!')
//                 res.redirect('/contact')
//             })
//         }
//     })
// })
app.delete('/contact',  (req, res) => {
    Contact.find().then((data) => {
        const id = Number(req.body.key)
        if(!data[id-1]){
            res.status(404)
            res.render('404',{layout: 'partial/main',title:"404 Page Not Found"})
        }
        else{
            const user = data[id-1]
            Contact.deleteOne(
                {
                    _id : user._id
                }
            ).then(result=>{
                req.flash('delMsg', 'Data telah dihapus!')
                res.redirect('/contact')
            })
        }
    })
})
app.get('/contact/edit/:id',  (req, res) => {
    Contact.find().then((data) => {
        const id = Number(req.params.id)
        res.render('edit-form',{layout: 'partial/main',title:"Edit Profile",data:data[id-1],id})
    })
})
app.get('/contact/:id',  (req, res) => {
    Contact.find().then((data) => {
        res.render('detail',{layout: 'partial/main',title:"User Detail",user:data[Number(req.params.id)-1], key:req.params.id})
    })
})
app.use('/',  (req, res) => {
    res.status(404)
    res.render('404',{layout: 'partial/main',title:"404 Page Not Found"})
})
app.listen(port, () => {
    console.log('Server is now running...')
})