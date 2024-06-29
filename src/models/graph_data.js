import mongoose from 'mongoose';

const GraphDataSchema = new mongoose.Schema({
    symptoms: {
        type: [String],
        required: true
    },
    disease: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const GraphData = mongoose.model('graph_data', GraphDataSchema,'graph_data' );

export default GraphData;