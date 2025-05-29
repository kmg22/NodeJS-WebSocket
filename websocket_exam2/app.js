// HTTP 서버 & WebSocket 서버 구현


// **HTTP 서버(express) 생성 및 구동**
// 1. express 객체 생성
const express = require('express');
const app = express();

const path = require("path"); // 디렉터리 관리 위한 path 모듈

// 2. "/" 경로 라우팅 처리
app.use("/", (req, res)=>{
    res.sendFile(path.join(__dirname, './template/index.html')); // index.html 파일 응답
})

// 3. 30001 port에서 서버 구동
const HTTPServer = app.listen(30001, ()=>{
    console.log("Server is open at port:30001");
});

// **WebSocket 서버(ws) 생성 및 구동**
// 1. ws 모듈 획득
const WebSocket = require('ws');

// 2. websocket 서버 생성/구동
const wss = new WebSocket.Server({ // WebSocketServer
    server:HTTPServer, // WebSocket 서버에 연결한 HTTP 서버버
    // port : 30001, // 생략 시 http 서버와 동일 port
});

// **WebSocket 이벤트 처리**
wss.on('connection', (ws, request)=>{
    // 1) 연결 클라이언트 IP 획득
    const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
    console.log(`새로운 클라이언트[${ip}] 접속`);

    // 2) 클라이언트에게 메시지 전송
    if(ws.readyState === ws.OPEN){
        ws.send(`[SERVER] 클라이언트[${ip}] 접속 환영`);
    }

    // 3) 클라이언트로부터 수신 이벤트 처리
    ws.on('message', (msg)=>{
        console.log(`[클라이언트[${ip}]] ${msg}`);
        ws.send('[SERVER] 메시지 수신');
    })

    // 4) 에러처리
    ws.on('error', (error)=>{
        console.log(`클라이언트[${ip}] 연결 에러 발생 : ${error}`);
    })

    // 5) 연결 종료 이벤트 처리
    ws.on('close', ()=>{
        console.log(`클라이언트[${ip}] websocket 연결 종료`);
    })

});

/* [ws.readyState]
ws.OPEN : 연결됨
ws.CLOSED : 연결 끊김
ws.CLOSING : 연결 끊는 중
ws.CONNECTING : 연결 중중
*/