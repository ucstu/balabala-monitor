#!/bin/bash

echo -e "\033[47;34m<<Building Dependences>>\033[0m" && \
lerna run build --scope @balabala/monitor-api --stream && \
echo -e "\033[47;32m<<Dependences Builted>>\033[0m"


echo -e "\033[47;34m<<Cleaning Old Files>>\033[0m" && \
yarn del-cli dist types && \
echo -e "\033[47;32m<<Old Files Cleaned>>\033[0m"


echo -e "\033[47;34m<<Compiling TypeScript As ESModule>>\033[0m" && \
yarn tsc && yarn tsc-alias && \
echo -e "\033[47;32m<<TypeScript Compiled As ESModule>>\033[0m"


echo -e "\033[47;34m<<Compiling TypeScript As UMDModule>>\033[0m" && \
yarn tsc -p tsconfig.umd.json && \
yarn tsc-alias -p tsconfig.umd.json && \
echo -e "\033[47;32m<<TypeScript Compiled As UMDModule>>\033[0m"


echo -e "\033[47;34m<<Formatting Files>>\033[0m" && \
yarn prettier --write . && \
echo -e "\033[47;32m<<Files Formatted>>\033[0m"
