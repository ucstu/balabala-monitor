#!/bin/bash

if [ "$1" != "skip" ]; then
  echo -e "\033[47;34m<<Building Dependences>>\033[0m" && \
  lerna run build --scope @balabala/monitor-api --stream && \
  echo -e "\033[47;32m<<Dependences Builted>>\033[0m"
fi


echo -e "\033[47;34m<<Cleaning Old Files>>\033[0m" && \
yarn del-cli dist types && \
echo -e "\033[47;32m<<Old Files Cleaned>>\033[0m"


echo -e "\033[47;34m<<Compiling TypeScript With WatchModle>>\033[0m" && \
yarn concurrently -n sdk,sdk-alias,juejin "tsc --watch" "tsc-alias --watch" "lerna run dev --scope=@balabala/juejin-frontend --stream" && \
echo -e "\033[47;32m<<TypeScript Compiled With WatchModle>>\033[0m"
