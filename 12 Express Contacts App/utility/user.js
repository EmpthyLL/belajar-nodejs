const fs = require('fs')

if(!fs.existsSync('./data')){
    fs.mkdirSync('./data')
}
if(!fs.existsSync('./data/user.json')){
    fs.writeFileSync('./data/user.json','[]')
}
const data = JSON.parse(fs.readFileSync('./data/user.json','utf-8'))
function overWrite(users){
    fs.writeFileSync('./data/user.json', JSON.stringify(users))
}

function checkDouble(nama){
    return data.find(d => (d.nama == nama))
}

function addUser(users){
    const user = {nama:users.nama, usia:users.usia, nohp:users.nohp, kerja:users.kerja}
    data.push(user)
    overWrite(data)
}

function deleteUser(id){
    const newData = data.filter((d,key) => key+1 != id)
    overWrite(newData)
}

function editProfile(change, id){
    delete change.oldnama
    delete change.key
    delete change.tambah
    data[id-1] = change
}

module.exports = {
    data,
    addUser,
    checkDouble,
    deleteUser,
    editProfile
}