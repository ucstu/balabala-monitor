#!/bin/bash

if [ "$1" != "skip" ]; then
  echo -e "\033[47;34m<<Building Dependences>>\033[0m"
  lerna run build --scope @balabala/juejin-api --scope @balabala/monitor-api --stream
  echo -e "\033[47;32m<<Dependences Builted>>\033[0m"
fi


echo -e "\033[47;34m<<Cleaning Old SourceFiles>>\033[0m"
yarn del-cli dist types
echo -e "\033[47;32m<<Old SourceFiles Cleaned>>\033[0m"


echo -e "\033[47;34m<<Compiling SDK SourceFiles>>\033[0m"
yarn rollup -c rollup.config.ts
echo -e "\033[47;32m<<SDK SourceFiles Compiled>>\033[0m"


echo -e "\033[47;34m<<Compiling SourceFiles With WatchModle>>\033[0m"
yarn concurrently -n sdk,juejin "rollup -c rollup.config.ts --watch" "lerna run --scope=@balabala/juejin-frontend --stream dev -- skip"
echo -e "\033[47;32m<<SourceFiles Compiled With WatchModle>>\033[0m"
