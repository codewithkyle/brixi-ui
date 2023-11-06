const fs = require("fs");
const path = require("path");
const cwd = process.cwd();
const glob = require("glob");

const publicDir = path.join(cwd, "public", "components");
const componentsDir = path.join(cwd, "src", "framework", "components");

(async () => {
    if (fs.existsSync(publicDir)) {
        await fs.promises.rm(publicDir, { recursive: true });
    }
    await fs.promises.mkdir(publicDir);
    const components = glob.sync(`${componentsDir}/**/index.html`);
    for (const component of components) {
        const name = component
            .match(/.*[\\\/]/, "")[0]
            .replace(/[\\\/]$/, "")
            .replace(/.*[\\\/]/, "")
            .toLowerCase()
            .trim();
        const spaHtml = await renderComponent(name, component);
        const spaDir = path.join(publicDir, "spa", name);
        if (!fs.existsSync(spaDir)) {
            await fs.promises.mkdir(spaDir, { recursive: true });
        }
        await fs.promises.writeFile(path.join(spaDir, "index.html"), spaHtml);
    }
    const mpaComponents = glob.sync(`${componentsDir}/**/static.html`);
    for (const component of mpaComponents) {
        const name = component
            .match(/.*[\\\/]/, "")[0]
            .replace(/[\\\/]$/, "")
            .replace(/.*[\\\/]/, "")
            .toLowerCase()
            .trim();
        const mpaHtml = await renderComponent(name, component);
        const mpaDir = path.join(publicDir, "mpa", name);
        if (!fs.existsSync(mpaDir)) {
            await fs.promises.mkdir(mpaDir, { recursive: true });
        }
        await fs.promises.writeFile(path.join(mpaDir, "index.html"), mpaHtml);
    }
})();

async function renderComponent(name, p) {
    const content = await fs.promises.readFile(p, { encoding: "utf-8" });
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Brixi UI</title>
    <meta name="description" content="A sleek & slender design system built on web components.">
    <link rel="alternate icon" href="/static/favicon.png">
    <link rel="icon" type="image/svg+xml" href="/static/favicon.svg">
    <link rel="stylesheet" href="/css/normalize.css">
    <link rel="stylesheet" href="/css/framework-core.css">
    <link rel="stylesheet" href="/css/core.css">
    <link rel="stylesheet" href="/css/brixi.css">
    <link rel="stylesheet" href="/css/component-layout.css">
    <link rel="stylesheet" href="/css/tooltip.css">
    <link rel="stylesheet" href="/css/snackbar.css">
    <script type="module">
        import soundscape from "/js/soundscape.js";
        soundscape.load();
    </script>
    <script type="module" src="/js/tooltipper.js"></script>
    <link rel="stylesheet" href="/css/${name}.css">
    <script type="module" src="/js/${name}.js"></script>
</head>
<body>
    ${content.trim().length ? content : '<p>Coming soon.</p>'}
</body>
</html>
`;
}
