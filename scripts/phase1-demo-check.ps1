param(
  [string]$BaseUrl = "http://localhost:4000",
  [int]$TimeoutSec = 30,
  [int]$MaxAttempts = 3,
  [int]$RetryDelaySec = 2,
  [bool]$DisableKeepAlive = $true,
  [int]$WarmupTimeoutSec = 15,
  [int]$WarmupMaxAttempts = 2,
  [bool]$AbortOnWarmupFailure = $true,
  [bool]$StopOnFirstFailure = $true
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

$journeyChecks = @(
  @{
    route = "/"
    expected = "/timeline?topic=workflow&item_id=norm_101"
    label = "journey dashboard to timeline link"
  },
  @{
    route = "/timeline"
    expected = "norm_201"
    label = "journey timeline list present"
  },
  @{
    route = "/insights"
    expected = "ins_401"
    label = "journey insights default selection"
  },
  @{
    route = "/reports"
    expected = "rep_2026w14"
    label = "journey reports default selection"
  },
  @{
    route = "/settings"
    expected = "https://github.com/QwenLM"
    label = "journey settings source card"
  }
)

$semanticChecks = @(
  @{
    route = "/capability-map?layer=platform"
    expected = 'data-focused-layer-first="platform"'
    label = "capability map layer focus ordering"
  },
  @{
    route = "/capability-map?layer=invalid_layer"
    expected = 'data-focus-layer="all"'
    label = "capability map invalid layer fallback"
  },
  @{
    route = "/timeline?topic=invalid_topic"
    expected = "Workflow"
    label = "timeline invalid topic fallback"
  },
  @{
    route = "/timeline?source=github"
    expected = "norm_201"
    label = "timeline unsupported source query ignored"
  },
  @{
    route = "/timeline?topic=workflow&item_id=invalid_id"
    expected = "norm_202"
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

$script:failed = @()
$script:stats = @{
  routeOk = 0
  journeyOk = 0
  semanticOk = 0
  retriedSuccess = 0
}

function Invoke-WithRetry {
  param(
    [string]$Url,
    [int]$RequestTimeoutSec,
    [int]$RequestMaxAttempts,
    [int]$RequestRetryDelaySec,
    [bool]$RequestDisableKeepAlive
  )

  $lastError = "unknown"

  for ($attempt = 1; $attempt -le $RequestMaxAttempts; $attempt++) {
    try {
      $invokeParams = @{
        Uri = $Url
        Method = "GET"
        UseBasicParsing = $true
        TimeoutSec = $RequestTimeoutSec
        Headers = @{
          "Cache-Control" = "no-cache"
        }
      }

      if ($RequestDisableKeepAlive) {
        $invokeParams.DisableKeepAlive = $true
      }

      $response = Invoke-WebRequest @invokeParams
      return @{
        ok = $true
        response = $response
        attempts = $attempt
      }
    } catch {
      $lastError = $_.Exception.Message
      if ($attempt -lt $RequestMaxAttempts) {
        Start-Sleep -Seconds $RequestRetryDelaySec
      }
    }
  }

  return @{
    ok = $false
    error = $lastError
    attempts = $RequestMaxAttempts
  }
}

function Write-CheckSummary {
  Write-Output ""
  Write-Output "Summary: routeOk=$($script:stats.routeOk)/$($routes.Count), journeyOk=$($script:stats.journeyOk)/$($journeyChecks.Count), semanticOk=$($script:stats.semanticOk)/$($semanticChecks.Count), retriedSuccess=$($script:stats.retriedSuccess)"
}

function Exit-WithFailures {
  param(
    [string]$Reason
  )

  Write-Output ""
  Write-Output $Reason
  Write-CheckSummary

  if ($script:failed.Count -gt 0) {
    Write-Output "`nFailed checks:"
    $script:failed | Select-Object -Unique | ForEach-Object { Write-Output "- $_" }
  }

  exit 1
}

function Register-Failure {
  param(
    [string]$FailureLine,
    [string]$FailureKey
  )

  Write-Output "[FAIL] $FailureLine"
  $script:failed += $FailureKey

  if ($StopOnFirstFailure) {
    Exit-WithFailures "Aborting early due to first failure. Re-run with -StopOnFirstFailure:`$false for full diagnostics."
  }
}

Write-Output "Phase 1 demo route check"
Write-Output "Base URL: $BaseUrl"
Write-Output "Request options: timeout=${TimeoutSec}s, maxAttempts=$MaxAttempts, retryDelay=${RetryDelaySec}s, disableKeepAlive=$DisableKeepAlive"
Write-Output "Warmup options: timeout=${WarmupTimeoutSec}s, maxAttempts=$WarmupMaxAttempts, abortOnFailure=$AbortOnWarmupFailure"
Write-Output "Failure mode: stopOnFirstFailure=$StopOnFirstFailure"

# Warm up dev server once to avoid first-request cold start flakiness.
$warmup = Invoke-WithRetry -Url "$BaseUrl/" -RequestTimeoutSec $WarmupTimeoutSec -RequestMaxAttempts $WarmupMaxAttempts -RequestRetryDelaySec $RetryDelaySec -RequestDisableKeepAlive $DisableKeepAlive
if (-not $warmup.ok) {
  Write-Output "[FAIL] warmup failed: $($warmup.error)"
  $script:failed += "$BaseUrl/"

  if ($AbortOnWarmupFailure) {
    Exit-WithFailures "Aborting early because server is not ready. Start dev server first (npm run dev) and retry demo:check."
  }

  Write-Output "[WARN] continue despite warmup failure (AbortOnWarmupFailure=false)."
}

foreach ($route in $routes) {
  $url = "$BaseUrl$route"
  $result = Invoke-WithRetry -Url $url -RequestTimeoutSec $TimeoutSec -RequestMaxAttempts $MaxAttempts -RequestRetryDelaySec $RetryDelaySec -RequestDisableKeepAlive $DisableKeepAlive

  if (-not $result.ok) {
    Register-Failure -FailureLine "$url ($($result.error))" -FailureKey $url
    continue
  }

  $res = $result.response
  if ($res.StatusCode -ge 200 -and $res.StatusCode -lt 400) {
    $script:stats.routeOk += 1
    if ($result.attempts -gt 1) {
      $script:stats.retriedSuccess += 1
      Write-Output "[OK] $url ($($res.StatusCode), retry=$($result.attempts))"
    } else {
      Write-Output "[OK] $url ($($res.StatusCode))"
    }
  } else {
    Register-Failure -FailureLine "$url (status=$($res.StatusCode))" -FailureKey $url
  }
}

Write-Output ""
Write-Output "Journey checks"

foreach ($check in $journeyChecks) {
  $url = "$BaseUrl$($check.route)"
  $result = Invoke-WithRetry -Url $url -RequestTimeoutSec $TimeoutSec -RequestMaxAttempts $MaxAttempts -RequestRetryDelaySec $RetryDelaySec -RequestDisableKeepAlive $DisableKeepAlive

  if (-not $result.ok) {
    Register-Failure -FailureLine "$($check.label) ($($result.error))" -FailureKey $url
    continue
  }

  $res = $result.response
  if ($res.StatusCode -lt 200 -or $res.StatusCode -ge 400) {
    Register-Failure -FailureLine "$($check.label) - non-success status: $($res.StatusCode)" -FailureKey $url
    continue
  }

  if ($res.Content -match [regex]::Escape($check.expected)) {
    $script:stats.journeyOk += 1
    if ($result.attempts -gt 1) {
      $script:stats.retriedSuccess += 1
      Write-Output "[OK] $($check.label) (retry=$($result.attempts))"
    } else {
      Write-Output "[OK] $($check.label)"
    }
  } else {
    Register-Failure -FailureLine "$($check.label) - expected token not found: $($check.expected)" -FailureKey $url
  }
}

Write-Output ""
Write-Output "Semantic fallback checks"

foreach ($check in $semanticChecks) {
  $url = "$BaseUrl$($check.route)"
  $result = Invoke-WithRetry -Url $url -RequestTimeoutSec $TimeoutSec -RequestMaxAttempts $MaxAttempts -RequestRetryDelaySec $RetryDelaySec -RequestDisableKeepAlive $DisableKeepAlive

  if (-not $result.ok) {
    Register-Failure -FailureLine "$($check.label) ($($result.error))" -FailureKey $url
    continue
  }

  $res = $result.response
  if ($res.StatusCode -lt 200 -or $res.StatusCode -ge 400) {
    Register-Failure -FailureLine "$($check.label) - non-success status: $($res.StatusCode)" -FailureKey $url
    continue
  }

  if ($res.Content -match [regex]::Escape($check.expected)) {
    $script:stats.semanticOk += 1
    if ($result.attempts -gt 1) {
      $script:stats.retriedSuccess += 1
      Write-Output "[OK] $($check.label) (retry=$($result.attempts))"
    } else {
      Write-Output "[OK] $($check.label)"
    }
  } else {
    Register-Failure -FailureLine "$($check.label) - expected token not found: $($check.expected)" -FailureKey $url
  }
}

if ($script:failed.Count -gt 0) {
  Exit-WithFailures "Demo checks completed with failures."
}

Write-CheckSummary
Write-Output "`nAll demo routes, journey checks, and semantic checks responded successfully."
exit 0