//@ts-check

const shell = require('shelljs')
const fs = require('fs/promises')
const readline = require('readline')

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

// TODO: remove the comment tag in bulkRenameFiles() to start bulk renaming the file
// bulkRenameFiles()

