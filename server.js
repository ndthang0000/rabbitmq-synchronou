// server.js
const express = require('express');
const { connectRabbitMQ, sendTaskToQueue } = require('./rabbitmq');

const app = express();
app.use(express.json());

let channel;

app.post('/process', async (req, res) => {
  const task = req.body;

  try {
    const result = await sendTaskToQueue(channel, task);
    res.status(200).json({ status: 'success', result });
  } catch (error) {
    console.error('Error processing task:', error);
    res.status(500).json({ status: 'error', message: 'Task processing failed' });
  }
});

connectRabbitMQ().then(({ connection, channel: ch }) => {
  channel = ch;
  app.listen(3000, () => {
    console.log('API server listening on port 3000');
  });
}).catch(console.error);
