document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var data = {
        email: email,
        password: password
    };

    fetch("http://localhost:5000/api/v1/auth/login-user", {
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
        if (data.message=='Admin login success.'){
            window.location.href = 'http://localhost:5000/api/v1/admin-panel/welcome';
        }
        else {
        console.log(data);
        window.location.href = 'http://localhost:5000/api/v1/user-panel/welcome'; // Redirect to a GET API endpoint
        }
        // Redirect or do something else as needed
    })
    .catch(error => {
        console.error("Error:", error);
        // Handle error, show error message to user etc.
    });
});
