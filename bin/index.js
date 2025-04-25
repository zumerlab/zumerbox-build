#!/usr/bin/env node

const esbuild = require('esbuild');
const path = require('path');
const yargs = require('yargs');
const sassPlugin = require('esbuild-plugin-sass');

// Define command-line options using yargs
const argv = yargs
  .usage('Usage: $0 [options]')
  .option('name', {
    alias: 'n',
    describe: 'Name of the bundler',
    type: 'string'
  })
  .option('js', {
    alias: 'j',
    describe: 'Path to JavaScript file',
    type: 'string'
  })
  .option('scss', {
    alias: 's',
    describe: 'Path to SCSS file',
    type: 'string'
  })
  .option('minify', {
    alias: 'm',
    describe: 'Generate minified output files',
    type: 'boolean',
    default: true
  })
  .option('outdir', {
    alias: 'd',
    describe: 'Destination folder',
    type: 'string',
    default: 'dist'
  })
  .option('platform', {
    alias: 'p',
    describe: 'Target platform for esBuild (e.g., browser, node, neutral)',
    type: 'string',
    default: 'browser'
  })
  .option('comments', {
    alias: 'c',
    describe: 'Keep comments',
    type: 'boolean',
    default: false
  })
  .option('extension', {
    alias: 'ext',
    describe: 'Set extension',
    type: 'string'
  })
  .help('h')
  .alias('h', 'help').argv;


// Read package.json from project directory
const packageJsonPath = path.resolve(process.cwd(), './package.json');
const pkg = require(packageJsonPath);

// Use package name from package.json if no name provided
const bundlerName = argv.name || pkg.name || 'MyBundler';

let setBanner
if (pkg) {
  setBanner = () => `
/*
* ${bundlerName}
* v.${pkg.version}
* Author ${pkg.author}
* License ${pkg.license}
**/`;
  
} else {
  setBanner = () => `
/*
* ${bundlerName}
**/`;

}

// Configuration for esbuild
const options = {
  entryPoints: [],
  entryNames: bundlerName,
  bundle: true,
  banner: {
    js: setBanner(),
    css: setBanner()
  },
  outdir: argv.outdir,
  legalComments: argv.comments ? 'inline' : 'none',
  plugins: [sassPlugin()],
  platform: argv.platform
};

if (argv.js) {
  options.entryPoints.push(argv.js);
}

if (argv.extension) {
  options.outExtension ={ '.js' :  argv.extension};
  optionsMinify.outExtension = { '.js' :  argv.extension};
}


if (argv.scss) {
  options.entryPoints.push(argv.scss);
}

const optionsMinify = {
  entryPoints: options.entryPoints,
  entryNames: `${bundlerName}.min`,
  outdir: argv.outdir,
  bundle: true,
  metafile: true,
  minify: true,
  plugins: [sassPlugin()],
  platform: argv.platform
};

// Run esbuild
esbuild
  .build(options)
  .then(() =>
    argv.minify ?
      esbuild.build(optionsMinify)
    : console.log('⚡ Minify skipped ⚡')
  )
  .then(() => console.log('⚡ Files compiled! ⚡ '))
  .catch(() => process.exit(1));
