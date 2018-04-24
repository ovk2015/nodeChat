var pport = process.env.PORT || 5000;
	webSocket = require('ws'),
	server = new webSocket.Server({port:pport});

var clients = [];

server.on('connection', function(ws, url)
{

	var clientName = url.url.substr(1);
    clients.push({name: clientName, socket: ws});
    console.log('Подключился клиeнт ' + clientName);

	ws.on('message', function(data)
	{
		data = JSON.parse(data);
		clients
		.filter(function (item)
		{
			return item.name == data.to;
		})[0].socket
		.send
		(
			JSON.stringify
			({
				sender: 'client',
				type: 'message',
				data:
				{
					from: data.from,
					message: data.message
				}
			})
		);
		// console.log(clients);
		// console.log(data);
	});

    server.clients.forEach(function(client)
    {
        // if(client !== ws && client.readyState === WebSocket.OPEN)
        if(client !== ws && client.readyState === 1)
        {
            console.log('Отправляем сообщение остальным');
            client.send
            (
            	JSON.stringify
				({
					sender: 'server',
					type: 'info',
					data:
					{
						user: clientName,
						action: 'newContact'
					}
				})
			);
        }
    });
	ws.send
	(
		JSON.stringify
		({
			sender: 'server',
			type: 'info',
			data:
			{
				action: 'connected',
				users: clients
					.map(function(item){return item.name})
					.filter(function(item){return item != clientName})
			}
		})
	);
});

/*server.on('message', function(data)
{
	data = JSON.parse(data);
	console.log(data);
});*/

server.on('close', function() 
{
	console.log('closing connection');
});


console.log('Вроде работает на порту ' + pport);