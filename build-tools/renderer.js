const fs = require("fs");
const path = require("path");
const glob = require("glob");

const cwd = process.cwd();
const shellFile = path.join(cwd, "lib", "shell.html");

const publicDir = path.join(cwd, "public");
if (fs.existsSync(publicDir)) {
    fs.rmdirSync(publicDir, { recursive: true });
}
fs.mkdirSync(publicDir);

const cnameFile = path.join(cwd, "lib", "CNAME");
fs.copyFileSync(cnameFile, path.join(publicDir, "CNAME"));

const publicApiDir = path.join(publicDir, "api", "v1");
fs.mkdirSync(publicApiDir, { recursive: true });

const apiDir = path.join(cwd, "api");
const apiFiles = glob.sync(`${apiDir}/*.json`);
for (let i = 0; i < apiFiles.length; i++) {
    const fileName = apiFiles[i].replace(/.*[\\\/]/, "");
    fs.copyFileSync(apiFiles[i], `${publicApiDir}/${fileName}`);
}

const srcDir = path.join(cwd, "src");
const dirs = glob.sync(`${srcDir}/*`);

// Collect navigation data
const navigation = [];
for (let i = 0; i < dirs.length; i++) {
    const dirName = dirs[i]
        .replace(/[\\\/]$/, "")
        .replace(/.*[\\\/]/, "")
        .toLowerCase()
        .trim();
    if (fs.existsSync(path.join(dirs[i], "index.html"))) {
        navigation.push({
            title: dirName.replace(/\-/, " "),
            slug: dirName,
            file: path.join(dirs[i], "index.html"),
            subs: [],
        });
    } else {
        const nav = {
            title: dirName,
            slug: dirName,
            file: null,
            subs: [],
        };
        const subDirs = glob.sync(`${dirs[i]}/*`);
        for (let k = 0; k < subDirs.length; k++) {
            const subDirName = subDirs[k]
                .replace(/[\\\/]$/, "")
                .replace(/.*[\\\/]/, "")
                .toLowerCase()
                .trim();
            if (fs.existsSync(path.join(subDirs[k], "index.html"))) {
                nav.subs.push({
                    title: subDirName.replace(/\-/, " "),
                    slug: subDirName,
                    file: path.join(subDirs[k], "index.html"),
                });
            }
        }
        navigation.push(nav);
    }
}

// Render navigation
let navHTML = "";
for (let i = 0; i < navigation.length; i++) {
    if (navigation[i].file) {
        navHTML += `<a href="/${navigation[i].slug}">${navigation[i].title}</a>`;
    } else if (navigation[i].subs.length) {
        navHTML += `<dropdown-component>
                        <input type="checkbox" id="${navigation[i].slug}" />
                        <label for="${navigation[i].slug}">
                            ${navigation[i].title}
                            <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path fill="currentColor" d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path></svg>
                        </label>
                    <ul>`;
        for (let k = 0; k < navigation[i].subs.length; k++) {
            navHTML += `<li>
                            <a href="/${navigation[i].slug}/${navigation[i].subs[k].slug}">${navigation[i].subs[k].title}</a>
                        </li>`;
        }
        navHTML += `</ul></dropdown-component>`;
    }
}

// Render pages
const shellHTML = fs.readFileSync(shellFile).toString();
for (let i = 0; i < navigation.length; i++) {
    if (navigation[i].file) {
        renderPage(fs.readFileSync(navigation[i].file).toString(), navigation[i].slug);
    } else if (navigation[i].subs.length) {
        for (let k = 0; k < navigation[i].subs.length; k++) {
            renderPage(fs.readFileSync(navigation[i].subs[k].file).toString(), `${navigation[i].slug}/${navigation[i].subs[k].slug}`);
        }
    }
}

renderPage("", "");

function renderPage(fileHTML, output) {
    let pageHTML = shellHTML;
    pageHTML = pageHTML.replace("REPLACE_WITH_HTML", fileHTML);
    pageHTML = pageHTML.replace("REPLACE_WITH_NAV", navHTML);
    if (!fs.existsSync(path.join(publicDir, output))) {
        fs.mkdirSync(path.join(publicDir, output), { recursive: true });
    }
    fs.writeFileSync(path.join(publicDir, output, "index.html"), pageHTML);
}
