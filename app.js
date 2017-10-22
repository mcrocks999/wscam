const express = require('express'), http = require('http'), WebSocket = require('ws'),
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
            if (err) return console.log(err);
            frame = data;
            wss.clients.forEach(function(ws) {
                ws.send(JSON.stringify({type: "image", data: frame}));
            });
        });
    }
};
c();
setInterval(() => {
    c();
},4000);
server.listen(3000,()=>{console.log("Listening on :3000")});