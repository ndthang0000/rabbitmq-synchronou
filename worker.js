// worker.js
const amqp = require('amqplib');

async function startWorker() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queue = 'task_queue';

    await channel.assertQueue(queue, { durable: false });
    console.log('Worker is waiting for tasks in queue:', queue);

    channel.consume(queue, async (msg) => {
      const task = JSON.parse(msg.content.toString());

      console.log('Received task:', task);

      // Simulate task processing
      const result = `Processed: ${task.name}`;

      channel.sendToQueue(msg.properties.replyTo, Buffer.from(result), {
        correlationId: msg.properties.correlationId
      });

      channel.ack(msg);
    }, { noAck: false });

  } catch (error) {
    console.error('Failed to start worker:', error);
    throw error;
  }
}

startWorker().catch(console.error);
