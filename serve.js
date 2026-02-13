const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const port = 8080;

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.svg': 'image/svg+xml',
};

const server = http.createServer((req, res) => {
    const url = req.url.split('?')[0];
    let filePath = path.join(__dirname, url === '/' ? 'index.html' : url);

    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            res.writeHead(404);
            res.end('Archivo no encontrado');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(port, '127.0.0.1', () => {
    console.log("==========================================");
    console.log("   PIVOT: MOTOR LISTO Y CONECTADO");
    console.log("==========================================");
    console.log(` Abriendo aplicacion en tu navegador...`);
    console.log("==========================================");

    // Comando universal para abrir navegador en Windows
    exec(`start http://localhost:${port}`);
});
