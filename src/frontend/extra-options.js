// extra-options.js

// Wait for the DOM content to load
document.addEventListener('DOMContentLoaded', function() {
    // Find the sign up button element by its ID
    var signUpButton = document.getElementById('signUpButton');
    
    // Add an event listener to the sign up button
    signUpButton.addEventListener('click', function() {
        // Redirect to the sign-up page
        window.location.href = 'http://localhost:5000/api/v1/auth/sign-up';
    });
});
