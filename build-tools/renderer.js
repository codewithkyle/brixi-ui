const fs = require("fs");
const path = require("path");
const cwd = process.cwd();

const publicDir = path.join(cwd, 'public');
if (fs.existsSync(publicDir)){
    fs.rmdirSync(publicDir, {recursive: true});
}
fs.mkdirSync(publicDir);

const shellFile = path.join(cwd, 'lib', 'shell.html');
fs.copyFileSync(shellFile, path.join(publicDir, 'index.html'));

const cnameFile = path.join(cwd, 'lib', 'CNAME');
fs.copyFileSync(cnameFile, path.join(publicDir, 'CNAME'));