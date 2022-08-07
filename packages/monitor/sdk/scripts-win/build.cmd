@ECHO OFF

echo "[47;34m<<Building Dependences>>[0m"
cmd /clerna run build --scope @balabala/monitor-api --stream
echo "[47;32m<<Dependences Builted>>[0m"


echo "[47;34m<<Cleaning Old SourceFiles>>[0m"
cmd /cyarn del-cli dist types
echo "[47;32m<<Old SourceFiles Cleaned>>[0m"


echo "[47;34m<<Compiling SDK SourceFiles>>[0m"
cmd /cyarn rollup -c rollup.config.ts
echo "[47;32m<<SDK SourceFiles Compiled>>[0m"
