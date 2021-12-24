const fs = require("fs");
const path = require("path");
const cwd = process.cwd();
const glob = require("glob");

const tempDir = path.join(cwd, "_types");
const files = glob.sync(`${tempDir}/**/*.d.ts`);

const outDir = path.join(cwd, "dist", "framework", "types");
if (fs.existsSync(outDir)) {
    fs.rmdirSync(outDir, { recursive: true });
}
fs.mkdirSync(outDir, { recursive: true });

for (let i = 0; i < files.length; i++) {
    const filename = files[i].replace(/.*[\/\\]/, "");
    fs.renameSync(files[i], path.join(outDir, filename));
}

fs.rmdirSync(tempDir, { recursive: true });
