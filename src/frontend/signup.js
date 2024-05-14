document.addEventListener('DOMContentLoaded', function() {
    var signupForm = document.getElementById('signupForm');

    signupForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        var email = document.getElementById('email').value.trim();
        var password = document.getElementById('password').value.trim();
        var confirmPassword = document.getElementById('confirm_password').value.trim();

        // Validate form data, e.g., check if passwords match, etc.
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return; // Exit the function if passwords don't match
        }

        // Construct the signup data object
        var formData = {
            email: email,
            password: password,
            confirm_password: confirmPassword
        };

        // Send the signup data to the backend
        fetch('http://localhost:5000/api/v1/auth/sign-up', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
        })
        .then(response => response.json().then(data => {
        if (!response.ok) {
            console.error('Signup failed:', data); // Log the error data from server
            alert('Failed to sign up: ' + (data.message || 'Please try again later.'));
            throw new Error('Signup failed: ' + (data.message || 'Server responded with an error'));
        }
        console.log('Signup successful:', data);
        window.location.href = 'http://localhost:5000/api/v1/user-panel/welcome'; // Redirect to a GET API endpoint
    }))
        .catch(error => {
        // Handle any other errors that aren't related to the network or fetching process
        console.error('Error during signup:', error);
        alert('Error during signup: ' + error.message);
        });

    });
});
