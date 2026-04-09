param(
  [string]$Target = "src"
)

if (!(Test-Path $Target)) {
  Write-Output "[FAIL] Path not found: $Target"
  exit 1
}

$directPatterns = @(
  "\\u[0-9a-fA-F]{4}",
  "�"
)

# Common mojibake fragments seen when UTF-8 content is decoded with the wrong code page.
$mojibakeMarkers = @(
  "銆",
  "锛",
  "鈥",
  "浠",
  "鍔犺浇",
  "褰撳墠",
  "杩斿洖",
  "鏆傛棤",
  "缁撹",
  "鍛ㄦ姤",
  "鑳藉姏",
  "浠〃鐩",
  "鐮旂┒"
)

$files = Get-ChildItem -Path $Target -Recurse -File -Include *.ts,*.tsx,*.md
$hitCount = 0

foreach ($file in $files) {
  $content = Get-Content -Raw -LiteralPath $file.FullName

  foreach ($pattern in $directPatterns) {
    if ($content -match $pattern) {
      Write-Output "[FAIL] $($file.FullName) matched: $pattern"
      $hitCount++
      break
    }
  }

  if ($content -match ($mojibakeMarkers -join "|")) {
    Write-Output "[FAIL] $($file.FullName) matched mojibake markers"
    $hitCount++
  }
}

if ($hitCount -gt 0) {
  Write-Output "`nEncoding check failed. Please fix escaped or mojibake text."
  exit 1
}

Write-Output "Encoding check passed."
exit 0
