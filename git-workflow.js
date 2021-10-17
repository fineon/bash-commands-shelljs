//@ts-check

const shell = require('shelljs')
const fs = require('fs/promises')
const readline = require('readline')

function executeGit() {
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
            rl.question('Enter your git commit message:   ', (answer) => {
                //add a commit message after the executing git add
                shell.exec(`git commit -m "${answer}"`, (stdout, stderr) => {
                    console.log(stdout, stderr);
                    shell.exec(`git push`, (stdout, stderr) => {
                        console.log(stdout, stderr);
                    })
                })
                rl.close();
            });

        })
    })



}

executeGit()