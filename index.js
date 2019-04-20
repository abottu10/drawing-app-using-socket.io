let app = require('express')();

let http = require('http').Server(app);

let io = require('socket.io')(http);

app.get('/', (req, res) => {

	// res.send is used to send back the html within quotes 
	// res.send('<h1>Hello Socket.io</h1>');

	// res.sendFile is used to send back a html file. Much cleaner
	res.sendFile(__dirname + '/index.html');

});

http.listen(3000, () => {
	console.log('Connected');
});

// var s = 0;

io.on('connection', (socket) => {

	console.log('there is a connection');

	socket.on('disconnect', () => {
		console.log('Disconnected');
	});

	socket.on('created', (data) => {
		// s = s+1;
		socket.broadcast.emit('created', (data));
	});

	socket.on('chat-message', (data) => {
		socket.broadcast.emit('chat-message', (data));
	});

});