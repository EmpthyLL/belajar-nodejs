const getUser = (id, cb) =>{
    const time = id == 1 ? 3000 : 2000
    const nama = id == 1 ? "Ganja" : "Enak"
    setTimeout(() => {
        cb({id,nama})
    },time)
}
function show(hasil){
    console.log(hasil)
}
const userSatu = getUser(1, show)

const userDua = getUser(2, show)

const pass = 'Legalkan'
console.log(pass)

// setTimeout(()=>(console.log('YOOOOO!!!')),3000)
// setTimeout(()=>(console.log('Kambing!!!')),2000)
// console.log("Jancuk!")

// const getUser = (id) =>{
//     const nama = id == 1 ? "Ganja" : "Enak"
//     return {id, nama}
// }
// const userSatu = setTimeout(() =>{
//     const user = getUser(1)
//     console.log(user)
// },3000)

// const userDua = setTimeout(() =>{
//     const user = getUser(2)
//     console.log(user)
// },2000)

// const pass = 'Legalkan'
// console.log(pass)