import express from 'express';
import cors from 'cors';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import analyticsRoutes from './routes/analytics.js';

const app = express();
const PORT = process.env.PORT || 5000;
const clientUrl = process.env.CLIENT_URL || '';
const allowedOrigins = [clientUrl].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : true,
    credentials: true
  })
);
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'EcoLife Receipt AI API is running' });
});

app.get('/api/demo', (_req, res) => {
  res.json({
    message: 'Starter API ready for receipt analysis',
    features: [
      'Receipt intake',
      'Carbon impact',
      'Health and pollution insights',
      'Eco voice assistant'
    ]
  });
});

app.use('/api/analytics', analyticsRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientBuildPath = path.join(__dirname, '../client/dist');

if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
} else {
  app.get('/', (_req, res) => {
    res.send(
      'EcoLife Receipt AI backend is running. Start the frontend development server to view the app.'
    );
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
