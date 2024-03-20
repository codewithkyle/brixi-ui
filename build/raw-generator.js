const fs = require("fs");
const path = require("path");
const cwd = process.cwd();
const glob = require("glob");

const publicSPADir = path.join(cwd, "public", "raw", "components", "spa");
const publicMPADir = path.join(cwd, "public", "raw", "components", "mpa");
const spaComponentsDir = path.join(cwd, "src", "spa", "components");
const mpaComponentsDir = path.join(cwd, "src", "mpa", "components");
const cssDir = path.join(cwd, "public", "css");
const spajsDir = path.join(cwd, "public", "spa", "js");
const mpajsDir = path.join(cwd, "public", "mpa", "js");

(async () => {
    if (fs.existsSync(publicSPADir)) {
        await fs.promises.rm(publicSPADir, { recursive: true });
    }
    if (fs.existsSync(publicMPADir)) {
        await fs.promises.rm(publicMPADir, { recursive: true });
    }
    await fs.promises.mkdir(publicSPADir, { recursive: true });
    await fs.promises.mkdir(publicMPADir, { recursive: true });
    const spaComponents = glob.sync(`${spaComponentsDir}/**/index.html`);
    for (const file of spaComponents) {
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
        const css = path.join(cssDir, `${name}.css`);
        const js = path.join(spajsDir, `${name}.js`);
        const html = file;
        const pDir = path.join(publicSPADir, name);
        if (!fs.existsSync(pDir)) {
            await fs.promises.mkdir(pDir);
        }
        if (fs.existsSync(readme)) {
            await fs.promises.copyFile(readme, path.join(pDir, "readme.md"));
        }
        if (fs.existsSync(ts)) {
            await fs.promises.copyFile(ts, path.join(pDir, `${name}.ts`));
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
    const mpaComponents = glob.sync(`${mpaComponentsDir}/**/index.html`);
    for (const file of mpaComponents) {
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
        const css = path.join(cssDir, `${name}.css`);
        const js = path.join(mpajsDir, `${name}.js`);
        const html = file;
        const pDir = path.join(publicMPADir, name);
        if (!fs.existsSync(pDir)) {
            await fs.promises.mkdir(pDir);
        }
        if (fs.existsSync(readme)) {
            await fs.promises.copyFile(readme, path.join(pDir, "readme.md"));
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
