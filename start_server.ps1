# Script simple para servidor web local
# Requiere ejecutar como Administrador para permitir acceso externo (móvil)

$port = 8080
$root = $PSScriptRoot

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Prefixes.Add("http://127.0.0.1:$port/")

try {
    $listener.Start()
    Write-Host "✅ PIVOT LISTO: Entra en http://localhost:$port/" -ForegroundColor Green
} catch {
    Write-Host "❌ Error al iniciar. Asegúrate de que el puerto $port esté libre." -ForegroundColor Red
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
