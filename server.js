const express = require('express');
const fs = require("fs");
const { glob } = require('glob');
const path = require("path");

const app = express();
const port = 5000;
const cwd = process.cwd();

app.use(express.static('test'));
app.use(express.static('test/js'));
app.use(express.static('test/css'));
app.use(express.static('static'));

const jsDir = path.join(cwd, "test", "js");
const cssDir = path.join(cwd, "test", "css");
const frameworkDir = path.join(cwd, "src", "framework");
const audioDir = path.join(cwd, "audio");

app.get('/audio/*', async (req, res) => {
    try {
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
    <link rel="stylesheet" href="/normalize.css">
    <link rel="stylesheet" href="/framework-core.css">
    <link rel="stylesheet" href="/core.css">
    <link rel="stylesheet" href="/brixi.css">
    <link rel="stylesheet" href="/component-layout.css">
    <link rel="stylesheet" href="/tooltip.css">
    ${ css.length ? `<style>${css}</style>` : "" }
    ${ js.length ? `<script type="module">${js}</script>` : "" }
    <script type="module" src="/soundscape.js"></script>
    <script type="module" src="/tooltipper.js"></script>
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
    <link rel="stylesheet" href="/normalize.css">
    <link rel="stylesheet" href="/framework-core.css">
    <link rel="stylesheet" href="/core.css">
    <link rel="stylesheet" href="/brixi.css">
    <link rel="stylesheet" href="/base-layout.css">
    <link rel="stylesheet" href="/css/button.css">
    <link rel="stylesheet" href="/css/tooltip.css">
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.0.1/styles/github-dark-dimmed.min.css">
    <script defer src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.0.1/highlight.min.js"></script>
    <script type="module" src="/bootstrap.js"></script>
    <script type="module" src="/js/tooltipper.js"></script>
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
