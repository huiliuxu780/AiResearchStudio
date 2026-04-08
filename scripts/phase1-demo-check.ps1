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

$semanticChecks = @(
  @{
    route = "/timeline?topic=invalid_topic"
    expected = "上下文：全部来源 / 全部主题"
    label = "timeline invalid topic fallback"
  },
  @{
    route = "/timeline?source=github"
    expected = "上下文：全部来源 / 全部主题"
    label = "timeline unsupported source query ignored"
  },
  @{
    route = "/timeline?topic=workflow&item_id=invalid_id"
    expected = "上下文：Workflow"
    label = "timeline invalid item id keeps topic context"
  },
  @{
    route = "/insights?id=invalid_id"
    expected = "ins_401"
    label = "insights invalid id fallback"
  },
  @{
    route = "/reports?id=invalid_id"
    expected = "rep_2026w14"
    label = "reports invalid id fallback"
  }
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

Write-Output ""
Write-Output "Semantic fallback checks"

foreach ($check in $semanticChecks) {
  $url = "$BaseUrl$($check.route)"
  try {
    $res = Invoke-WebRequest -Uri $url -Method GET -UseBasicParsing -TimeoutSec 30
    if ($res.StatusCode -lt 200 -or $res.StatusCode -ge 400) {
      Write-Output "[FAIL] $($check.label) - non-success status: $($res.StatusCode)"
      $failed += $url
      continue
    }

    if ($res.Content -match [regex]::Escape($check.expected)) {
      Write-Output "[OK] $($check.label)"
    } else {
      Write-Output "[FAIL] $($check.label) - expected token not found: $($check.expected)"
      $failed += $url
    }
  } catch {
    Write-Output "[FAIL] $($check.label) ($($_.Exception.Message))"
    $failed += $url
  }
}

if ($failed.Count -gt 0) {
  Write-Output "`nFailed checks:"
  $failed | Select-Object -Unique | ForEach-Object { Write-Output "- $_" }
  exit 1
}

Write-Output "`nAll demo routes and semantic checks responded successfully."
exit 0
