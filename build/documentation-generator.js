const fs = require("fs");
const path = require("path");
const cwd = process.cwd();
const glob = require("glob");

const spaPublicDir = path.join(cwd, "public", "docs", "components", "spa");
const mpaPublicDir = path.join(cwd, "public", "docs", "components", "mpa");
const spaComponentsDir = path.join(cwd, "src", "spa", "components");
const mpaComponentsDir = path.join(cwd, "src", "mpa");

// TODO: mpa documentation

(async () => {
    if (fs.existsSync(spaPublicDir)) {
        await fs.promises.rm(spaPublicDir, { recursive: true });
    }
    if (fs.existsSync(mpaPublicDir)) {
        await fs.promises.rm(mpaPublicDir, { recursive: true });
    }
    await fs.promises.mkdir(spaPublicDir, { recursive: true });
    await fs.promises.mkdir(mpaPublicDir, { recursive: true });
    const spaDocs = glob.sync(`${spaComponentsDir}/**/*.md`);
    for (const doc of spaDocs) {
        const name = doc
            .match(/.*[\\\/]/, "")[0]
            .replace(/[\\\/]$/, "")
            .replace(/.*[\\\/]/, "")
            .toLowerCase()
            .trim();
        await fs.promises.copyFile(doc, path.join(spaPublicDir, `${name}.md`));
    }
    const mpaDocs = glob.sync(`${mpaComponentsDir}/**/*.md`);
    for (const doc of mpaDocs) {
        const name = doc
            .match(/.*[\\\/]/, "")[0]
            .replace(/[\\\/]$/, "")
            .replace(/.*[\\\/]/, "")
            .toLowerCase()
            .trim();
        await fs.promises.copyFile(doc, path.join(mpaPublicDir, `${name}.md`));
    }
})();
