from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from sklearn.ensemble import RandomForestClassifier
import csv

app = Flask(__name__)
CORS(app)

# Load and prepare data
with open(r'C:\Users\chand\Desktop\folders\clg notes\mini project\Drug-Recommendation-System\flask_server\data\symptoms_data (3).csv') as file:
    reader = csv.reader(file)
    next(reader)  # Skip the header
    data = [row for row in reader]

selected_symptoms = [
    'Shortness', 'Shortness of breath', 'Runny or stuffy nose', 'Increased sensitivity to cold',
    'Weakness', 'Dizziness or lightheadedness', 'Mild fever', 'Fever', 'Dizziness', 
    'Unintentional weight loss', 'Headache', 'Nausea or vomiting', 'Nausea'
]

symptoms_start_index = 0
symptoms_end_index = 13
disease_index = 13
drug_index = 14

disease_drug_dict = {}

for row in data:
    symptoms = row[symptoms_start_index:symptoms_end_index]  # Extract symptoms
    disease = row[disease_index]  # Extract disease
    drug = row[drug_index]  # Extract drug

    if disease in disease_drug_dict:
        disease_drug_dict[disease].append(drug)
    else:
        disease_drug_dict[disease] = [drug]

X = np.array([row[:-2] for row in data], dtype=int)
y = np.array([row[-2] for row in data])

clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X, y)

def predict_disease_and_recommend_one_drug(symptoms):
    if len(symptoms) != len(selected_symptoms):
        raise ValueError("Input array length does not match the expected length.")
    user_input = [1 if symptom.lower() == 'yes' else 0 for symptom in symptoms]
    predicted_disease = clf.predict([user_input])[0]
    recommended_drug = disease_drug_dict[predicted_disease][0]
    return predicted_disease, recommended_drug

@app.route('/predict_drug', methods=['POST'])
def predict_drug():
    data = request.json
    symptoms = data.get('symptoms', [])
    if len(symptoms) != len(selected_symptoms):
        return jsonify({"error": "Invalid number of symptoms"}), 400
    predicted_disease, recommended_drug = predict_disease_and_recommend_one_drug(symptoms)
    return jsonify({"predicted_disease": predicted_disease, "recommended_drug": recommended_drug})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)
