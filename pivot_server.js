const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Usamos el puerto 8080 que es el estándar para esto
const port = 8080;

const server = http.createServer((req, res) => {
    // Limpiamos la URL de parámetros de caché (?v=...)
    let urlPath = req.url.split('?')[0];
    let filePath = path.join(__dirname, urlPath === '/' ? 'index.html' : urlPath);

    // Si la ruta es un directorio, buscamos el index.html
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
    }

    console.log(`[PIVOT] Cargando: ${urlPath}`);

    fs.readFile(filePath, (error, content) => {
        if (error) {
            res.writeHead(404);
            res.end('Archivo no encontrado');
        } else {
            const ext = path.extname(filePath).toLowerCase();
            const mimes = {
                '.html': 'text/html',
                '.js': 'application/javascript',
                '.css': 'text/css',
                '.png': 'image/png',
                '.jpg': 'image/jpeg',
                '.svg': 'image/svg+xml',
                '.json': 'application/json'
            };
            res.writeHead(200, { 'Content-Type': mimes[ext] || 'text/plain' });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(port, '127.0.0.1', () => {
    console.log("==========================================");
    console.log("   MOTOR PIVOT: ARRANCADO CORRECTAMENTE");
    console.log("==========================================");
    console.log(` PROBANDO APERTURA EN: http://localhost:${port}`);
    console.log("==========================================");

    // Forzar la apertura del navegador predeterminado
    exec(`explorer "http://localhost:${port}"`);
});
