const fs = require("fs");
const path = require("path");
const cwd = process.cwd();
const inquirer = require("inquirer");
const glob = require("glob");

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

function renderIndex(name, tagName) {
    return `<script type="module" src="/js/${name.toKebabCase()}.js"></script>

<${tagName}></${tagName}>`;
}

function renderTypescript(name, tagName) {
    return `import { html, render } from "lit-html";
import Component from "component";
import env from "~brixi/controllers/env";
import { parseDataset } from "~brixi/utils/general";

env.css(["${name.toKebabCase()}"]);

export interface I${name.toPascalCase()} {
}
export default class ${name.toPascalCase()} extends Component<I${name.toPascalCase()}>{
    constructor(){
        super();
        this.model = {
        };
    }

    static get observedAttributes() {
        return [];
    }

    override connected(){
        const settings = parseDataset(this.dataset, this.model);
        this.set(settings);
    }

    override render(){
        const view = html\`
        \`;
        render(view, this);
    }
}
env.bind("${tagName}", ${name.toPascalCase()});
`;
}

function renderTypescriptExtended(name, tagName, extend, path) {
    return `import { html, render } from "lit-html";
import env from "~brixi/controllers/env";
import { ${extend}, I${extend} } from "~brixi/components${path ? `/${path}/` : "/"}${extend.toKebabCase()}";

env.css(["${name.toKebabCase()}"]);

export interface I${name.toPascalCase()} extends I${extend} {
}
export default class ${name.toPascalCase()} extends ${extend}<I${name.toPascalCase()}>{
    constructor(){
        super();
        this.model = {
        };
    }

    static get observedAttributes() {
        return [];
    }

    override connected(){
        super.connected();
    }

    override render(){
        const view = html\`
        \`;
        render(view, this);
    }
}
env.bind("${tagName}", ${name.toPascalCase()});
`;
}

function renderSass(tagName) {
    return `${tagName} {
    display: block;
    position: relative;
}
`;
}

const basePath = path.join(cwd, "src", "framework", "components");

(async () => {
    const locationOptions = ["one-off component"];
    const dirs = await getDirectories(basePath);
    for (const dir of dirs) {
        const subDirs = await getDirectories(dir);
        if (subDirs.length) {
            const dirName = dir.replace(/.*[\/\\]/, "").trim();
            locationOptions.push(dirName);
        }
    }
    const { location, name, isExtend } = await inquirer.prompt([
        {
            type: "list",
            name: "location",
            message: "What type of component would you like to create?",
            choices: locationOptions,
        },
        {
            type: "input",
            name: "name",
            message: "What would you like to call your new component?",
            validate(value) {
                const pass = value.match(/[^a-z\s]/gi) || [];
                if (!pass.length) {
                    return true;
                }
                return "Compnent names can only contain letters.";
            },
        },
        {
            type: "confirm",
            name: "isExtend",
            message: "Does your component extend an existing component?",
        },
    ]);
    let extendClassName = null;
    let extendedClassPath = "";
    if (isExtend) {
        const existingComponents = [];
        const files = glob.sync(`${basePath}/**/*.ts`);
        for (const file of files) {
            existingComponents.push(file.replace(/.*[\\\/]|\.ts$/g, "").trim());
        }
        const { extended } = await inquirer.prompt([
            {
                type: "list",
                name: "extended",
                message: "What component should the new component extend?",
                choices: existingComponents,
            },
        ]);
        extendClassName = extended.toPascalCase();
        for (const file of files) {
            if (file.indexOf(`${path.sep}${extended}.ts`) !== -1) {
                extendedClassPath = file
                    .replace(`${path.sep}${extended}.ts`, "")
                    .replace(basePath, "")
                    .trim()
                    .replace(/^[\/\\]|[\/\\]$/g, "")
                    .trim();
                console.log(extendedClassPath);
                break;
            }
        }
    }
    let newDir;
    if (location !== "one-off component") {
        newDir = path.join(basePath, location, name.toKebabCase());
    } else {
        newDir = path.join(basePath, name.toKebabCase());
    }
    if (fs.existsSync(newDir)) {
        console.log(`${name} is already a component.`);
        process.exit(1);
    }

    let tagName = name.toKebabCase();
    if (!tagName.match(/\-/)) {
        tagName = `${name.toKebabCase()}-component`;
    }
    await fs.promises.mkdir(newDir);
    await fs.promises.writeFile(path.join(newDir, "index.html"), renderIndex(name, tagName), { encoding: "utf-8" });
    const script = extendClassName ? renderTypescriptExtended(name, tagName, extendClassName, extendedClassPath) : renderTypescript(name, tagName);
    await fs.promises.writeFile(path.join(newDir, `${name.toKebabCase()}.ts`), script, { encoding: "utf-8" });
    await fs.promises.writeFile(path.join(newDir, `${name.toKebabCase()}.scss`), renderSass(tagName), { encoding: "utf-8" });
})();

String.prototype.toKebabCase = function () {
    return this.replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/[\s_]+/g, "-")
        .toLowerCase();
};

String.prototype.toPascalCase = function () {
    return this.replace(new RegExp(/[-_]+/, "g"), " ")
        .replace(new RegExp(/[^\w\s]/, "g"), "")
        .replace(new RegExp(/\s+(.)(\w+)/, "g"), ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`)
        .replace(new RegExp(/\s/, "g"), "")
        .replace(new RegExp(/\w/), (s) => s.toUpperCase());
};
