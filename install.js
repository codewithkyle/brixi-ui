#!/usr/bin/env node

const path = require("path");
const fs = require('fs-extra');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv)).argv;
const cwd = process.cwd();

if (!argv?.framework){
    console.log("Missing --framework flag.");
    process.exit(1);
} else if (!argv?.audio){
    console.log("Missing --audio flag.");
    process.exit(1);
}

// Relocate audio files
const audio = path.join(__dirname, "dist", "audio");
const audioDest = path.resolve(cwd, argv.audio);
if (fs.existsSync(audioDest)){
    fs.rmdirSync(audioDest, { recursive: true });
}
fs.copySync(audio, audioDest);


// Relocate framework
const framework = path.join(__dirname, "dist", "framework");
const frameworkDest = path.resolve(cwd, argv.framework);
if (fs.existsSync(frameworkDest)){
    fs.rmdirSync(frameworkDest, { recursive: true });
}
fs.copySync(framework, frameworkDest);
