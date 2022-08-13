#!/bin/bash

echo -e "\033[47;34m<<Cleaning Old SourceFiles>>\033[0m"
yarn del-cli dist types
echo -e "\033[47;32m<<Old SourceFiles Cleaned>>\033[0m"


echo -e "\033[47;34m<<Compiling API SourceFiles>>\033[0m"
yarn rollup -c rollup.config.ts
echo -e "\033[47;32m<<API SourceFiles Compiled>>\033[0m"
