const fs = require("fs");
const path = require("path");
const cwd = process.cwd();
const glob = require("glob");
const install = require("esinstall").install;

(async () => {
	const pkg = require(path.join(cwd, "package.json"));
    const bundle = [];
    const remaps = {};
    for (let i = 0; i < pkg.bundle.length; i++){
        if (typeof pkg.bundle[i] === "string"){
            bundle.push(pkg.bundle[i]);
        } else {
            bundle.push(pkg.bundle[i].in);
            remaps[pkg.bundle[i].in.replace(/.*[\/\\]/, "")] = pkg.bundle[i].out;
        }
    }
	await install(bundle);
	
	const libDir = path.join(cwd, "src", "framework", "lib");
	if (fs.existsSync(libDir)) {
		fs.rmSync(libDir, { recursive: true });
	}
	fs.mkdirSync(libDir);

	const scripts = glob.sync(`${path.join(cwd, "web_modules")}/**/*.js`);
	for (let i = 0; i < scripts.length; i++){
		const script = scripts[i];
		let filename = script.replace(/.*[\/\\]/, "");
        if (filename in remaps){
            filename = remaps[filename];
        }
		fs.renameSync(script, path.join(libDir, filename));
	}

	fs.rmSync(path.join(cwd, "web_modules"), {recursive: true});
})();
