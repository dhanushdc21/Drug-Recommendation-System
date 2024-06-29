import { Router } from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import SymptomModel from '../models/symptom_diseases.js'; // Adjust the path if necessary

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
      console.log('User Panal data');
      console.log(data);
      res.json(data);
  } catch (error) {
      res.status(500).json({ error: 'Error making request to Python server' });
  }
});

router.post('/updateSymptoms', async (req, res) => {
    const symptoms = req.body;
  
    try {
      // Iterate through each symptom received
      for (const symptomName in symptoms) {
        if (symptoms.hasOwnProperty(symptomName)) {
          const symptom = await SymptomModel.findOne({ name: symptomName });
  
          if (symptom) {
            // If symptom exists, increment its count
            symptom.count += 1;
            await symptom.save();
          } else {
            // If symptom doesn't exist, create a new document
            await SymptomModel.create({ name: symptomName, count: 1 });
          }
        }
      }
  
      console.log('Symptoms updated successfully:', symptoms);
      res.json({ success: true });
    } catch (error) {
      console.error('Error updating symptoms:', error);
      res.status(500).json({ success: false, error: 'Failed to update symptoms.' });
    }
  });

export default router;
