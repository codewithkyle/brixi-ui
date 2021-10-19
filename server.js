const express = require('express');
const fs = require("fs");
const { glob } = require('glob');
const path = require("path");

const app = express();
const port = 5000;
const cwd = process.cwd();

const jsDir = path.join(cwd, "test", "js");
const cssDir = path.join(cwd, "test", "css");
const staticDir = path.join(cwd, "static");
const frameworkDir = path.join(cwd, "src", "framework");
const audioDir = path.join(cwd, "audio");

app.use(express.static('test'));
app.use(express.static('test/js'));
app.use(express.static('test/css'));
app.use(express.static('static'));

function setHeaders(res){
    res.append('Access-Control-Allow-Origin', '*');
    res.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
}

app.get('/static/*', async (req, res) => {
    try {
        setHeaders(res);
        const file = path.join(staticDir, req.path.replace(/[\/]static\/|\/$/g, "").trim().toLowerCase());
        if (fs.existsSync(file)){
            return res.status(200).sendFile(file);
        } else {
            throw 404;
        }
    } catch (e) {
        let status = 500;
        if (typeof e === "number"){
            status = e;
        }
        return res.status(status).send();
    }
});
app.get('/js/*', async (req, res) => {
    try {
        setHeaders(res);
        const file = path.join(jsDir, req.path.replace(/[\/]js\/|\/$/g, "").trim().toLowerCase());
        if (fs.existsSync(file)){
            return res.status(200).sendFile(file);
        } else {
            throw 404;
        }
    } catch (e) {
        let status = 500;
        if (typeof e === "number"){
            status = e;
        }
        return res.status(status).send();
    }
});
app.get('/css/*', async (req, res) => {
    try {
        setHeaders(res);
        const file = path.join(cssDir, req.path.replace(/[\/]css\/|\/$/g, "").trim().toLowerCase());
        if (fs.existsSync(file)){
            return res.status(200).sendFile(file);
        } else {
            throw 404;
        }
    } catch (e) {
        let status = 500;
        if (typeof e === "number"){
            status = e;
        }
        return res.status(status).send();
    }
});

app.get('/service-worker.js', async (req, res) => {
    try {
        const file = path.join(cwd, "service-worker.js");
        if (fs.existsSync(file)){
            return res.status(200).sendFile(file);
        } else {
            throw 404;
        }
    } catch (e) {
        let status = 500;
        if (typeof e === "number"){
            status = e;
        }
        return res.status(status).send();
    }
});
app.get('/service-worker-assets.js', async (req, res) => {
    try {
        const file = path.join(cwd, "service-worker-assets.js");
        if (fs.existsSync(file)){
            return res.status(200).sendFile(file);
        } else {
            throw 404;
        }
    } catch (e) {
        let status = 500;
        if (typeof e === "number"){
            status = e;
        }
        return res.status(status).send();
    }
});

app.get('/audio/*', async (req, res) => {
    try {
        setHeaders(res);
        const file = path.join(audioDir, req.path.replace(/[\/]audio\/|\/$/g, "").trim().toLowerCase());
        if (fs.existsSync(file)){
            return res.status(200).sendFile(file);
        } else {
            throw 404;
        }
    } catch (e) {
        let status = 500;
        if (typeof e === "number"){
            status = e;
        }
        return res.status(status).send();
    }
});


app.get('/docs/*', async (req, res) => {
    try {
        setHeaders(res);
        const file = path.join(frameworkDir, req.path.replace(/[\/]docs\/|\/$/g, "").trim().toLowerCase(), "readme.md");
        if (fs.existsSync(file)){
            return res.status(200).sendFile(file);
        } else {
            throw 404;
        }
    } catch (e) {
        let status = 500;
        if (typeof e === "number"){
            status = e;
        }
        return res.status(status).send();
    }
});

app.get("/lookup/*", async (req, res) => {
    try {
        setHeaders(res);
        const dir = path.join(frameworkDir, req.path.replace(/[\/]lookup\/|\/$/g, "").trim().toLowerCase());
        if (fs.existsSync(dir)){
            const files = glob.sync(`${dir}/*`);
            const data = [];
            for (let i = 0; i < files.length; i++){
                const file = files[i].replace(/.*[\/\\]/, "").trim().toLowerCase();
                data.push(file);
                if (new RegExp(/\.scss$/).test(file)){
                    data.push(file.replace(/\..*/, ".css"));
                }
                if (new RegExp(/\.ts$/).test(file)){
                    data.push(file.replace(/\..*/, ".js"));
                }
            }
            return res.status(200).json(data);
        } else {
            throw 404;
        }
    } catch (e) {
        let status = 500;
        if (typeof e === "number"){
            status = e;
        }
        return res.status(status).send();
    }
});

app.get('/raw/*', async (req, res) => {
    try {
        setHeaders(res);
        const ext = req.path.match(/\.[0-9a-z]+$/)?.[0] ?? ".html";
        let file;
        switch (ext){
            case ".css":
                file = path.join(cssDir, req.path.replace(/.*\//, "").trim().toLowerCase());
                break;
            case ".js":
                file = path.join(jsDir, req.path.replace(/.*\//, "").trim().toLowerCase());
                break;
            case ".scss":
                file = path.join(frameworkDir, req.path.replace(/[\/]raw\//, "").trim().toLowerCase());
                break;
            case ".ts":
                file = path.join(frameworkDir, req.path.replace(/[\/]raw\//, "").trim().toLowerCase());
                break;
            default:
                file = path.join(frameworkDir, req.path.replace(/[\/]raw\//, "").trim().toLowerCase());
                break;
        }
        if (fs.existsSync(file)){
            let content = await fs.promises.readFile(file, { encoding: "utf-8"});
            content = content.replace(/\t/g, "    ");
            return res.status(200).send(content).setHeader("content-type", "text/plain");
        } else {
            throw 404;
        }
    } catch (e) {
        let status = 500;
        if (typeof e === "number"){
            status = e;
        }
        return res.status(status).send();
    }
});

app.get('/components/*', async (req, res) => {
    try {
        setHeaders(res);
        const dir = path.join(frameworkDir, req.path.replace(/^\/|\/$/g, "").trim().toLowerCase());
        const page = path.join(dir, "index.html");
        const component = req.path.replace(/.*?\/|\/$/g, "").trim().toLowerCase();
        if (fs.existsSync(page)){
            const content = await fs.promises.readFile(page, { encoding: "utf-8"});
            let css = "";
            let js = "";
            return res.status(200).send(renderComponent(content, js, css));
        } else {
            throw 404;
        }
    } catch (e) {
        let status = 500;
        if (typeof e === "number"){
            status = e;
        }
        return res.status(status).send();
    }
});

app.get("/navigation.json", async (req, res) => {
    setHeaders(res);
    const dirs = await getDirectories(path.join(frameworkDir, "components"));
    let data = [];
    for (let i = 0; i < dirs.length; i++){
        const name = dirs[i].replace(/.*\//, "").trim().toLowerCase();
        const component = {
            name: name,
            slug: name,
            children: [],
        };
        const subdirs = await getDirectories(dirs[i]);
        if (subdirs.length){
            for (let s = 0; s < subdirs.length; s++){
                const childName = subdirs[s].replace(/.*\//, "").trim().toLowerCase();
                const childComponent = {
                    name: childName,
                    slug: `${component.slug}/${childName}`,
                    children: [],
                };
                component.children.push(childComponent);
            }
        }
        data.push(component);
    }
    return res.status(200).json(data);
});

app.get("/*", async (req, res) => {
    setHeaders(res);
    return res.status(200).send(renderBasePage());
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

function renderComponent(content, js = "", css = ""){
return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Brixi UI</title>
    <meta name="description" content="A sleek & slender design system built on web components.">
    <link rel="alternate icon" href="/favicon.png">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="stylesheet" href="/css/normalize.css">
    <link rel="stylesheet" href="/css/framework-core.css">
    <link rel="stylesheet" href="/css/core.css">
    <link rel="stylesheet" href="/css/brixi.css">
    <link rel="stylesheet" href="/css/component-layout.css">
    <link rel="stylesheet" href="/css/tooltip.css">
    <link rel="stylesheet" href="/css/snackbar.css">
    ${ css.length ? `<style>${css}</style>` : "" }
    ${ js.length ? `<script type="module">${js}</script>` : "" }
    <script type="module" src="/js/soundscape.js"></script>
    <script type="module" src="/js/tooltipper.js"></script>
</head>
<body>
    ${content}
</body>
</html>
`;
}

function renderBasePage(){
return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Brixi UI</title>
    <meta name="description" content="A sleek & slender design system built on web components.">
    <link rel="alternate icon" href="/favicon.png">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <script type="module">
        import { snackbar } from "/js/notifyjs.js";
        navigator.serviceWorker.addEventListener('message', event => {
            snackbar({
                message: "A new version of this site is available.",
                closeable: true,
                duration: Infinity,
                buttons: [
                    {
                        label: "Refresh",
                        callback: () => {
                            location.reload();
                        },
                    },
                ]
            });
        });
    </script>
    <script>navigator.serviceWorker.register('/service-worker.js');</script>
    <link rel="stylesheet" href="/css/normalize.css">
    <link rel="stylesheet" href="/css/framework-core.css">
    <link rel="stylesheet" href="/css/core.css">
    <link rel="stylesheet" href="/css/brixi.css">
    <link rel="stylesheet" href="/css/base-layout.css">
    <link rel="stylesheet" href="/css/button.css">
    <link rel="stylesheet" href="/css/tooltip.css">
    <link rel="stylesheet" href="/css/snackbar.css">
    <link rel="stylesheet" href="/css/link.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.0.1/styles/github-dark-dimmed.min.css">
    <script defer src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.0.1/highlight.min.js"></script>
    <script type="module" src="/js/bootstrap.js"></script>
    <script type="module" src="/js/tooltipper.js"></script>
    \<script type="module" src="/js/soundscape.js"></script>

    <meta property="og:url" content="https://ui.brixi.dev/" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Brixi UI" />
    <meta property="og:image" content="https://ui.brixi.dev/brixi-ui-card.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:description" content="A sleek & slender design system built on web components." />
    <meta property="og:site_name" content="Brixi UI" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="https://ui.brixi.dev/" />
    <meta name="twitter:description" content="A sleek & slender design system built on web components." />
    <meta name="twitter:title" content="Brixi UI" />
    <meta name="twitter:image" content="https://ui.brixi.dev/brixi-ui-card.png" />
</head>
<body>
    <nav-component></nav-component>
    <component-viewer></component-viewer>
</body>
</html>
`;
}

async function getDirectories(basePath){
    let dirs = []
    const files = await fs.promises.readdir(basePath);
    for (const file of files) {
        const filePath = path.join(basePath, file);
        if ((await fs.promises.stat(filePath)).isDirectory()) {
            dirs = [...dirs, filePath];
        }
    }
    return dirs;
}
