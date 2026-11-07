import 'dotenv/config';
import { connectDB } from './db.js';
import { createApp } from './app.js';

await connectDB();

const PORT = process.env.PORT || 3001;

createApp().listen(PORT, () => {
    console.log(`Proxy listening on http://localhost:${PORT}`);
  });
