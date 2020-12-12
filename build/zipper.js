const archiver = require("archiver");
const path = require("path");
const fs = require("fs");
const glob = require("glob");

const cwd = process.cwd();

const srcDir = path.join(cwd, "src");
const files = glob.sync(`${srcDir}/**/index.html`);

const downloadsDir = path.join(cwd, "public", "downloads");
fs.mkdirSync(downloadsDir);

let generated = 0;
for (let i = 0; i < files.length; i++) {
    const dir = path.resolve(files[i], "../");
    const dirName = dir
        .replace(/[\\\/]$/, "")
        .replace(/.*[\\\/]/, "")
        .toLowerCase()
        .trim();
    const output = fs.createWriteStream(`${downloadsDir}/${dirName}.zip`);
    const archive = archiver("zip", { zlib: { level: 9 } });
    output.on("close", () => {
        generated++;
        if (generated === files.length) {
            process.exit(0);
        }
    });
    archive.pipe(output);
    archive.directory(dir, dirName);
    archive.finalize();
}
