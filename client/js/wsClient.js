var wsClient;

$(document).ready(function()
{
	$('#startConnection').bind('click', startConnection);
});

function startConnection(event)
{
	event.preventDefault();
	var url2Coonect = $('#wsServerUrl').val().trim(),
		nickName = $('#nickName').val().trim();

	wsClient = new WebSocket(url2Coonect + nickName);
	wsClient.onopen = function() 
	{
		console.log('Сокет открыт');
	}
	wsClient.onmessage = function(event) 
	{
		console.log('Получено сообщение');
		console.log(event);		
	}
	wsClient.onerror = function(error) 
	{
	  console.log("Ошибка " + error.message);
	};
	wsClient.onclose = function(event) 
	{
		console.log('Сокет закрыт');
	}
}