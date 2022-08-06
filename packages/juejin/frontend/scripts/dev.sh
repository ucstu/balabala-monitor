#!/bin/bash

echo -e "\033[47;34m<<Building Dependences>>\033[0m" && \
lerna run build --scope @balabala/juejin-api --stream && \
lerna run build --scope @balabala/monitor-sdk --stream && \
echo -e "\033[47;32m<<Dependences Builted>>\033[0m"


echo -e "\033[47;34m<<Cleaning Old Files>>\033[0m" && \
yarn del-cli dist && \
echo -e "\033[47;32m<<Old Files Cleaned>>\033[0m"


echo -e "\033[47;34m<<String Vite Development Server>>\033[0m" && \
yarn vite && \
echo -e "\033[47;32m<<Vite Development Server Started>>\033[0m"
