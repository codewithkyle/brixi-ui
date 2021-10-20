const fs = require("fs");
const path = require("path");
const cwd = process.cwd();
const inquirer = require('inquirer');
const glob = require("glob");

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

function renderIndex(name){
return `<script type="module">
    import Component from "/${name.toKebabCase()}.js";
    const example = new Component({

    });
    document.body.appendChild(example);
</script>
`;
}

function renderTypescript(name, tagName){
return `import { html, render } from "lit-html";
import SuperComponent from "@codewithkyle/supercomponent";
import env from "~controllers/env";

export interface I${name.toPascalCase()} {
    css: string,
    class: string,
    attributes: {
        [name:string]: string|number,
    },
}
export interface ${name.toPascalCase()}Settings {
    css?: string,
    class?: string,
    attributes?: {
        [name:string]: string|number,
    },
}
export default class ${name.toPascalCase()} extends SuperComponent<I${name.toPascalCase()}>{
    constructor(settings:${name.toPascalCase()}Settings){
        super();
        this.model = {
            css: "",
            class: "",
            attributes: {},
        };
        Object.keys(this.dataset).map(key => {
            if (key in this.model){
                this.model[key] = this.dataset[key];
            }
        });
        env.css(["${name.toKebabCase()}"]).then(()=>{
            this.update(settings);
        });
    }

    override render(){
        this.className = this.model.class;
        this.style.cssText = this.model.css;
        Object.keys(this.model.attributes).map(key => {
            this.setAttribute(key, \`\$\{this.model.attributes[key]\}\`);
        });
        const view = html\`

        \`;
        render(view, this);
    }
}
env.mount("${tagName}", ${name.toPascalCase()});
`;
}

function renderTypescriptExtended(name, tagName, extend, path){
return `import { html, render } from "lit-html";
import env from "~controllers/env";
import { default as ${extend}, I${extend}, ${extend}Settings } from "~components${path ? `/${path}/` : "/"}${extend.toKebabCase()}";

export interface I${name.toPascalCase()} extends I${extend} {

}
export interface ${name.toPascalCase()}Settings extends ${extend}Settings {
    
}
export default class ${name.toPascalCase()} extends ${extend}{
    constructor(settings:${name.toPascalCase()}Settings){
        super(settings);
        this.model = {
            css: "",
            class: "",
            attributes: {},
        };
        Object.keys(this.dataset).map(key => {
            if (key in this.model){
                this.model[key] = this.dataset[key];
            }
        });
        env.css(["${name.toKebabCase()}"]).then(()=>{
            this.update(settings);
        });
    }

    override render(){
        this.className = this.model.class;
        this.style.cssText = this.model.css;
        Object.keys(this.model.attributes).map(key => {
            this.setAttribute(key, \`\$\{this.model.attributes[key]\}\`);
        });
        const view = html\`

        \`;
        render(view, this);
    }
}
env.mount("${tagName}", ${name.toPascalCase()});
`;
}

function renderSass(tagName){
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
    for (const dir of dirs){
        const subDirs = await getDirectories(dir);
        if (subDirs.length){
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
        }
    ]);
    let extendClassName = null;
    let extendedClassPath = "";
    if (isExtend){
        const existingComponents = [];
        const files = glob.sync(`${basePath}/**/*.ts`);
        for (const file of files){
            existingComponents.push(file.replace(/.*[\\\/]|\.ts$/g, "").trim());
        }
        const { extended } = await inquirer.prompt([
            {
                type: "list",
                name: "extended",
                message: "What component should the new component extend?",
                choices: existingComponents,
            }
        ]);
        extendClassName = extended.toPascalCase();
        for (const file of files){
            if (file.indexOf(`${path.sep}${extended}.ts`) !== -1){
                extendedClassPath = file.replace(`${path.sep}${extended}.ts`, "").replace(basePath, "").trim().replace(/^[\/\\]|[\/\\]$/g, "").trim();
                console.log(extendedClassPath);
                break;
            }
        }
    }
    let newDir;
    if (location !== "one-off component"){
        newDir = path.join(basePath, location, name.toKebabCase());
    } else {
        newDir = path.join(basePath, name.toKebabCase());
    }
    if (fs.existsSync(newDir)){
        console.log(`${name} is already a component.`);
        process.exit(1);
    }

    let tagName = name.toKebabCase();
    if (!tagName.match(/\-/)){
        tagName = `${name.toKebabCase()}-component`;
    }
    await fs.promises.mkdir(newDir);
    await fs.promises.writeFile(path.join(newDir, "index.html"), renderIndex(name), {encoding:"utf-8"});
    const script = extendClassName ? renderTypescriptExtended(name, tagName, extendClassName, extendedClassPath) : renderTypescript(name, tagName);
    await fs.promises.writeFile(path.join(newDir, `${name.toKebabCase()}.ts`), script, {encoding: "utf-8"});
    await fs.promises.writeFile(path.join(newDir, `${name.toKebabCase()}.scss`), renderSass(tagName), {encoding:"utf-8"});
})();

String.prototype.toKebabCase = function(){
    return this.replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[\s_]+/g, '-')
        .toLowerCase() ;
}

String.prototype.toPascalCase = function() {
    return this
      .replace(new RegExp(/[-_]+/, 'g'), ' ')
      .replace(new RegExp(/[^\w\s]/, 'g'), '')
      .replace(
        new RegExp(/\s+(.)(\w+)/, 'g'),
        ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
      )
      .replace(new RegExp(/\s/, 'g'), '')
      .replace(new RegExp(/\w/), s => s.toUpperCase());
};