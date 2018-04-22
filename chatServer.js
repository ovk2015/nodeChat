var pport = process.env.PORT || 5000;
	webSocket = require('ws'),
	server = new webSocket.Server({port:pport});

server.on('connection', function(ws)
{
	ws.send('Вы подключились к WS серверу');
});

server.listen(pport, function(err) 
{
    if(!err) 
    { 
    	console.log('Listening on port ' + pport); 
    }
    else
    {
    	console.log('Ошибка('); 	
    	console.log(err); 	
    }
});


console.log('Вроде работает!');