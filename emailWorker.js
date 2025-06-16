import { Worker } from 'bullmq';
import dotenv from 'dotenv';
import { transporter } from './transporter.js';
dotenv.config();

const worker = new Worker('emailQueue', async job => {
  const { to, subject, html } = job.data;
  try {
    await transporter.sendMail({
      from: process.env.email,
      to,
      subject,
      html,
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error);
    throw error; 
  }
}, { connection: { host: 'localhost', port: 6379 } });

worker.on('failed', job => {
  console.error(`Job ${job.id} failed after retries:`, job.failedReason);
});