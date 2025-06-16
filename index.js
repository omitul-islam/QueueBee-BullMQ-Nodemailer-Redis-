import express from 'express';
import { addEmailJob } from './emailQueue.js';

const app = express();
app.use(express.json());

app.post('/send-email', async (req, res) => {
  const { to, subject, html } = req.body;
  
  await addEmailJob({ to, subject, html }); 
  
  res.json({ success: true, message: 'Email queued!' });
});

app.listen(3000, () => console.log('Server running on port 3000'));