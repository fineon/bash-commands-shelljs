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
    shell.mkdir('new-folder')
    shell.cd('./new-folder')
    shell.touch(['newfile-1.txt', 'newfile-2.txt'])
    shell.cd('..')
}


createNewFiles()





