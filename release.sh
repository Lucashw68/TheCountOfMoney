#!/bin/bash

function printUsage() {
  echo "${readme}" 1>&2
  exit 1
}

function parsing() {
  args=("$@")
  case ${args} in
      major )
        major ;;
      minor )
        minor ;;
      patch )
        patch ;;
      * )
        printUsage ;;
  esac
}

function keyExist() {
  local test=$(grep "\"version\":" $1)
  if [[ -z ${test} ]]
  then
    exist=0
    echo "Version doesn't exist in $1"
  else
    exist=1
    echo "Version exist in $1"
  fi
}

function getVersion() {
  version=$(cat $1 | grep "\"version\"" | cut -d : -f 2 | cut -d \" -f 2)
  echo [$version]
  majorVersion=$(echo $version | cut -d . -f 1)
  echo major [$majorVersion]
  minorVersion=$(echo $version | cut -d . -f 2)
  echo minor [$minorVersion]
  patchVersion=$(echo $version | cut -d . -f 3)
  echo patch [$patchVersion]
}

function createRelease() {
  confirm
  # git checkout -b release-${newVersion} develop
  updateVersion
  # git commit -a -m "Version number update to ${newVersion}"
  # git checkout master
  # git merge --no-ff release-${newVersion}
  # git tag -a ${newVersion}
  updateDevelop
  deleteRelease
}

function confirm() {
  echo "You are about to create branch [release-${newVersion}] and merge it to master."
  echo "Continue ? [y/n]"
  read confirm
  if [[ "$confirm" == "y" ]]
  then
    echo "Creating release..."
  else
    echo "Canceled release"
    echo "Exiting..."
    exit 1
  fi
}

function updateVersion() {
  for file in ${files[*]}
  do
    location=$(echo $file | cut -d '/' -f2)
    cd $location
    # npm version ${newVersion}
    cd ..
  done
}

function updateDevelop() {
  echo "Updating develop"
  # git checkout develop
  # git merge --no-ff release-${newVersion}
}

function deleteRelease() {
  echo "Deleting release branch"
  # git branch -d release-${newVersion}
}

function major() {
  majorVersion=$((majorVersion+1))
  newVersion=${majorVersion}.${minorVersion}.${patchVersion}
  echo "New Major release" [$newVersion]
  createRelease
}

function minor() {
  minorVersion=$((minorVersion+1))
  newVersion=${majorVersion}.${minorVersion}.${patchVersion}
  echo "New Minor release" [$newVersion]
  createRelease
}

function patch() {
  patchVersion=$((patchVersion+1))
  newVersion=${majorVersion}.${minorVersion}.${patchVersion}
  echo "New Patch release" [$newVersion]
  createRelease
}

readme="$(cat GIT_README.md)"
files=(./api/package.json ./client_web/package.json)
if [[ "$#" -lt "1" || "$#" -gt "1" || "$1" = "-h" ]]
then
  printUsage
fi

for file in ${files[*]}
do
  keyExist $file
  getVersion $file
  echo "=== === ==="
done
parsing $@
