// utils/eventConsumer.js

import amqp from "amqplib";
import { handleJobPosted } from "../handlers/jobPostedHandler.js";
import { handleCompanyCreated } from "../handlers/companyCreatedHandler.js";
import { handleCompanyFollowed } from "../handlers/companyFollowedHandler.js";

/**
 * Consume events from the RabbitMQ queue
 */
export const startEventConsumer = async () => {
  try {
    const connection = await amqp.connect("");// Deactivated exposed instance
    const channel = await connection.createChannel();

    const queue = "events_queue"; // Same queue from which events are published
    await channel.assertQueue(queue, { durable: true });

    console.log("Waiting for events...");

    channel.consume(queue, (msg) => {
      if (msg !== null) {
        const event = JSON.parse(msg.content.toString());

        // Handle the event based on the event type
        switch (event.eventType) {
          case "job_posted":
            handleJobPosted(event);
            break;
          case "company_created":
            handleCompanyCreated(event);
            break;
          case "company_followed":
            handleCompanyFollowed(event);
            break;

          // Add more event types and handlers as necessary
          default:
            console.error("Unknown event type:", event.eventType);
        }

        // Acknowledge the message after processing
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error("Error consuming events:", error);
  }
};
