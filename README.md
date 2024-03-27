# @zumerbox/build

The Zumerbox build tool is a command-line utility designed to bundle and compile JavaScript and SCSS files into distributable formats. It leverages the esbuild library for efficient bundling and minification, providing developers with a streamlined workflow for frontend development.

Refer to the [ZumerBox bundle](https://github.com/zumerlab/zumerbox) for more information and tools.

## Installation

```bash
npm install @zumerbox/build --save-dev
```

## Usage:

```bash
npx @zumerbox/build --name <bundler_name> --js <path_to_js_file> --scss <path_to_scss_file> [options]
```

## Options:

- `--name (-n)`: Specifies the name of the bundler. If not provided, it will attempt to use the name from the package.json file. If the name is not available in package.json, it will default to "MyBundler".
- `--js (-j)`: Specifies the path to the JavaScript file (optional).
- `--scss (-s)`: Specifies the path to the SCSS file (optional).
- `--minify (-m)`: Generates minified output files (JavaScript and CSS) if enabled.
- `--outdir (-d)`: Specifies the destination folder for the output files. Default is "dist".
- `--platform (-p)`: Specifies the target platform for esBuild. Default is "browser".
- `--help (-h)`: Displays the help message.


## Functionality:
- **Input files**: Specify the JavaScript and SCSS files to be bundled using the command-line options.
- **Bundling**: The tool utilizes esbuild to bundle the provided JavaScript and SCSS files into distributable formats.
- **Minification**: Optionally, the tool can minify the output files by setting the '--minify' flag.
- **Package information**: The tool reads package.json from the project directory to extract metadata such as name, version, author, and license. This information is included as a banner in the output files.
- **Output directory**: Output files are saved to the specified output directory ('dist' by default).
- **Error handling**: The tool gracefully handles errors during the bundling process and exits with an error code if an error occurs.

## Credits:

This tools is powered by esbuild (https://esbuild.github.io/)
