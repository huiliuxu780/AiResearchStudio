param(
  [string]$Target = "src"
)

if (!(Test-Path $Target)) {
  Write-Output "[FAIL] Path not found: $Target"
  exit 1
}

$violations = @()

$workbenchFiles = Get-ChildItem -Path "$Target/app/(workbench)" -Recurse -File -Include *.ts,*.tsx -ErrorAction SilentlyContinue
foreach ($file in $workbenchFiles) {
  $content = Get-Content -Raw -LiteralPath $file.FullName

  if ($content -match 'searchParams\.get\(') {
    $violations += "[workbench] direct searchParams.get is forbidden: $($file.FullName)"
  }

  if ($content -match 'getScenarioState\(') {
    $violations += "[workbench] use workbench-query helper instead of getScenarioState: $($file.FullName)"
  }
}

$allTsFiles = Get-ChildItem -Path $Target -Recurse -File -Include *.ts,*.tsx
$allowedSourceInUrlFiles = @()

foreach ($file in $allTsFiles) {
  $path = $file.FullName
  if ($allowedSourceInUrlFiles -contains $path) {
    continue
  }

  $content = Get-Content -Raw -LiteralPath $path

  if ($content -match 'searchParams\.get\("source"\)' -or $content -match "searchParams\.get\('source'\)") {
    $violations += "[query-scope] source query is out of scope for Phase 1: $path"
  }

  if ($content -match '\.set\("source"' -or $content -match "\.set\('source'" -or
      $content -match '\.append\("source"' -or $content -match "\.append\('source'" -or
      $content -match '\?source=' -or $content -match '&source=') {
    $violations += "[query-scope] source must not be written into URL: $path"
  }
}

if ($violations.Count -gt 0) {
  Write-Output "Query scope check failed:"
  $violations | Sort-Object -Unique | ForEach-Object { Write-Output "- $_" }
  exit 1
}

Write-Output "Query scope check passed."
exit 0
