const shell = require('shelljs')
const fs = require('fs/promises');

//print current directory
console.log(shell.pwd())
// invoke git status command, check for file status
shell.exec('git status',(stdout)=>{
console.log(stdout)
})


console.log(shell.find('.').grep('.gitignore').stdout)
if (shell.find('.').grep('.gitignore').stdout == false) {
    shell.touch('.gitignore')
    fs.writeFile('.gitignore', 'node_modules/', (err) => { console.log(err) })
}
// shell.exec('git add .',(stdout,stderr)=>{
//     console.log(stdout,stderr)
// })

