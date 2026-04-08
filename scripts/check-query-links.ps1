param(
  [string]$Target = "src/app/(workbench)"
)

if (!(Test-Path $Target)) {
  Write-Output "[FAIL] Path not found: $Target"
  exit 1
}

$files = Get-ChildItem -Path $Target -Recurse -File -Include *.ts,*.tsx
$violations = @()

# Enforce route helper usage for query-bearing href template literals.
$pattern = 'href=\{`/[^`]*\?(state|topic|item_id|id|layer)='

foreach ($file in $files) {
  $content = Get-Content -Raw -LiteralPath $file.FullName
  if ($content -match $pattern) {
    $violations += "[query-links] use workbench-routes helper for href query construction: $($file.FullName)"
  }
}

if ($violations.Count -gt 0) {
  Write-Output "Query links check failed:"
  $violations | Sort-Object -Unique | ForEach-Object { Write-Output "- $_" }
  exit 1
}

Write-Output "Query links check passed."
exit 0
