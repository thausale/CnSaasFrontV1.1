import express from 'express';
import cors from 'cors';
const app = express();

app.use(cors());

let clients = [];

app.get('/sse', (req, res) => {
	res.setHeader('Content-Type', 'text/event-stream');
	res.setHeader('Cache-Control', 'no-cache');
	res.setHeader('Connection', 'keep-alive');

	clients.push(res);

	// Close the SSE connection when the client disconnects
	req.on('close', () => {
		clients = clients.filter((client) => client !== res);
	});
});

app.post('/increment-notification', (req, res) => {
	clients.forEach((client) => {
		client.write(`event: notification.increment\n`);
		client.write(`data: "hello world"\n\n`);
	});

	res.status(200).send('Notifications sent');
});

app.listen(3000, () => {
	console.log('Server started on port 3000');
});
