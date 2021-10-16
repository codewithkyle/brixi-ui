const fs = require("fs");
const path = require("path");
const cwd = process.cwd();
const glob = require("glob");

const tempDir = path.join(cwd, "_types");
const files = glob.sync(`${tempDir}/**/*.d.ts`);

const nodeModulesDir = path.join(cwd, "node_modules");
const moduleFiles = glob.sync(`${nodeModulesDir}/**/*.d.ts`);

for (let i = 0; i < files.length; i++){
    const filename = files[i].replace(/.*[\/\\]/, "").trim();
    for (let k = 0; k < moduleFiles.length; k++){
        const moduleFilename = moduleFiles[k].replace(/.*[\/\\]/, "").trim();
        if (filename === moduleFilename){
            fs.copyFileSync(moduleFiles[k], files[i]);
            break;
        }
    }
}

const outDir = path.join(cwd, "dist", "framework", "types");
if (fs.existsSync(outDir)){
    fs.rmdirSync(outDir, {recursive: true});
}
fs.mkdirSync(outDir);

for (let i = 0; i < files.length; i++){
    const filename = files[i].replace(/.*[\/\\]/, "");
    fs.renameSync(files[i], path.join(outDir, filename));
}

fs.rmdirSync(tempDir, {recursive: true});
