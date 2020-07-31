## Deps

This project utilizes bash scripts and Yarn for helper scripts

## Installation

Clone this repo to your machine, run `yarn install` to install all dependencies, and whenever you want to run and test your code, you can run `yarn build:code`.

## Dev Tools

### Yarn commands

#### Build
* `yarn build:all`: Builds a development version of both code and documentation.
* `yarn build:code`: Builds code with testing coverage
* `yarn build:code-fast`: Builds code without testing coverage
* `yarn build:code-rel`: Builds a release version of the code without testing (For example, without tests).


* `yarn build:ts`: Runs the tsc compiler in debug config.
* `yarn build:ts-rel`: Runs the tsc compiler in release config.
* `yarn build:docs`: Builds the docs.


* `yarn build:all`: Builds code and docs in debug mode.
* `yarn build:all-rel`: Builds code and docs in release mode.
    
#### Clean
* `yarn clean:code`: Cleans the `dist` folder and deletes the `coverage` folder. Automatically run in the build:code commands.
* `yarn clean:docs`: Cleans documentation-related folders. Automatically run in the build:docs command.
* `yarn clean:all`: Runs both of the above commands.
* `yarn purge`: Runs all clean commands and deletes node_modules, essentially reverting the repository to a recently checked-out state.

#### Watch
* `yarn watch:builder`: Continually builds the project
* `yarn watch:debug`: Continually rebuilds the project and starts it with --inspect
* `yarn watch:debug-brk`: Continually rebuilds the project and starts it with --inspect-brk
* `yarn watch:docs`: Continually builds the docs, starts a livereload server to automatically update your browser, and an http-server instance to view the docs through.

#### Start
* `yarn start`: Starts the project
* `yarn debug`: Starts the project with the --inspect flag.
* `yarn debug-brk`: Starts the project with the --inspect flag.
* `yarn lint`: Lints the project.
* `yarn bStart`: Builds, then starts the project.

### Folder Structure

```
Root
├── devScripts
│   ├── cleanDir.sh        Helps with directory cleaning
│   └── watchDocs.sh       Allows for livereload, nodemon and http-server to run concurrently
├── dist                   Code Build Folder. Intentionally Empty.
├── docs
│   ├── HTML               Documentation Build Folder. Intentionally empty.
│   ├── Source             Various Source files used in Doc Building
│   │   ├── README.md      Index Page for the Docs
│   │   └── tutorials      Folder where tutorials are stored.
│   │       └── ...
│   └── Static             Folder whose contents are copied to the Documentation Build Folder on Build.
├── eslint.json            Eslint Config
├── jest.config.json       Jest config
├── jsdoc.json             JSDoc config
├── LICENSE.md             License File
├── nodemon.json           Nodemon Config
├── package.json           Package.json, defining all scripts and other metadata.
├── README.md              Repo README
├── src                    Source folder for all Typescript files, .jsdoc files, and any tests.
│   └── ...
├── static                 Any static files needed for the project.
├── tsconfig.json          TSC config for the Debug build
└── tsconfig.rel.json      TSC config for the Release build
```

### CI
There are two CI jobs, one run on every pull request and push, BuildAndTest, and another only run on pushes to `master`, BuildAndRelease.

BuildAndTest does what it says on the Tin.

BuildAndRelease Builds the documentation and deploys it to the gh-pages branch, Packages the project into an NPM package according to package.json, creates a new Release with the given Package version, and uploads the package as a tgz file, using the package name and version in a template string. This action is intended to be modified to publish to as many places as needed, or perform other future packing actions, for example node-packer.

