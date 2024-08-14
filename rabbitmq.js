// rabbitmq.js
const amqp = require('amqplib');

async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    return { connection, channel };
  } catch (error) {
    console.error('Failed to connect to RabbitMQ:', error);
    throw error;
  }
}

async function sendTaskToQueue(channel, task) {
  const queue = 'task_queue';
  const replyQueue = await channel.assertQueue('', { exclusive: true });
  console.log(replyQueue)
  const correlationId = generateCorrelationId();
  const promise = new Promise((resolve) => {
    channel.consume(replyQueue.queue, (msg) => {
      if (msg.properties.correlationId === correlationId) {
        resolve(msg.content.toString());
      }
    }, { noAck: true });
  });

  channel.sendToQueue(queue, Buffer.from(JSON.stringify(task)), {
    correlationId,
    replyTo: replyQueue.queue
  });

  return promise;
}

function generateCorrelationId() {
  return Math.random().toString() + Math.random().toString() + Math.random().toString();
}

module.exports = { connectRabbitMQ, sendTaskToQueue };
