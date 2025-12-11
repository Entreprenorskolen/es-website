# Rename script for fjerdeklasse images
# This script:
# 1. Replaces spaces with underscores
# 2. Appends a sequential number (starting from 1000) at the end of the filename
# 3. Outputs a mapping for students.ts

$sourcePath = "c:\Users\prebe\Projects\es\es-website\public\images\fjerdeklasse"
$counter = 1000

# Get all image files sorted by name
$files = Get-ChildItem -Path $sourcePath -File | Sort-Object Name

Write-Host "=== Renaming Files ===" -ForegroundColor Cyan
Write-Host ""

$mappings = @()

foreach ($file in $files) {
    $extension = $file.Extension.ToLower()
    $originalName = $file.BaseName
    
    # Replace spaces with underscores and append the number
    $nameWithUnderscores = $originalName -replace ' ', '_'
    $newName = "${nameWithUnderscores}_${counter}${extension}"
    
    # Rename the file
    Rename-Item -LiteralPath $file.FullName -NewName $newName
    
    Write-Host "Renamed: $($file.Name) -> $newName" -ForegroundColor Green
    
    # Store mapping for later use
    $mappings += [PSCustomObject]@{
        Number = $counter
        OriginalName = $originalName
        NewFileName = $newName
        Extension = $extension
    }
    
    $counter++
}

Write-Host ""
Write-Host "=== Mapping for students.ts ===" -ForegroundColor Cyan
Write-Host ""

# Output a CSV-style mapping that can be used to create student entries
foreach ($m in $mappings) {
    Write-Host "$($m.Number),$($m.OriginalName),$($m.NewFileName)"
}

Write-Host ""
Write-Host "=== Summary ===" -ForegroundColor Cyan
Write-Host "Total files renamed: $($files.Count)" -ForegroundColor Yellow
Write-Host "File numbers: 1000 - $($counter - 1)" -ForegroundColor Yellow

# Save mapping to a CSV file for reference
$csvPath = "c:\Users\prebe\Projects\es\es-website\scripts\fjerdeklasse-mapping.csv"
$mappings | Export-Csv -Path $csvPath -NoTypeInformation -Encoding UTF8
Write-Host ""
Write-Host "Mapping saved to: $csvPath" -ForegroundColor Green
