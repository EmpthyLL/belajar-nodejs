const { MongoClient, ObjectID } = require('mongodb')

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'wpu'
const client = new MongoClient(url);

client.connect((error, client) => {
    if(error){
        return console.log('Koneksi Gagal!')
    }
    const db = client.db(dbName)
    // db.collection('mahasiswa').insertOne(
    //     {
    //     nama: "Jaka",
    //     nohp: "082361889632",
    //     usia: 22,
    //     kerja:'Taruna'
    //     },
    //     (error, result) => {
    //         if(error){
    //             return console.log('Gagal menambahkan data!')
    //         }
    //         console.log(result)
    //     }
    // )
    db.collection('mahasiswa').insertMany(
        [{
            nama: "Joko",
            nohp: "082736475664",
            usia: 19,
            kerja:'Barista'
        },
        {
            nama: "Yuka",
            nohp: "083474637266",
            usia: 18,
            kerja:'Guru Les'
        }],
        (error, result) => {
            if(error){
                return console.log('Gagal menambahkan data!')
            }
            console.log(result)
        }
    )
    // db.collection('mahasiswa').find(
    //     {usia:{$gt:20}}
    // ).toArray((error, result) => {
    //     console.log(result)
    // })
    // db.collection('mahasiswa').find(
    //     {_id:ObjectID("66a22818c132e27204d3a441")}
    // ).toArray((error, result) => {
    //     console.log(result)
    // }) 
    // db.collection('mahasiswa').updateOne(
    //     {
    //         _id:ObjectID('66a22818c132e27204d3a441')
    //     },
    //     {
    //         $set:{
    //             usia:20,
    //             kerja:'Kasir'
    //         }
    //     }
    // )
    // db.collection('mahasiswa').updateMany(
    //     {
    //         usia:{$lt:20}
    //     },
    //     {
    //         $set:{
    //             kerja:'-'
    //         }
    //     }
    // )
    // db.collection('mahasiswa').deleteOne(
    //     {
    //         nama:'Yuka'
    //     }
    // )
    // db.collection('mahasiswa').deleteMany(
    //     {
    //         usia:{$lt:20}
    //     }
    // )
})