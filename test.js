module.exports = {
    name: 'Raymond',
    age: '21'
}

const fs = require('fs')


console.log(process.argv)
let str = ''
for(let i = 2; i<process.argv.length;i++){
    str+= ` ${process.argv[i]}`
}


fs.appendFile('text.txt', str, err=>console.log(err))