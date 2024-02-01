'use strict';

const express = require('express');
const path = require('path');
const { createServer } = require('http');

const WebSocket = require('ws');

const app = express();
app.use(express.static(path.join(__dirname, '/public')));

const server = createServer(app);
const wss = new WebSocket.Server({ server });
wss.on('connection', (ws) => {
	ws.on('message', (data) => {
		console.log('data received \n ' + data);
		wss.clients.forEach(function (client) {
			client.send(data.toString());
		});
	});
	ws.on('close', function () {
		//console.log('stopping client interval');
		//clearInterval(id);
	});
});

server.listen(4000, function () {
	console.log('Listening on http://0.0.0.0:4000');
});
