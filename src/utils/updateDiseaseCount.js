// src/utils/updateDiseaseCount.js
import DiseaseModel from '../models/disease.js'; // Adjust the path as necessary

// Function to update disease count
const updateDiseaseCount = async (diseaseName) => {
  try {
    // Find the disease by name
    let disease = await DiseaseModel.findOne({ name: diseaseName });

    if (disease) {
      // If disease exists, increment the count
      disease.count += 1;
    } else {    
      // If disease does not exist, create a new entry with count 1
      disease = new DiseaseModel({ name: diseaseName, count: 1 });
    }

    // Save the updated or new disease entry
    await disease.save();
    console.log(`Disease count updated: ${diseaseName} (${disease.count})`);
  } catch (error) {
    console.error('Error updating disease count:', error);
  }
};

export default updateDiseaseCount;
