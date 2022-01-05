const fs = require('fs');
const validator = require('validator');
const yargs = require('yargs'); //for parsing command line arguments
const chalk = require('chalk');
const notesObject = require("./notes.js");
const { demandOption } = require('yargs');
const notes = require('./notes.js');


//console.log(validator.isEmail('tgaur@iitg.ac.in'))
//console.log(chalk.underline.red.bold('Success!'))
//console.log(process.argv)

yargs.version('1.1.0')

console.log(notesObject.getNotes())

//create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder:
    {
        title: {
            describe: "Title of the Note",
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: "Body of the Note",
            demandOption: false,
            type: 'string'
        },
        star: {
            describe: "Whether note is starred or not",
            demandOption: false,
            type: 'boolean'
        }
    },
    handler(argv){
        notesObject.addNotes(argv.title, argv.body)
    }
})

//create edit-body command
yargs.command({
    command: 'edit-body',
    describe: 'Edit the body of an existing note',
    builder:
    {
        title: {
            describe: "Title of the Note",
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: "Body of the Note",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notesObject.editNotes(argv.title, argv.body)
    }
})

//create edit-title command
yargs.command({
    command: 'edit-title',
    describe: 'Edit the title of an existing note',
    builder:
    {
        title: {
            describe: "Title of the Note",
            demandOption: true,
            type: 'string'
        },
        newTitle: {
            describe: "New title of the Note",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notesObject.editNotesTitle(argv.title, argv.newTitle)
    }
})

//create remove command
yargs.command({
    command: "remove",
    describe: "Remove a note",
    builder: {
        title: {
            describe: 'Title of the note to be removed',
            demandOption: false,
            type: 'string'
        }
    },
    handler(argv){
        notesObject.removeNotes(argv.title)
    } 
})

//create list command
yargs.command({
    command: "list",
    describe: "List all the notes",
    handler(){
         notesObject.listNotes()
    }
})

//create starmark notes command
yargs.command({
    command: "star",
    describe: "Star the note",
    builder:
    {
        title: {
            describe: 'Title of the note to be star marked',
            demandOption: false,
            type: 'string'
        }
    },
    handler(argv){
         notesObject.starMark(argv.title)
    }
})

//create un-starmark notes command
yargs.command({
    command: "unstar",
    describe: "Unstar the note",
    builder:
    {
        title: {
            describe: 'Title of the note to be unstarred',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
         notesObject.unstarMark(argv.title)
    }
})


//create read command
yargs.command({
    command: "read",
    describe: "Read the note",
    builder: {
        title: {
            type: 'string',
            demandOption: true,
            describe: 'Title of the note to be read'
        }
    },
    handler(argv){
        notesObject.readNotes(argv.title)
    }
})

//console.log(yargs.argv)         //uncomment to use --help and --version with node app.js

yargs.parse()     //uncomment to use --help and --version with node app.js