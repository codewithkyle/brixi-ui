const fs = require("fs");
const path = require("path");
const cwd = process.cwd();
const glob = require("glob");

const outFile = path.join(cwd, "public", "navigation.json");
const frameworkDir = path.join(cwd, "src", "framework");

(async () => {
    if (fs.existsSync(outFile)) {
        await fs.promises.unlink(outFile);
    }
    const dirs = await getDirectories(path.join(frameworkDir, "components"));
    let data = [];
    for (let i = 0; i < dirs.length; i++) {
        const name = dirs[i].replace(/.*\//, "").trim().toLowerCase();
        const component = {
            name: name,
            slug: name,
            children: [],
        };
        const subdirs = await getDirectories(dirs[i]);
        if (subdirs.length) {
            for (let s = 0; s < subdirs.length; s++) {
                const childName = subdirs[s].replace(/.*\//, "").trim().toLowerCase();
                const childComponent = {
                    name: childName,
                    slug: childName,
                    children: [],
                };
                component.children.push(childComponent);
            }
        }
        data.push(component);
    }
    await fs.promises.writeFile(outFile, JSON.stringify(data));
})();

async function getDirectories(basePath) {
    let dirs = [];
    const files = await fs.promises.readdir(basePath);
    for (const file of files) {
        const filePath = path.join(basePath, file);
        if ((await fs.promises.stat(filePath)).isDirectory()) {
            dirs = [...dirs, filePath];
        }
    }
    return dirs;
}
