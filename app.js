import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';  // Correct import for CORS
import { connect } from 'mongoose';  // Assuming you are using Mongoose to connect to MongoDB
import companyRoutes from './routes/companyRoutes.js';  // Add .js extension for ES Modules
import notificationRoutes from './routes/notificationRoutes.js';
import userRoutes from './routes/userRoutes.js';

import { startEventConsumer } from './utils/eventConsumer.js';




const app = express();

//import webPush from 'web-push';

// Generate VAPID keys
//const vapidKeys = webPush.generateVAPIDKeys();

//console.log('Public Key:', vapidKeys.publicKey);
//console.log('Private Key:', vapidKeys.privateKey);



// Enable CORS for all routes
app.use(cors());

// Connect to MongoDB
connect('mongodb://localhost:27017/notifications_db')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error:', err));

// Middleware
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    //protect(req, res);
    next();
});

// Use routes - ONly for Testing
app.use('/api/notifications', notificationRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/user', userRoutes);



startEventConsumer();

/*

const queue = 'job_notifications'; // Queue name

// Connect to RabbitMQ server
async function connectToRabbitMQ() {
    try {
        const connection = await amqp.connect('amqp://localhost'); // RabbitMQ URL (localhost or remote)
        const channel = await connection.createChannel();

        // Assert that the queue exists
        await channel.assertQueue(queue, { durable: true });

        console.log('Service B (Listen) is waiting for job notifications...');

        // Consume messages from the queue
        channel.consume(queue, (msg) => {
            if (msg !== null) {
                const job = JSON.parse(msg.content.toString());
                console.log(`Received job notification: ${job.jobTitle}`);
                console.log(`Job link: ${job.linkURL}`);
                sendNotificationsToCompanyFollowers();
                // Acknowledge the message after processing
                channel.ack(msg);
            }
        }, {
            noAck: false // Manual message acknowledgment
        });
    } catch (error) {
        console.error('Error connecting to RabbitMQ:', error);
    }
}

// Start the consumer
connectToRabbitMQ();

*/



// Start the server
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
