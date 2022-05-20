const fs = require("fs");
const archiver = require("archiver");
const zipper = archiver("zip");
const glob = require("glob");
const path = require("path");
const cwd = process.cwd();

const distPath = path.join(cwd, "dist");
const outPath = path.join(cwd, "brixi-ui.zip");
const output = fs.createWriteStream(outPath);

output.on("close", () => {
    console.log(`Production files zipped at ${outPath}`);
    process.exit(0);
});
output.on("error", (err) => {
    console.log(err);
    process.exit(1);
});

zipper.pipe(output);
zipper.directory(distPath, false);
zipper.finalize();
