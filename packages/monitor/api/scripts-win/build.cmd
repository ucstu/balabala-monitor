@ECHO OFF

echo "[47;34m<<Fixing OpenApi DefineFiles>>[0m"
cmd /cnode jsonfixer.js && yarn prettier --write openapi.json
echo "[47;34m<<OpenApi DefineFiles Fixed>>[0m"


echo "[47;34m<<Cleaning Old SourceFiles>>[0m"
cmd /cyarn del-cli src dist types
echo "[47;32m<<Old SourceFiles Cleaned>>[0m"


echo "[47;34m<<Generating API SourceFiles>>[0m"
cmd /cyarn openapi -i openapi.json -o src -c xhr --name MonitorApiClient --useOptions --exportSchemas true
echo "[47;32m<<API SourceFiles Generated>>[0m"


echo "[47;34m<<Fixing API SourceFiles>>[0m"
cmd /cyarn rexreplace "(public readonly )(: Service;)" "\$1service\$2" src/MonitorApiClient.ts
cmd /cyarn rexreplace "(this.)( = new Service\(this.request\);)" "\$1service\$2" src/MonitorApiClient.ts
echo "[47;32m<<API SourceFiles Fixed>>[0m"


echo "[47;34m<<Formatting API SourceFiles>>[0m"
cmd /cyarn prettier --write src --ignore-unknown
echo "[47;32m<<API SourceFiles Formatted>>[0m"


echo "[47;34m<<Compiling API SourceFiles>>[0m"
cmd /cyarn rollup -c rollup.config.ts
echo "[47;32m<<API SourceFiles Compiled>>[0m"
