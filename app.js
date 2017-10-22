const express = require('express'), http = require('http'), WebSocket = require('ws'),
app = express(), server = http.createServer(app), wss = new WebSocket.Server({server, path:'/ws'}),
nodewebcam = require('node-webcam'), webcam = nodewebcam.create({output:'jpeg',callbackReturn:'base64'});
app.use(express.static(__dirname + '/public'));
server.listen(3000,()=>{console.log("Listening on :3000")});