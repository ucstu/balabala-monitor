@ECHO OFF

echo "[47;34m<<Cleaning Old SourceFiles>>[0m"
cmd /cyarn del-cli dist types
echo "[47;32m<<Old SourceFiles Cleaned>>[0m"


echo "[47;34m<<Compiling API SourceFiles>>[0m"
cmd /cyarn rollup -c rollup.config.ts
echo "[47;32m<<API SourceFiles Compiled>>[0m"
