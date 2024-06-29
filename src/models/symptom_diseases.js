import mongoose from 'mongoose';

const SymptomSchema = new mongoose.Schema(
  {
    name: {
      type: String, // Name of the symptom
      required: true,
      unique: true, // Ensure uniqueness of symptom names
    },
    count: {
      type: Number, // Number of occurrences of the symptom
      default: 0, // Initialize count to 0
    },
  },
  { timestamps: true }
);

const SymptomModel = mongoose.model('Symptoms', SymptomSchema);

export default SymptomModel;
