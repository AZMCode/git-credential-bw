#!/usr/bin/env bash
if [ -z "$1" ]; then
	echo "Aborting, empty argument."
else
	find $1 -mindepth 1 -depth -print0 | grep -vEzZ '(\.git(/|$)|/\.gitignore$)' | xargs -0 rm -rvf
fi
