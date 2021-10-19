//@ts-check

const shell = require('shelljs')
const fs = require('fs/promises')
const readline = require('readline')

//print current directory
function printCurrentDirectory() {
    console.log(shell.pwd().stdout)
}
printCurrentDirectory()

// finds a .gitignore file in the current directory. If there's none, create one and input node_modules/ in the file
if (!shell.find('.').grep('.gitignore').stdout) {
    shell.touch('.gitignore')
    fs.writeFile('.gitignore', 'node_modules/')
}

function createNewFiles() {
    //creates a new folder
    shell.mkdir('delish-dishes')
    //navigate to the new folder directory
    shell.cd('./delish-dishes')
    //creates two new files: newfile-1.txt
    shell.touch(['ingredients.txt', 'recipe.txt'])
}

function writeToNewFiles() {
    //creates a variable that stores a string to be appended to the new file
    let fileContent ='Ingredients for fried rice: rice, shallots, scalions, soy sauce, egg, sausage'
    //writing the printed string to the ingredients.txt file
    shell.echo(fileContent).to('ingredients.txt')
}

createNewFiles()
writeToNewFiles()




