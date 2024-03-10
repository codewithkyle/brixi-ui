const glob = require("glob");
const path = require("path");

const rawPath = path.join(process.cwd(), "public", "raw", "components");
const raw = glob.sync(`${rawPath}/**/*`);
const static = ["/", "/404", "/navigation.json", "/service-worker-assets.js"];
for (const file of raw) {
    const name = file.replace(rawPath, "");
    if (name.search(/\.css|\.js|\.ts|\.html|\.scss|\.md/) !== -1) {
        static.push(`/raw/components/${name.replace(/^[\\\/]/, "").replace(/\\+/g, "/")}`);
    }
}
const componentsPath = path.join(process.cwd(), "public", "components");
const components = glob.sync(`${componentsPath}/**/*.html`);
for (const file of components) {
    const name = file
        .replace(componentsPath, "")
        .replace(/^[\\\/]/, "")
        .replace(/[\\\/].*/, "");
    static.push(`/components/${name}/index.html`);
}

module.exports = {
    src: [
        {
            files: "./public/spa/js/*.js",
            publicDir: "/spa/js",
        },
        {
            files: "./public/mpa/js/*.js",
            publicDir: "/mpa/js",
        },
        {
            files: "./public/css/*.css",
            publicDir: "/css",
        },
        {
            files: "./public/audio/*.wav",
            publicDir: "/audio",
        },
        {
            files: "./public/static/*",
            publicDir: "/static",
        },
        {
            files: "./public/docs/components/*.md",
            publicDir: "/docs/components",
        },
    ],
    output: "./public/service-worker-assets.js",
    static: static,
};
