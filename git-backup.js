const shell = require('shelljs');

shell.cd('./');
shell.exec('git pull');
shell.exec('git merge dev');