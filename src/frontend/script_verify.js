document.addEventListener('DOMContentLoaded', function() {
    const otpForm = document.getElementById('otpForm');
    otpForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting the default way

        const email = document.getElementById('email').value;
        const otp = document.getElementById('otp').value;

        fetch('http://localhost:5000/api/v1/auth/otp_verification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, otp })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            window.location.href = 'http://localhost:5000/api/v1/user-panel/welcome'; // Redirect to a GET API endpoint
            if (data.success) {
                alert('OTP verified successfully!');
            } else {
                alert('OTP verification failed. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
    });
});