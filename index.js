//@ts-check

const shell = require('shelljs')
const fs = require('fs/promises')
const readline = require('readline')

//print current directory
function printCurrentDirectory() {
    console.log(shell.pwd().stdout)
}

// finds a .gitignore file in the current directory. If there's none, create one and input node_modules/ in the file
if (!shell.find('.').grep('.gitignore').stdout) {
    shell.touch('.gitignore')
    fs.writeFile('.gitignore', 'node_modules/')
}

function executeGit(commitMessage) {
    //initiate Nodejs readline module, and prepare to create a user prompt in the console
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // invoke git status command, check for file status
    shell.exec('git status', (stdout) => {
        console.log(stdout);
        //add all files to staging in the current directory
        shell.exec('git add .', (stdout, stderr) => {
            console.log(stdout, stderr);
            //initiate a console prompt that requires user input in the console, then use the input to createa git commit message
            rl.question('Enter your git commit message', (answer) => {
                console.log(`Thank you for your valuable feedback: ${answer}`);
                //add a commit message after the executing git add
                shell.exec(`git commit -m "${answer}"`, (stdout, stderr) => {
                    console.log(stdout, stderr);
                })
                rl.close();
            });

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

executeGit()



