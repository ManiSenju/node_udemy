const fs  = require('fs');
// const book = {
//     title:"A song of Ice and Fire",
//     author:"George R R Martin"
// }
// fs.writeFileSync('1-json.json',JSON.stringify(book))

const bufferData = fs.readFileSync('1-json.json').toString();
const parsedData = JSON.parse(bufferData)
parsedData.author = "shakesphere"
parsedData.title = "Romeo&Juliet"
fs.writeFileSync('1-json.json',JSON.stringify(parsedData))