@ECHO OFF

echo "[47;34m<<Cleaning Old Files>>[0m"
cmd /cyarn del-cli src dist types
echo "[47;32m<<Old Files Cleaned>>[0m"


echo "[47;34m<<Generating API SourceFiles>>[0m"
cmd /cyarn openapi -i openapi.json -o src -c xhr --name JueJinApiClient --useOptions --exportSchemas true
echo "[47;32m<<API SourceFiles Generated>>[0m"


echo "[47;34m<<Fixing API SourceFiles>>[0m"
cmd /cyarn rexreplace "(public readonly )(: Service;)" "\$1service\$2" src/JueJinApiClient.ts
cmd /cyarn rexreplace "(this.)( = new Service\(this.request\);)" "\$1service\$2" src/JueJinApiClient.ts
echo "[47;32m<<API SourceFiles Fixed>>[0m"


echo "[47;34m<<Compiling TypeScript As ESModule>>[0m"
cmd /cyarn tsc --build
echo "[47;32m<<TypeScript Compiled As ESModule>>[0m"


echo "[47;34m<<Compiling TypeScript As UMDModule>>[0m"
cmd /cyarn tsc --build tsconfig.umd.json
echo "[47;32m<<TypeScript Compiled As UMDModule>>[0m"


echo "[47;34m<<Formatting API SourceFiles>>[0m"
cmd /cyarn prettier --write src --ignore-unknown
echo "[47;32m<<API SourceFiles Formatted>>[0m"
