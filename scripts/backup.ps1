$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
$backupRoot = Join-Path $projectRoot 'backups'
$timestamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$archivePath = Join-Path $backupRoot ("portfolio-backup-$timestamp.zip")

if (-not (Test-Path $backupRoot)) {
  New-Item -Path $backupRoot -ItemType Directory | Out-Null
}

$itemsToBackup = @(
  (Join-Path $projectRoot 'app'),
  (Join-Path $projectRoot 'public'),
  (Join-Path $projectRoot 'package.json'),
  (Join-Path $projectRoot 'package-lock.json'),
  (Join-Path $projectRoot 'next.config.ts'),
  (Join-Path $projectRoot 'README.md')
)

$existingItems = $itemsToBackup | Where-Object { Test-Path $_ }

if ($existingItems.Count -eq 0) {
  throw 'No backup targets found.'
}

Compress-Archive -Path $existingItems -DestinationPath $archivePath -CompressionLevel Optimal

# Keep the latest 30 backups.
Get-ChildItem -Path $backupRoot -Filter '*.zip' |
  Sort-Object LastWriteTime -Descending |
  Select-Object -Skip 30 |
  Remove-Item -Force

Write-Output "Backup created: $archivePath"
