param(
  [string]$Target = "scripts/phase1-demo-check.ps1"
)

if (!(Test-Path $Target)) {
  Write-Output "[FAIL] demo script not found: $Target"
  exit 1
}

$content = Get-Content -Raw -LiteralPath $Target

try {
  [void][scriptblock]::Create($content)
} catch {
  Write-Output "[FAIL] demo script parse error: $($_.Exception.Message)"
  exit 1
}

$hasConnectionClose = $content -match '"Connection"\s*=\s*"close"'
$hasDisableKeepAlive = $content -match 'DisableKeepAlive'

if ($hasConnectionClose -and $hasDisableKeepAlive) {
  Write-Output "[FAIL] conflicting request options: do not combine 'Connection: close' header with DisableKeepAlive."
  exit 1
}

Write-Output "Demo script parse check passed."
exit 0