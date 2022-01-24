const fs = require("fs");
const path = require("path");
const cwd = process.cwd();
const glob = require("glob");

const publicDir = path.join(cwd, "public", "docs", "components");
const componentsDir = path.join(cwd, "src", "framework", "components");

(async () => {
    if (fs.existsSync(publicDir)) {
        await fs.promises.rm(publicDir, { recursive: true });
    }
    await fs.promises.mkdir(publicDir, { recursive: true });
    const docs = glob.sync(`${componentsDir}/**/*.md`);
    for (const doc of docs) {
        const name = doc
            .match(/.*[\\\/]/, "")[0]
            .replace(/[\\\/]$/, "")
            .replace(/.*[\\\/]/, "")
            .toLowerCase()
            .trim();
        await fs.promises.copyFile(doc, path.join(publicDir, `${name}.md`));
    }
})();
