![CI](https://github.com/AZMCode/NodeJS-TS-Package-Code-Template/workflows/CI/badge.svg?branch=master)

# Maintaining notice
This repository is unmaintained. I have not used Bitwarden for a while, and I probably won't again. KeepassXC keeps me busy :)
Regardless, I no longer have the time to actively develop this repository, so I think it would be for the best to archive it.
I'd love to see a fork of this to keep serving the Bitwarden users though.
Keep coding and have fun!

# Bitwarden CLI Git Credential Helper
This is a project to integrate the Bitwarden CLI with Git so as to avoid inconveniences in having to retype a password multiple times, or manage multiple Bitwarden credentials for different sites

## Security Warning
This program insecurely caches a session key on the hard drive

## Installation
`bash <(curl -s https://raw.githubusercontent.com/AZMCode/git-credential-bw/master/devScripts/install.sh)`
This will automatically install the script using either yarn or npm (Your Choice)

## Usage
`git config credential.helper bw` while inside a repo to set up the helper locally.
`git config --global credential.helper bw` to set up the helper globally.

## Manual Installation
Download the NPM-Package asset from the latest release and run `npm install --global <The File>` or `yarn global add <The File>`.

## Build (Including the docs) and Install Manually
Clone the repo, and run `yarn build:all-rel && yarn global add $PWD`

## Configuration
You can run `git config --global --add bw.timeout <Timeout in seconds>` to control the timeout for the session key, and to suppress the warning that pops up otherwise 😬. You can set the timeout to -1 to disable it.

## Package Documentation
[Right Here](https://azmcode.github.io/git-credential-bw/)
