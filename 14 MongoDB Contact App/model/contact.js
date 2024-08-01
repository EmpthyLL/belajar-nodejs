const mongoose = require('mongoose');

const Contact = mongoose.model('Contact', {
    nama: {
        type:String,
        required:true
    },
    nohp: {
        type:String,
        required:true
    },
    usia: {
        type:Number,
        required:true
    },
    kerja:{
        type:String,
        required:false
    }
})

module.exports.Contact = Contact