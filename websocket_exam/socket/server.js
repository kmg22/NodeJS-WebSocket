// WebSocket 서버 생성

const WebSocket = require('ws');

const wss = new WebSocket.Server({port : 8080});
wss.on('connection', function connection(ws) {console.log('새 클라이언트가 연결됨');
    ws.on('message', function incoming(message) {console.log('받은 메시지 : %s', message);
    });
    ws.send('WebSocket 서버 환영 ^_^');
});