const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => "Welcome to the Notes App!"

const addNotes = (title, body) => {
    const notes = loadNotes()   //returns parsed notes
    //const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNote = notes.find((note) => note.title === title)    //stops search at the first instant of finding desired property

    if(body === undefined)
    {
        body = ""   
    }

    if(duplicateNote === undefined){        //duplicate title not found
        notes.push({
        title: title,
        body:body
        })
        saveNotes(notes)
        console.log(chalk.bgGreen.black.inverse("New note added."))
    }
    else{
        console.log(chalk.bgRed("Note title taken. Please change the title of your note."))
    }
    
}

const saveNotes = (notes) => {
    const notesJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', notesJSON)
    console.log(notes)
}


const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')    //binary data
        const dataJSON = dataBuffer.toString()
        const notes = JSON.parse(dataJSON)
        return notes
    }
    catch(e){
        return []
    } 
}

const removeNotes = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

    if(notesToKeep.length===notes.length){
        console.log(chalk.bgRed("Please provide a valid title. You can choose from the following titles:"))
        notes.forEach((note) => console.log(note.title))
    }
    else{
        saveNotes(notesToKeep)
        console.log(chalk.bgGreen.black.inverse("Removed the note with title:", title + "."))
    }
    
}

const editNotes = (title, newBody) => {
    const notes = loadNotes()
    const findNote = notes.find((note) => note.title == title)

    if(!findNote)
    {
        console.log(chalk.bgRed("Enter a valid title."))
    }
    else if(findNote.body === newBody)
    {
        console.log(chalk.bgRed("Contents are the same as before."))
    }
    else{
        findNote.body = newBody
        console.log(chalk.bgGreen.black.inverse("Successfully edited the note with title:" + title))
        saveNotes(notes)
    }
}

const editNotesTitle = (title, newTitle) => {
    const notes = loadNotes()
    const findNote = notes.find((note) => note.title == title)
    const findTitle = notes.find((note) => note.title == newTitle)
    
    if(!findNote || findTitle)
    {
        console.log(chalk.bgRed("Enter a valid title."))
    }
    else if(findNote.title === newTitle)
    {
        console.log(chalk.bgRed("Title is the same as before."))
    }
    else{
        findNote.title = newTitle
        console.log(chalk.bgGreen.black.inverse("Successfully edited the title of the note."))
        saveNotes(notes)
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.bold.underline("Your Notes"))
    notes.forEach((note) => console.log(note.title))
}

const readNotes = (title) => {
    const notes = loadNotes()
    const NoteToBeRead = notes.find((note) => note.title === title)
    if(NoteToBeRead === undefined){
        console.log(chalk.bgRed("No such note found."))
    }
    else{
        console.log(chalk.bold.underline(NoteToBeRead.title))
        console.log(NoteToBeRead.body)
    }
}

 const starMark = (title) => {
    const notes = loadNotes()

    if(title===undefined)           //if title not given, star lists the starred notes
    {
        console.log(chalk.bgBlack.green("Here is the list of your starred notes:"))
        notes.forEach((note) => {
        if(note.star)
            console.log(note.title)
        })
    }
    else{                       //else it adds note to starred notes
        const star_note = notes.find((note)=>note.title===title)
        const titleFound = notes.find((note) => {
            if(note.star)
                return note.title === title
            else
                return false
        }) 
        
        if(titleFound)
        {
            console.log(chalk.bgRed("Note has already been starred."))
        }
        else{
            if(!star_note)
            {
                console.log(chalk.bgRed("No such note. Please provide a valid title."))
            }
            else{
                star_note.star = true
                saveNotes(notes)
                console.log(chalk.bgBlack.green("Note successfully added to starred notes."))
            }
        }
    }
    
}

const unstarMark = (title) => {
    const notes = loadNotes()
    const star_note = notes.find((note) => {
        if(note.star)
            return note.title===title
        else
            return false
    })
    if(!star_note)
    {
        console.log(chalk.bgRed("Starred note doesn't exist."))
    }
    else{
        star_note.star = false
        saveNotes(notes)
        console.log(chalk.bgBlack.green("Note successfully removed from starred notes."))
    }
    console.log(chalk.bgBlack.green("Here is the list of your starred notes:"))
    notes.forEach((note) => {
    if(note.star)
        console.log(note.title)
    })
}

module.exports = {
    getNotes: getNotes,
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNotes: readNotes,
    editNotes: editNotes,
    editNotesTitle: editNotesTitle,
    starMark: starMark,
    unstarMark: unstarMark
}