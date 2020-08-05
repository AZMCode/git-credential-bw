#!/usr/bin/env bash
declare releases="$(curl -s -H accept=application/vnd.github.v3+json https://api.github.com/repos/AZMCode/git-credential-bw/releases)"
declare currRelease="$(echo $releases | jq .[0])"
declare currReleaseUrl="$(echo $currRelease | jq -r .assets_url)"
declare assets="$(curl -s -H accept=application/vnd.github.v3+json $currReleaseUrl)"
declare -a assetNames=("$(echo $assets | jq -r .[].name)")
declare -a assetUrls=("$(echo $assets | jq -r .[].browser_download_url)")
declare correctAsset=""
for i in "${!assetNames[@]}"; do
  declare match="$(echo "${assetNames[$i]}" | grep -oP "^NPM-Package")"
  echo $match
  if [ "$match" ]; then
	  correctAsset="${assetUrls[$i]}"
  fi
done

if [ -z "$correctAsset" ]; then
	exit
fi
curl -L "$correctAsset" > /tmp/git-credential-bw.tgz
read -p "Yarn or NPM (y/n)?" choice
choice="${choice,,}"
if [ "$choice" == "yarn" ] || [ "$choice" == "y" ]; then
	yarn global add /tmp/git-credential-bw.tgz
elif [ "$choice" == "npm" ] || [ "$choice" == "n" ]; then
	npm install --global /tmp/git-credential-bw.tgz
else
	echo "Could not recognize anwer, exiting"
	exit
fi
