'use strict';

const express = require('express');
const path = require('path');
const { createServer } = require('http');
const cors = require('cors');

const WebSocket = require('ws');

const app = express();
app.use(express.json());
app.use(cors());
const server = createServer(app);
const wss = new WebSocket.Server({ server });
wss.on('connection', (ws) => {
	ws.on('message', (data) => {
		console.log('data received \n ' + data);
		wss.clients.forEach(function (client) {
			client.send(data.toString());
		});
	});
	ws.on('close', function () {});
});
app.post('/', (req, res) => {
	console.log(req.body);
	wss.clients.forEach(function (client) {
		client.send(JSON.stringify(req.body));
	});

	res.sendStatus(200);
});
server.listen(4000, function () {
	console.log('Listening on http://0.0.0.0:4000');
});
