# Email Queue System with BullMQ and Redis
A Node.js system for sending emails in the background using BullMQ and Redis.

## How It Works
1. API receives email requests and adds them to Redis queue
2. Worker processes jobs from queue and sends emails via Nodemailer
3. Redis stores jobs persistently between server restarts

## Setup
1. Install dependencies:  
`npm install express bullmq nodemailer dotenv redis`

2. Create `.env` file:  
`EMAIL=your@gmail.com`  
`PASSWORD=your-app-password`  
`REDIS_HOST=localhost`  
`REDIS_PORT=6379`

3. Run Redis:  
Linux/Mac: `redis-server`  
Windows: Download from redis.io or https://github.com/tporadowski/redis/releases

4. Start system:  
Terminal 1: `node index.js` (API)  
Terminal 2: `node worker.js` (Email worker)

## File Structure
- `index.js` - Express API (queues emails)
- `worker.js` - Background email processor
- `emailQueue.js` - BullMQ/Redis setup
- `.env` - Configuration

## Usage
POST `/send-email` with JSON:  
`{ "to": "recipient@example.com", "subject": "Hello", "html": "<p>Message</p>" }`

## Why This Better
- API responds instantly (~1ms)
- Emails send in background (~3s each)
- Automatic retries (3x by default)
- Survives server crashes (Redis persistence)