param(
  [int]$Port = 4000
)

$lines = netstat -ano | findstr ":$Port "
if ($lines) {
  $pids = $lines | ForEach-Object { ($_ -split '\s+')[-1] } | Where-Object { $_ -match '^\d+$' } | Select-Object -Unique
  foreach ($id in $pids) {
    cmd /c "taskkill /PID $id /F" | Out-Null
  }
}

& .\node_modules\.bin\next.cmd dev -p $Port
