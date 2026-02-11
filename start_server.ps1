# Script simple para servidor web local
# Requiere ejecutar como Administrador para permitir acceso externo (móvil)

$port = 8080
$root = $PSScriptRoot

# Detectar IP local
$ip = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.InterfaceAlias -notlike "*Loopback*" -and $_.InterfaceAlias -notlike "*vEthernet*" } | Select-Object -First 1).IPAddress

Clear-Host
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "  ANTIGRAVITY - SERVIDOR LOCAL SEGURO" -ForegroundColor White
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "  1. Asegúrate de que tu móvil está en la misma WiFi."
Write-Host "  2. Abre esta dirección en tu móvil:"
Write-Host ""
Write-Host "     http://$($ip):$port/" -ForegroundColor Green
Write-Host ""
Write-Host "  (Mantén esta ventana abierta. Cierra para detener.)"
Write-Host ""

$listener = New-Object System.Net.HttpListener
try {
    $listener.Prefixes.Add("http://*:$port/")
    $listener.Start()
} catch {
    Write-Host "❌ ERROR DE PERMISOS:" -ForegroundColor Red
    Write-Host "Para que tu móvil pueda conectar, Windows requiere permisos."
    Write-Host "Por favor, cierra esto y haz click derecho en 'start_server.ps1' -> 'Ejecutar con PowerShell' (como Administrador)."
    Read-Host "Presiona Enter para salir..."
    exit
}

while ($listener.IsListening) {
    $context = $listener.GetContextAsync().Result
    $request = $context.Request
    $response = $context.Response
    
    $localPath = $root + $request.Url.LocalPath.Replace('/', '\')
    
    # Manejo básico de index.html
    if (-not (Test-Path $localPath -PathType Leaf)) {
        if ($request.Url.LocalPath -eq "/" -and (Test-Path "$root\index.html")) {
            $localPath = "$root\index.html"
        } else {
            $response.StatusCode = 404
            $response.Close()
            continue
        }
    }

    try {
        $content = [System.IO.File]::ReadAllBytes($localPath)
        
        # Tipos MIME básicos
        $ext = [System.IO.Path]::GetExtension($localPath)
        switch ($ext) {
            ".html" { $response.ContentType = "text/html; charset=utf-8" }
            ".css"  { $response.ContentType = "text/css" }
            ".js"   { $response.ContentType = "application/javascript" }
            ".json" { $response.ContentType = "application/json" }
            ".png"  { $response.ContentType = "image/png" }
            ".jpg"  { $response.ContentType = "image/jpeg" }
            ".svg"  { $response.ContentType = "image/svg+xml" }
        }

        $response.ContentLength64 = $content.Length
        $response.OutputStream.Write($content, 0, $content.Length)
        Write-Host "Solicitud: $($request.Url.LocalPath)" -ForegroundColor Gray
    } catch {
        $response.StatusCode = 500
    } finally {
        $response.Close()
    }
}
