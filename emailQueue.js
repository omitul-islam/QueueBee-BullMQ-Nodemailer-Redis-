import dotenv from 'dotenv';
import { Queue } from 'bullmq';
import nodemailer from 'nodemailer';

dotenv.config();
export const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, 
   auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD 
  }
});

// Initialize BullMQ queue
export const emailQueue = new Queue('emailQueue', {
  connection: { host: '127.0.0.1', port: 6379 }, // Redis config
});

export async function addEmailJob(emailData) {
  await emailQueue.add('sendEmail', emailData, {
    attempts: 3, // Retry 3 times if failed
    backoff: { type: 'exponential', delay: 1000 }, // Retry delay
  });
}