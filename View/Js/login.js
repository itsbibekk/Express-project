const form = document.getElementById("login-form");

const username = document.getElementById("username");
const password = document.getElementById("password");
const email = document.getElementById("email");

const usernameError = document.getElementById("username-error");
const passwordError = document.getElementById("password-error");
const emailError = document.getElementById("email-error");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    validate();
});

function validate() {
    let valid = true;

    clearErrors();

    // Username validation
    if (username.value.trim() === "") {
        usernameError.textContent = "Username required";
        valid = false;
    }

    // Password validation
    if (password.value.length < 6) {
        passwordError.textContent = "Minimum 6 characters";
        valid = false;
    }

    // Email validation
    if (!email.value.includes("@") || !email.value.includes(".")) {
        emailError.textContent = "Invalid email";
        valid = false;
    }

    if (valid) {

        fetch("/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                username: username.value,
                email: email.value,
                password: password.value

            })

        })

        .then(res => res.text())

        .then(message => {

            if (message === "success") {

                window.location.href = "/dashboard";

            } else {

                alert(message);

            }

        })

        .catch(error => {

            console.log(error);
            alert("Login failed");

        });
    }
}


function clearErrors() {

    usernameError.textContent = "";
    passwordError.textContent = "";
    emailError.textContent = "";

}