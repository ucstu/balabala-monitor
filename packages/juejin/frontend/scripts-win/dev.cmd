@ECHO OFF

IF "%1" NEQ "skip" (
  echo "[47;34m<<Building Dependences>>[0m"
  cmd /clerna run build --scope @balabala/juejin-api --scope @balabala/monitor-sdk --stream
  echo "[47;32m<<Dependences Builted>>[0m"
)


echo "[47;34m<<Cleaning Old Files>>[0m"
cmd /cyarn del-cli dist
echo "[47;32m<<Old Files Cleaned>>[0m"


echo "[47;34m<<String Vite Development Server>>[0m"
cmd /cyarn vite
echo "[47;32m<<Vite Development Server Started>>[0m"
