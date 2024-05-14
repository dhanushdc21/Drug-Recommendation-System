// redirect.js

// Wait for the DOM content to load
document.addEventListener('DOMContentLoaded', function() {
    // Find the button element by its ID
    var forgotPasswordButton = document.getElementById('forgotPasswordButton');
    
    // Add an event listener to the button
    forgotPasswordButton.addEventListener('click', function() {
        // Redirect to the forgot password page
        window.location.href = 'http://localhost:5000/api/v1/auth/forgot-password';
    });
});
