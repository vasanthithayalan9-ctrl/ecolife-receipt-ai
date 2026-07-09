import express from 'express';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFile = path.join(__dirname, '../data/demoData.json');

router.get('/summary', async (_req, res) => {
  try {
    const raw = await readFile(dataFile, 'utf8');
    const data = JSON.parse(raw);
    res.json({
      summary: {
        receipts: data.receipts.length,
        users: data.users.length,
        recommendations: data.recommendations.length
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Unable to load demo data' });
  }
});

export default router;
