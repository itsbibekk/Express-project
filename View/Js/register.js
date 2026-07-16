const form = document.getElementById("register-form");

const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

const usernameError = document.getElementById("username-error");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const confirmPasswordError = document.getElementById("confirm-password-error");


form.addEventListener("submit", function (e) {

    e.preventDefault();

    validateForm();

});



function validateForm() {

    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const confirmValue = confirmPassword.value.trim();


    usernameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";


    let isValid = true;


    if(usernameValue === ""){

        usernameError.textContent = "Username is required";
        isValid = false;

    }
    
    if(emailValue === ""){

        emailError.textContent = "Email is required";
        isValid = false;

    }
    else if(!emailValue.includes("@") || !emailValue.includes(".")){

        emailError.textContent = "Invalid email";
        isValid = false;

    }



    if(passwordValue === ""){

        passwordError.textContent = "Password is required";
        isValid = false;

    }
    else if(passwordValue.length < 6){

        passwordError.textContent = "Minimum 6 characters";
        isValid = false;

    }



    if(confirmValue === ""){

        confirmPasswordError.textContent = "Confirm your password";
        isValid = false;

    }
    else if(confirmValue !== passwordValue){

        confirmPasswordError.textContent = "Passwords do not match";
        isValid = false;

    }



    if(isValid){

        fetch("/register", {

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                username: usernameValue,
                email: emailValue,
                password: passwordValue

            })

        })

        .then(res => {

            if(res.ok){

                window.location.href = "/dashboard";

            }else{

                return res.text();

            }

        })

        .then(data => {

            if(data){
                alert(data);
            }

        })

        .catch(error => {

            console.log(error);
            alert("Registration failed");

        });

    }

}