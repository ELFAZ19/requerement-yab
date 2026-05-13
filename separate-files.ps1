# Read the backup file
$html = Get-Content "index-backup.html" -Raw

# Extract CSS (between first <style> and first </style>)
$cssStart = $html.IndexOf('<style>') + 7
$cssEnd = $html.IndexOf('</style>')
$css = $html.Substring($cssStart, $cssEnd - $cssStart).Trim()

# Extract JavaScript (between last <script> that's not external and last </script>)
$lastScriptStart = $html.LastIndexOf('<script>')
$lastScriptEnd = $html.LastIndexOf('</script>')
$js = $html.Substring($lastScriptStart + 8, $lastScriptEnd - $lastScriptStart - 8).Trim()

# Create new HTML without inline CSS and JS
$beforeStyle = $html.Substring(0, $html.IndexOf('<style>'))
$afterStyle = $html.Substring($html.IndexOf('</style>') + 8)
$beforeScript = $afterStyle.Substring(0, $afterStyle.LastIndexOf('<script>'))
$afterScript = $afterStyle.Substring($afterStyle.LastIndexOf('</script>') + 9)

# Build new HTML
$newHtml = $beforeStyle + '<link rel="stylesheet" href="styles.css">' + "`n" + $beforeScript + '<script src="app.js"></script>' + $afterScript

# Save files
Set-Content "styles.css" -Value $css -Encoding UTF8
Set-Content "app.js" -Value $js -Encoding UTF8
Set-Content "index.html" -Value $newHtml -Encoding UTF8

Write-Host "✅ Files separated successfully!"
Write-Host "   - styles.css: $($css.Length) characters"
Write-Host "   - app.js: $($js.Length) characters"
Write-Host "   - index.html: $($newHtml.Length) characters"
