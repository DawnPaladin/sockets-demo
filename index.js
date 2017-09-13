const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

var count = 0;

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

io.on("connection", client => {
	client.emit("new count", count);

	client.on("increment", () => {
		count++;
		io.emit("new count", count);
	});

	client.on("decrement", () => {
		count--;
		io.emit("new count", count);
	});
});

server.listen(3002, function() { // not "app.listen"
	console.log("Listening on port 3002");
});