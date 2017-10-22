var canvas = document.getElementById('canvas'), context = canvas.getContext('2d'), updateFrame = true;
var frame = 'iVBORw0KGgoAAAANSUhEUgAAADIAAAAPCAAAAACDsMMeAAABWklEQVQoz63STSjDARjH8V95OThJcpZyYQ5WkoP0nxtFTCEu8hKym7U4KMtLSmqWkgMuFkkKeXfBzct1orTTZjh4Kfsr7eswa3ZDntOvnj6H50X8uvS/JDvz16TGSOSltx+RigR50Ml3MnF5NDBlAqy4xuKdoGd4t8CAgNcxHeLKqW5PgINx5wIIrOWSLBAqlqRFAB7zJWUYBFM0bMt+2rersu7GIzlzWhBYS0Ls6ZJ+C9BZBIA7H/xZBvjhWVvc6RxMoDcNgdUNEe1R5gDW9QJQ3xUf/3rLK1+MwMVyj0yBdQSi2iF3EDhUAKC0C6g1oEWtPXHiL1RnZYyMQlTb2JqA+XQAqu0xsqZbkI+wzqG1CjaTyGzqJqulQwDM6ZhJGWxomxn5+FBHhLZik+YkwmCG0vq+ltwuNbgMqJYa5YMO6fQsTxqSmXzKYCJ+vMZW9PL+1QoD9398y085E1ZIUYf1aAAAAABJRU5ErkJggg==';
function setFrame(base64) {frame=base64;updateFrame=true;}
function draw() {var image=new Image();image.onload=function() {context.drawImage(image, 0, 0);};image.src='data:image/png;base64,'+frame}
function anim() {if (updateFrame) {draw();updateFrame=false}requestAnimationFrame(anim)}anim();
var socket;if(window.location.protocol === "https://") {socket=new WebSocket("wss://" + window.location.host + "/ws")}
else {socket=new WebSocket("ws://"+window.location.host+"/ws")}
socket.onmessage = function(message) {var data = JSON.parse(message.data);if(data.type==="image") {setFrame(data.data);}}