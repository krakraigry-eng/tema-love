const http = require('http');
const server = http.createServer((req, res) => {
    res.writeHead(200, {'content-type': 'text/plain; charset=utf-8'});
    res.end('Привет, это бэкэнд сайта про любовь к Ленину!\n');
})

server.listen(3002, () => {
    console.log('сервер работает на http://localhost:3002');
})