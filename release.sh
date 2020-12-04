#!/bin/bash

function printUsage() {
  echo "${readme}" 1>&2
  exit 1
}

function parsing() {
  args=("$1")
  if [[ ! -z "$2" ]]; then
    tag="-$2"
  fi
  case ${args} in
      major )
        major ;;
      minor )
        minor ;;
      patch )
        patch ;;
      manual )
        manual ;;
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
  git checkout -b release-${newVersion} develop
  updateVersion
  git commit -a -m "Version number update to ${newVersion}"
  git checkout main
  git merge --no-ff release-${newVersion}
  git tag -a ${newVersion} -m "release ${added}"
  git push --follow-tags
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
    npm version ${newVersion}
    cd ..
  done
}

function updateDevelop() {
  echo "Updating develop"
  git checkout develop
  git merge --no-ff release-${newVersion}
}

function deleteRelease() {
  echo "Deleting release branch"
  git branch -d release-${newVersion}
}

function major() {
  majorVersion=$((majorVersion+1))
  minorVersion=0
  patchVersion=0
  newVersion=${majorVersion}.${minorVersion}.${patchVersion}${tag}
  echo "New Major release" [$newVersion]
  createRelease
}

function minor() {
  minorVersion=$((minorVersion+1))
  patchVersion=0
  newVersion=${majorVersion}.${minorVersion}.${patchVersion}${tag}
  echo "New Minor release" [$newVersion]
  createRelease
}

function patch() {
  patchVersion=$((patchVersion+1))
  newVersion=${majorVersion}.${minorVersion}.${patchVersion}${tag}
  echo "New Patch release" [$newVersion]
  createRelease
}

function manual() {
  echo "Type the version | format: X.X.X"
  read inputVersion
  majorVersion=$(echo $inputVersion | cut -d . -f 1)
  echo major [$majorVersion]
  minorVersion=$(echo $inputVersion | cut -d . -f 2)
  echo minor [$minorVersion]
  patchVersion=$(echo $inputVersion | cut -d . -f 3)
  echo patch [$patchVersion]
  newVersion=${majorVersion}.${minorVersion}.${patchVersion}${tag}
  echo "Confirm new version [$newVersion] ? [y/n]"
  read confirm
  if [[ "$confirm" == "y" ]]
  then
    echo "New manual version release" [$newVersion]
    createRelease
  else
    echo "Canceled release"
    echo "Exiting..."
    exit 1
  fi
}

readme="$(cat RELEASE.md)"
files=(./api/package.json ./client_web/package.json)
if [[ "$#" -lt "1" || "$#" -gt "2" || "$1" = "-h" ]]
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
