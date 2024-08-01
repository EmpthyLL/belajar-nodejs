const fs = require('fs')
const rl = require('readline')

fs.writeFileSync("test.txt",'Kambing lu!')
console.log(fs.readFileSync("test.txt",'utf-8'))

// fs.readFile("test.txt",'utf-8', (err, data) => {
//     if(err) throw err;
//     console.log(data)
// })

const proses = rl.createInterface({
    input: process.stdin,
    output: process.stdout,
})

proses.question('Lu olang namanya siapa ya? ',(nama) => {
    proses.question("Umur? ",(umur)=>{
        const user = {nama, umur}
        const data = JSON.parse(fs.readFileSync('user.json','utf-8'))
        data.push(user)
        fs.writeFileSync('user.json', JSON.stringify(data))
        console.log(`Data nama: ${nama} dan umur: ${umur} berhasil diinput`)
        proses.close()
    })
})