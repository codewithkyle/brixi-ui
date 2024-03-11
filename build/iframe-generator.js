const fs = require("fs");
const path = require("path");
const cwd = process.cwd();
const glob = require("glob");

const publicDir = path.join(cwd, "public", "components");
const componentsDir = path.join(cwd, "src", "spa", "components");
const mpaDir = path.join(cwd, "src", "mpa");

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
    const mpaComponents = glob.sync(`${mpaDir}/**/index.html`);
    for (const component of mpaComponents) {
        const name = component
            .match(/.*[\\\/]/, "")[0]
            .replace(/[\\\/]$/, "")
            .replace(/.*[\\\/]/, "")
            .toLowerCase()
            .trim();
        const mpaHtml = await renderMPAComponent(name, component);
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
        import soundscape from "/spa/js/soundscape.js";
        soundscape.load();
    </script>
    <script type="module" src="/spa/js/tooltipper.js"></script>
    <link rel="stylesheet" href="/css/${name}.css">
    <script type="module" src="/spa/js/${name}.js"></script>
</head>
<body>
    ${content.trim().length ? content : '<p>Coming soon.</p>'}
</body>
</html>
`;
}

async function renderMPAComponent(name, p) {
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
    <script type="module" src="/spa/js/tooltipper.js"></script>
    <link rel="stylesheet" href="/css/${name}.css">
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3/dist/cdn.min.js"></script>
    <script type="module">
        import { configure, update, mount, css } from "https://cdn.jsdelivr.net/npm/@codewithkyle/lazy-loader@1/lazy-loader.min.mjs";
        configure({
            jsDir: "/mpa/js",
            cssDir: "/css",
            default: "eager"
        });
    </script>
    <script type="module">
        import notifications from "/spa/js/alerts.js";
        window.addEventListener("alert:toast", (e) => {
            notifications.toast(e.detail)
        });
    </script>
</head>
<body>
    ${content.trim().length ? content : '<p>Coming soon.</p>'}
</body>
</html>
`;
}
