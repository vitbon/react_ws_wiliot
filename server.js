"use strict";
console.log("server.js started");
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const app = express();
//initialize a simple http server
const server = http.createServer(app);
//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });
function createMessage(data) {
    return JSON.stringify(data);
}
wss.on('connection', (ws) => {
    const extWs = ws;
    extWs.isAlive = true;
    ws.on('pong', () => {
        extWs.isAlive = true;
    });
    ws.on('error', (err) => {
        console.warn(`Client disconnected - reason: ${err}`);
    });
});
const getRandomData = (from, to) => Math.floor(Math.random() * to) + from;
const generateRandomData = () => {
    const currentTimestampDate = Date.now();
    return [
        {
            id: 1, timestamp: currentTimestampDate, temperature: getRandomData(0, 40), data: getRandomData(0, 150)
        },
        {
            id: 2, timestamp: currentTimestampDate, temperature: getRandomData(0, 40), data: getRandomData(0, 150)
        },
    ];
};
//connection is up, let's add a simple simple event
setInterval(() => {
    wss.clients.forEach((ws) => {
        const randomData = generateRandomData();
        ws.send(createMessage(randomData));
        const extWs = ws;
        if (!extWs.isAlive)
            return ws.terminate();
        extWs.isAlive = false;
        ws.ping(null, undefined);
    });
}, 1000);
//start our server
server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port "ws://localhost:8999" :)`);
});
//# sourceMappingURL=server.js.map