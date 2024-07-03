document.getElementById("forgotPasswordForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var email = document.getElementById("email").value;

    var data = {
        email: email
    };

    fetch("http://localhost:5000/api/v1/auth/forgot-password", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        
        // Handle success, show a message to the user, etc.
    })
    .catch(error => {
        console.error("Error:", error);
        // Handle error, show error message to user etc.
    });
});
