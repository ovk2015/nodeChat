var webSocket = require('ws'),
	server = new webSocket.Server({port:5000});

server.on('connection', function(ws)
{
	ws.send('Вы подключились к WS серверу');
});

console.log('Вроде работает!');