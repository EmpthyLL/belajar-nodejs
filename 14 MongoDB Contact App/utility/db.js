const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/wpu')


// const contact1 = new Contact({
//     nama: "Jaka",
//     nohp: "082361889632",
//     usia: 22,
//     kerja:'Taruna'
// })
// contact1.save().then((contact) => console.log(contact))