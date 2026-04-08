$filesToCheck = @(
  @{ path = "src/app/(workbench)/page.tsx"; required = "getStateQuery(" },
  @{ path = "src/app/(workbench)/settings/page.tsx"; required = "getStateQuery(" },
  @{ path = "src/app/(workbench)/capability-map/page.tsx"; required = "getCapabilityMapQuery(" },
  @{ path = "src/app/(workbench)/timeline/page.tsx"; required = "getTimelineQuery(" },
  @{ path = "src/app/(workbench)/insights/page.tsx"; required = "getDetailQuery(" },
  @{ path = "src/app/(workbench)/reports/page.tsx"; required = "getDetailQuery(" }
)

$helperCalls = @(
  "getStateQuery(",
  "getCapabilityMapQuery(",
  "getTimelineQuery(",
  "getDetailQuery("
)

$violations = @()

foreach ($entry in $filesToCheck) {
  $filePath = $entry.path
  $requiredCall = $entry.required

  if (!(Test-Path $filePath)) {
    $violations += "[query-helper] file not found: $filePath"
    continue
  }

  $content = Get-Content -Raw -LiteralPath $filePath

  if ($content -notmatch [regex]::Escape($requiredCall)) {
    $violations += "[query-helper] missing required helper '$requiredCall' in $filePath"
  }

  $otherCalls = $helperCalls | Where-Object { $_ -ne $requiredCall }
  foreach ($call in $otherCalls) {
    if ($content -match [regex]::Escape($call)) {
      $violations += "[query-helper] unexpected helper '$call' in $filePath"
    }
  }
}

if ($violations.Count -gt 0) {
  Write-Output "Query route helper check failed:"
  $violations | Sort-Object -Unique | ForEach-Object { Write-Output "- $_" }
  exit 1
}

Write-Output "Query route helper check passed."
exit 0