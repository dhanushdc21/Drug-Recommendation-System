import mongoose from 'mongoose';

// Define the Disease schema
const DiseaseSchema = new mongoose.Schema(
  {
    name: {
      type: String, // Name of the disease
      required: true,
      unique: true, // Ensure uniqueness of disease names
    },
    count: {
      type: Number, // Number of occurrences of the disease
      default: 0, // Initialize count to 0
    },
  },
  { timestamps: true }
);

// Create the Disease model
const DiseaseModel = mongoose.model('Diseases', DiseaseSchema);

export default DiseaseModel;
