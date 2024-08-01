const fs = require('fs')
const rl = require('readline')
const { rejects } = require('assert')
const { resolve } = require('path')

const proses = rl.createInterface({
    input: process.stdin,
    output: process.stdout,
})

function pertanyaan(quest){
    return new Promise((resolve, reject) => {
        proses.question(`${quest} `,(hasil) => {resolve(hasil)})
    })
}
function addUser(nama, umur, kerja){
    if(!fs.existsSync('user.json')){
        fs.writeFileSync('user.json','[]')
    }
    const user = {nama, umur, kerja}
    const data = JSON.parse(fs.readFileSync('user.json','utf-8'))
    data.push(user)
    fs.writeFileSync('user.json', JSON.stringify(data))
    console.log(`Data user ${nama}(${umur}) seorang ${kerja} berhasil diinput`)
    proses.close()
}

module.exports = {
    pertanyaan,
    addUser
}