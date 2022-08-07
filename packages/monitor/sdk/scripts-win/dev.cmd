@ECHO OFF

IF "%1" NEQ "skip" (
  echo "[47;34m<<Building Dependences>>[0m"
  cmd /clerna run build --scope @balabala/juejin-api --scope @balabala/monitor-api --stream
  echo "[47;32m<<Dependences Builted>>[0m"
)


echo "[47;34m<<Cleaning Old Files>>[0m"
cmd /cyarn del-cli dist types
echo "[47;32m<<Old Files Cleaned>>[0m"


echo "[47;34m<<Compiling TypeScript With WatchModle>>[0m"
cmd /cyarn concurrently -n sdk,sdk-alias,juejin "tsc --watch" "tsc-alias --watch" "lerna run --scope=@balabala/juejin-frontend --stream dev -- skip"
echo "[47;32m<<TypeScript Compiled With WatchModle>>[0m"
