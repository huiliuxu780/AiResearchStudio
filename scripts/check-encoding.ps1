param(
  [string]$Target = "src"
)

if (!(Test-Path $Target)) {
  Write-Output "[FAIL] Path not found: $Target"
  exit 1
}

$patterns = @(
  "\\\\u[0-9a-fA-F]{4}",
  "�"
)

$files = Get-ChildItem -Path $Target -Recurse -File -Include *.ts,*.tsx,*.md
$hitCount = 0

foreach ($file in $files) {
  $content = Get-Content -Raw -LiteralPath $file.FullName
  foreach ($pattern in $patterns) {
    if ($content -match $pattern) {
      Write-Output "[FAIL] $($file.FullName) matched: $pattern"
      $hitCount++
      break
    }
  }
}

if ($hitCount -gt 0) {
  Write-Output "`nEncoding check failed. Please fix escaped/unreadable text."
  exit 1
}

Write-Output "Encoding check passed."
exit 0
