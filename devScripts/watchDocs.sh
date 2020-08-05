#!/usr/bin/env bash
yarn exec http-server ./docs/HTML/ &
livereload docs/HTML *.md -w 500 &
nodemon --config nodemon.json --exec 'yarn run build:docs' &
wait %1 %2 %3
