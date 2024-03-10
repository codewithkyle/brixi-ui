const fs = require("fs");
const path = require("path");
const cwd = process.cwd();
const glob = require("glob");

const publicDir = path.join(cwd, "public", "raw", "components", "spa");
const componentsDir = path.join(cwd, "src", "spa", "components");
const cssDir = path.join(cwd, "public", "spa", "css");
const jsDir = path.join(cwd, "public", "spa", "js");

(async () => {
    if (fs.existsSync(publicDir)) {
        await fs.promises.rm(publicDir, { recursive: true });
    }
    await fs.promises.mkdir(publicDir, { recursive: true });
    const components = glob.sync(`${componentsDir}/**/index.html`);
    for (const file of components) {
        const name = file
            .match(/.*[\\\/]/, "")[0]
            .replace(/[\\\/]$/, "")
            .replace(/.*[\\\/]/, "")
            .toLowerCase()
            .trim();
        const lDir = file
            .match(/.*[\\\/]/, "")[0]
            .toLowerCase()
            .trim();
        const readme = path.join(lDir, "readme.md");
        const ts = path.join(lDir, `${name}.ts`);
        const scss = path.join(lDir, `${name}.scss`);
        const css = path.join(cssDir, `${name}.css`);
        const js = path.join(jsDir, `${name}.js`);
        const html = file;
        const pDir = path.join(publicDir, name);
        if (!fs.existsSync(pDir)) {
            await fs.promises.mkdir(pDir);
        }
        if (fs.existsSync(readme)) {
            await fs.promises.copyFile(readme, path.join(pDir, "readme.md"));
        }
        if (fs.existsSync(ts)) {
            await fs.promises.copyFile(ts, path.join(pDir, `${name}.ts`));
        }
        if (fs.existsSync(scss)) {
            await fs.promises.copyFile(scss, path.join(pDir, `${name}.scss`));
        }
        if (fs.existsSync(css)) {
            await fs.promises.copyFile(css, path.join(pDir, `${name}.css`));
        }
        if (fs.existsSync(js)) {
            await fs.promises.copyFile(js, path.join(pDir, `${name}.js`));
        }
        if (fs.existsSync(html)) {
            await fs.promises.copyFile(html, path.join(pDir, `${name}.html`));
        }
    }
})();
