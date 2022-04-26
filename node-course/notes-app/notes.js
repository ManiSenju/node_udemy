const fs = require('fs')
const chalk = require('chalk')

const getNotes = function(){
    return "testing notes...";
}
const addNotes = function(title,body){
    const notes = loadNotes()
    const duplicateNote = notes.find(note=>note.title === title)
    if(duplicateNote){
        console.log(chalk.red.bold.inverse("title already exists"))
    }else{
        notes.push({
            title,
            body
        })
        saveNotes(notes)
        console.log(chalk.green.bold.inverse("new note added"))
    }
    
}
const removeNote = function(title){
    const notes = loadNotes();
    const notesToKeep = notes.filter(function(note){
        return note.title !== title
    })
    if(notes.length > notesToKeep.length){
        saveNotes(notesToKeep)
        console.log(chalk.green.bold.inverse("title removed"))
    }else{
        console.log(chalk.red.bold.inverse("title doesn't exist"))
    }
}
const listNotes =()=>{
    const notes = loadNotes();
    console.log(chalk.blue.bold.underline("Your Notes"))
    notes.forEach(element => console.log(element.title));
}
const readNote = (title)=>{
    const notes = loadNotes();
    const reqNote = notes.find(note=>note.title === title)
    if(reqNote){
        console.log(chalk.green.bold(reqNote.title)+" :"+reqNote.body)
    }else{
        console.log(chalk.red.bold("Title not Found"))
    }

}
const loadNotes = function(){
    if(fs.existsSync('notes.json')){
        const bufferData = fs.readFileSync('notes.json').toString();
        return JSON.parse(bufferData);
    }else{
        return [];
    }
}
const saveNotes = function(notes){
    fs.writeFileSync('notes.json',JSON.stringify(notes))
}
module.exports = {
    getNotes,
    addNotes,
    removeNote,
    listNotes,
    readNote
}