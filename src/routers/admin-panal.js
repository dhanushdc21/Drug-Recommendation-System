import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';
import SymptomModel from '../models/symptom_diseases.js';
import updateDiseaseCount from '../utils/updateDiseaseCount.js'; // Adjust the path as necessary
import DiseaseModel from '../models/disease.js';
import GraphData from '../models/graph_data.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = express.Router();

router.get("/welcome", (req, res) => {
    const welcome = path.join(__dirname, "../frontend/admin_panal.html");
    res.sendFile(welcome);
});

router.get("/symptoms", async (req, res) => {
    try {
        const symptoms = await SymptomModel.find({});
        res.json(symptoms);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching symptoms data' });
    }
});

router.get("/diseases", async (req, res) => {
    try {
        const diseases = await DiseaseModel.find({});
        res.json(diseases);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching diseases data' });
    }
});

router.get('/symptoms-diseases', async (req, res) => {
    try {
        const symptomsDiseases = await GraphData.find({}).lean(); // Use lean() for plain JS objects
   // Log retrieved data for debugging
        const formattedData = symptomsDiseases.map(entry => ({
            symptoms: entry.symptoms,
            disease: entry.disease
        }));
        //console.log('Retrieved data:', formattedData);
        res.json(formattedData);
    } catch (error) {
        console.error('Error fetching symptoms and diseases data:', error);
        res.status(500).json({ message: 'Error fetching symptoms and diseases data' });
    }
});


router.post('/update_disease_count', async (req, res) => {
    const { disease_name } = req.body;
  
    try {
      await updateDiseaseCount(disease_name);
      res.status(200).json({ message: 'Disease count updated successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
