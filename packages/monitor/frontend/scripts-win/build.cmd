@ECHO OFF

echo "[47;34m<<Building Dependences>>[0m"
cmd /clerna run build --scope @balabala/monitor-api --stream
echo "[47;32m<<Dependences Builted>>[0m"


echo "[47;34m<<Cleaning Old Files>>[0m"
cmd /cyarn del-cli dist
echo "[47;32m<<Old Files Cleaned>>[0m"


echo "[47;34m<<Cheacking TypeScript>>[0m"
cmd /cyarn vue-tsc --noEmit
echo "[47;32m<<TypeScript Checked>>[0m"


echo "[47;34m<<Building Application With Vite>>[0m"
cmd /cyarn vite build
echo "[47;32m<<Application Builted With Vite>>[0m"
