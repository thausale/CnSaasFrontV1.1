import express from 'express';
import cors from 'cors';
const app = express();

app.use(cors());

app.get('/sse', (req, res) => {
	res.setHeader('Content-Type', 'text/event-stream');
	res.setHeader('Cache-Control', 'no-cache');
	res.setHeader('Connection', 'keep-alive');

	// Send SSE events periodically
	const intervalId = setInterval(() => {
		res.write(`data: ${new Date().toISOString()}\n\n`);
	}, 1000);

	// Close the SSE connection when the client disconnects
	req.on('close', () => {
		clearInterval(intervalId);
	});
});

app.listen(3000, () => {
	console.log('Server started on port 3000');
});
