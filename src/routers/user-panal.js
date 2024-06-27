import { Router } from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = Router();

router.get("/welcome", (req, res) => {
    const welcome = path.join(__dirname, "../frontend/drug_front.html");
    res.sendFile(welcome);
});

router.get("/predict_drug", (req, res) => {
    const predict = path.join(__dirname, "../frontend/predict_page.html");
    res.sendFile(predict);
});

router.post('/predict_drug', async (req, res) => {
  try {
      const response = await fetch('http://localhost:3000/predict_drug', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(req.body),
      });
      const data = await response.json();
      res.json(data);
  } catch (error) {
      res.status(500).json({ error: 'Error making request to Python server' });
  }
});

export default router;
