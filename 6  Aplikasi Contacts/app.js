const {pertanyaan, addUser} = require('./user')

// proses.question('Lu olang namanya siapa ya? ',(nama) => {
//     proses.question("Umur? ",(umur)=>{
//         if(!fs.existsSync('user.json')){
//             fs.writeFileSync('user.json','[]')
//         }
//         const user = {nama, umur}
//         const data = JSON.parse(fs.readFileSync('user.json','utf-8'))
//         data.push(user)
//         fs.writeFileSync('user.json', JSON.stringify(data))
//         console.log(`Data nama: ${nama} dan umur: ${umur} berhasil diinput`)
//         proses.close()
//     })
// })

async function main(){
    const nama = await pertanyaan('Nama koe siapa?')
    const umur = Number(await pertanyaan('Umur?'))
    const kerja = await pertanyaan('Kerjanya apa?')
    addUser(nama, umur, kerja)
}
main()
