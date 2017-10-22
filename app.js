const express = require('express'), http = require('http'), WebSocket = require('ws'), config = require('./config'),
app = express(), server = http.createServer(app), wss = new WebSocket.Server({server, path:'/ws'}),
nodewebcam = require('node-webcam'), webcam = nodewebcam.create({output:'jpeg',callbackReturn:'base64'});
app.use(express.static(__dirname + '/public'));
var frame = '';
wss.on('connection', function(ws, req) {
    if(frame!='') ws.send(JSON.stringify({type: "image", data: frame}));
    console.log(req.connection.remoteAddress + " connected.");
    ws.on('close', function(code, reason) {
        console.log(req.connection.remoteAddress + " disconnected with reason " + code + ":" + reason);
    })
});
function c() {
    if (wss.clients.size>0) {
        webcam.capture('o', (err, data) => {
            if (err) return wss.clients.forEach(ws => ws.send(JSON.stringify({type: "failure"})));
            frame = data;
            wss.clients.forEach(ws => ws.send(JSON.stringify({type: "image", data: frame})));
        });
    }
};
c();
setInterval(() => {
    c();
},config.interval);
server.listen(config.port,()=>{console.log("Listening on :"+config.port)});