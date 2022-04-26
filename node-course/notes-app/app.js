const validator = require('validator')
const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js');
const { argv } = require('yargs');

//Customize yargs version
yargs.version('1.1.0');

//Create an add command
yargs.command({
    "command":"add",
    "description":"Adds a new note",
    builder:{
        title:{
            description:"Note title",
            demandOption: true,
            type:"string"
        },
        body:{
            description:"Body of Note",
            demandOption:true,
            type:"string"
        }
    },
    handler: function(argv){
        notes.addNotes(argv.title,argv.body)
    }
})

//Create remove command
yargs.command({
    "command":"remove",
    "description": "removes note",
    builder:{
        title:{
            description:"need title to remove",
            demandOption:true,
            type:"string"
        }
    },
    handler: function(argv){
        notes.removeNote(argv.title)
    }
})

//Create a list command
yargs.command({
    "command":"list",
    "description":"listing notes",
    handler(){
        notes.listNotes()
    }
})

//Create a read command
yargs.command({
    "command":"read",
    "description":"reading notes",
    builder:{
        title:{
            description:"title is must",
            demandOption:true,
            type:"string"
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    }
})


yargs.parse()