function submitSymptoms() {
    const form = document.getElementById('symptomsForm');
    const symptoms = [
        'shortnessOfBreath', 'sneezing', 'runnyNose', 'sensitivityToCold', 
        'weakness', 'dizzinessLightheadedness', 'mildFever', 'fever', 
        'dizziness', 'weightLoss', 'headache', 'nauseaVomiting', 'nausea'
    ].map(symptom => {
        return form.querySelector(`input[name="${symptom}"]`).checked ? 'yes' : 'no';
    });
    console.log(symptoms);

    // Check if at least one symptom is selected
    const isAnySymptomSelected = symptoms.includes('yes');
    if (!isAnySymptomSelected) {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `<p style="color: red;">Please select at least one symptom.</p>`;
        return; // Prevent form submission
    }

    fetch('http://localhost:3000/predict_drug', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response:', data);
        const resultDiv = document.getElementById('result');
        if (data.error) {
            resultDiv.innerHTML = `<p style="color: red;">Error: ${data.error}</p>`;
        } else {
            resultDiv.innerHTML = `
                <p>Predicted Disease: ${data.predicted_disease}</p>
                <p>Recommended Drug: ${data.recommended_drug}</p>
            `;
        }
    })
    .catch(error => {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
        console.error('Error:', error);
    });
}
