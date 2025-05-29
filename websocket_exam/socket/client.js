// WebSocket 클라이언트 생성

const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8080');
ws.on('open', function open() {console.log('서버에 연결됨');
});
ws.on('message', function incoming(data) {console.log('서버로부터 받은 메시지 : %s', data);
});

