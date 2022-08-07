@ECHO OFF

echo "[47;34m<<Building Dependences>>[0m"
cmd /clerna run build --scope @balabala/monitor-api --stream
echo "[47;32m<<Dependences Builted>>[0m"


echo "[47;34m<<Cleaning Old Files>>[0m"
cmd /cyarn del-cli dist types
echo "[47;32m<<Old Files Cleaned>>[0m"


echo "[47;34m<<Compiling TypeScript As ESModule>>[0m"
cmd /cyarn tsc && cmd /cyarn tsc-alias
echo "[47;32m<<TypeScript Compiled As ESModule>>[0m"


echo "[47;34m<<Compiling TypeScript As UMDModule>>[0m"
cmd /cyarn tsc -p tsconfig.umd.json
cmd /cyarn tsc-alias -p tsconfig.umd.json
echo "[47;32m<<TypeScript Compiled As UMDModule>>[0m"
