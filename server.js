const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    console.log(`📢 ${req.url}`);
    
    const ext = path.extname(req.url).toLowerCase();
    
    if(ext === '.css') {
        const fileName = req.url.replace('/css/', '');
        const filePath = path.join(__dirname, 'css', fileName);
        serveFile(filePath, 'text/css', res);
        return;
    }
    
    if(ext === '.js') {
        const fileName = req.url.replace('/js/', '');
        const filePath = path.join(__dirname, 'js', fileName);
        serveFile(filePath, 'application/javascript', res);
        return;
    }
    
    if(ext === '.jpg' || ext === '.png' || ext === '.jpeg' || ext === '.jpg') {
        const fileName = path.basename(req.url);
        let filePath = path.join(__dirname, 'lenin-biografy-img', fileName);
        
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if(err) {
                filePath = path.join(__dirname, fileName);
            }
            const mime = { '.jpg': 'image/jpeg', '.png': 'image/png', '.jpeg': 'image/jpeg', '.jpg': 'image/jpeg' };
            serveFile(filePath, mime[ext], res);
        });
        return;
    }
    
    let filePath = '';
    if(req.url === '/' || req.url === '/home') {
        filePath = './html/home.html';
    } else {
        const pageName = req.url.slice(1);
        filePath = `./html/${pageName}.html`;
    }
    
    fs.readFile(filePath, (err, data) => {
        if(err) {
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(`
                <h1>404 - Не найдено</h1>
                <p>Файл: ${req.url}</p>
                <a href="/home">На главную</a>
            `);
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data);
    });
});

function serveFile(filePath, contentType, res) {
    fs.readFile(filePath, (err, data) => {
        if(err) {
            console.log(`❌ Не найден: ${filePath}`);
            res.writeHead(404);
            res.end();
            return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
}

const PORT = 3002;
server.listen(PORT, () => {
    console.log(`\n✅ Сервер: http://localhost:${PORT}`);
});