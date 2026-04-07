param(
  [string]$BaseUrl = "http://localhost:4000"
)

$routes = @(
  "/",
  "/capability-map",
  "/timeline",
  "/timeline?topic=workflow",
  "/insights",
  "/insights?id=ins_401",
  "/reports",
  "/reports?id=rep_2026w14",
  "/settings",
  "/timeline?state=loading",
  "/insights?state=empty",
  "/reports?state=error"
)

Write-Output "Phase 1 demo route check"
Write-Output "Base URL: $BaseUrl"

$failed = @()
foreach ($route in $routes) {
  $url = "$BaseUrl$route"
  try {
    $res = Invoke-WebRequest -Uri $url -Method GET -UseBasicParsing -TimeoutSec 30
    if ($res.StatusCode -ge 200 -and $res.StatusCode -lt 400) {
      Write-Output "[OK] $url ($($res.StatusCode))"
    } else {
      Write-Output "[WARN] $url ($($res.StatusCode))"
      $failed += $url
    }
  } catch {
    Write-Output "[FAIL] $url ($($_.Exception.Message))"
    $failed += $url
  }
}

if ($failed.Count -gt 0) {
  Write-Output "`nFailed routes:"
  $failed | ForEach-Object { Write-Output "- $_" }
  exit 1
}

Write-Output "`nAll demo routes responded successfully."
exit 0


