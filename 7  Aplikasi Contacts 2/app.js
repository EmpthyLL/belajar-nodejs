const {addUser, displayList, showDetail, deleteUser} = require('./user')
const yargs = require('yargs')

yargs.command({
    command:'add',
    describe:'Menambah User',
    builder:{
        nama:{
            describe:"Nama User",
            demandOption:true,
            type:'string',
        },
        umur:{
            describe:"Umur User",
            demandOption:true,
            type:'number',
        },
        nohp:{
            describe:"No Handphone User",
            demandOption:true,
            type:'string',
        },
        kerja:{
            describe:"Pekerjaan User",
            demandOption:false,
            type:'string',
        }
    },
    handler(argv){
        addUser(argv.nama, argv.umur, argv.nohp, argv.kerja ? argv.kerja : '-')
    }
}).demandCommand()

yargs.command({
    command:'show',
    describe:'Menampilkan Daftar User',
    builder:{},
    handler(){
        displayList()
    }
})

yargs.command({
    command:'detail',
    describe:'Menampilkan Detail User',
    builder:{
        nama:{
            describe:"Nama User",
            demandOption:true,
            type:'string',
        },
    },
    handler(argv){
        showDetail(argv.nama)
    }
})

yargs.command({
    command:'delete',
    describe:'Menghapus Detail User',
    builder:{
        nama:{
            describe:"Nama User",
            demandOption:true,
            type:'string',
        },
    },
    handler(argv){
        deleteUser(argv.nama)
    }
})
yargs.parse()