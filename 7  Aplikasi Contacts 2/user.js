const fs = require('fs')
const validator = require('validator')
const chalk = require('chalk')
const { rejects } = require('assert')
const { resolve } = require('path')

if(!fs.existsSync('user.json')){
    fs.writeFileSync('user.json','[]')
}
const data = JSON.parse(fs.readFileSync('user.json','utf-8'))
function addUser(nama, umur, nohp, kerja){
    const exist = data.find(d => (d.nama == nama))
    if(exist){
        console.log(chalk.bold.bgRedBright('Nama user sudah terdaftar!'))
        return
    }
    if(!validator.isMobilePhone(nohp,'id-ID')){
        console.log(chalk.bold.bgRedBright('Nomor handphone yang dimasukkan tidak valid'))
        return
    }
    const user = {nama, umur, nohp, kerja}
    data.push(user)
    fs.writeFileSync('user.json', JSON.stringify(data))
    console.log(chalk.bold.bgGreenBright(`Data user ${nama}(${umur}) ${kerja != '-' ? `seorang ${kerja}` : 'Belum Berkerja'} berhasil diinput`))
}

function displayList(){
    console.log(chalk.bold.yellow('Daftar User'))
    data.forEach((d,key) => {
        console.log(`user ${key+1}: ${d.nama}(${d.umur})`)
    });
}

function showDetail(nama){
    const pick = data.find(d => d.nama.toLowerCase() === nama.toLowerCase())
    if(!pick){
        console.log(chalk.bold.bgRedBright.black('User belum terdaftar!'))
        return
    }
    console.log(chalk.bold.yellow(`${pick.nama}(${pick.umur})`))
    console.log(`No. Hp: ${pick.nohp}`)
    console.log(`Pekerjaan: ${pick.kerja}`)
}

function deleteUser(nama){
    if(data.length === 0){
        console.log(chalk.bold.bgBlue.black('Belum ada sama sekali user yang terdaftar!'))
        return
    }
    const pick = data.find(d => d.nama.toLowerCase() === nama.toLowerCase())
    if(!pick){
        console.log(chalk.bold.bgRedBright.black('User belum terdaftar!'))
        return
    }
    const rest = data.filter(d => d.nama.toLowerCase() !== nama.toLowerCase())
    fs.writeFileSync('user.json', JSON.stringify(rest))
    console.log(chalk.bold.bgGreenBright(`Data user telah dihapus`))
}

module.exports = {
    addUser,
    displayList,
    showDetail,
    deleteUser
}