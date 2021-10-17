//@ts-check

const shell = require('shelljs')
const fs = require('fs/promises');

//print current directory
function printCurrentDirectory() {
    console.log(shell.pwd())
}

// finds a .gitignore file in the current directory. If there's none, create one and input node_modules/ in the file
if (!shell.find('.').grep('.gitignore').stdout) {
    shell.touch('.gitignore')
    fs.writeFile('.gitignore', 'node_modules/')
}

function executeGit(commitMessage) {
    // invoke git status command, check for file status
    shell.exec('git status',(stdout)=>{
        console.log(stdout);
        //add all files to staging in the current directory
        shell.exec('git add .', (stdout, stderr) => {
            console.log(stdout, stderr);
            shell.exec(`git commit -m "${commitMessage}"`, (stdout, stderr) => {
                console.log(stdout, stderr);
            })
        })
    })
    
   
    
}


/**
 * use cd command to move to the renamed-file directory
 * then use ls command returns an list of files in the current directory in the form of an array, then slice the array with the desired file names
 * @returns {Array}
 */
function getFilesInDirectory() {
    shell.cd('./renamed-files')
    console.log('changed directory to the subfolder renamed-files. If you are actively working on this repo, please check if the current directory is the correct one')
    console.log(shell.ls('.'))
    console.log(shell.ls('.').slice(0, 2))
    return shell.ls('.').slice(0, 2)
}

/**
 * @description takes the returned array from the previous function and loop through them to rename each file into Markdown files, speparated by the array's index number
 */
function bulkRenameFiles() {
    getFilesInDirectory().forEach((file, index) => {
        let conseqName = 'markdown-file-' + index.toString() + '.md'
        fs.rename(file, conseqName)
    });
}

// bulkRenameFiles()
printCurrentDirectory()

executeGit('added more demo for bulk renaming files, executing Git commands in js, and print current directory to the console')